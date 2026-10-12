import { test } from 'node:test';
import assert from 'node:assert/strict';
import { submitInquiry } from '../src/lib/inquiry-submit';
import { acceptInquiry, deliverInquiry, drainInquiries, digest, pendingKey, SAFE_EMAIL_RETRY_MS, type Store, type Inquiry } from '../src/lib/inquiry-delivery';
import { authorized } from '../src/lib/inquiry-auth';
import { GET } from '../src/app/api/inquiry-retry/route';

const valid = { name:'Launch Test',email:'visitor@example.com',phone:'618-555-0142',address:'Edwardsville, IL',company:'Fixture Company',source:'Forklift Training',message:'We would like safety training.',website:'',submissionId:'5f0e1d2c-3b4a-4968-8776-5a4b3c2d1e0f' };
const crm = { url:'https://crm.example.test/functions/v1/inquiry-intake', source:'bhg-forklift-website', token:'cit_fixture-only' };
function memoryStore() {
 const records = new Map<string, unknown>();
 const store: Store = {
  async read<T>(key: string) { return structuredClone(records.get(key) ?? null) as T | null; },
  async create<T>(key: string, value: T) { if (!records.has(key)) records.set(key, structuredClone(value)); return structuredClone(records.get(key)) as T; },
  async remove(key) { records.delete(key); },
  async list() { return { keys:[...records.keys()].filter(k => k.includes('/pending/')) }; },
 };
 return {store, records};
}
async function submit(store: Store, body = valid) {
 const data = new FormData();
 for (const [key,value] of Object.entries(body)) data.set(key,value);
 const pending: Array<() => Promise<void>> = [];
 const result = await submitInquiry(data, {store,referer:'https://bhgforklifttraining.com/contact',defer:work=>pending.push(work)});
 for (const work of pending) await work();
 return {status:result.status==='success'?200:503,body:{ok:result.status==='success'},result};
}
function providers() {
 const emails = new Map<string,string>(), inquiries = new Map<string, Record<string, string>>();
 const state = { emailDown:false, crmDown:false, timeoutAfterEmail:false, timeoutAfterCrm:false, emailCalls:0, crmCalls:0 };
 const fetcher: typeof fetch = async (input, init) => {
  const payload = JSON.parse(String(init?.body));
  if (String(input).includes('resend.com')) {
   state.emailCalls++;
   if(state.emailDown) return Response.json({error:'down'}, {status:503});
   const key=(init!.headers as Record<string,string>)['Idempotency-Key'];
   if(!emails.has(key)) emails.set(key, `mail-${emails.size + 1}`);
   if(state.timeoutAfterEmail) throw new Error('lost acknowledgement');
   return Response.json({id:emails.get(key)});
  }
  state.crmCalls++;
  assert.equal((init!.headers as Record<string,string>).Authorization, `Bearer ${crm.token}`);
  if(state.crmDown) return Response.json({error:'down'}, {status:503});
  const previous=inquiries.get(payload.submission_id);
  if(!previous || payload.email_status==='accepted') inquiries.set(payload.submission_id,payload);
  if(state.timeoutAfterCrm) throw new Error('lost acknowledgement');
  return Response.json({ok:true,inquiry_id:payload.submission_id});
 };
 return {fetcher,state,emails,inquiries};
}

test('durable inquiry recovery survives provider failures without visitor retries', async t => {
 const originalFetch=globalThis.fetch;
 const env={...process.env};
 Object.assign(process.env,{RESEND_API_KEY:'fixture',CRM_INTAKE_ENABLED:'true',CRM_INTAKE_URL:crm.url,CRM_INTAKE_SOURCE:crm.source,CRM_INTAKE_TOKEN:crm.token,BLOB_READ_WRITE_TOKEN:'fixture-private-store',CRON_SECRET:'fixture-cron-secret'});
 try {
  await t.test('normal submission creates one email and one inquiry, removes private pending payload', async()=>{
   const {store,records}=memoryStore(), p=providers(); globalThis.fetch=p.fetcher;
   assert.equal((await submit(store)).status,200);
   assert.equal(p.emails.size,1);assert.equal(p.inquiries.size,1);
   assert.equal(records.has(pendingKey(valid.submissionId)),false);
   assert.equal((await submit(store)).status,200);
   assert.equal(p.state.emailCalls,1);assert.equal(p.state.crmCalls,1);
  });
  await t.test('CRM down: success after durable save; a fresh worker recovers after the browser is gone', async()=>{
   const {store,records}=memoryStore(), p=providers();globalThis.fetch=p.fetcher;p.state.crmDown=true;
   assert.equal((await submit(store)).body.ok,true);
   assert.equal(records.has(pendingKey(valid.submissionId)),true);
   p.state.crmDown=false;
   // A new worker holds only the store, not the original browser or request.
   assert.equal((await drainInquiries(store,crm)).complete,1);
   assert.equal(p.inquiries.size,1);assert.equal(p.state.emailCalls,1);
  });
  await t.test('email down: CRM saves immediately, automatic retry records accepted email later', async()=>{
   const {store}=memoryStore(),p=providers();globalThis.fetch=p.fetcher;p.state.emailDown=true;
   assert.equal((await submit(store)).status,200);
   assert.equal(p.inquiries.get(valid.submissionId)!.email_status,'not_reported');
   p.state.emailDown=false;await drainInquiries(store,crm);
   assert.equal(p.inquiries.size,1);assert.equal(p.emails.size,1);
   assert.equal(p.inquiries.get(valid.submissionId)!.email_status,'accepted');
  });
  await t.test('both providers down: saved payload is recovered automatically', async()=>{
   const {store}=memoryStore(),p=providers();globalThis.fetch=p.fetcher;p.state.emailDown=p.state.crmDown=true;
   assert.equal((await submit(store)).status,200);
   p.state.emailDown=p.state.crmDown=false;await drainInquiries(store,crm);
   assert.equal(p.emails.size,1);assert.equal(p.inquiries.size,1);
  });
  await t.test('persistent storage down: no false success and no provider side effect', async()=>{
   const {store}=memoryStore(),p=providers();globalThis.fetch=p.fetcher;
   store.create=async()=>{throw new Error('storage unavailable');};
   assert.equal((await submit(store)).status,503);
   assert.equal(p.state.emailCalls+p.state.crmCalls,0);
  });
  await t.test('crash after enqueue: scheduled worker finds the original record', async()=>{
   const {store}=memoryStore(),p=providers();globalThis.fetch=p.fetcher;
   const entry: Inquiry={version:1,id:valid.submissionId,fingerprint:digest(valid),submittedAt:new Date().toISOString(),source:crm.source,intakeUrl:crm.url,email:{from:'Fixture <sender@example.test>',to:['owner@example.test'],reply_to:valid.email,subject:'Fixture',text:valid.message,html:'Fixture'},crmPayload:{name:valid.name,message:valid.message}};
   await acceptInquiry(store,entry);
   assert.equal((await drainInquiries(store,crm)).complete,1);
   assert.equal(p.emails.size,1);assert.equal(p.inquiries.size,1);
  });
  await t.test('lost provider acknowledgements retry the same immutable request without duplication', async()=>{
   const {store}=memoryStore(),p=providers();globalThis.fetch=p.fetcher;p.state.timeoutAfterEmail=p.state.timeoutAfterCrm=true;
   await submit(store);p.state.timeoutAfterEmail=p.state.timeoutAfterCrm=false;
   await drainInquiries(store,crm);
   assert.equal(p.emails.size,1);assert.equal(p.inquiries.size,1);
  });
  await t.test('concurrent requests and workers still produce one email and one inquiry', async()=>{
   const {store}=memoryStore(),p=providers();globalThis.fetch=p.fetcher;
   await Promise.all([submit(store),submit(store),submit(store)]);
   await Promise.all([drainInquiries(store,crm),drainInquiries(store,crm)]);
   assert.equal(p.emails.size,1);assert.equal(p.inquiries.size,1);
  });
  await t.test('same ID with changed content refused; a new ID makes a separate inquiry', async()=>{
   const {store}=memoryStore(),p=providers();globalThis.fetch=p.fetcher;
   await submit(store);
   assert.equal((await submit(store,{...valid,message:'Changed'})).status,503);
   await submit(store,{...valid,submissionId:'cf864e0a-22cd-4e82-9d14-2a40a28f2a5a',message:'Changed'});
   assert.equal(p.inquiries.size,2);assert.equal(p.emails.size,2);
  });
  await t.test('accepted email receipt prevents resend even after a multi-day CRM outage', async()=>{
   const {store}=memoryStore(),p=providers();globalThis.fetch=p.fetcher;p.state.crmDown=true;
   await submit(store);p.state.crmDown=false;
   assert.equal(await deliverInquiry(store,valid.submissionId,crm,Date.now()+3*86400000),'complete');
   assert.equal(p.state.emailCalls,1);assert.equal(p.inquiries.size,1);
  });
  await t.test('uncertain email older than provider idempotency window is held for review, never resent or discarded', async()=>{
   const {store,records}=memoryStore(),p=providers();globalThis.fetch=p.fetcher;p.state.timeoutAfterEmail=true;
   await submit(store);const calls=p.state.emailCalls;
   assert.equal(await deliverInquiry(store,valid.submissionId,crm,Date.now()+SAFE_EMAIL_RETRY_MS+1000),'attention');
   assert.equal(p.state.emailCalls,calls);assert.equal(records.has(pendingKey(valid.submissionId)),true);assert.equal(p.inquiries.size,1);
  });
  await t.test('configuration change never redirects old pending inquiries into a different source', async()=>{
   const {store}=memoryStore(),p=providers();globalThis.fetch=p.fetcher;p.state.crmDown=true;await submit(store);
   const before=p.state.crmCalls;
   assert.equal(await deliverInquiry(store,valid.submissionId,{...crm,source:'another-client'}),'attention');assert.equal(p.state.crmCalls,before);
  });
  await t.test('missing scheduler or storage fails closed; old availability switch cannot bypass durable capture', async()=>{
   const {store}=memoryStore(),p=providers();globalThis.fetch=p.fetcher;
   delete process.env.CRON_SECRET;process.env.CRM_INTAKE_REQUIRED='false';
   assert.equal((await submit(store)).status,503);assert.equal(p.state.emailCalls,0);
   process.env.CRON_SECRET='fixture-cron-secret';delete process.env.BLOB_READ_WRITE_TOKEN;
   assert.equal((await submit(store)).status,503);process.env.BLOB_READ_WRITE_TOKEN='fixture-private-store';
  });
  await t.test('unauthorized retry endpoint cannot trigger delivery', async()=>{
   assert.equal(authorized(null,undefined),false);assert.equal(authorized('Bearer wrong','right'),false);assert.equal(authorized('Bearer right','right'),true);
   const res=await GET(new Request('https://bhgforklifttraining.com/api/inquiry-retry',{headers:{authorization:'Bearer wrong'}}));
   assert.equal(res.status,401);
  });
  await t.test('site branding and every submitted business field reach the CRM', async()=>{
   const {store}=memoryStore(),p=providers();globalThis.fetch=p.fetcher;
   await submit(store,{...valid,location:'Kansas City',operators:'12',page_url:'https://bhgforklifttraining.com/contact'} as typeof valid);
   const saved=p.inquiries.get(valid.submissionId)!;
   assert.equal(saved.service_type,valid.source);assert.equal(saved.page_url,'https://bhgforklifttraining.com/contact');
   assert.ok(saved.message.includes('Fixture Company'));
   assert.ok(saved.message.includes('BHG Forklift Training'));
   assert.equal(saved.location,'Kansas City');assert.ok(saved.message.includes('Operators to Train: 12'));
  });
  await t.test('invalid values and honeypot never write or deliver', async()=>{
   const {store,records}=memoryStore(),p=providers();globalThis.fetch=p.fetcher;
   assert.equal((await submit(store,{...valid,email:'invalid'})).status,503);
   assert.equal((await submit(store,{...valid,website:'bot'})).status,200);
   assert.equal(records.size,0);assert.equal(p.state.emailCalls+p.state.crmCalls,0);
  });
  await t.test('preview cannot call email, CRM, or storage even with production-like configuration', async()=>{
   const {store,records}=memoryStore(),p=providers();globalThis.fetch=p.fetcher;process.env.VERCEL_ENV='preview';
   try {assert.equal((await submit(store)).status,200);assert.equal(records.size,0);assert.equal(p.state.emailCalls+p.state.crmCalls,0);}
   finally {delete process.env.VERCEL_ENV;}
  });
  await t.test('enabled integration missing token fails closed', async()=>{
   const {store,records}=memoryStore(),p=providers();globalThis.fetch=p.fetcher;delete process.env.CRM_INTAKE_TOKEN;
   try {assert.equal((await submit(store)).status,503);assert.equal(records.size,0);assert.equal(p.state.emailCalls+p.state.crmCalls,0);}
   finally {process.env.CRM_INTAKE_TOKEN=crm.token;}
  });
  await t.test('retry logs contain reference and status only', async()=>{
   const {store}=memoryStore(),p=providers();globalThis.fetch=p.fetcher;p.state.crmDown=p.state.emailDown=true;
   const logs:string[]=[];const original=console.error;console.error=(...values)=>logs.push(JSON.stringify(values));
   try {await submit(store);}finally{console.error=original;}
   for(const secret of [valid.name,valid.email,valid.phone,valid.message,crm.token]) assert.ok(!logs.join('').includes(secret));
  });
 } finally {
  globalThis.fetch=originalFetch;
  for(const key of Object.keys(process.env))if(!(key in env))delete process.env[key];
  Object.assign(process.env,env);
 }
});

import { CONTACT } from "./site";
import { acceptInquiry, crmConfig, deliverInquiry, digest, type Store } from "./inquiry-delivery";
import { Resend } from "resend";

import {
  CONTACT_FROM_EMAIL,
  CONTACT_TO_EMAIL,
  SITE_NAME,
  type ContactFormState,
  type InquiryRow,
  pickPageUrl,
  readField,
  renderInquiryHtml,
  renderInquiryText,
  validate,
} from "@/lib/contact-email";

// ─── Contact form submission ──────────────────────────────────────────────────
//
// Shared by every contact form on the site. Each form posts the fields it
// actually renders; anything it omits simply comes back empty and is left out
// of the notification email.

export async function submitInquiry(
  formData: FormData,
  dependencies: { store: Store; referer: string | null; defer: (work: () => Promise<void>) => void },
): Promise<ContactFormState> {
  // Honeypot — real visitors never see this field, bots fill it in.
  if (String(formData.get("website") ?? "").trim() !== "") {
    // Pretend it worked so the bot doesn't retry with a different shape.
    return { status: "success", message: SUCCESS_MESSAGE, errors: {} };
  }

  const values = {
    name: readField(formData, "name"),
    email: readField(formData, "email"),
    company: readField(formData, "company"),
    phone: readField(formData, "phone"),
    address: readField(formData, "address"),
    location: readField(formData, "location"),
    operators: readField(formData, "operators"),
    message: readField(formData, "message"),
  };

  const errors = validate(values);

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please fix the highlighted fields and try again.",
      errors,
    };
  }

  const mock = process.env.VERCEL_ENV === "preview" || (process.env.VERCEL_ENV !== "production" && process.env.INQUIRY_DELIVERY === "mock");
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey && !mock) {
    console.error("RESEND_API_KEY is not set — contact form email not sent.");
    return { status: "error", message: FALLBACK_MESSAGE, errors: {} };
  }

  const source = String(formData.get("source") ?? "").trim().slice(0, 200) || "the website";

  const rows: InquiryRow[] = [
    { label: "Name", value: values.name },
    { label: "Company", value: values.company },
    { label: "Email", value: values.email },
    { label: "Phone", value: values.phone },
    { label: "Address", value: values.address },
    { label: "Training Location", value: values.location },
    { label: "Operators to Train", value: values.operators },
  ];

  const email = {
      from: CONTACT_FROM_EMAIL,
      to: [CONTACT_TO_EMAIL],
      reply_to: values.email,
      subject: `${SITE_NAME}: new inquiry from ${values.name}${
        values.company ? ` (${values.company})` : ""
      }`,
      text: renderInquiryText(rows, values.message, source),
      html: renderInquiryHtml(rows, values.message, source),
  };

  if (mock) return { status: "success", message: "Preview test received. No email or text was sent.", errors: {} };
  const crm = crmConfig();
  if (crm === "incomplete" || (crm && (!process.env.BLOB_READ_WRITE_TOKEN || !process.env.CRON_SECRET))) {
    console.error("Inquiry configuration incomplete");
    return { status: "error", message: FALLBACK_MESSAGE, errors: {} };
  }
  if (crm) {
    const id = String(formData.get("submissionId") ?? "");
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) {
      return { status: "error", message: "Please refresh this page and try again.", errors: {} };
    }
    const pageUrl = pickPageUrl(String(formData.get("page_url") ?? ""), dependencies.referer);
    // Retries reuse the original immutable payload and submission time.
    const fingerprint = digest({ values, source, pageUrl });
    try {
      await acceptInquiry(dependencies.store, {
        version: 1, id, fingerprint, submittedAt: new Date().toISOString(),
        source: crm.source, intakeUrl: crm.url, email,
        crmPayload: { name: values.name, email: values.email, phone: values.phone || null,
          location: (values.location || values.address).slice(0, 200) || null, service_type: source,
          message: email.text, page_url: pageUrl === "unknown" ? null : pageUrl },
      });
    } catch {
      console.error("Inquiry could not be saved", { reference: id });
      return { status: "error", message: FALLBACK_MESSAGE, errors: {} };
    }
    // A saved inquiry is recoverable by cron even if scheduling or this worker fails.
    try {
      dependencies.defer(async () => {
        try { await deliverInquiry(dependencies.store, id, crm); }
        catch { console.error("Inquiry delivery deferred", { reference: id }); }
      });
    } catch { console.error("Inquiry delivery deferred", { reference: id }); }
    return { status: "success", message: SUCCESS_MESSAGE, errors: {} };
  }
  try {
    const { reply_to, ...body } = email;
    const { error } = await new Resend(apiKey).emails.send({ ...body, replyTo: reply_to });

    if (error) {
      console.error("Inquiry email rejected");
      return { status: "error", message: FALLBACK_MESSAGE, errors: {} };
    }
  } catch {
    console.error("Inquiry email unavailable");
    return { status: "error", message: FALLBACK_MESSAGE, errors: {} };
  }

  return { status: "success", message: SUCCESS_MESSAGE, errors: {} };
}

const SUCCESS_MESSAGE =
  "Thanks — your message is on its way. We'll be in touch within one business day.";

const FALLBACK_MESSAGE =
  `Something went wrong sending your message. Please call ${CONTACT.phone} or email ${CONTACT.email} and we'll pick it up right away.`;


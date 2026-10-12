import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { getAllPosts, getPostBySlug } from "../src/lib/mdx";

test("site advertises Compass's lossless approved Markdown blog contract", () => {
  const contract=JSON.parse(fs.readFileSync("compass-blog.json","utf8"));
  assert.deepEqual(contract,{version:1,adapter:"markdown_blog",keyword_provenance:true,markdown:true,seo_fields:true});
});
test("existing editorial blog posts remain readable", () => {
  const posts=getAllPosts();
  assert.ok(posts.length > 0);
  const post=getPostBySlug("forklift-inspection-checklist");
  assert.ok(post.title.length > 0);
  assert.equal(post.compassRelease,undefined);
  assert.ok(posts.some(x=>x.slug===post.slug));
});
test("blog page preserves original posts and knows approved release attributes", () => {
  const source=fs.readFileSync("src/app/blog/[slug]/page.tsx","utf8");
  assert.match(source,/data-compass-release=\{post.compassRelease\}/);
  assert.match(source,/post\.h1 \?\? post\.title/);
  assert.match(source,/post\.metaTitle/);
  assert.match(source,/!post\.compassRelease && <aside/);
  assert.match(source,/PostContent/);
});

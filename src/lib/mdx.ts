import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author: string;
  /** Last substantive edit (YYYY-MM-DD). Falls back to `date`. */
  updated: string;
  /** Optional <title> override when the headline is too long for 65 characters. */
  seoTitle?: string;
}

function toMeta(slug: string, data: Record<string, unknown>): PostMeta {
  const str = (v: unknown) => (typeof v === "string" ? v : "");
  const date = str(data.date);
  return {
    slug,
    title: str(data.title) || slug,
    date,
    excerpt: str(data.excerpt),
    author: str(data.author),
    updated: str(data.updated) || date,
    seoTitle: str(data.seoTitle) || undefined,
  };
}

/**
 * Returns metadata for all blog posts, sorted newest-first.
 * The actual MDX content is rendered via dynamic import() in each page route.
 */
export function getAllPosts(): PostMeta[] {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => /\.(mdx|md)$/.test(f));

  const posts: PostMeta[] = files.map((filename) => {
    const slug = filename.replace(/\.(mdx|md)$/, "");
    const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf-8");
    return toMeta(slug, matter(raw).data);
  });

  // Sort newest first
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/**
 * Returns the frontmatter metadata for a specific slug.
 * Content is rendered by importing the .mdx file directly via @next/mdx.
 */
export function getPostBySlug(slug: string): PostMeta {
  const extensions = [".mdx", ".md"];
  let filePath: string | null = null;

  for (const ext of extensions) {
    const candidate = path.join(BLOG_DIR, `${slug}${ext}`);
    if (fs.existsSync(candidate)) {
      filePath = candidate;
      break;
    }
  }

  if (!filePath) {
    throw new Error(`Blog post not found for slug: ${slug}`);
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  return toMeta(slug, matter(raw).data);
}

/** The post's <title>: the headline plus as much branding as fits in 65 characters. */
export function postTitle(post: PostMeta): string {
  if (post.seoTitle) return post.seoTitle;
  const candidates = [`${post.title} | BHG Forklift Training`, `${post.title} | BHG`];
  return candidates.find((t) => t.length <= 65) ?? post.title;
}

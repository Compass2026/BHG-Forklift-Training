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
    const { data } = matter(raw);

    return {
      slug,
      title: data.title ?? slug,
      date: data.date ?? "",
      excerpt: data.excerpt ?? "",
      author: data.author ?? "",
    };
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
  const { data } = matter(raw);

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    excerpt: data.excerpt ?? "",
    author: data.author ?? "",
  };
}

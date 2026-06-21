import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import type { Metadata } from "next";
import Link from "next/link";

/* ── Static Generation ──────────────────────────────────────────── */

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

/* ── Dynamic Metadata ───────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  return {
    title: `${post.title} | BHG Safety Partners`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: post.author ? [post.author] : undefined,
    },
  };
}

/* ── Helpers ────────────────────────────────────────────────────── */

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

/* ── Page Component ─────────────────────────────────────────────── */

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  // Dynamically import the MDX file — @next/mdx compiles it server-side
  // with no Client Component boundary issues.
  const { default: PostContent } = await import(
    `../../../../content/blog/${slug}.mdx`
  );

  return (
    <div className="bg-white min-h-screen">
      {/* ── Article Header ─────────────────────────────────────── */}
      <header className="bg-bhg-black py-16 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-bhg-orange transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-bhg-orange transition-colors"
                >
                  Insights
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-gray-500 truncate max-w-[200px]">
                {post.title}
              </li>
            </ol>
          </nav>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 mb-4">
            {post.author && (
              <span className="bg-bhg-orange/10 text-bhg-orange px-3 py-1 rounded-full font-medium">
                {post.author}
              </span>
            )}
            {post.date && (
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="mt-4 text-gray-400 text-lg leading-relaxed">
              {post.excerpt}
            </p>
          )}
        </div>
      </header>

      {/* Orange accent bar */}
      <div className="h-1 bg-bhg-orange" />

      {/* ── Article Body ───────────────────────────────────────── */}
      <article className="max-w-3xl mx-auto px-6 py-14">
        <div className="prose prose-slate lg:prose-lg prose-headings:font-bold prose-headings:text-bhg-black prose-a:text-bhg-orange prose-a:no-underline hover:prose-a:underline prose-strong:text-bhg-black max-w-none">
          <PostContent />
        </div>

        {/* ── Back link ────────────────────────────────────────── */}
        <div className="mt-14 pt-8 border-t border-gray-100">
          <Link
            href="/blog"
            id="back-to-blog"
            className="inline-flex items-center gap-2 text-bhg-orange font-semibold hover:gap-3 transition-all duration-150"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 rotate-180"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            Back to Insights
          </Link>
        </div>
      </article>
    </div>
  );
}

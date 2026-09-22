import Link from "next/link";
import Schema from "@/components/Schema";
import { breadcrumbSchema } from "@/lib/schema";
import { getAllPosts } from "@/lib/mdx";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forklift Safety & Training Blog | BHG Forklift Training",
  description:
    "Practical articles on forklift operator training, OSHA certification requirements and warehouse safety from the BHG Forklift Training instructors.",
  openGraph: {
    title: "Forklift Safety & Training Blog | BHG Forklift Training",
    description:
      "Practical articles on forklift operator training, OSHA certification requirements and warehouse safety from the BHG Forklift Training instructors.",
    type: "website",
  },
  alternates: {
    canonical: "/blog",
  },
};

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="bg-bhg-gray-light min-h-screen">
      <Schema
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />
      {/* ── Page Header ──────────────────────────────────────────── */}
      <section className="bg-bhg-black py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-block text-bhg-orange uppercase tracking-widest text-xs font-semibold mb-4">
            Resources
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Forklift Safety &amp; Training Blog
          </h1>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-lg">
            Practical guidance on forklift operator training, OSHA
            certification requirements and safer material handling.
          </p>
        </div>
      </section>

      {/* ── Divider accent ───────────────────────────────────────── */}
      <div className="h-1 w-full bg-bhg-orange" />

      {/* ── Posts Grid ───────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        {posts.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No posts published yet. Check back soon!
          </p>
        ) : (
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <li
                key={post.slug}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                {/* Card top accent */}
                <div className="h-1 bg-bhg-orange" />

                <div className="flex flex-col flex-1 p-6">
                  {/* Date & Author */}
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    {post.author && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span>{post.author}</span>
                      </>
                    )}
                  </div>

                  {/* Title */}
                  <h2 className="text-lg font-bold text-bhg-black leading-snug mb-3 flex-1">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  {post.excerpt && (
                    <p className="text-sm text-gray-500 leading-relaxed mb-5 line-clamp-3">
                      {post.excerpt}
                    </p>
                  )}

                  {/* CTA */}
                  <Link
                    href={`/blog/${post.slug}`}
                    id={`read-post-${post.slug}`}
                    className="inline-flex items-center gap-1 text-bhg-orange font-semibold text-sm hover:gap-2 transition-all duration-150"
                    aria-label={`Read article: ${post.title}`}
                  >
                    Read Article
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

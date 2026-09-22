import type { MetadataRoute } from "next";
import classesData from "../../data/classes.json";
import { SITE_URL as BASE_URL } from "@/lib/site";
import { getAllPosts } from "@/lib/mdx";
import { liveLocations, serviceStates } from "@/lib/locations";
import { getCityContent } from "@/content/cities";

// lastModified is only set where we know a real date (blog posts, city
// content). Stamping every URL with the build time tells Google nothing and
// trains it to ignore the field.
export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  // ── Static routes ──────────────────────────────────────────────────────────
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/classes`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/contact`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/locations`, changeFrequency: "monthly", priority: 0.6 },
    {
      url: `${BASE_URL}/blog`,
      lastModified: posts[0]?.updated || undefined,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    { url: `${BASE_URL}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/terms`, changeFrequency: "yearly", priority: 0.2 },
  ];

  // ── Forklift class pages (/classes/[slug]) ─────────────────────────────────
  const classRoutes: MetadataRoute.Sitemap = classesData.map((c) => ({
    url: `${BASE_URL}/classes/${c.slug}`,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  // ── State hubs (/locations/[state]) ────────────────────────────────────────
  const stateRoutes: MetadataRoute.Sitemap = serviceStates.map((s) => ({
    url: `${BASE_URL}/locations/${s.stateSlug}`,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  // ── Published city pages (/locations/[state]/[city]) ───────────────────────
  const locationRoutes: MetadataRoute.Sitemap = liveLocations.map((loc) => ({
    url: `${BASE_URL}/locations/${loc.slug}`,
    lastModified: getCityContent(loc.slug)?.updated,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // ── Blog posts (/blog/[slug]) ──────────────────────────────────────────────
  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.updated || undefined,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...classRoutes,
    ...stateRoutes,
    ...locationRoutes,
    ...postRoutes,
  ];
}

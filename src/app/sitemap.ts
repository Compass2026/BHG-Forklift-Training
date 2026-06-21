import type { MetadataRoute } from "next";
import locationsData from "../../data/locations.json";
import servicesData from "../../data/services.json";

const BASE_URL = "https://www.bhgsafetypartners.com";

export default function sitemap(): MetadataRoute.Sitemap {
  // ── Static routes ──────────────────────────────────────────────────────────
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/locations`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
  ];

  // ── Dynamic service spoke pages (/services/[slug]) ─────────────────────────
  const serviceRoutes: MetadataRoute.Sitemap = servicesData.map((service) => ({
    url: `${BASE_URL}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // ── Dynamic location hub pages (/locations/[state]/[city]) ────────────────
  const locationRoutes: MetadataRoute.Sitemap = locationsData.map((loc) => ({
    url: `${BASE_URL}/locations/${loc.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...locationRoutes];
}

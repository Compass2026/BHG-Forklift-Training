import type { MetadataRoute } from "next";

const BASE_URL = "https://www.bhgsafetypartners.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // ── Standard crawlers ─────────────────────────────────────────────────
      {
        userAgent: "*",
        allow: "/",
      },
      // ── AI training & real-time search crawlers ───────────────────────────
      // OpenAI
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      // Google Gemini / AI Overviews
      { userAgent: "Google-Extended", allow: "/" },
      // Anthropic Claude
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      // Perplexity AI
      { userAgent: "PerplexityBot", allow: "/" },
      // Meta AI
      { userAgent: "FacebookBot", allow: "/" },
      // Common Crawl (used by many LLMs)
      { userAgent: "CCBot", allow: "/" },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}

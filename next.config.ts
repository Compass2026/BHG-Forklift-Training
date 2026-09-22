import type { NextConfig } from "next";
import createMDX from "@next/mdx";

// The six general safety-service pages this site used to carry were verbatim
// copies of bhgsafety.com's. This site now covers forklift training only, so
// each old URL permanently redirects to the matching page on the parent site.
const PARENT_SERVICE_SLUGS = [
  "safety-consulting",
  "workplace-safety-training",
  "onsite-safety-inspections",
  "compliance-audits",
  "safety-program-development",
  "trusted-safety-partner",
];

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  async redirects() {
    return [
      { source: "/services", destination: "/classes", permanent: true },
      ...PARENT_SERVICE_SLUGS.map((slug) => ({
        source: `/services/${slug}`,
        destination: `https://bhgsafety.com/services/${slug}`,
        permanent: true,
      })),
    ];
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      // Strip YAML frontmatter so it doesn't appear as body text
      "remark-frontmatter",
    ],
  },
});

export default withMDX(nextConfig);

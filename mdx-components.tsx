import type { MDXComponents } from "mdx/types";

/**
 * Global MDX component overrides.
 * Add custom mappings here to style or replace default HTML elements
 * rendered by MDX files (e.g., h1, a, img).
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  };
}

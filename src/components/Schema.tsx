/**
 * Schema.tsx
 * Reusable JSON-LD structured data injector.
 *
 * Usage:
 *   <Schema data={mySchemaObject} />
 *
 * The `data` prop accepts any valid schema.org JSON-LD object.
 * Uses dangerouslySetInnerHTML with JSON.stringify to safely serialize
 * the object — never interpolated as raw string, so no XSS risk from
 * controlled server-side data.
 */

type SchemaProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>;
};

export default function Schema({ data }: SchemaProps) {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: controlled server-side data only
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

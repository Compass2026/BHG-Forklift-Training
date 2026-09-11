// ─── Shared types + helpers for the website contact forms ─────────────────────

export type ContactField =
  | "name"
  | "email"
  | "company"
  | "phone"
  | "address"
  | "location"
  | "operators"
  | "message";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message: string;
  errors: Partial<Record<ContactField, string>>;
};

export const initialContactFormState: ContactFormState = {
  status: "idle",
  message: "",
  errors: {},
};

// Which of the BHG sites this inquiry came from. All the sites deliver to the
// same inbox, so this is what tells them apart in the subject line and body.
export const SITE_NAME = "BHG Forklift Training";

// The address every website inquiry is delivered to. Override with CONTACT_TO_EMAIL.
export const CONTACT_TO_EMAIL =
  process.env.CONTACT_TO_EMAIL || "brad@bhgsafety.com";

// Must be an address on a domain verified in Resend. Override with CONTACT_FROM_EMAIL.
export const CONTACT_FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL ||
  "BHG Forklift Training <noreply@send.bhgsafety.com>";

// ─── Validation ───────────────────────────────────────────────────────────────

// Deliberately permissive: we only reject what is obviously not an address and
// let Resend's reply-to surface the rest.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const MAX_LENGTHS: Record<ContactField, number> = {
  name: 120,
  email: 200,
  company: 160,
  phone: 40,
  address: 250,
  location: 120,
  operators: 20,
  message: 5000,
};

export function readField(formData: FormData, field: ContactField): string {
  const value = formData.get(field);
  return typeof value === "string" ? value.trim() : "";
}

export function validate(
  values: Partial<Record<ContactField, string>>,
): Partial<Record<ContactField, string>> {
  const errors: Partial<Record<ContactField, string>> = {};

  for (const [field, value] of Object.entries(values) as [
    ContactField,
    string,
  ][]) {
    if (value.length > MAX_LENGTHS[field]) {
      errors[field] = `Please keep this under ${MAX_LENGTHS[field]} characters.`;
    }
  }

  if (!values.name) {
    errors.name = "Please tell us your name.";
  }

  if (!values.email) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_PATTERN.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.message) {
    errors.message = "Please tell us how we can help.";
  }

  return errors;
}

// ─── Email rendering ──────────────────────────────────────────────────────────

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export type InquiryRow = { label: string; value: string };

export function renderInquiryText(
  rows: InquiryRow[],
  message: string,
  source: string,
): string {
  const details = rows
    .filter((row) => row.value)
    .map((row) => `${row.label}: ${row.value}`)
    .join("\n");

  return `New inquiry from the ${SITE_NAME} website\n\n${details}\n\nMessage:\n${message}\n\nSubmitted from: ${source}\n`;
}

export function renderInquiryHtml(
  rows: InquiryRow[],
  message: string,
  source: string,
): string {
  const details = rows
    .filter((row) => row.value)
    .map(
      (row) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#6b7280;font-size:13px;white-space:nowrap;vertical-align:top;">${escapeHtml(
          row.label,
        )}</td><td style="padding:6px 0;color:#111827;font-size:14px;font-weight:600;">${escapeHtml(
          row.value,
        )}</td></tr>`,
    )
    .join("");

  return `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;max-width:560px;">
  <p style="margin:0 0 4px;font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#f97316;">New Website Inquiry</p>
  <h1 style="margin:0 0 20px;font-size:20px;color:#111827;">${SITE_NAME}</h1>
  <table style="border-collapse:collapse;margin-bottom:20px;">${details}</table>
  <p style="margin:0 0 6px;font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#f97316;">Message</p>
  <p style="margin:0 0 24px;font-size:14px;line-height:1.6;color:#111827;white-space:pre-wrap;">${escapeHtml(
    message,
  )}</p>
  <p style="margin:0;font-size:12px;color:#6b7280;border-top:1px solid #e5e7eb;padding-top:12px;">Submitted from ${escapeHtml(
    source,
  )} — reply directly to this email to reach the sender.</p>
</div>`;
}

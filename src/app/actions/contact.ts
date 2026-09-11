"use server";

import { Resend } from "resend";

import {
  CONTACT_FROM_EMAIL,
  CONTACT_TO_EMAIL,
  SITE_NAME,
  type ContactFormState,
  type InquiryRow,
  readField,
  renderInquiryHtml,
  renderInquiryText,
  validate,
} from "@/lib/contact-email";

// ─── Contact form submission ──────────────────────────────────────────────────
//
// Shared by every contact form on the site. Each form posts the fields it
// actually renders; anything it omits simply comes back empty and is left out
// of the notification email.

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // Honeypot — real visitors never see this field, bots fill it in.
  if (String(formData.get("website") ?? "").trim() !== "") {
    // Pretend it worked so the bot doesn't retry with a different shape.
    return { status: "success", message: SUCCESS_MESSAGE, errors: {} };
  }

  const values = {
    name: readField(formData, "name"),
    email: readField(formData, "email"),
    company: readField(formData, "company"),
    phone: readField(formData, "phone"),
    address: readField(formData, "address"),
    location: readField(formData, "location"),
    operators: readField(formData, "operators"),
    message: readField(formData, "message"),
  };

  const errors = validate(values);
  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please fix the highlighted fields and try again.",
      errors,
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set — contact form email not sent.");
    return { status: "error", message: FALLBACK_MESSAGE, errors: {} };
  }

  const source = String(formData.get("source") ?? "").trim() || "the website";

  const rows: InquiryRow[] = [
    { label: "Name", value: values.name },
    { label: "Company", value: values.company },
    { label: "Email", value: values.email },
    { label: "Phone", value: values.phone },
    { label: "Address", value: values.address },
    { label: "Training Location", value: values.location },
    { label: "Operators to Train", value: values.operators },
  ];

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from: CONTACT_FROM_EMAIL,
      to: [CONTACT_TO_EMAIL],
      replyTo: values.email,
      subject: `${SITE_NAME}: new inquiry from ${values.name}${
        values.company ? ` (${values.company})` : ""
      }`,
      text: renderInquiryText(rows, values.message, source),
      html: renderInquiryHtml(rows, values.message, source),
    });

    if (error) {
      console.error("Resend rejected the contact form email:", error);
      return { status: "error", message: FALLBACK_MESSAGE, errors: {} };
    }
  } catch (cause) {
    console.error("Failed to send the contact form email:", cause);
    return { status: "error", message: FALLBACK_MESSAGE, errors: {} };
  }

  return { status: "success", message: SUCCESS_MESSAGE, errors: {} };
}

const SUCCESS_MESSAGE =
  "Thanks — your message is on its way. We'll be in touch within one business day.";

const FALLBACK_MESSAGE =
  "Something went wrong sending your message. Please call (573) 822-6448 or email office@bhgspllc.com and we'll pick it up right away.";

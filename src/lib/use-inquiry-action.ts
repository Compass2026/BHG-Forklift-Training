"use client";
import { useActionState, useRef } from "react";
import { submitContactForm } from "@/app/actions/contact";
import { initialContactFormState, type ContactFormState } from "./contact-email";

export function useInquiryAction() {
  const attempt = useRef<{ payload: string; id: string } | null>(null);
  return useActionState(async (previous: ContactFormState, data: FormData) => {
    data.set("page_url", window.location.href);
    const payload = JSON.stringify([...data.entries()].filter(([key]) => key !== "submissionId" && !key.startsWith("$ACTION_")).sort(([a], [b]) => a.localeCompare(b)));
    if (!attempt.current || attempt.current.payload !== payload) {
      attempt.current = { payload, id: crypto.randomUUID() };
    }
    data.set("submissionId", attempt.current.id);
    try {
      const state = await submitContactForm(previous, data);
      if (state.status === "success") attempt.current = null;
      return state;
    } catch {
      // Keep the ID: the server may already have durably accepted this inquiry.
      return { status: "error", message: "We couldn't confirm receipt. Please try again.", errors: {} } as ContactFormState;
    }
  }, initialContactFormState);
}

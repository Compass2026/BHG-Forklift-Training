"use server";
import { headers } from "next/headers";
import { after } from "next/server";
import type { ContactFormState } from "@/lib/contact-email";
import { submitInquiry } from "@/lib/inquiry-submit";
import { blobStore } from "@/lib/inquiry-store";

export async function submitContactForm(_previous: ContactFormState, data: FormData): Promise<ContactFormState> {
  return submitInquiry(data, { store: blobStore, referer: (await headers()).get("referer"), defer: after });
}

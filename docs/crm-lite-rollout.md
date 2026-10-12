# BHG-Forklift-Training inquiry capture

Website: https://bhgforklifttraining.com. BHG client: 3eaa3389-2a33-4004-837c-8aef90404410. Source: bhg-forklift-website.

Preserves the existing branded Resend inquiry email and form fields. Each inquiry is saved privately before success, delivered to email and the BHG CRM, and recovered by the authenticated five-minute retry worker. Preview submissions have no external side effects. Website visitor phone numbers do not grant SMS consent.

## Activation

Issue this source's token through the signed-in Compass CRM admin settings. Keep source keys and tokens separate for each website. Save CRM_INTAKE_TOKEN, CRON_SECRET and the private BLOB_READ_WRITE_TOKEN as production-only sensitive variables. Set CRM_INTAKE_URL, CRM_INTAKE_SOURCE and CRM_INTAKE_ENABLED=true only after configuration is complete. Preserve the project's existing RESEND_API_KEY and CONTACT_TO_EMAIL. Deploy, then perform an authorized labeled live inquiry and confirm one CRM record and recipient email.

Brad's owner-alert consent is recorded on the existing BHG client. SMS remains off pending shared Compass Notifications approval and a confirmed test. Do not change the separate BHG business number.

## Recovery

Email receipts, immutable payloads and completion fingerprints prevent duplicate delivery. Automatic email retries stop after 23 hours without a receipt; CRM retries continue. Retain pending payloads for review. Inspect provider logs before manual resend. Never reset attempt time or delete outbox data to force delivery. Keep the private store and retry worker through rollbacks until pending inquiries are resolved.

Validation: npm test, targeted ESLint, TypeScript and npm run build.

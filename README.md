This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Contact form email (Resend)

Every contact form on the site (`/contact`, the home page, location pages and
service pages) posts to the `submitContactForm` server action in
`src/app/actions/contact.ts`, which emails the inquiry through
[Resend](https://resend.com). The visitor's address is set as `Reply-To`, so
replying from the inbox goes straight back to them.

The contact page also collects the requested training location and the
estimated number of operators; both are included in the notification email.

Copy `.env.example` to `.env.local` and fill it in:

| Variable | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | yes | Resend key with sending access ([resend.com/api-keys](https://resend.com/api-keys)). |
| `CONTACT_TO_EMAIL` | no | Inbox that receives inquiries. Defaults to `brad@bhgsafety.com`. |
| `CONTACT_FROM_EMAIL` | no | Sender address. Must be on a domain verified in Resend. |

The sending domain has to be verified at
[resend.com/domains](https://resend.com/domains) (add the DNS records Resend
gives you) or the API rejects the send. Set the same three variables in the
Vercel project settings for Production and Preview.

If `RESEND_API_KEY` is missing or Resend returns an error, the form shows the
visitor a fallback message pointing at the phone number and logs the reason
server-side — it never fails silently.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Landing Page v3 - "Book a Meeting" (Ad Campaign)

A standalone, self-contained landing page built for paid ad campaigns. It lives in its own
folder so it can be published separately from the main site (the root `index.html` React app).

## What's inside

- **Self-contained folder**: `index.html`, `assets/` (Iffort logo, hero video, compressed
  WebP case-study and testimonial images), and its own `api/send-email.js` function. No build
  step for the page; Tailwind via CDN, vanilla JS, Inter font.
- **Primary CTA**: "Book a Meeting" — every CTA on the page points at one booking calendar link.
- **Disruption narrative**: "Stop marketing. Start engineering demand." Hero → manifesto
  (the old playbook is dead) → proof (45,000+ leads, 5X ROAS, ₹8.25 Cr+ revenue, 40% YoY) →
  case studies → process → fit → real client screenshot wall → FAQ → booking.
- **Lead form**: name, work email, a "what do you need help with?" qualifier, and a details
  message, with an explicit T&C/privacy consent checkbox. On submit the visitor sees a
  personalised thank-you and the booking calendar; the lead is emailed to the team.
- **T&C on-page**: a dedicated Terms & Conditions section (`#terms`).
- **Business inquiries**: daksh.sharma@iffort.com (footer, T&C, and booking section).

## Set the real booking link

The booking calendar URL is a single constant at the top of the `<script>` block in
`index.html`:

```js
const BOOKING_URL = 'https://calendly.com/dakshsharma';
```

Calendly links get an inline embedded calendar, pre-filled with the lead's name and email;
other providers fall back to an iframe embed plus an "Open Booking Calendar" button.

## Lead-alert email (api/send-email.js)

On submit, the form POSTs to `/api/send-email`, a Vercel serverless function that emails each
meeting request to **daksh.sharma@iffort.com** and **lav.singh@iffort.com**.

To make it send:

1. Deploy on Vercel with **Root Directory = `landing-v3`** (no framework, no build command).
2. Add the environment variable **`RESEND_API_KEY`** (from resend.com).
3. Verify the **iffort.com** domain at resend.com/domains. Resend's test mode only delivers
   to verified addresses, so delivery to lav.singh@iffort.com needs this one-time DNS step.

The lead call is non-blocking: on a static host with no function, the visitor still gets the
thank-you and can book a time, but no alert email is sent.

## Publishing separately

- **Vercel**: create a second project pointing at this repo with **Root Directory =
  `landing-v3`**. Keeps the main site deployment untouched.
- **Netlify / Cloudflare Pages / GitHub Pages**: publish the `landing-v3` folder as the site
  root (the page works; the email function is Vercel-specific).

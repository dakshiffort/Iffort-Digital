# Landing Page v3 - "Book a Meeting" (Ad Campaign)

A standalone, self-contained landing page built for paid ad campaigns. It lives in its own
folder so it can be published separately from the main site (the root `index.html` React app).

## What's inside

- **Self-contained folder**: `index.html` plus `assets/` (hero video and compressed WebP case-study images). No build step; Tailwind via CDN, vanilla JS, Inter font.
- **Primary CTA**: "Book a Meeting" — every CTA on the page points at one booking calendar link.
- **Disruption narrative**: "Stop marketing. Start engineering demand." Hero → manifesto
  (the old playbook is dead) → proof (45,000+ leads, 5X ROAS, ₹8.25 Cr+ revenue, 40% YoY) →
  services → booking.
- **Secure lead gate**: the calendar unlocks after a short form (name, company, work email)
  with an explicit T&C/privacy consent checkbox. Data goes over HTTPS/TLS and is posted
  (best-effort) to the existing `/api/send-email` endpoint so leads land in the inbox.
- **T&C on-page**: a dedicated Terms & Conditions section (`#terms`) covering data use,
  secure access, communications consent, and performance-figure disclaimers, linking to the
  full legal pages on iffort.com.
- **Business inquiries**: daksh.sharma@iffort.com (footer, T&C, and booking section).

## ⚠️ Set the real booking link

The booking calendar URL is a single constant at the top of the `<script>` block in
`index.html`:

```js
const BOOKING_URL = 'https://calendly.com/daksh-sharma-iffort/30min';
```

Replace it with the live scheduling link (Calendly, Google Calendar appointment schedule,
or HubSpot Meetings). Calendly links get an inline embedded calendar, pre-filled with the
lead's name and email; other providers fall back to an iframe embed plus an "Open Booking
Calendar" button.

## Publishing separately

Because the page is fully self-contained, any of these work:

- **Vercel**: create a second project pointing at this repo with **Root Directory =
  `landing-v3`** (no framework, no build command). Keeps the main site deployment untouched.
- **Netlify / Cloudflare Pages / GitHub Pages**: publish the `landing-v3` folder as the
  site root.

If deployed on the same Vercel project as the main site, the page is reachable at
`/landing-v3/` and the lead form posts to the existing `/api/send-email` function. If
deployed standalone (without the API), the calendar still unlocks — the lead capture call
is non-blocking.

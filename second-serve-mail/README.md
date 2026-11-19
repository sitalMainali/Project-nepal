# Second Serve Mail website

Marketing site for **Second Serve Mail**, which provides email and SMS retention for Brisbane restaurants and bars. Every section pushes toward one action: **book a free guest-list audit**.

Built with Next.js 15 (App Router), TypeScript, Tailwind CSS, React Hook Form + Zod, Resend, MDX, Vitest and Playwright. Deploy-ready for Vercel.

> **Edit the words, not the code.** All copy, prices, guarantee terms, testimonials, FAQs and sample campaigns live in **`src/content.ts`**. Anything still to fill in is shown on the site in yellow `[LIKE THIS]`. See **[TODO.md](./TODO.md)** for the full list.

---

## Quick start

```bash
cd second-serve-mail
npm install
cp .env.example .env.local   # optional for local dev: everything works without it
npm run dev                  # http://localhost:3000
```

With no env vars set:

- form submissions are validated, then saved to `.data/leads.jsonl` and logged; emails are logged, not sent
- Turnstile is skipped
- the cookie banner is hidden because no analytics is configured
- the booking embed shows a "coming soon" panel

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Local dev server |
| `npm run build` / `npm start` | Production build / serve |
| `npm run typecheck` | TypeScript check |
| `npm test` | Vitest unit tests: calculator formulas, validation, lead schemas, email builders, rate limit |
| `npm run test:e2e` | Playwright smoke tests (desktop + mobile): builds, starts the server, then checks pages load, calculator maths, every form submits, links resolve, accordion/tabs, 404, mobile layout |

Playwright uses the Chromium installed with `@playwright/test`. On a fresh machine, run `npx playwright install chromium` once.

## Project structure

```
src/
  content.ts                 ← ALL site copy, prices, FAQs, testimonials (edit this)
  app/
    page.tsx                 Homepage (15 sections, in brief order)
    book/ reviews/ privacy/ terms/ spam-act-compliance/ thank-you/
    resources/               MDX articles (each page.mdx) + index
    api/leads/route.ts       One endpoint for all forms (validate → rate limit → Turnstile → store → email)
    sitemap.ts robots.ts opengraph-image.tsx icon.svg not-found.tsx
  components/
    sections/                Homepage sections (Hero, Calculator, Comparison, …)
    forms/                   AuditForm, HealthCheckForm, CalculatorEmailForm, TestimonialForm, Turnstile
    layout/                  Nav, Footer, MobileCtaBar, CookieBanner (+ analytics loader), HealthCheckPrompt
    ui/                      Logo, buttons, icons, CountUp, placeholder highlighter <T>
  lib/
    calculator.ts            Pure calculator maths (unit tested)
    schemas.ts               Zod schemas shared by client and server
    server/                  leads.ts (Resend + Google Sheets), rate-limit.ts, turnstile.ts
    analytics.ts jsonld.ts consent.ts booking.ts
tests/                       Vitest
e2e/                         Playwright
docs/google-sheets-apps-script.js
```

## How the lead pipeline works

Every form (audit, health check, calculator breakdown, testimonial) posts to `POST /api/leads`, which:

1. **Rate limits** by IP (default 5 per 10 minutes, `RATE_LIMIT_MAX`).
2. **Honeypot**: a hidden `company_website` field. If a bot fills it, the API returns a fake success and nothing is stored.
3. **Validates** with the same Zod schema the browser uses (`src/lib/schemas.ts`). Consent is required on every form, and testimonials also need publishing permission.
4. **Verifies Cloudflare Turnstile** when `TURNSTILE_SECRET_KEY` is set.
5. **Stores** the lead in your Google Sheet (`SHEETS_WEBHOOK_URL`). Locally it uses `.data/leads.jsonl` instead. Every lead is also written to the server log, so nothing is silently lost.
6. **Emails you** (`LEAD_NOTIFY_EMAIL`) via Resend, with reply-to set to the visitor.
7. **Auto-replies** to the visitor. Calculator requests get the full breakdown, recomputed on the server from the submitted inputs.

If both storage and the notification email fail, the visitor sees an error and can try again.

Testimonials are **never auto-published**. They arrive in your Sheet and inbox. Once you've confirmed the wording, add them to `testimonials` in `content.ts` yourself.

## Deploy to Vercel

1. Push this repository to GitHub.
2. In Vercel: **Add New → Project**, import the repo, and set **Root Directory** to `second-serve-mail`. Framework is detected as Next.js automatically.
3. Add the environment variables from `.env.example` (Project → Settings → Environment Variables):
   - **Resend:** create an account, verify your sending domain (add the DNS records it gives you), create an API key, then set `RESEND_API_KEY`, `EMAIL_FROM` (e.g. `Second Serve Mail <hello@yourdomain.com.au>`) and `LEAD_NOTIFY_EMAIL`.
   - **Google Sheet:** follow the steps at the top of `docs/google-sheets-apps-script.js`, then set `SHEETS_WEBHOOK_URL` and `SHEETS_WEBHOOK_SECRET`.
   - **Turnstile:** Cloudflare dashboard → Turnstile → Add site (add your domain, plus `localhost` if you want it in dev). Set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY`.
   - **Booking:** `NEXT_PUBLIC_BOOKING_URL` = your Cal.com or Calendly event link.
   - **Analytics:** `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` and/or `NEXT_PUBLIC_GA4_ID`. Scripts load only after the visitor accepts the cookie banner.
   - `NEXT_PUBLIC_SITE_URL` = your final domain.
4. Deploy, then add your custom domain under Project → Domains.
5. Submit one test of each form and check the Sheet row, your notification and the auto-reply.

## Editing content

- **Copy, prices, FAQs:** `src/content.ts`. Save, and the site updates.
- **Testimonials and case studies:** add objects to `testimonials` / `caseStudies` in `content.ts`. Sections with no entries show the honest "Early results coming soon" state instead.
- **Articles:** `src/app/resources/<slug>/page.mdx`. To add one, create a new folder with a `page.mdx` (copy an existing one), then add it to `resources` in `content.ts` so it appears on the index and in the sitemap.
- **Colours and fonts:** `tailwind.config.ts` and `src/app/layout.tsx`.

## Quality checks (last run)

- **Vitest:** 29 tests passing (calculator formulas, validation, schemas, email builders, rate limit)
- **Playwright:** 23 smoke tests passing on desktop Chrome and Pixel 7
- **Lighthouse (mobile, local production build):** Performance 96–98, Accessibility 100, Best Practices 100, SEO 100
- **axe-core (WCAG 2.2 AA tags):** 0 violations across all pages, desktop and mobile

## Notes and limits

- The rate limiter is in-memory, so on Vercel it applies per serverless instance. Turnstile and the honeypot are the main bot defence. For a strict global limit, swap in Upstash Redis (`@upstash/ratelimit`) in `src/lib/server/rate-limit.ts`.
- The exit-intent / timed health-check prompt shows at most once per browser session. It never appears after a form submission, on `/book`, `/thank-you` or the legal pages, or for automated browsers. Add `?healthcheck=1` to any URL to preview it.
- The legal pages are sensible starting drafts for an Australian sole trader. They are not legal advice.

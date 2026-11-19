# TODO before launch

Placeholders appear on the site highlighted in **yellow**, so you can spot any you've missed by scrolling through each page. Almost all of them live in **`src/content.ts`**. Search that file for `[` to find them.

## 1. Business details (`src/content.ts` → `site`)

- [ ] `[YOUR EMAIL]`: public contact email (footer, privacy, compliance pages)
- [ ] `[PHONE]`: public phone number
- [ ] `[ABN]`: shown in the footer, privacy and terms
- [ ] `[FOUNDER NAME]`: used in `site.founderName`, the About heading, photo alt text and the email sign-off (`emails.signoff`)
- [ ] `[INSTAGRAM URL]`, `[LINKEDIN URL]`, `[FACEBOOK URL]`: set `href` in `site.social` (links with an empty `href` stay hidden)
- [ ] `[BOOKING LINK]`: your Cal.com or Calendly URL, set in `site.bookingUrl` **or** the `NEXT_PUBLIC_BOOKING_URL` env var
- [ ] Production domain: `NEXT_PUBLIC_SITE_URL` (defaults to `https://www.secondservemail.com.au`)

## 2. Pricing and guarantee (`pricing`, `guarantee`, `calculatorContent`)

- [ ] `[YOUR PRICE]`: monthly price per venue (pricing card, FAQ, terms, calculator hint)
- [ ] `calculatorContent.defaultMonthlyFee`: set to the same number (e.g. `990`) so the calculator shows return on fee and payback by default
- [ ] `[SETUP FEE or "included"]`
- [ ] `[DETAILS]`: software and sending costs (who pays, roughly how much)
- [ ] `[MULTI-VENUE PRICING DETAILS]`: pricing card and FAQ
- [ ] **Approve the guarantee wording.** It is a draft: "Month-to-month. No lock-in. Cancel with 30 days' notice. Your first welcome and win-back flows go live within `[X]` days of onboarding, or `[REMEDY]`."
  - [ ] `[X]`: number of days (also in `howItWorks.steps[1].when` → "Weeks 1–[X]", and the FAQ "How long until we see results?")
  - [ ] `[REMEDY]`: what happens if you miss it (e.g. "your next month is free")
- [ ] Check `cta.riskReversal` ("Free 20-minute call. No obligation, no lock-in contract, no hard sell.") matches how you run calls

## 3. Social proof (`reviewsContent`, `testimonials`, `caseStudies`)

- [ ] `[FOUNDING CLIENT OFFER – owner to define]`
- [ ] When you have **real** testimonials with written permission, add them to `testimonials` (and optionally `caseStudies`). The "Early results coming soon" block disappears automatically. Never invent or edit reviews (Australian Consumer Law).

## 4. Content

- [ ] `[FOUNDER STORY – owner to write]` and the second paragraph in `about.story`
- [ ] Founder photo: add an image to `/public` (e.g. `/public/founder.jpg`) and set `about.photo: "/founder.jpg"` (removes `[FOUNDER PHOTO]`)
- [ ] `[ADD TOOLS]`: the tools you work with (`integrations.tools`, one string per tool). Also used in the FAQ and privacy policy.
- [ ] `[STATISTIC ON FIRST-TIME GUEST RETURN RATE, OPTIONAL]` in `problems.items[0]`: delete it, or replace it with a real statistic **and** put the source in `source`
- [ ] `[MONTH]` in the win-back sample email footer (`samples.email[1].footer`)
- [ ] Review all FAQ answers (`faqs`) and sample campaigns (`samples`)

## 5. Legal (`legal`)

- [ ] `[LEGAL BUSINESS NAME]`
- [ ] `[DATE]`: "last updated" date on privacy, terms and compliance pages
- [ ] `[RETENTION PERIOD, e.g. 24 months]`
- [ ] `[Cal.com or Calendly]`: whichever you use
- [ ] `[Plausible and/or Google Analytics]`: whichever you enable
- [ ] `[PAYMENT TERMS, …]`
- [ ] `[LIABILITY CAP WORDING – have reviewed by a lawyer]`
- [ ] Have the privacy policy, terms and Spam Act page reviewed by a lawyer. They are sensible drafts, not legal advice.

## 6. Resource articles (`src/app/resources/*/page.mdx`)

These are starter outlines. Expand them in your own words before promoting them.

- [ ] `welcome-email-for-restaurants`: `[STATISTIC ON WELCOME EMAIL OPEN RATES, ONLY WITH A CITED SOURCE]` (delete it or cite a source)
- [ ] `win-back-timing`: `[ADD YOUR OWN DATA OR A CITED BENCHMARK]`
- [ ] `sms-consent-basics`: review and expand
- [ ] Remove the "This is a starter outline…" line from each once finished

## 7. Services and environment (see README → Deploy)

- [ ] Resend: verify your domain, then set `RESEND_API_KEY`, `EMAIL_FROM` and `LEAD_NOTIFY_EMAIL`
- [ ] Google Sheet: deploy `docs/google-sheets-apps-script.js`, then set `SHEETS_WEBHOOK_URL` and `SHEETS_WEBHOOK_SECRET`
- [ ] Cloudflare Turnstile: set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY`
- [ ] Analytics: set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` and/or `NEXT_PUBLIC_GA4_ID`. In Plausible, add these custom-event goals: `calculator_used`, `calculator_reset`, `calculator_email_submitted`, `audit_form_submitted`, `health_check_submitted`, `testimonial_submitted`, `booking_click`, `cta_click`
- [ ] Submit `https://<your-domain>/sitemap.xml` to Google Search Console
- [ ] Create a Google Business Profile for local search, then add its link to `site.social`
- [ ] Send one test submission of each form in production and confirm: row in the Sheet, notification email, auto-reply

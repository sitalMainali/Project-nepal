/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SECOND SERVE MAIL: ALL SITE CONTENT
 * ─────────────────────────────────────────────────────────────────────────────
 *  Edit copy, prices, guarantee terms, testimonials and FAQs here.
 *  You should not need to touch any component to change what the site says.
 *
 *  Anything in [SQUARE BRACKETS] is a placeholder. It is shown on the site in
 *  a highlighted style so you can spot it. Search this file for "[" to find
 *  them all, or read TODO.md.
 *
 *  Rules for this file (Australian Consumer Law):
 *   - Never add a testimonial, review, rating, logo or statistic that is not
 *     real and that you do not have permission to publish.
 *   - Do not promise revenue or sales outcomes.
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ── Brand and contact ───────────────────────────────────────────────────────
export const site = {
  name: "Second Serve Mail",
  shortName: "Second Serve",
  tagline: "Email & SMS retention for Brisbane restaurants.",
  /** Production URL, used for SEO, sitemap and Open Graph. No trailing slash. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.secondservemail.com.au",
  description:
    "Done-for-you email and SMS marketing for Brisbane restaurants and bars. Welcome flows, win-backs, birthdays and booking reminders that bring guests back. Book a free guest-list audit.",
  keywords: [
    "Brisbane restaurant email marketing",
    "SMS marketing for restaurants",
    "restaurant email marketing Brisbane",
    "bar SMS marketing Queensland",
    "restaurant retention marketing",
    "win-back campaigns restaurants",
  ],
  locality: "Brisbane",
  region: "Queensland",
  regionCode: "QLD",
  country: "AU",
  email: "[YOUR EMAIL]",
  phone: "[PHONE]",
  abn: "[ABN]",
  founderName: "[FOUNDER NAME]",
  /** Leave href empty ("") to hide a social link. */
  social: [
    { label: "Instagram", href: "" /* [INSTAGRAM URL] */ },
    { label: "LinkedIn", href: "" /* [LINKEDIN URL] */ },
    { label: "Facebook", href: "" /* [FACEBOOK URL] */ },
  ],
  /**
   * Cal.com or Calendly booking link, e.g. https://cal.com/your-name/audit
   * or https://calendly.com/your-name/audit. NEXT_PUBLIC_BOOKING_URL overrides it.
   */
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL ?? "[BOOKING LINK]",
};

// ── Shared calls to action ──────────────────────────────────────────────────
export const cta = {
  primary: "Book a free audit",
  secondary: "Try the revenue calculator",
  /** Shown near every main call to action. */
  riskReversal:
    "Free 20-minute call. No obligation, no lock-in contract, no hard sell.",
  mobileBar: "Book a free audit",
};

// ── Navigation ──────────────────────────────────────────────────────────────
export const nav = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "Calculator", href: "/#calculator" },
  { label: "Compare", href: "/#compare" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
];

// ── Hero ────────────────────────────────────────────────────────────────────
export const hero = {
  eyebrow: "Email & SMS for Brisbane restaurants and bars",
  headline: "Give every guest a reason to come back.",
  subhead:
    "Second Serve Mail writes, builds and sends the welcome, win-back, birthday and booking messages that turn a first visit into a regular. Done for you, in your venue's voice, with consent handled properly.",
  preview: {
    label: "Sample messages for a fictional venue",
    sms: {
      from: "Fig & Ember",
      body: "Hi Sam, it's been a while! Your table by the window misses you. Here's a complimentary dessert with any main this month. Book: fig.ember/book  Reply STOP to opt out",
    },
    email: {
      from: "Fig & Ember",
      subject: "Happy birthday, Sam. Dinner's on us (well, dessert is)",
      preview: "A small something for your birthday month, plus our new winter menu.",
    },
  },
};

// ── Problem strip ───────────────────────────────────────────────────────────
// Do not add statistics unless you can cite a real source. Put the source in
// `source` and it will be shown under the line.
export const problems = {
  heading: "Most guests don't stop loving you. They just stop hearing from you.",
  items: [
    {
      title: "One great night, then silence",
      body: "Guests leave happy, but nothing reminds them to book again. [STATISTIC ON FIRST-TIME GUEST RETURN RATE, OPTIONAL]",
      source: "",
    },
    {
      title: "The list sits there unused",
      body: "Booking systems and Wi-Fi logins collect thousands of contacts that rarely get a single message.",
      source: "",
    },
    {
      title: "Nobody has the time",
      body: "Between rosters, suppliers and service, writing campaigns is always the job that slips to next week.",
      source: "",
    },
  ],
};

// ── What we do ──────────────────────────────────────────────────────────────
export const services = {
  heading: "What we do",
  intro:
    "A small set of automated messages and a monthly campaign, built around how your guests actually book and dine.",
  items: [
    {
      title: "Welcome flow",
      body: "A warm hello after a guest's first booking or sign-up, introducing your venue, your people and the dishes worth coming back for.",
    },
    {
      title: "Win-back campaigns",
      body: "Friendly nudges to guests who haven't visited in a while, timed to your venue's rhythm rather than a generic template.",
    },
    {
      title: "Birthdays and milestones",
      body: "Birthday, anniversary and 'first visit a year ago' messages that give guests a reason to celebrate with you.",
    },
    {
      title: "Booking reminders",
      body: "Clear SMS and email reminders that help guests keep their booking, with an easy way to change it.",
    },
    {
      title: "Monthly reports",
      body: "A one-page, plain-English summary each month: what we sent, who opened and clicked, bookings we can trace, and what we'll try next.",
    },
  ],
};

// ── How it works ────────────────────────────────────────────────────────────
export const howItWorks = {
  heading: "How it works",
  intro: "Four steps, with you approving everything before it goes out.",
  steps: [
    {
      title: "Audit",
      when: "Week 1",
      body: "A free call to look at your guest list, your tools and what you send now. You get an honest view of what's worth doing, even if you don't hire us.",
    },
    {
      title: "Build",
      when: "Weeks 1–[X]",
      body: "We clean your list, check consent and write your welcome and win-back flows in your venue's voice. You approve every message.",
    },
    {
      title: "Send",
      when: "Ongoing",
      body: "Flows run automatically, plus a monthly campaign planned around your menu, events and quiet nights.",
    },
    {
      title: "Report",
      when: "Monthly",
      body: "A short plain-English report and a quick check-in on what to change next month.",
    },
  ],
};

// ── Revenue calculator ──────────────────────────────────────────────────────
export const calculatorContent = {
  heading: "What could a win-back program be worth?",
  intro:
    "Put in your own numbers. Defaults are deliberately conservative. Everything stays in your browser unless you ask us to email it to you.",
  disclaimer:
    "This is an estimate based on the assumptions you entered. It is not a guarantee of results.",
  /**
   * Monthly fee per venue used by the calculator. Set to your real price once
   * decided (e.g. 990). 0 means "not set": visitors can type their own.
   */
  defaultMonthlyFee: 0,
  feeHint: "Our fee per venue: [YOUR PRICE]",
};

// ── Us vs them comparison ───────────────────────────────────────────────────
export type CompareStatus = "yes" | "no" | "partly";
export type CompareCell = { status: CompareStatus; note?: string };
export const comparison = {
  heading: "How we compare",
  intro:
    "A general, honest comparison. Every venue and every agency is different, so treat this as a guide rather than a verdict.",
  columns: ["Second Serve Mail", "Doing it yourself", "Typical big agency"] as const,
  rows: [
    {
      label: "Built only for restaurants and bars",
      cells: [
        { status: "yes" },
        { status: "partly", note: "You know your venue; most tools are generic" },
        { status: "partly", note: "Often serve many industries" },
      ],
    },
    {
      label: "Email and SMS together",
      cells: [
        { status: "yes" },
        { status: "partly", note: "Possible, often two separate tools" },
        { status: "partly", note: "Sometimes, can be separate teams" },
      ],
    },
    {
      label: "Done for you",
      cells: [
        { status: "yes" },
        { status: "no", note: "You or your team do the work" },
        { status: "yes" },
      ],
    },
    {
      label: "Written in your venue's voice",
      cells: [
        { status: "yes" },
        { status: "yes", note: "It's your voice" },
        { status: "partly", note: "Can lean on templates" },
      ],
    },
    {
      label: "Consent and unsubscribes handled",
      cells: [
        { status: "yes" },
        { status: "partly", note: "Your responsibility to set up" },
        { status: "yes" },
      ],
    },
    {
      label: "Monthly plain-English report",
      cells: [
        { status: "yes" },
        { status: "partly", note: "If you find the time" },
        { status: "partly", note: "Often dashboards or long decks" },
      ],
    },
    {
      label: "Month-to-month, no lock-in",
      cells: [
        { status: "yes" },
        { status: "yes", note: "Software plans vary" },
        { status: "partly", note: "Fixed terms are common" },
      ],
    },
    {
      label: "Transparent pricing",
      cells: [
        { status: "yes" },
        { status: "yes", note: "Software costs only" },
        { status: "partly", note: "Often quote-based" },
      ],
    },
    {
      label: "Direct contact with the person doing the work",
      cells: [
        { status: "yes" },
        { status: "yes", note: "It's you" },
        { status: "partly", note: "Usually via an account manager" },
      ],
    },
  ] satisfies { label: string; cells: CompareCell[] }[],
};

// ── What we do better ───────────────────────────────────────────────────────
export const benefits = {
  heading: "Why venues work with us",
  items: [
    {
      title: "Hospitality only",
      body: "Every flow is designed around bookings, covers, service times and the way guests actually choose where to eat.",
    },
    {
      title: "One person, start to finish",
      body: "You deal directly with the person writing and sending your messages. No hand-offs, no account-manager telephone.",
    },
    {
      title: "Your voice, not a template",
      body: "We learn how your venue talks: the menu, the staff, the regulars. Messages read like they came from you, because you approve them.",
    },
    {
      title: "Consent done properly",
      body: "Every send is consent-based with a working unsubscribe. We tidy your list and keep records so you're not left guessing.",
    },
    {
      title: "Built around quiet nights",
      body: "Campaigns are planned to fill the gaps in your week, not to discount the nights you'd sell out anyway.",
    },
    {
      title: "Reports you can read in two minutes",
      body: "Plain English, one page, with what worked, what didn't and what we'll change next.",
    },
  ],
};

// ── Sample campaigns gallery ────────────────────────────────────────────────
// Fictional venue. Clearly labelled as samples on the site.
export const samples = {
  heading: "Sample campaigns",
  intro:
    "Examples written for Fig & Ember, a fictional Brisbane bistro. Your messages are written from scratch for your venue.",
  venue: "Fig & Ember (fictional venue)",
  email: [
    {
      name: "Welcome",
      subject: "Welcome to Fig & Ember, Sam",
      preheader: "Thanks for dining with us. Here's what to try next time.",
      body: [
        "Hi Sam,",
        "Thanks for joining us on Friday. We hope the woodfired lamb lived up to the hype.",
        "Next time, ask for a seat at the kitchen bar. Chef Mia usually has something off-menu on the go, and the view of the pass is the best in the house.",
        "We'd love to see you again soon.",
      ],
      button: "Book your next table",
      footer: "You're receiving this because you booked with us and opted in to updates. Unsubscribe anytime.",
    },
    {
      name: "Win-back",
      subject: "We've missed you at Fig & Ember",
      preheader: "A lot has changed on the menu since your last visit.",
      body: [
        "Hi Sam,",
        "It's been a few months since we last saw you, and the menu has moved on: spring asparagus, a new burnt honey tart and a short list of Queensland wines we're very proud of.",
        "If you book a table for two before the end of the month, the first glass is on us.",
      ],
      button: "See the new menu",
      footer: "Offer valid for bookings made by 30 [MONTH]. Unsubscribe anytime.",
    },
    {
      name: "Birthday",
      subject: "Happy birthday month, Sam",
      preheader: "Dessert's on us when you celebrate here.",
      body: [
        "Hi Sam,",
        "Happy birthday from all of us at Fig & Ember.",
        "Celebrate with us any time this month and we'll bring out a complimentary dessert, candle optional.",
      ],
      button: "Book a birthday table",
      footer: "One dessert per table, valid during your birthday month. Unsubscribe anytime.",
    },
  ],
  sms: [
    {
      name: "Booking reminder",
      body: "Hi Sam, see you tomorrow at 7pm at Fig & Ember, table for 4. Need to change? fig.ember/b/7Q2 Reply STOP to opt out",
    },
    {
      name: "Win-back",
      body: "Fig & Ember: Sam, it's been a while! New spring menu is on. Book this week and your first glass is on us: fig.ember/back Reply STOP to opt out",
    },
    {
      name: "Quiet-night campaign",
      body: "Fig & Ember: Tuesday Pasta Club is back. 2 bowls + a bottle of house red, $69. Book: fig.ember/tue Reply STOP to opt out",
    },
  ],
};

// ── Testimonials, reviews and case studies ──────────────────────────────────
// IMPORTANT: Only add REAL testimonials from REAL clients who have given you
// written permission to publish. Fake reviews are illegal under the Australian
// Consumer Law. While these arrays are empty, the site automatically shows an
// "Early results coming soon" state instead.
export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  venue: string;
  /** 1 to 5, only if the client gave a rating. */
  rating?: number;
  /** Path in /public, e.g. "/testimonials/jane.jpg". Optional. */
  photo?: string;
  /** Link to the original public review, e.g. a Google review. Optional. */
  sourceUrl?: string;
};
export type CaseStudy = {
  venue: string;
  summary: string;
  period: string;
  metrics: { label: string; before: string; after: string }[];
};

export const testimonials: Testimonial[] = [
  // Example shape (do not uncomment unless real):
  // {
  //   quote: "…",
  //   name: "…",
  //   role: "Owner",
  //   venue: "…",
  //   rating: 5,
  //   sourceUrl: "https://g.page/…",
  // },
];

export const caseStudies: CaseStudy[] = [];

export const reviewsContent = {
  heading: "What clients say",
  emptyHeading: "Early results coming soon",
  emptyBody:
    "Second Serve Mail is a new Brisbane agency, so we don't have published client reviews yet. We won't fake them. Instead, we're offering a small number of founding-client places.",
  foundingOffer: "[FOUNDING CLIENT OFFER – owner to define]",
  submitHeading: "Worked with us? Share your experience",
  submitIntro:
    "Your words help other venue owners decide. We only publish testimonials with your permission, and we never edit the meaning of what you write.",
};

// ── Pricing and guarantee ───────────────────────────────────────────────────
export const pricing = {
  heading: "Our offer",
  planName: "Retention program",
  price: "[YOUR PRICE]",
  priceUnit: "per venue, per month",
  setup: "Setup: [SETUP FEE or \"included\"]",
  softwareCosts: "Software and sending costs: [DETAILS]",
  includes: [
    "Welcome, win-back, birthday and booking-reminder flows",
    "Monthly campaign calendar, written and sent for you",
    "List cleaning and de-duplication",
    "Consent and unsubscribe management",
    "Monthly plain-English report and check-in",
    "Direct access to the person doing the work",
  ],
  multiVenue: "Running more than one venue? [MULTI-VENUE PRICING DETAILS]",
};

export const guarantee = {
  heading: "Our guarantee",
  // DRAFT: approve or edit before launch. Never promise revenue or sales.
  points: [
    "Month-to-month. No lock-in.",
    "Cancel with 30 days' notice.",
    "Your first welcome and win-back flows go live within [X] days of onboarding, or [REMEDY].",
  ],
  note: "We don't promise revenue or sales figures, because nobody honestly can. We do promise the work, on time, done properly.",
};

// ── FAQ ─────────────────────────────────────────────────────────────────────
export const faqs: { q: string; a: string }[] = [
  {
    q: "Who is this for?",
    a: "Independent restaurants, bars and small hospitality groups in Brisbane and South East Queensland that already have a guest list (from bookings, Wi-Fi, loyalty or a POS) and want it to bring people back. It suits venues where a repeat visit is worth a meaningful amount.",
  },
  {
    q: "Which tools do you use?",
    a: "We work with the tools you already have where we can, and recommend simple ones where you don't. Current tools: [ADD TOOLS]. We'll talk through the costs of any software before you sign up for it.",
  },
  {
    q: "Do guests have to opt in?",
    a: "Yes. Every message we send is consent-based. Guests must have opted in (or have an existing relationship that meets the Spam Act's inferred-consent rules), and every message clearly identifies your venue and includes a working unsubscribe.",
  },
  {
    q: "Is this compliant with the Spam Act?",
    a: "We design every flow to meet the Spam Act 2003: consent, clear sender identification and a functional unsubscribe that's honoured within five working days (we process them automatically, usually immediately). We also keep consent records. See our Spam Act and consent policy for details. This isn't legal advice, and you remain responsible for how your guest data was collected.",
  },
  {
    q: "How long until we see results?",
    a: "Your first flows go live within [X] days of onboarding. Opens and clicks show up straight away; bookings take longer to measure and depend on your list, your offer and the season. We won't promise a number, but we'll show you exactly what happened each month.",
  },
  {
    q: "What do I need to provide?",
    a: "Access to your guest list or booking system, your logo and a few photos, menu details, and around 30 minutes a month to approve messages and talk through the report. We handle everything else.",
  },
  {
    q: "Who owns the guest list?",
    a: "You do, always. Your list stays in your accounts. If you stop working with us, you keep everything: the list, the flows and the templates.",
  },
  {
    q: "How do you write in our brand voice?",
    a: "We start with your menu, your socials, your reviews and a short chat with you or your team about how you talk to guests. You approve every message before it goes out, and we adjust until it sounds like you.",
  },
  {
    q: "What does it cost and are there contracts?",
    a: "[YOUR PRICE] per venue per month. Setup: [SETUP FEE or \"included\"]. It's month-to-month with no lock-in contract; cancel with 30 days' notice. Software and sending costs: [DETAILS].",
  },
  {
    q: "What if we already use Mailchimp or similar?",
    a: "Great. If your current tool does the job, we'll usually keep it and build inside your account. If it's holding you back, we'll explain why and you decide.",
  },
  {
    q: "Can you handle multiple venues?",
    a: "Yes. Each venue gets its own voice, flows and reporting, and we can segment a shared list by venue. [MULTI-VENUE PRICING DETAILS]",
  },
  {
    q: "How do you report results?",
    a: "A one-page monthly report in plain English: messages sent, opens, clicks, unsubscribes, bookings or redemptions we can trace, and what we'll change next month. Plus a short call if you want one.",
  },
];

// ── About / founder ─────────────────────────────────────────────────────────
export const about = {
  heading: "Hi, I'm [FOUNDER NAME]",
  /** Path in /public, e.g. "/founder.jpg". Leave empty for a text-only block. */
  photo: "",
  photoAlt: "[FOUNDER NAME], founder of Second Serve Mail",
  story: [
    "[FOUNDER STORY – owner to write]",
    "[A second paragraph: why restaurants and bars, why Brisbane, and how you work with venues.]",
  ],
};

// ── Free guest-list health check (lead magnet) ──────────────────────────────
export const healthCheck = {
  heading: "Free guest-list health check",
  body: "Tell us three things about your list and we'll send back a short, honest assessment: what's working, what's at risk and the quickest win.",
  promptHeading: "Is your guest list working for you?",
  promptBody: "Get a free guest-list health check. Three questions, under a minute.",
  listSizes: ["Under 1,000", "1,000–5,000", "5,000–20,000", "20,000+", "Not sure"],
  lastSendOptions: [
    "In the last month",
    "1–3 months ago",
    "3–12 months ago",
    "Over a year ago",
    "Never",
    "Not sure",
  ],
};

// ── Integrations strip (text only) ──────────────────────────────────────────
export const integrations = {
  heading: "Tools we work with",
  /** Replace with the real tools you support. Text only, no logos. */
  tools: ["[ADD TOOLS]"],
};

// ── Contact section ─────────────────────────────────────────────────────────
export const contact = {
  heading: "Book your free guest-list audit",
  body: "Pick a time below, or send a few details and we'll be in touch within one business day.",
  formHeading: "Prefer to send a message?",
  bookingHeading: "Pick a time",
};

// ── Email copy (auto-replies) ───────────────────────────────────────────────
export const emails = {
  signoff: "Cheers,\n[FOUNDER NAME]\nSecond Serve Mail · Brisbane",
  auditReply: {
    subject: "Thanks, we've got your audit request",
    intro:
      "Thanks for getting in touch about a free guest-list audit. We'll reply within one business day to find a time. If you'd rather book straight away, use the link below.",
  },
  healthCheckReply: {
    subject: "Your guest-list health check is on its way",
    intro:
      "Thanks for the details. We'll review them and send your health check within two business days.",
  },
  calculatorReply: {
    subject: "Your Second Serve revenue estimate",
    intro: "Here's the breakdown you asked for, based on the numbers you entered.",
  },
  testimonialReply: {
    subject: "Thank you for your testimonial",
    intro:
      "Thank you for taking the time to share your experience. We'll check it with you before anything is published.",
  },
};

// ── Resources (MDX articles live in src/app/resources/<slug>/page.mdx) ──────
export const resources = [
  {
    slug: "welcome-email-for-restaurants",
    title: "How to write a welcome email for your restaurant",
    description:
      "What to say after a guest's first booking, when to send it, and the mistakes that make welcome emails feel like spam.",
  },
  {
    slug: "win-back-timing",
    title: "Win-back timing: when to message lapsed guests",
    description:
      "How to work out when a guest has 'lapsed' for your venue, and how to space win-back messages without wearing out your list.",
  },
  {
    slug: "sms-consent-basics",
    title: "SMS consent basics for Australian venues",
    description:
      "A plain-English look at consent, sender identification and unsubscribes under the Spam Act 2003.",
  },
];

// ── Legal pages ─────────────────────────────────────────────────────────────
export const legal = {
  lastUpdated: "[DATE]",
  businessName: "[LEGAL BUSINESS NAME]",
  /** How long enquiry data is kept if someone doesn't become a client. */
  retentionPeriod: "[RETENTION PERIOD, e.g. 24 months]",
  bookingProvider: "[Cal.com or Calendly]",
  analyticsProvider: "[Plausible and/or Google Analytics]",
  paymentTerms: "[PAYMENT TERMS, e.g. invoiced monthly in advance, payable within 7 days]",
  liabilityCap: "[LIABILITY CAP WORDING – have reviewed by a lawyer]",
};

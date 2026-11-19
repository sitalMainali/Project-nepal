import { expect, test, type Page } from "@playwright/test";

function watchErrors(page: Page) {
  const errors: string[] = [];
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  page.on("pageerror", (e) => errors.push(e.message));
  return errors;
}

test.describe("homepage", () => {
  test("loads with headline, all sections and no console errors", async ({ page }) => {
    const errors = watchErrors(page);
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Give every guest a reason to come back.");
    for (const id of ["how-it-works", "calculator", "compare", "samples", "reviews", "pricing", "faq", "about", "health-check", "contact"]) {
      await expect(page.locator(`#${id}`)).toHaveCount(1);
    }
    // No real testimonials yet, so the honest empty state shows.
    await expect(page.getByTestId("early-results")).toBeVisible();
    // JSON-LD present
    const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(ld.join(" ")).toContain("FAQPage");
    expect(ld.join(" ")).toContain("ProfessionalService");
    await page.waitForLoadState("networkidle");
    expect(errors).toEqual([]);
  });

  test("calculator updates live, validates and resets", async ({ page }) => {
    await page.goto("/#calculator");
    const revenue = page.getByTestId("out-revenue");
    await expect(revenue).toHaveText("$8,640");
    await expect(page.getByTestId("out-lapsed")).toHaveText("1,800");
    await expect(page.getByTestId("out-wonback")).toHaveText("36");
    await expect(page.getByTestId("calc-disclaimer")).toContainText("It is not a guarantee of results.");

    const guests = page.getByTestId("calc-guests");
    await guests.fill("5000");
    // 5000 × 60% × 2% × 2 visits × $120 = $14,400
    await expect(revenue).toHaveText("$14,400");

    // Out of range shows an error and clamps.
    await page.getByTestId("calc-winBackRatePct").fill("20");
    await expect(page.locator("#calc-winBackRatePct-error")).toBeVisible();
    await page.getByTestId("calc-winBackRatePct").blur();
    await expect(page.getByTestId("calc-winBackRatePct")).toHaveValue("8");

    // Fee enables return on fee and payback.
    await page.getByRole("button", { name: "Reset to defaults" }).click();
    await expect(revenue).toHaveText("$8,640");
    await page.getByTestId("calc-monthlyFee").fill("360");
    await expect(page.getByTestId("out-roi")).toHaveText("2.0×");
    await expect(page.getByTestId("out-payback")).toHaveText("6.0 months");

    // Margin shows profit.
    await page.getByTestId("calc-marginPct").fill("50");
    await expect(page.getByTestId("out-profit")).toHaveText("$4,320");
  });

  test("calculator 'email me this breakdown' submits", async ({ page }) => {
    await page.goto("/#calculator");
    await page.getByRole("button", { name: "Email me this breakdown" }).click();
    const form = page.getByRole("form", { name: "Email me this breakdown" });
    await form.getByRole("button", { name: "Email me this breakdown" }).click();
    await expect(form.getByText("Please enter your name.")).toBeVisible();
    await form.getByLabel("Your name").fill("Test Owner");
    await form.getByLabel("Email").fill("owner@example.com");
    await form.getByLabel("Venue name").fill("Test Bistro");
    await form.getByRole("checkbox").check();
    await form.getByRole("button", { name: "Email me this breakdown" }).click();
    await expect(page.getByTestId("form-success")).toContainText("Check your inbox");
  });

  test("FAQ accordion and sample tabs work", async ({ page }) => {
    await page.goto("/");
    const q = page.getByRole("button", { name: "Who owns the guest list?" });
    await expect(q).toHaveAttribute("aria-expanded", "false");
    await q.click();
    await expect(q).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByText("You do, always.")).toBeVisible();

    const smsTab = page.getByRole("tab", { name: "SMS examples" });
    await smsTab.click();
    await expect(smsTab).toHaveAttribute("aria-selected", "true");
    await expect(page.locator("#panel-sms")).toBeVisible();
    await page.keyboard.press("ArrowLeft");
    await expect(page.getByRole("tab", { name: "Email examples" })).toHaveAttribute("aria-selected", "true");
  });

  test("audit form validates, submits and lands on thank-you", async ({ page }) => {
    await page.goto("/#contact");
    const form = page.getByRole("form", { name: "Free audit request" });
    await form.getByRole("button", { name: "Request my free audit" }).click();
    await expect(form.getByText("Please enter a valid email address.")).toBeVisible();
    await expect(form.getByText("Please tick the box to agree before sending.")).toBeVisible();

    await form.getByLabel("Your name").fill("Alex Smith");
    await form.getByLabel("Email").fill("alex@example.com");
    await form.getByLabel("Venue name").fill("Example Bar");
    await form.getByLabel(/Anything we should know/).fill("We use a booking system and have about 4,000 guests.");
    await form.getByRole("checkbox").check();
    await form.getByRole("button", { name: "Request my free audit" }).click();
    await expect(page).toHaveURL(/\/thank-you/);
    await expect(page.getByTestId("thank-you-title")).toBeVisible();
  });

  test("health check form submits", async ({ page }) => {
    await page.goto("/#health-check");
    const form = page.getByRole("form", { name: "Free guest-list health check" }).first();
    await form.getByLabel("Your name").fill("Jo Lee");
    await form.getByLabel("Email").fill("jo@example.com");
    await form.getByLabel("Venue name").fill("Jo's Kitchen");
    await form.getByLabel("Roughly how big is your list?").selectOption("1,000–5,000");
    await form.getByLabel("When did you last send?").selectOption("3–12 months ago");
    await form.getByLabel("Which tools hold your guest list?").fill("Booking system and POS");
    await form.getByRole("checkbox").check();
    await form.getByRole("button", { name: "Get my free health check" }).click();
    await expect(page.getByTestId("form-success").first()).toContainText("health check is on its way");
  });
});

test.describe("site", () => {
  test("every page loads and internal links resolve", async ({ page, request }) => {
    const pages = ["/", "/book", "/reviews", "/privacy", "/terms", "/spam-act-compliance", "/thank-you", "/resources", "/resources/welcome-email-for-restaurants", "/resources/win-back-timing", "/resources/sms-consent-basics"];
    const links = new Set<string>();
    for (const p of pages) {
      const res = await page.goto(p);
      expect(res?.status(), p).toBe(200);
      await expect(page.locator("h1").first()).toBeVisible();
      for (const href of await page.locator('a[href^="/"]').evaluateAll((as) => as.map((a) => a.getAttribute("href")!))) links.add(href.split("#")[0] || "/");
    }
    for (const href of links) {
      const res = await request.get(href);
      expect(res.status(), href).toBeLessThan(400);
    }
    for (const p of ["/sitemap.xml", "/robots.txt", "/opengraph-image"]) {
      expect((await request.get(p)).status(), p).toBe(200);
    }
  });

  test("custom 404", async ({ page }) => {
    const res = await page.goto("/no-such-page");
    expect(res?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("not on the floor plan");
  });

  test("testimonial form on /reviews requires permission", async ({ page }) => {
    await page.goto("/reviews");
    const form = page.getByRole("form", { name: "Submit a testimonial" });
    await form.getByLabel("Your name").fill("Sam Chef");
    await form.getByLabel(/Email/).fill("sam@example.com");
    await form.getByLabel("Your role").fill("Owner");
    await form.getByLabel("Venue name").fill("Sam's Place");
    await form.getByLabel("Your testimonial").fill("Working with Second Serve was straightforward and the messages sounded like us.");
    await form.locator("#t-consent").check();
    await form.getByRole("button", { name: "Submit testimonial" }).click();
    await expect(form.getByText("We need your permission to publish.")).toBeVisible();
    await form.locator("#t-permission").check();
    await form.getByRole("button", { name: "Submit testimonial" }).click();
    await expect(page.getByTestId("form-success")).toBeVisible();
  });

  test("health check prompt opens and closes", async ({ page }) => {
    await page.goto("/?healthcheck=1");
    const dialog = page.getByTestId("hc-prompt");
    await expect(dialog).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  });

  test("API rejects invalid and honeypot submissions", async ({ request }) => {
    const bad = await request.post("/api/leads", { data: { type: "audit", name: "", email: "nope" } });
    expect(bad.status()).toBe(422);
    const bot = await request.post("/api/leads", { data: { type: "audit", company_website: "spam.example" } });
    expect(bot.status()).toBe(200);
  });
});

test.describe("mobile", () => {
  test("sticky CTA bar and stacked comparison", async ({ page, isMobile }) => {
    test.skip(!isMobile, "mobile only");
    await page.goto("/");
    await expect(page.getByTestId("mobile-cta")).toBeVisible();
    await page.locator("#compare").scrollIntoViewIfNeeded();
    await expect(page.locator("#compare table")).toBeHidden();
    await expect(page.getByRole("region", { name: "Doing it yourself" })).toBeVisible();
    // No horizontal scroll
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    // Nothing clipped off the right edge (sections use overflow-hidden for decoration).
    const vw = page.viewportSize()!.width;
    for (const sel of ["h1", "#hero-title + p", "#calculator h2", "#contact form"]) {
      const box = await page.locator(sel).first().boundingBox();
      expect(box!.x + box!.width, sel).toBeLessThanOrEqual(vw + 1);
    }
    // Menu opens
    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(page.locator("#mobile-menu")).toBeVisible();
  });
});

import type { Metadata } from "next";
import Link from "next/link";
import { integrations, legal, site } from "@/content";
import { PageHeader, Prose } from "@/components/ui/PageHeader";
import { T } from "@/components/ui/T";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How Second Serve Mail collects, uses and protects personal information under the Australian Privacy Act 1988.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy policy" intro={<p>Last updated: <T>{legal.lastUpdated}</T></p>} />
      <Prose>
        <p>
          This policy explains how <T>{legal.businessName}</T> trading as {site.name} (ABN <T>{site.abn}</T>) (&ldquo;we&rdquo;, &ldquo;us&rdquo;) handles
          personal information. We follow the Australian Privacy Principles in the <em>Privacy Act 1988</em> (Cth).
        </p>

        <h2>What we collect</h2>
        <ul>
          <li><strong>Forms on this website:</strong> your name, email address, venue name, and anything else you choose to give us (phone number, number of venues, list size, tools you use, messages and testimonials).</li>
          <li><strong>Calculator:</strong> the numbers you enter stay in your browser. We only receive them if you ask us to email you the breakdown.</li>
          <li><strong>Technical information:</strong> your IP address and browser type when you submit a form, used for spam protection and rate limiting.</li>
          <li><strong>Analytics (only with your consent):</strong> aggregated information about which pages are visited. See <a href="#cookies">Cookies and analytics</a>.</li>
          <li><strong>Client guest data:</strong> when a venue engages us, we process its guests&apos; contact details on the venue&apos;s behalf, only to send messages the guests have consented to receive.</li>
        </ul>

        <h2>Why we collect it</h2>
        <ul>
          <li>To reply to your enquiry, book your audit call, send you the information you asked for (such as a health check or calculator breakdown) and provide our services.</li>
          <li>To publish testimonials, only where you have given explicit permission.</li>
          <li>To protect our forms from spam and abuse.</li>
          <li>To understand, in aggregate, how the website is used so we can improve it (only with consent).</li>
        </ul>
        <p>Submitting a form does <strong>not</strong> add you to any marketing list. We will only send you marketing if you separately opt in.</p>

        <h2>Who we share it with</h2>
        <p>We don&apos;t sell personal information. We use trusted service providers to run the website and our business, who may store data outside Australia:</p>
        <ul>
          <li>Website hosting (Vercel) and form email delivery (Resend)</li>
          <li>Lead storage (Google Workspace / Google Sheets)</li>
          <li>Spam protection (Cloudflare Turnstile)</li>
          <li>Appointment booking (<T>{legal.bookingProvider}</T>)</li>
          <li>Analytics, only with consent (<T>{legal.analyticsProvider}</T>)</li>
          <li>Email and SMS platforms used to deliver client campaigns: <T>{integrations.tools.join(", ")}</T></li>
        </ul>

        <h2>How we keep it safe and how long we keep it</h2>
        <p>
          We use reputable providers with encryption in transit, limit access to people who need it, and delete enquiry data that is no longer needed. We
          keep enquiry records for <T>{legal.retentionPeriod}</T> unless you become a client, in which case we keep records for as long as the law requires.
        </p>

        <h2>Access, correction and opting out</h2>
        <p>
          You can ask to see, correct or delete the personal information we hold about you, or withdraw consent at any time, by emailing <T>{site.email}</T>. Every
          marketing email or SMS we send includes a working unsubscribe link or opt-out instruction, and we action opt-outs promptly (and always within five working days).
        </p>

        <h2 id="cookies">Cookies and analytics</h2>
        <p>
          The site works without any analytics cookies. If you choose &ldquo;Accept analytics&rdquo; in the banner, we load an analytics script to measure page
          visits and button clicks such as calculator use and form submissions. If you choose &ldquo;No thanks&rdquo;, nothing is loaded. You can change your choice
          at any time using &ldquo;Cookie settings&rdquo; in the footer. We remember your choice in your browser&apos;s local storage.
        </p>

        <h2>Complaints</h2>
        <p>
          If you have a concern about how we&apos;ve handled your information, email <T>{site.email}</T> and we&apos;ll respond within 30 days. If you&apos;re not
          satisfied, you can contact the Office of the Australian Information Commissioner at{" "}
          <a href="https://www.oaic.gov.au" target="_blank" rel="noopener noreferrer">oaic.gov.au</a>.
        </p>

        <p>
          See also our <Link href="/spam-act-compliance">Spam Act and consent policy</Link> and <Link href="/terms">terms</Link>.
        </p>
      </Prose>
    </>
  );
}

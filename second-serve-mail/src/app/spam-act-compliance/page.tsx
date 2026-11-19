import type { Metadata } from "next";
import Link from "next/link";
import { legal, site } from "@/content";
import { PageHeader, Prose } from "@/components/ui/PageHeader";
import { T } from "@/components/ui/T";

export const metadata: Metadata = {
  title: "Spam Act and consent policy",
  description: "How Second Serve Mail keeps every email and SMS consent-based, identified and easy to unsubscribe from, under the Australian Spam Act 2003.",
  alternates: { canonical: "/spam-act-compliance" },
};

export default function SpamActPage() {
  return (
    <>
      <PageHeader
        eyebrow="Compliance"
        title="Spam Act and consent policy"
        intro={<p>Every message we send is consent-based, clearly identified and includes a working unsubscribe. Last updated: <T>{legal.lastUpdated}</T></p>}
      />
      <Prose>
        <p>
          In Australia, commercial emails and SMS are regulated by the <em>Spam Act 2003</em> (Cth), enforced by the Australian Communications and Media
          Authority (ACMA). We build every client program around its three core rules.
        </p>

        <h2>1. Consent</h2>
        <ul>
          <li>We only send to guests who have given <strong>express consent</strong> (for example, ticking an opt-in box at booking or on Wi-Fi sign-up), or where <strong>inferred consent</strong> legitimately applies under the Act.</li>
          <li>Before the first send, we review how each list was collected. Contacts without a clear consent basis are excluded, not &ldquo;tested&rdquo;.</li>
          <li>We never buy, rent or scrape lists, and we never add people to a list because they made a booking unless they agreed to marketing.</li>
          <li>We keep records of when and how consent was given, where the source system provides it.</li>
        </ul>

        <h2>2. Identify the sender</h2>
        <p>Every email and SMS clearly identifies the venue sending it and includes accurate contact information.</p>

        <h2>3. A working unsubscribe</h2>
        <ul>
          <li>Every email includes a one-click unsubscribe link. Every SMS includes an opt-out instruction such as &ldquo;Reply STOP to opt out&rdquo;.</li>
          <li>Unsubscribes are processed automatically, usually immediately and always within the five working days the Act requires.</li>
          <li>Unsubscribing is free, and we never require a guest to log in or give extra information to opt out.</li>
          <li>Suppression lists are kept so unsubscribed guests aren&apos;t re-added in later imports.</li>
        </ul>

        <h2>Booking reminders and transactional messages</h2>
        <p>
          Booking confirmations and reminders are generally service messages rather than marketing. We keep them free of promotional content, or treat
          them as commercial messages (with consent and unsubscribe) if they include offers.
        </p>

        <h2>Your responsibilities as a client</h2>
        <p>
          You remain responsible for how your guest data was originally collected. We&apos;ll help you set up compliant opt-in wording for bookings, Wi-Fi and
          in-venue sign-ups.
        </p>

        <h2>Report a problem</h2>
        <p>
          If you received a message from one of our client venues that you didn&apos;t consent to, please email <T>{site.email}</T> and we&apos;ll remove you and
          investigate. More information about the Spam Act is available from{" "}
          <a href="https://www.acma.gov.au/avoid-sending-spam" target="_blank" rel="noopener noreferrer">ACMA</a>.
        </p>

        <p className="text-sm">
          This page explains how we work and is not legal advice. See also our <Link href="/privacy">privacy policy</Link>.
        </p>
      </Prose>
    </>
  );
}

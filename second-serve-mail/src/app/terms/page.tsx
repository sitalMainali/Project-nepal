import type { Metadata } from "next";
import Link from "next/link";
import { guarantee, legal, pricing, site } from "@/content";
import { PageHeader, Prose } from "@/components/ui/PageHeader";
import { T } from "@/components/ui/T";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of use for the Second Serve Mail website and an overview of our service terms.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Terms" intro={<p>Last updated: <T>{legal.lastUpdated}</T></p>} />
      <Prose>
        <p>
          These terms apply to your use of this website, operated by <T>{legal.businessName}</T> trading as {site.name} (ABN <T>{site.abn}</T>), based in{" "}
          {site.locality}, {site.region}.
        </p>

        <h2>Website information</h2>
        <p>
          Content on this site, including the revenue calculator and sample campaigns, is general information only. Calculator results are estimates based
          on the assumptions you enter and are not a guarantee of results. Sample campaigns are written for a fictional venue.
        </p>

        <h2>Our services</h2>
        <p>
          Services are provided under a written agreement or proposal that sets out the scope, price and timeframes. In summary, unless your agreement says
          otherwise:
        </p>
        <ul>
          <li>Fees: <T>{pricing.price}</T> {pricing.priceUnit}. <T>{pricing.setup}</T>. <T>{pricing.softwareCosts}</T>.</li>
          {guarantee.points.map((p) => (
            <li key={p}><T>{p}</T></li>
          ))}
          <li>You own your guest list, content and accounts. We work inside accounts you control wherever possible.</li>
          <li>You confirm that guest contact details you provide were collected lawfully and with the consent required by the Spam Act 2003.</li>
          <li>We do not guarantee any particular revenue, bookings or sales outcome.</li>
          <li><T>{legal.paymentTerms}</T></li>
        </ul>

        <h2>Australian Consumer Law</h2>
        <p>
          Nothing in these terms excludes rights you have under the Australian Consumer Law that cannot be excluded.
        </p>

        <h2>Liability</h2>
        <p>
          To the extent permitted by law, we are not liable for indirect or consequential loss arising from use of this website. <T>{legal.liabilityCap}</T>
        </p>

        <h2>Governing law</h2>
        <p>These terms are governed by the laws of Queensland, Australia.</p>

        <p>
          Questions? Email <T>{site.email}</T>. See also our <Link href="/privacy">privacy policy</Link>.
        </p>
      </Prose>
    </>
  );
}

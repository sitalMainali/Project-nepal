import Link from "next/link";
import { cta } from "@/content";
import { CtaLink } from "@/components/ui/CtaLink";
import { RiskReversal } from "@/components/ui/RiskReversal";

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <aside className="border-t border-line bg-surface" aria-label="Book an audit">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
          <h2 className="text-2xl font-semibold">Want this done for your venue?</h2>
          <p className="mt-2 text-muted">We&apos;ll look at your guest list and tell you honestly what&apos;s worth doing first.</p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
            <CtaLink href="/#contact" event="cta_click" eventProps={{ location: "resources" }}>
              {cta.primary}
            </CtaLink>
            <Link href="/resources" className="inline-flex min-h-[44px] items-center font-semibold text-terracotta-dark underline underline-offset-4">
              All resources
            </Link>
          </div>
          <RiskReversal className="mt-4" />
        </div>
      </aside>
    </>
  );
}

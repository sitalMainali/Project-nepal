import { cta, guarantee, pricing } from "@/content";
import { Section, SectionHeading } from "@/components/ui/Section";
import { CheckIcon } from "@/components/ui/Icons";
import { CtaLink } from "@/components/ui/CtaLink";
import { RiskReversal } from "@/components/ui/RiskReversal";
import { T } from "@/components/ui/T";

export function Offer() {
  return (
    <Section id="pricing" labelledBy="pricing-title" tone="surface">
      <SectionHeading id="pricing-title" eyebrow="Pricing" title={pricing.heading} intro="One simple plan per venue. No tiers to decode." />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_1fr]">
        <article className="rounded-card bg-white p-6 ring-2 ring-ink sm:p-8" data-fade aria-labelledby="plan-name">
          <h3 id="plan-name" className="text-2xl font-semibold">{pricing.planName}</h3>
          <p className="mt-4 flex flex-wrap items-baseline gap-x-2">
            <span className="font-serif text-4xl font-semibold" data-testid="price">
              <T>{pricing.price}</T>
            </span>
            <span className="text-muted">{pricing.priceUnit}</span>
          </p>
          <ul className="mt-2 space-y-1 text-sm text-muted">
            <li><T>{pricing.setup}</T></li>
            <li><T>{pricing.softwareCosts}</T></li>
          </ul>
          <h4 className="mt-6 font-sans text-sm font-semibold uppercase tracking-[0.14em] text-muted">What&apos;s included</h4>
          <ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {pricing.includes.map((item) => (
              <li key={item} className="flex gap-2">
                <CheckIcon className="mt-0.5 h-5 w-5 flex-none text-[#2F6B45]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-muted"><T>{pricing.multiVenue}</T></p>
          <div className="mt-6">
            <CtaLink href="/#contact" className="w-full sm:w-auto" event="cta_click" eventProps={{ location: "pricing" }}>
              {cta.primary}
            </CtaLink>
            <RiskReversal className="mt-4" />
          </div>
        </article>

        <aside id="guarantee" className="rounded-card bg-ink p-6 text-cream sm:p-8" data-fade aria-labelledby="guarantee-title">
          <svg viewBox="0 0 40 40" className="h-10 w-10 text-gold" aria-hidden="true">
            <path fill="currentColor" d="M20 2 6 7.4v10.2C6 26.2 12 33.4 20 36c8-2.6 14-9.8 14-18.4V7.4L20 2zm-2.2 23.6-6.6-6.6 2.6-2.6 4 4 8.4-8.4 2.6 2.6-11 11z" />
          </svg>
          <h3 id="guarantee-title" className="mt-4 text-2xl font-semibold">{guarantee.heading}</h3>
          <ul className="mt-4 space-y-3">
            {guarantee.points.map((p) => (
              <li key={p} className="flex gap-2">
                <CheckIcon className="mt-0.5 h-5 w-5 flex-none text-gold" />
                <span><T>{p}</T></span>
              </li>
            ))}
          </ul>
          <p className="mt-5 border-t border-cream/15 pt-4 text-sm text-cream/85">{guarantee.note}</p>
        </aside>
      </div>
    </Section>
  );
}

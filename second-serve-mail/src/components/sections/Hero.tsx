import { cta, hero } from "@/content";
import { CtaLink } from "@/components/ui/CtaLink";
import { RiskReversal } from "@/components/ui/RiskReversal";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-cream">
      <svg aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] opacity-40 md:opacity-100" viewBox="0 0 400 400">
        <circle cx="160" cy="200" r="150" fill="none" stroke="#D2603A" strokeWidth="1.5" />
        <circle cx="240" cy="200" r="150" fill="none" stroke="#E3B04B" strokeWidth="1.5" />
      </svg>
      <div className="relative mx-auto grid max-w-content grid-cols-1 gap-12 px-4 pb-16 pt-12 sm:px-6 md:pb-24 md:pt-20 lg:grid-cols-[1.15fr_1fr] lg:items-center">
        <div>
          <p className="mb-4 inline-flex rounded-full bg-surface px-3 py-1 text-sm font-semibold text-terracotta-dark">{hero.eyebrow}</p>
          <h1 id="hero-title" className="font-serif text-[2.6rem] font-semibold leading-[1.05] tracking-tight sm:text-6xl">
            {hero.headline}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">{hero.subhead}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CtaLink href="/#contact" event="cta_click" eventProps={{ location: "hero" }}>
              {cta.primary}
            </CtaLink>
            <CtaLink href="/#calculator" variant="secondary" event="cta_click" eventProps={{ location: "hero-calculator" }}>
              {cta.secondary}
            </CtaLink>
          </div>
          <RiskReversal className="mt-5" />
        </div>

        <div className="relative mx-auto w-full max-w-md" aria-label={hero.preview.label} role="group">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted">{hero.preview.label}</p>
          {/* Email preview */}
          <div className="rounded-card bg-white p-5 shadow-[0_12px_40px_-16px_rgba(31,42,36,0.35)] ring-1 ring-line">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-surface font-serif font-semibold text-terracotta-dark" aria-hidden="true">
                F&amp;E
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold">{hero.preview.email.from}</p>
                <p className="truncate text-sm text-ink">{hero.preview.email.subject}</p>
              </div>
              <span className="ml-auto rounded-full bg-gold/30 px-2 py-0.5 text-xs font-semibold text-ink">Sample</span>
            </div>
            <p className="mt-3 text-sm text-muted">{hero.preview.email.preview}</p>
          </div>
          {/* SMS preview */}
          <div className="ml-6 mt-4 rounded-card bg-surface p-5 ring-1 ring-line sm:ml-12">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">SMS · {hero.preview.sms.from}</p>
              <span className="rounded-full bg-gold/30 px-2 py-0.5 text-xs font-semibold text-ink">Sample</span>
            </div>
            <p className="mt-3 rounded-2xl rounded-tl-sm bg-white px-4 py-3 text-[15px] leading-relaxed text-ink">{hero.preview.sms.body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

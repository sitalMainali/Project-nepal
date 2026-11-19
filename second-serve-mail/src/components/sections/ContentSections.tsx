import { benefits, howItWorks, integrations, problems, services } from "@/content";
import { Section, SectionHeading } from "@/components/ui/Section";
import { T } from "@/components/ui/T";

export function ProblemStrip() {
  return (
    <section aria-labelledby="problem-title" className="bg-ink text-cream">
      <div className="mx-auto max-w-content px-4 py-14 sm:px-6 md:py-16">
        <h2 id="problem-title" className="max-w-3xl font-serif text-2xl font-semibold leading-snug sm:text-3xl" data-fade>
          {problems.heading}
        </h2>
        <ul className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {problems.items.map((p, i) => (
            <li key={p.title} className="border-t border-cream/20 pt-5" data-fade>
              <p className="font-serif text-lg font-semibold text-gold">
                <span className="mr-2 text-cream/70" aria-hidden="true">0{i + 1}</span>
                {p.title}
              </p>
              <p className="mt-2 leading-relaxed text-cream/85">
                <T>{p.body}</T>
              </p>
              {p.source && <p className="mt-2 text-xs text-cream/70">Source: {p.source}</p>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const serviceIcons = [
  // welcome
  <path key="w" d="M4 8.5 12 14l8-5.5M5 6h14a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z" />,
  // win-back
  <path key="b" d="M4 12a8 8 0 1 0 2.3-5.6M4 4v4h4" />,
  // birthday
  <path key="c" d="M5 20h14M6 20v-7h12v7M12 13V9m0-4.5c.9.8 1.2 1.9 0 2.6-1.2-.7-.9-1.8 0-2.6zM6 16c2 1 4-1 6 0s4-1 6 0" />,
  // reminder
  <path key="r" d="M7 3v3m10-3v3M4 8h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm4 9 2 2 4-4" />,
  // report
  <path key="p" d="M6 3h9l4 4v14H6zM9 17v-3m3 3v-6m3 6v-4" />,
];

export function Services() {
  return (
    <Section id="services" labelledBy="services-title">
      <SectionHeading id="services-title" eyebrow="Services" title={services.heading} intro={services.intro} />
      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.items.map((s, i) => (
          <li key={s.title} className="card bg-white/80" data-fade>
            <svg viewBox="0 0 24 24" className="h-9 w-9 rounded-xl bg-surface p-1.5 text-terracotta-dark" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              {serviceIcons[i % serviceIcons.length]}
            </svg>
            <h3 className="mt-4 text-xl font-semibold">{s.title}</h3>
            <p className="mt-2 leading-relaxed text-muted">{s.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function IntegrationsStrip() {
  return (
    <section aria-labelledby="integrations-title" className="border-y border-line bg-surface">
      <div className="mx-auto flex max-w-content flex-col gap-3 px-4 py-6 sm:flex-row sm:items-center sm:gap-6 sm:px-6">
        <h2 id="integrations-title" className="flex-none font-sans text-sm font-semibold uppercase tracking-[0.14em] text-muted">
          {integrations.heading}
        </h2>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-base font-semibold text-ink">
          {integrations.tools.map((t) => (
            <li key={t}>
              <T>{t}</T>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function HowItWorks() {
  return (
    <Section id="how-it-works" labelledBy="how-title" tone="surface">
      <SectionHeading id="how-title" eyebrow="Process" title={howItWorks.heading} intro={howItWorks.intro} />
      <div className="relative">
      <div aria-hidden="true" className="absolute left-[22px] top-0 h-full w-px bg-line md:left-0 md:top-[22px] md:h-px md:w-full" />
      <ol className="relative grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-6">
        {howItWorks.steps.map((s, i) => (
          <li key={s.title} className="relative pl-16 md:pl-0 md:pt-16" data-fade>
            <span className="absolute left-0 top-0 flex h-11 w-11 items-center justify-center rounded-full bg-terracotta font-serif text-lg font-semibold text-white ring-4 ring-surface">
              {i + 1}
            </span>
            <p className="text-sm font-semibold uppercase tracking-wide text-terracotta-dark">
              <T>{s.when}</T>
            </p>
            <h3 className="mt-1 text-2xl font-semibold">{s.title}</h3>
            <p className="mt-2 leading-relaxed text-muted">{s.body}</p>
          </li>
        ))}
      </ol>
      </div>
    </Section>
  );
}

export function Benefits() {
  return (
    <Section id="why-us" labelledBy="benefits-title">
      <SectionHeading id="benefits-title" eyebrow="What we do better" title={benefits.heading} />
      <ul className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.items.map((b) => (
          <li key={b.title} className="border-l-4 border-gold pl-5" data-fade>
            <h3 className="text-xl font-semibold">{b.title}</h3>
            <p className="mt-2 leading-relaxed text-muted">{b.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

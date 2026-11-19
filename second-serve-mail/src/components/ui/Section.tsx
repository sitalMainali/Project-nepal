import type { ReactNode } from "react";

export function Section({
  id,
  children,
  className = "",
  tone = "cream",
  labelledBy,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  tone?: "cream" | "surface" | "ink";
  labelledBy?: string;
}) {
  const toneClass = tone === "surface" ? "bg-surface" : tone === "ink" ? "bg-ink text-cream" : "bg-cream";
  return (
    <section id={id} aria-labelledby={labelledBy} className={`scroll-mt-20 ${toneClass} ${className}`}>
      <div className="mx-auto max-w-content px-4 py-16 sm:px-6 md:py-24">{children}</div>
    </section>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  center = false,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  center?: boolean;
}) {
  return (
    <div className={`mb-10 max-w-2xl ${center ? "mx-auto text-center" : ""}`} data-fade>
      {eyebrow && <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-terracotta-dark">{eyebrow}</p>}
      <h2 id={id} className="font-serif text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
        {title}
      </h2>
      {intro && <p className="mt-4 text-lg leading-relaxed text-muted">{intro}</p>}
    </div>
  );
}

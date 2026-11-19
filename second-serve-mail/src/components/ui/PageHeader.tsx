import type { ReactNode } from "react";

export function PageHeader({ eyebrow, title, intro }: { eyebrow?: string; title: string; intro?: ReactNode }) {
  return (
    <div className="border-b border-line bg-surface">
      <div className="mx-auto max-w-content px-4 py-12 sm:px-6 md:py-16">
        {eyebrow && <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-terracotta-dark">{eyebrow}</p>}
        <h1 className="max-w-3xl font-serif text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">{title}</h1>
        {intro && <div className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{intro}</div>}
      </div>
    </div>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16">
      <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:font-semibold prose-headings:text-ink prose-p:text-ink prose-a:text-terracotta-dark prose-a:underline-offset-2 prose-strong:text-ink prose-li:text-ink">
        {children}
      </div>
    </div>
  );
}

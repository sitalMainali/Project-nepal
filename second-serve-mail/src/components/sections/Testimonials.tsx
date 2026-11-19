import Image from "next/image";
import Link from "next/link";
import { caseStudies, reviewsContent, testimonials, type CaseStudy, type Testimonial } from "@/content";
import { Stars } from "@/components/ui/Icons";
import { T } from "@/components/ui/T";
import { CtaLink } from "@/components/ui/CtaLink";

export function QuoteCard({ t }: { t: Testimonial }) {
  return (
    <figure className="card flex h-full flex-col bg-white">
      {typeof t.rating === "number" && <Stars rating={t.rating} />}
      <blockquote className="mt-3 flex-1 font-serif text-lg leading-relaxed">&ldquo;{t.quote}&rdquo;</blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        {t.photo ? (
          <Image src={t.photo} alt={`Photo of ${t.name}`} width={48} height={48} className="h-12 w-12 rounded-full object-cover" />
        ) : (
          <span aria-hidden="true" className="flex h-12 w-12 items-center justify-center rounded-full bg-surface font-serif font-semibold text-terracotta-dark">
            {t.name.slice(0, 1)}
          </span>
        )}
        <span>
          <span className="block font-semibold">{t.name}</span>
          <span className="block text-sm text-muted">
            {t.role}, {t.venue}
          </span>
          {t.sourceUrl && (
            <a href={t.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-terracotta-dark underline underline-offset-2">
              View original review<span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
        </span>
      </figcaption>
    </figure>
  );
}

export function CaseStudyCard({ c }: { c: CaseStudy }) {
  return (
    <article className="card bg-white">
      <p className="text-sm font-semibold uppercase tracking-wide text-terracotta-dark">Case study · {c.period}</p>
      <h3 className="mt-1 text-2xl font-semibold">{c.venue}</h3>
      <p className="mt-2 text-muted">{c.summary}</p>
      <table className="mt-4 w-full text-left text-sm">
        <thead>
          <tr className="border-b border-line text-muted">
            <th scope="col" className="py-2 font-semibold">Measure</th>
            <th scope="col" className="py-2 font-semibold">Before</th>
            <th scope="col" className="py-2 font-semibold">After</th>
          </tr>
        </thead>
        <tbody>
          {c.metrics.map((m) => (
            <tr key={m.label} className="border-b border-line last:border-0">
              <th scope="row" className="py-2 font-semibold">{m.label}</th>
              <td className="py-2">{m.before}</td>
              <td className="py-2 font-semibold">{m.after}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
}

/** Shown while there are no real testimonials. Never fake reviews. */
export function EarlyResults({ showReviewsLink = true }: { showReviewsLink?: boolean }) {
  return (
    <div className="grid grid-cols-1 gap-6 rounded-card bg-white p-6 ring-1 ring-line sm:p-10 md:grid-cols-[1.4fr_1fr] md:items-center" data-testid="early-results">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-terracotta-dark">Honest by default</p>
        <h3 className="mt-2 text-3xl font-semibold">{reviewsContent.emptyHeading}</h3>
        <p className="mt-3 leading-relaxed text-muted">{reviewsContent.emptyBody}</p>
        {showReviewsLink && (
          <Link href="/reviews" className="mt-4 inline-flex min-h-[44px] items-center font-semibold text-terracotta-dark underline underline-offset-4">
            About our reviews policy
          </Link>
        )}
      </div>
      <div className="rounded-card bg-surface p-6">
        <p className="font-serif text-xl font-semibold">Founding-client offer</p>
        <p className="mt-2 leading-relaxed">
          <T>{reviewsContent.foundingOffer}</T>
        </p>
        <CtaLink href="/#contact" className="mt-5 w-full" event="cta_click" eventProps={{ location: "founding-offer" }}>
          Ask about a founding place
        </CtaLink>
      </div>
    </div>
  );
}

export const hasSocialProof = testimonials.length > 0 || caseStudies.length > 0;

export function TestimonialsGrid({ limit }: { limit?: number }) {
  const list = limit ? testimonials.slice(0, limit) : testimonials;
  return (
    <>
      {caseStudies.length > 0 && (
        <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-2">
          {caseStudies.map((c) => (
            <CaseStudyCard key={c.venue} c={c} />
          ))}
        </div>
      )}
      {list.length > 0 && (
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {list.map((t) => (
            <li key={`${t.name}-${t.venue}`}>
              <QuoteCard t={t} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

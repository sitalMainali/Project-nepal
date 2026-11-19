import Image from "next/image";
import { about, contact, healthCheck } from "@/content";
import { Section, SectionHeading } from "@/components/ui/Section";
import { RiskReversal } from "@/components/ui/RiskReversal";
import { T } from "@/components/ui/T";
import { AuditForm } from "@/components/forms/AuditForm";
import { HealthCheckForm } from "@/components/forms/HealthCheckForm";
import { BookingEmbed } from "./BookingEmbed";

export function About() {
  return (
    <Section id="about" labelledBy="about-title" tone="surface">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-[280px_1fr] md:items-center">
        <div className="mx-auto w-full max-w-[280px]" data-fade>
          {about.photo ? (
            <Image src={about.photo} alt={about.photoAlt} width={560} height={680} className="aspect-[4/5] w-full rounded-card object-cover" />
          ) : (
            <div className="flex aspect-[4/5] w-full flex-col items-center justify-center rounded-card border-2 border-dashed border-line bg-cream p-6 text-center text-sm text-muted">
              <svg viewBox="0 0 40 40" className="mb-3 h-14 w-14" aria-hidden="true">
                <circle cx="15" cy="20" r="11" fill="none" stroke="#D2603A" strokeWidth="1.5" />
                <circle cx="25" cy="20" r="11" fill="none" stroke="#E3B04B" strokeWidth="1.5" />
              </svg>
              <mark className="placeholder">[FOUNDER PHOTO]</mark>
            </div>
          )}
        </div>
        <div data-fade>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-terracotta-dark">About</p>
          <h2 id="about-title" className="text-3xl font-semibold sm:text-4xl">
            <T>{about.heading}</T>
          </h2>
          <div className="mt-5 space-y-4 text-lg leading-relaxed text-muted">
            {about.story.map((p, i) => (
              <p key={i}>
                <T>{p}</T>
              </p>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

export function HealthCheckSection() {
  return (
    <Section id="health-check" labelledBy="hc-title">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.3fr]">
        <div data-fade>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-terracotta-dark">Free, no call needed</p>
          <h2 id="hc-title" className="text-3xl font-semibold sm:text-4xl">{healthCheck.heading}</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">{healthCheck.body}</p>
        </div>
        <div className="card bg-white" data-fade>
          <HealthCheckForm idPrefix="hc-section" />
        </div>
      </div>
    </Section>
  );
}

export function Contact() {
  return (
    <Section id="contact" labelledBy="contact-title" tone="surface">
      <SectionHeading id="contact-title" eyebrow="Get started" title={contact.heading} intro={contact.body} />
      <RiskReversal className="-mt-6 mb-10" />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          <h3 className="mb-4 text-xl font-semibold">{contact.bookingHeading}</h3>
          <BookingEmbed />
        </div>
        <div>
          <h3 className="mb-4 text-xl font-semibold">{contact.formHeading}</h3>
          <div className="card bg-white">
            <AuditForm />
          </div>
        </div>
      </div>
    </Section>
  );
}

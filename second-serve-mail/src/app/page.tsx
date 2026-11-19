import { calculatorContent, cta, faqs, reviewsContent, samples } from "@/content";
import { Hero } from "@/components/sections/Hero";
import { Benefits, HowItWorks, IntegrationsStrip, ProblemStrip, Services } from "@/components/sections/ContentSections";
import { Calculator } from "@/components/sections/Calculator";
import { Comparison } from "@/components/sections/Comparison";
import { SampleCampaigns } from "@/components/sections/SampleCampaigns";
import { EarlyResults, TestimonialsGrid, hasSocialProof } from "@/components/sections/Testimonials";
import { Offer } from "@/components/sections/Offer";
import { FaqAccordion } from "@/components/sections/Faq";
import { About, Contact, HealthCheckSection } from "@/components/sections/ClosingSections";
import { Section, SectionHeading } from "@/components/ui/Section";
import { CtaLink } from "@/components/ui/CtaLink";
import { RiskReversal } from "@/components/ui/RiskReversal";
import { JsonLd } from "@/components/JsonLd";
import { faqJsonLd, localBusinessJsonLd, serviceJsonLd } from "@/lib/jsonld";

export default function HomePage() {
  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <JsonLd data={serviceJsonLd()} />
      <JsonLd data={faqJsonLd()} />

      <Hero />
      <ProblemStrip />
      <Services />
      <IntegrationsStrip />
      <HowItWorks />

      <Section id="calculator" labelledBy="calc-title">
        <SectionHeading id="calc-title" eyebrow="Revenue calculator" title={calculatorContent.heading} intro={calculatorContent.intro} />
        <Calculator />
        <div className="mt-10 flex flex-col items-start gap-3">
          <CtaLink href="/#contact" event="cta_click" eventProps={{ location: "calculator" }}>
            {cta.primary}
          </CtaLink>
          <RiskReversal />
        </div>
      </Section>

      <Comparison />
      <Benefits />

      <Section id="samples" labelledBy="samples-title" tone="surface">
        <SectionHeading id="samples-title" eyebrow="Examples" title={samples.heading} intro={samples.intro} />
        <SampleCampaigns />
      </Section>

      <Section id="reviews" labelledBy="reviews-title">
        <SectionHeading id="reviews-title" eyebrow="Results" title={hasSocialProof ? reviewsContent.heading : "Results, honestly"} />
        {hasSocialProof ? <TestimonialsGrid limit={3} /> : <EarlyResults />}
      </Section>

      <Offer />

      <Section id="faq" labelledBy="faq-title">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <SectionHeading id="faq-title" eyebrow="FAQ" title="Questions venue owners ask" intro={`${faqs.length} straight answers. Can't see yours? Ask on the audit call.`} />
            <CtaLink href="/#contact" variant="secondary" event="cta_click" eventProps={{ location: "faq" }}>
              Ask us directly
            </CtaLink>
          </div>
          <FaqAccordion />
        </div>
      </Section>

      <About />
      <HealthCheckSection />
      <Contact />
    </>
  );
}

import type { Metadata } from "next";
import { reviewsContent } from "@/content";
import { PageHeader } from "@/components/ui/PageHeader";
import { EarlyResults, TestimonialsGrid, hasSocialProof } from "@/components/sections/Testimonials";
import { TestimonialForm } from "@/components/forms/TestimonialForm";

export const metadata: Metadata = {
  title: "Reviews and client results",
  description: "Testimonials and results from Brisbane restaurants and bars working with Second Serve Mail. Real reviews only, published with permission.",
  alternates: { canonical: "/reviews" },
};

export default function ReviewsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Reviews"
        title={reviewsContent.heading}
        intro="Every testimonial here is from a real client and published with their written permission. We never write, buy or edit reviews to change their meaning."
      />
      <div className="mx-auto max-w-content px-4 py-12 sm:px-6 md:py-16">
        {hasSocialProof ? <TestimonialsGrid /> : <EarlyResults showReviewsLink={false} />}

        <section aria-labelledby="submit-title" className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 id="submit-title" className="text-3xl font-semibold">{reviewsContent.submitHeading}</h2>
            <p className="mt-3 text-lg leading-relaxed text-muted">{reviewsContent.submitIntro}</p>
          </div>
          <div className="card bg-white">
            <TestimonialForm />
          </div>
        </section>
      </div>
    </>
  );
}

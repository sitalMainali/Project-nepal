"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { testimonialSchema } from "@/lib/schemas";
import { track } from "@/lib/analytics";
import { Checkbox, ConsentText, FormStatus, Honeypot, SelectField, SubmitButton, SuccessPanel, TextArea, TextField } from "./Fields";
import { Turnstile } from "./Turnstile";
import { useLeadSubmit } from "./useLeadSubmit";

const schema = testimonialSchema.omit({ type: true, rating: true });
type Values = z.infer<typeof schema> & { rating?: string };

const ratingOptions = ["5", "4", "3", "2", "1"];

export function TestimonialForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ resolver: zodResolver(schema.passthrough()), mode: "onTouched" });
  const { state, message, submit, setTurnstileToken, resetKey } = useLeadSubmit<Values>(setError);
  const id = (f: string) => `t-${f}`;

  if (state === "success") {
    return (
      <SuccessPanel title="Thank you. We really appreciate it.">
        <p>We&apos;ll check the wording with you before anything is published.</p>
      </SuccessPanel>
    );
  }

  return (
    <form
      noValidate
      aria-label="Submit a testimonial"
      className="relative space-y-5"
      onSubmit={handleSubmit(async (v) => {
        const { rating, ...rest } = v;
        const ok = await submit({ ...rest, rating: rating ? Number(rating) : undefined, type: "testimonial" });
        if (ok) track("testimonial_submitted");
      })}
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <TextField id={id("name")} label="Your name" autoComplete="name" registration={register("name")} error={errors.name} />
        <TextField id={id("email")} label="Email (not published)" type="email" inputMode="email" autoComplete="email" registration={register("email")} error={errors.email} />
        <TextField id={id("role")} label="Your role" hint="For example: Owner, Venue manager" registration={register("role")} error={errors.role} />
        <TextField id={id("venue")} label="Venue name" autoComplete="organization" registration={register("venue")} error={errors.venue} />
      </div>
      <TextArea id={id("quote")} label="Your testimonial" rows={5} hint="What was it like working with us? What changed?" registration={register("quote")} error={errors.quote} />
      <SelectField id={id("rating")} label="Rating" optional options={ratingOptions} placeholder="No rating" registration={register("rating")} />
      <Honeypot registration={register("company_website")} />
      <Checkbox id={id("permission")} registration={register("permission")} error={errors.permission}>
        I give Second Serve Mail permission to publish this testimonial with my name, role and venue on its website and marketing.
      </Checkbox>
      <Checkbox id={id("consent")} registration={register("consent")} error={errors.consent}>
        <ConsentText />
      </Checkbox>
      <Turnstile onToken={setTurnstileToken} resetKey={resetKey} />
      <FormStatus state={state} message={message} />
      <SubmitButton state={state}>Submit testimonial</SubmitButton>
    </form>
  );
}

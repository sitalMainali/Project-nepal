"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import type { z } from "zod";
import { auditSchema } from "@/lib/schemas";
import { track } from "@/lib/analytics";
import { Checkbox, ConsentText, FormStatus, Honeypot, SubmitButton, TextArea, TextField } from "./Fields";
import { Turnstile } from "./Turnstile";
import { useLeadSubmit } from "./useLeadSubmit";

const schema = auditSchema.omit({ type: true });
type Values = z.infer<typeof schema>;

export function AuditForm({ idPrefix = "audit" }: { idPrefix?: string }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ resolver: zodResolver(schema), mode: "onTouched" });
  const { state, message, submit, setTurnstileToken, resetKey } = useLeadSubmit<Values>(setError);
  const id = (f: string) => `${idPrefix}-${f}`;

  return (
    <form
      noValidate
      aria-label="Free audit request"
      className="relative space-y-5"
      onSubmit={handleSubmit(async (v) => {
        const ok = await submit({ ...v, type: "audit" });
        if (ok) {
          track("audit_form_submitted");
          router.push("/thank-you?type=audit");
        }
      })}
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <TextField id={id("name")} label="Your name" autoComplete="name" registration={register("name")} error={errors.name} />
        <TextField id={id("email")} label="Email" type="email" inputMode="email" autoComplete="email" registration={register("email")} error={errors.email} />
        <TextField id={id("venue")} label="Venue name" autoComplete="organization" registration={register("venue")} error={errors.venue} />
        <TextField id={id("phone")} label="Phone" type="tel" inputMode="tel" autoComplete="tel" optional registration={register("phone")} error={errors.phone} />
      </div>
      <TextField id={id("venues")} label="How many venues?" optional inputMode="numeric" registration={register("venues")} error={errors.venues} />
      <TextArea
        id={id("message")}
        label="Anything we should know?"
        optional
        hint="For example: the tools you use, rough list size, or what you'd like to fix."
        registration={register("message")}
        error={errors.message}
      />
      <Honeypot registration={register("company_website")} />
      <Checkbox id={id("consent")} registration={register("consent")} error={errors.consent}>
        <ConsentText />
      </Checkbox>
      <Turnstile onToken={setTurnstileToken} resetKey={resetKey} />
      <FormStatus state={state} message={message} />
      <SubmitButton state={state}>Request my free audit</SubmitButton>
    </form>
  );
}

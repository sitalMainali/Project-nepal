"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { calculatorLeadSchema } from "@/lib/schemas";
import type { CalculatorInputs } from "@/lib/calculator";
import { track } from "@/lib/analytics";
import { Checkbox, ConsentText, FormStatus, Honeypot, SubmitButton, SuccessPanel, TextField } from "./Fields";
import { Turnstile } from "./Turnstile";
import { useLeadSubmit } from "./useLeadSubmit";

const schema = calculatorLeadSchema.omit({ type: true, inputs: true });
type Values = z.infer<typeof schema>;

export function CalculatorEmailForm({ inputs }: { inputs: CalculatorInputs }) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ resolver: zodResolver(schema), mode: "onTouched" });
  const { state, message, submit, setTurnstileToken, resetKey } = useLeadSubmit<Values>(setError);
  const id = (f: string) => `calc-${f}`;

  if (state === "success") {
    return (
      <SuccessPanel title="Sent. Check your inbox.">
        <p>Your breakdown is on its way. If it doesn&apos;t arrive in a few minutes, check your spam folder.</p>
      </SuccessPanel>
    );
  }

  return (
    <form
      noValidate
      aria-label="Email me this breakdown"
      className="relative space-y-4"
      onSubmit={handleSubmit(async (v) => {
        const ok = await submit({ ...v, type: "calculator", inputs });
        if (ok) track("calculator_email_submitted");
      })}
    >
      <TextField id={id("name")} label="Your name" autoComplete="name" registration={register("name")} error={errors.name} />
      <TextField id={id("email")} label="Email" type="email" inputMode="email" autoComplete="email" registration={register("email")} error={errors.email} />
      <TextField id={id("venue")} label="Venue name" autoComplete="organization" registration={register("venue")} error={errors.venue} />
      <Honeypot registration={register("company_website")} />
      <Checkbox id={id("consent")} registration={register("consent")} error={errors.consent}>
        <ConsentText />
      </Checkbox>
      <Turnstile onToken={setTurnstileToken} resetKey={resetKey} />
      <FormStatus state={state} message={message} />
      <SubmitButton state={state}>Email me this breakdown</SubmitButton>
    </form>
  );
}

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { healthCheckSchema } from "@/lib/schemas";
import { healthCheck } from "@/content";
import { track } from "@/lib/analytics";
import { Checkbox, ConsentText, FormStatus, Honeypot, SelectField, SubmitButton, SuccessPanel, TextField } from "./Fields";
import { Turnstile } from "./Turnstile";
import { useLeadSubmit } from "./useLeadSubmit";

const schema = healthCheckSchema.omit({ type: true });
type Values = z.infer<typeof schema>;

export function HealthCheckForm({ idPrefix = "hc", onDone }: { idPrefix?: string; onDone?: () => void }) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ resolver: zodResolver(schema), mode: "onTouched" });
  const { state, message, submit, setTurnstileToken, resetKey } = useLeadSubmit<Values>(setError);
  const id = (f: string) => `${idPrefix}-${f}`;

  if (state === "success") {
    return (
      <SuccessPanel title="Thanks, your health check is on its way.">
        <p>We&apos;ve sent a confirmation to your inbox and will reply within two business days.</p>
        {onDone && (
          <button type="button" onClick={onDone} className="mt-4 min-h-[44px] font-semibold text-terracotta-dark underline underline-offset-4">
            Close
          </button>
        )}
      </SuccessPanel>
    );
  }

  return (
    <form
      noValidate
      aria-label="Free guest-list health check"
      className="relative space-y-5"
      onSubmit={handleSubmit(async (v) => {
        const ok = await submit({ ...v, type: "health-check" });
        if (ok) track("health_check_submitted");
      })}
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <TextField id={id("name")} label="Your name" autoComplete="name" registration={register("name")} error={errors.name} />
        <TextField id={id("email")} label="Email" type="email" inputMode="email" autoComplete="email" registration={register("email")} error={errors.email} />
      </div>
      <TextField id={id("venue")} label="Venue name" autoComplete="organization" registration={register("venue")} error={errors.venue} />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <SelectField id={id("listSize")} label="Roughly how big is your list?" options={healthCheck.listSizes} registration={register("listSize")} error={errors.listSize} />
        <SelectField id={id("lastSend")} label="When did you last send?" options={healthCheck.lastSendOptions} registration={register("lastSend")} error={errors.lastSend} />
      </div>
      <TextField
        id={id("tools")}
        label="Which tools hold your guest list?"
        hint="For example: booking system, POS, Wi-Fi, email tool. 'None' is fine."
        registration={register("tools")}
        error={errors.tools}
      />
      <Honeypot registration={register("company_website")} />
      <Checkbox id={id("consent")} registration={register("consent")} error={errors.consent}>
        <ConsentText />
      </Checkbox>
      <Turnstile onToken={setTurnstileToken} resetKey={resetKey} />
      <FormStatus state={state} message={message} />
      <SubmitButton state={state}>Get my free health check</SubmitButton>
    </form>
  );
}

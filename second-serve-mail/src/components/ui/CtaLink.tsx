"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";
import { buttonClass, type Variant } from "./button";

type Props = ComponentProps<typeof Link> & {
  variant?: Variant;
  event?: AnalyticsEvent;
  eventProps?: Record<string, string>;
};

export function CtaLink({ variant = "primary", event, eventProps, className = "", onClick, ...rest }: Props) {
  return (
    <Link
      {...rest}
      className={buttonClass(variant, className)}
      onClick={(e) => {
        if (event) track(event, eventProps);
        onClick?.(e);
      }}
    />
  );
}

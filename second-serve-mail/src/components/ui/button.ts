export type Variant = "primary" | "secondary" | "ghost";

const styles: Record<Variant, string> = {
  primary:
    "bg-terracotta text-white hover:bg-terracotta-dark shadow-sm",
  secondary:
    "bg-transparent text-ink ring-1 ring-inset ring-ink/30 hover:bg-surface hover:ring-ink/60",
  ghost: "text-terracotta-dark underline underline-offset-4 hover:text-ink",
};

export function buttonClass(variant: Variant = "primary", extra = "") {
  const base =
    variant === "ghost"
      ? "inline-flex min-h-[44px] items-center font-medium"
      : "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-semibold transition-colors";
  return `${base} ${styles[variant]} ${extra}`.trim();
}


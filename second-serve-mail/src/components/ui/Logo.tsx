export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" focusable="false">
      <circle cx="15" cy="20" r="11" fill="#B94E2A" />
      <circle cx="25" cy="20" r="11" fill="#E3B04B" fillOpacity="0.9" />
      <path d="M20 10.6a11 11 0 0 1 0 18.8 11 11 0 0 1 0-18.8z" fill="#1F2A24" />
    </svg>
  );
}

export function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark />
      <span className="font-serif text-lg font-semibold leading-none tracking-tight text-ink">
        Second Serve <span className="text-terracotta-dark">Mail</span>
      </span>
    </span>
  );
}

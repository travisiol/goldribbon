import { clsx } from "clsx";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

/*
 * The filled control is ink, not gold. Gold on this site means a donation
 * that has happened; putting it on a button would make a call-to-action look
 * like a receipt. 44px radius, matching every other control on the page.
 */
const base =
  "inline-flex items-center justify-center gap-2 rounded-[44px] px-5 py-3 text-[13px] font-medium tracking-[-0.01em] transition-colors duration-150 disabled:cursor-not-allowed";

const solid =
  "bg-ink text-paper hover:bg-[#2c2a24] disabled:bg-transparent disabled:text-ink-muted disabled:ring-1 disabled:ring-rule disabled:ring-inset";

const outline =
  "text-ink ring-1 ring-rule-strong ring-inset hover:bg-ink hover:text-paper disabled:text-ink-muted disabled:ring-rule";

export function Button({
  children,
  variant = "solid",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "solid" | "outline";
}) {
  return (
    <button
      type="button"
      className={clsx(base, variant === "solid" ? solid : outline, className)}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  children,
  variant = "solid",
  className,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: "solid" | "outline";
}) {
  return (
    <a
      className={clsx(base, variant === "solid" ? solid : outline, className)}
      {...props}
    >
      {children}
    </a>
  );
}

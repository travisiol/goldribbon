import { clsx } from "clsx";

/*
 * The gold ribbon — the childhood-cancer awareness symbol. It is not a logo
 * anyone owns, which is exactly why it can be here while no charity's actual
 * marks can be.
 *
 * It is also the site's one gauge. The ghost stroke is the full ribbon; the
 * gold stroke is drawn over it in proportion to money that has actually left
 * the vault, one full trace per lap (see RIBBON_LAP_USD). At zero donated the
 * ribbon is empty — a grey outline of the thing, which is the honest picture
 * of a project that has not paid anyone yet.
 *
 * `pathLength={1}` normalises the geometry so the dash offset is the
 * progress value directly and no measurement is needed at runtime.
 */

const RIBBON_PATH =
  "M 30 124 C 32 98 45 80 50 68 C 60 48 66 30 50 16 C 34 30 40 48 50 68 C 55 80 68 98 70 124";

export function Ribbon({
  progress = 0,
  className,
  strokeWidth = 13,
  ghost = "var(--rule)",
}: {
  /** 0–1 of the current lap. */
  progress?: number;
  className?: string;
  strokeWidth?: number;
  ghost?: string;
}) {
  const clamped = Math.min(Math.max(progress, 0), 1);

  return (
    <svg
      viewBox="0 0 100 136"
      fill="none"
      aria-hidden="true"
      className={clsx("block", className)}
    >
      <path
        d={RIBBON_PATH}
        stroke={ghost}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {clamped > 0 ? (
        <path
          d={RIBBON_PATH}
          pathLength={1}
          stroke="var(--gold-bright)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="1 1"
          strokeDashoffset={1 - clamped}
        />
      ) : null}
    </svg>
  );
}

/** Small solid mark for the nav and the footer. Never a progress gauge. */
export function RibbonMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 136"
      fill="none"
      aria-hidden="true"
      className={clsx("block", className)}
    >
      <path
        d={RIBBON_PATH}
        stroke="currentColor"
        strokeWidth={15}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

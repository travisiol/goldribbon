/**
 * The economics, in one file, so there is exactly one place to check them
 * against the deployed contract.
 *
 * The whole design is one sentence: the fee is the donation. There is no
 * split, no treasury cut, no "marketing wallet" taking a slice on the way
 * past. `toRecipientBps` is 10 000 and if it is ever anything else this
 * project is a different project and should be renamed.
 */
export const feeConfig = {
  /** Basis points taken on a buy. 200 bps = 2%. */
  buyFeeBps: 200,
  /** Basis points taken on a sell. Symmetric on purpose — see FAQ. */
  sellFeeBps: 200,
  /** Share of the collected fee that reaches the charity. Must be 10 000. */
  toRecipientBps: 10_000,
} as const;

/**
 * The payout rhythm.
 *
 * The schedule is a promise; `release()` being permissionless is the
 * guarantee. Both are stated, in that order, everywhere the cadence appears —
 * a reader should understand that they do not have to trust the calendar.
 */
export const releaseConfig = {
  cadence: "the first business day of every month",
  /** Anyone may call `release()` on the vault at any time. */
  permissionless: true,
} as const;

/**
 * One full trace of the ribbon mark equals this much donated. It is a unit of
 * display, nothing else — no contract behaves differently at the line, and
 * crossing it triggers nothing.
 */
export const RIBBON_LAP_USD = 100_000;

export function feeOnTrade(usd: number, side: "buy" | "sell" = "buy"): number {
  const bps = side === "buy" ? feeConfig.buyFeeBps : feeConfig.sellFeeBps;
  return (usd * bps) / 10_000;
}

export function donationOnTrade(usd: number, side: "buy" | "sell" = "buy"): number {
  return (feeOnTrade(usd, side) * feeConfig.toRecipientBps) / 10_000;
}

export function bpsToPercent(bps: number): string {
  const pct = bps / 100;
  return Number.isInteger(pct) ? `${pct}%` : `${pct.toFixed(2)}%`;
}

export function usd(value: number, fractionDigits = 2): string {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });
}

/** Progress around the current ribbon lap, 0–1. */
export function ribbonProgress(totalDonatedUsd: number): number {
  if (totalDonatedUsd <= 0) return 0;
  return (totalDonatedUsd % RIBBON_LAP_USD) / RIBBON_LAP_USD;
}

export function completedLaps(totalDonatedUsd: number): number {
  return Math.floor(Math.max(totalDonatedUsd, 0) / RIBBON_LAP_USD);
}

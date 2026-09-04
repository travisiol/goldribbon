export const siteConfig = {
  // Placeholder name — not final. `name` is the all-caps lockup (metadata,
  // nav, OG image); `wordmark` is the title-case form the hero and footer
  // set; `ticker` derives from the name. Nothing else spells the name out,
  // so a rebrand is these three strings plus the NEXT_PUBLIC_GOLDRIBBON_*
  // env prefix — never a grep-and-replace through components.
  name: "GOLDRIBBON",
  wordmark: "Goldribbon",
  ticker: "$RIBBON",
  tagline: "Every fee goes to children's cancer research.",
  description:
    "A token whose trading fees are collected by a vault with one immutable destination: a children's cancer charity. No owner key, no withdrawal function, and anyone can trigger the payout.",
  seoDescription:
    "100% of trading fees are forwarded to a children's cancer charity by a vault that can pay one address and has no withdrawal function. Every donation is published with its transaction hash.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://goldribbon.example",
  contact: process.env.NEXT_PUBLIC_GOLDRIBBON_CONTACT ?? null,
  x: process.env.NEXT_PUBLIC_GOLDRIBBON_X ?? null,
} as const;

function envOrNull(value: string | undefined): string | null {
  return value && value.trim().length > 0 ? value : null;
}

/**
 * The chain surface.
 *
 * Every address is env-driven and null by default, so no invented address can
 * ship hardcoded. While `vaultAddress` is null the page states, in as many
 * words, that nothing is deployed — see `isLive` below, which gates every
 * factual claim on this site.
 */
export const chainConfig = {
  tokenAddress: envOrNull(
    process.env.NEXT_PUBLIC_GOLDRIBBON_TOKEN_ADDRESS,
  ) as `0x${string}` | null,
  vaultAddress: envOrNull(
    process.env.NEXT_PUBLIC_GOLDRIBBON_VAULT_ADDRESS,
  ) as `0x${string}` | null,
  /**
   * The charity's own receiving address, as published by the charity or its
   * crypto-donation processor. This is the value burned into the vault's
   * `recipient` at deploy time; printing it here lets a reader check that the
   * deployed vault points where the page says it does.
   */
  recipientAddress: envOrNull(
    process.env.NEXT_PUBLIC_GOLDRIBBON_RECIPIENT_ADDRESS,
  ) as `0x${string}` | null,
} as const;

/**
 * The master switch on truth claims.
 *
 * `isLive` is only true once the flag is set AND a vault exists AND that
 * vault has a recipient to pay. Anything the page states in the present tense
 * — totals, receipts, "fees are being donated" — is behind this. Before it
 * flips, the page speaks in the future tense and says the vault is not
 * deployed. There is deliberately no simulated ledger and no demo counter:
 * a fabricated donation total on a charity page is not a design flourish.
 */
export const isLive =
  process.env.NEXT_PUBLIC_GOLDRIBBON_LIVE === "true" &&
  chainConfig.vaultAddress !== null &&
  chainConfig.recipientAddress !== null;

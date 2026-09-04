/**
 * Where the money goes — and, separately, whether we are allowed to say so.
 *
 * These are two different facts and the site keeps them apart on purpose.
 *
 * Naming a US charity as the beneficiary of something you sell is a regulated
 * act, not a marketing choice. Roughly half of US states treat "buy this, a
 * share goes to X" as a *commercial co-venture*: they require a signed
 * agreement with the charity, registration or bonding in some states, and a
 * disclosure of the amount per unit. On top of that, a charity's name and
 * ribbon-and-logo marks are trademarks — using them to promote a token
 * without a licence is infringement even when the donation is real, and
 * large children's-cancer charities have had to publicly disown tokens that
 * did exactly this.
 *
 * So: `agreement.signed` is the gate. While it is false this file may state
 * that these organisations exist and do this work — that is public fact — but
 * the site must not present any of them as a partner, must not show a logo or
 * mark, and must say plainly that nobody has agreed to anything. The moment a
 * written agreement exists, set `signed`, fill `chosen`, and the page names
 * one organisation and stops hedging.
 */

export type Candidate = {
  /** Legal or commonly published name. Never abbreviated on the page. */
  name: string;
  city: string;
  /** Their own site. The only link the page offers — donate there directly. */
  url: string;
  /** One line, factual, from their own public description of their work. */
  work: string;
  /**
   * IRS Employer Identification Number. Left null on purpose: an EIN printed
   * from memory is worse than no EIN at all. Fill each one from the IRS Tax
   * Exempt Organization Search before it ships, or leave it null and the row
   * renders "verify".
   */
  ein: string | null;
};

/**
 * US organisations funding childhood-cancer research and family support.
 * Listed alphabetically, not ranked — this is the shortlist to pick from and
 * approach, not a claim that any of them is involved.
 *
 * Before naming one, check two things that are not in this file because they
 * change: whether the organisation accepts cryptocurrency at all, and what
 * its policy is on third-party fundraising and on use of its name. Several
 * large ones publish an explicit "we are not affiliated with any token"
 * notice; that is a hard no, not a negotiation.
 */
export const candidates: Candidate[] = [
  {
    name: "Alex's Lemonade Stand Foundation",
    city: "Wynnewood, Pennsylvania",
    url: "https://www.alexslemonade.org",
    work: "Funds childhood cancer research grants and travel and lodging for families in treatment.",
    ein: null,
  },
  {
    name: "American Childhood Cancer Organization",
    city: "Beltsville, Maryland",
    url: "https://www.acco.org",
    work: "Support and advocacy for children with cancer and their families.",
    ein: null,
  },
  {
    name: "Children's Cancer Research Fund",
    city: "Minneapolis, Minnesota",
    url: "https://childrenscancer.org",
    work: "Grants for childhood cancer research and for survivorship care.",
    ein: null,
  },
  {
    name: "National Pediatric Cancer Foundation",
    city: "Tampa, Florida",
    url: "https://nationalpcf.org",
    work: "Funds a collaborative trial network aimed at faster, less toxic treatments.",
    ein: null,
  },
  {
    name: "St. Jude Children's Research Hospital",
    city: "Memphis, Tennessee",
    url: "https://www.stjude.org",
    work: "Treats and researches childhood catastrophic disease; families are never billed.",
    ein: null,
  },
];

/**
 * The signed relationship. Everything here is null until there is paper.
 *
 * `chosen` must be the exact `name` of one entry in `candidates`, and
 * `signed` must not be flipped on the strength of an email — the whole point
 * of this gate is that it corresponds to a document.
 */
export const agreement = {
  signed: process.env.NEXT_PUBLIC_GOLDRIBBON_AGREEMENT_SIGNED === "true",
  chosen: process.env.NEXT_PUBLIC_GOLDRIBBON_RECIPIENT_NAME ?? null,
  /** Public URL of the charity's own acknowledgement, once there is one. */
  acknowledgementUrl:
    process.env.NEXT_PUBLIC_GOLDRIBBON_ACKNOWLEDGEMENT_URL ?? null,
} as const;

export const namedRecipient: Candidate | null = agreement.signed
  ? (candidates.find((c) => c.name === agreement.chosen) ?? null)
  : null;

/**
 * Printed under any mention of a charity while `signed` is false. It is not
 * boilerplate — it is the accurate description of the current state.
 */
export const NO_AFFILIATION =
  "No organisation named on this page has endorsed, approved or is affiliated with this project. None has been asked for the use of its name or marks, and none has received anything. The recipient will be fixed in writing before the vault is deployed.";

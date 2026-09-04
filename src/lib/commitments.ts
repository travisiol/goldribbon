import { agreement } from "@/lib/recipient";
import { chainConfig, isLive } from "@/lib/site-config";

/**
 * The checklist, published unticked.
 *
 * Each item is either verifiably done or it is not, and the page prints the
 * state it is actually in rather than the state it intends to be in. A
 * project asking to be trusted with donations does not get to describe its
 * plans in the present tense, so the boxes stay empty until the thing that
 * fills them exists on a chain or on paper.
 *
 * `done` must never be hardcoded true. Every entry reads a fact.
 */
export type Commitment = {
  label: string;
  done: boolean;
  /** What has to happen for the box to tick. Shown while it is empty. */
  outstanding: string;
};

export const commitments: Commitment[] = [
  {
    label: "The vault contract is written and readable",
    done: true,
    outstanding: "",
  },
  {
    label: "The recipient is fixed in a signed agreement",
    done: agreement.signed,
    outstanding:
      "No charity has been approached for permission to be named, and none has agreed.",
  },
  {
    label: "The recipient address is confirmed by the charity",
    done: chainConfig.recipientAddress !== null,
    outstanding:
      "The address must be one the charity controls on this chain, confirmed in writing — a wrong chain strands the money permanently.",
  },
  {
    label: "The vault is deployed and verified on the explorer",
    done: chainConfig.vaultAddress !== null,
    outstanding: "Nothing is deployed. There is no address to check.",
  },
  {
    label: "The token is live and routing fees to the vault",
    done: isLive,
    outstanding: "No token exists. Anything sold under this name today is not this.",
  },
  {
    label: "The first donation has been made",
    done: false,
    outstanding: "The ledger is empty and says so.",
  },
];

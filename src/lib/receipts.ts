/**
 * The donation ledger.
 *
 * READ THIS BEFORE ADDING A ROW.
 *
 * Everything in this array is printed on the page as fact, in gold, under the
 * word "donated". A row therefore requires a transaction hash that resolves
 * on a public explorer and shows the vault paying the recipient address in
 * `chainConfig.recipientAddress`. Not a screenshot, not a pending transfer,
 * not a planned one.
 *
 * There is no seed data and no demo mode here on purpose. A placeholder row
 * on a charity ledger is a fabricated donation, and it would be indefensible
 * whatever the comment next to it said. The empty state is the honest state
 * until the first release lands, and the page is built to look right empty.
 */
export type Receipt = {
  /** Matches the `index` in the vault's `Released` event. */
  index: number;
  /** ISO date of the transaction, UTC. */
  date: string;
  /** Value at the time of the transfer, in USD. */
  amountUsd: number;
  /** Native amount as sent, as a decimal string. */
  amount: string;
  symbol: string;
  txHash: `0x${string}`;
  /** The charity's own acknowledgement, once received. Null until then. */
  acknowledgementUrl: string | null;
};

export const receipts: Receipt[] = [];

export const totalDonatedUsd = receipts.reduce(
  (sum, receipt) => sum + receipt.amountUsd,
  0,
);

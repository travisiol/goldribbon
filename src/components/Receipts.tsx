import { receipts, totalDonatedUsd } from "@/lib/receipts";
import { releaseConfig, usd } from "@/lib/vault";
import { explorerTx } from "@/lib/chain";
import { RibbonMark } from "@/components/Ribbon";

/*
 * The ledger, designed empty first.
 *
 * A charity page that only looks finished once it has rows is a page that
 * will be tempted to invent one. So the zero state carries the section: it
 * states what a row must contain before it can appear, which is a stronger
 * claim than any row would be on its own.
 */
export function Receipts() {
  const hasRows = receipts.length > 0;

  return (
    <section id="receipts" className="shell py-20 md:py-28">
      <div className="reveal flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="type-label">Public ledger</p>
          <h2 className="type-display mt-4 max-w-[18ch] text-balance">
            Every donation, with its hash.
          </h2>
        </div>
        <div className="text-right">
          <p className="type-label">Total donated</p>
          <p
            className={`mt-2 font-mono text-[28px] tabular-nums tracking-[-0.03em] ${
              hasRows ? "text-gold" : "text-ink"
            }`}
          >
            {usd(totalDonatedUsd, 2)}
          </p>
        </div>
      </div>

      <div className="reveal card mt-10 overflow-hidden">
        <div className="hidden grid-cols-[110px_1fr_1fr_120px] gap-4 border-b border-rule bg-paper-sunk px-6 py-3 md:grid">
          {["Date", "Amount", "Transaction", "Acknowledged"].map((h) => (
            <span key={h} className="type-label">
              {h}
            </span>
          ))}
        </div>

        {hasRows ? (
          <ul>
            {receipts.map((receipt) => (
              <li
                key={receipt.txHash}
                className="grid gap-2 border-b border-rule px-6 py-4 last:border-b-0 md:grid-cols-[110px_1fr_1fr_120px] md:items-baseline md:gap-4"
              >
                <span className="type-data text-ink-soft">{receipt.date}</span>
                <span className="font-mono text-[14px] tabular-nums text-gold">
                  {usd(receipt.amountUsd, 2)}
                  <span className="ml-2 text-ink-muted">
                    {receipt.amount} {receipt.symbol}
                  </span>
                </span>
                <a
                  href={explorerTx(receipt.txHash)}
                  target="_blank"
                  rel="noreferrer"
                  className="type-data truncate text-ink underline decoration-rule-strong underline-offset-4"
                >
                  {receipt.txHash}
                </a>
                {receipt.acknowledgementUrl ? (
                  <a
                    href={receipt.acknowledgementUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="type-data text-ink underline decoration-rule-strong underline-offset-4"
                  >
                    Letter
                  </a>
                ) : (
                  <span className="type-data text-ink-muted">Pending</span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center gap-5 px-6 py-16 text-center">
            <RibbonMark className="h-10 w-[30px] text-rule-strong" />
            <p className="type-title max-w-[28ch] text-balance">
              No donation has been made yet.
            </p>
            <p className="type-body max-w-[52ch]">
              This table is rendered from a file that is empty. It has no seed
              rows, no sample data and no preview mode — the first entry will
              appear when the first release transaction confirms, and not one
              hour before.
            </p>
          </div>
        )}
      </div>

      <ul className="reveal mt-8 grid gap-4 md:grid-cols-3">
        {[
          [
            "A hash or it did not happen",
            "Every row links to a transaction on the block explorer showing the vault paying the recipient address printed on this page.",
          ],
          [
            "On a schedule you can skip",
            `We call release() on ${releaseConfig.cadence}. Anyone impatient can call it sooner; the contract does not ask who is asking.`,
          ],
          [
            "The charity's own word",
            "Where the recipient issues an acknowledgement, it is linked in the last column. Until it arrives the row says pending, not acknowledged.",
          ],
        ].map(([title, body]) => (
          <li key={title} className="border-t border-rule-strong pt-4">
            <h3 className="text-[14px] font-medium tracking-[-0.015em]">
              {title}
            </h3>
            <p className="type-fine mt-2">{body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

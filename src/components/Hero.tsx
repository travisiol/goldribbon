import { Ribbon } from "@/components/Ribbon";
import { ButtonLink } from "@/components/ui/Button";
import { isLive } from "@/lib/site-config";
import { receipts, totalDonatedUsd } from "@/lib/receipts";
import {
  RIBBON_LAP_USD,
  bpsToPercent,
  completedLaps,
  feeConfig,
  ribbonProgress,
  usd,
} from "@/lib/vault";

/*
 * The empty state is the point.
 *
 * Every other page in this genre opens with a number going up. This one opens
 * with three zeros and says why they are zero, because the first thing a
 * reader of a charity token needs to know is whether the counter is real. A
 * page that can be trusted at $0 is the only kind that can be trusted at
 * $100,000.
 */
export function Hero() {
  const laps = completedLaps(totalDonatedUsd);
  const progress = ribbonProgress(totalDonatedUsd);
  const hasDonated = totalDonatedUsd > 0;

  return (
    <section id="top" className="shell pt-14 pb-20 md:pt-24 md:pb-28">
      <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
        <div className="measure">
          <p className="type-label mb-7">
            Childhood cancer · {bpsToPercent(feeConfig.toRecipientBps)} of every fee
          </p>

          <h1 className="type-hero max-w-[15ch] text-balance">
            Every fee goes to kids with cancer.
          </h1>

          <p className="type-lead mt-7 max-w-[54ch]">
            The token charges {bpsToPercent(feeConfig.buyFeeBps)} on a trade.
            The whole {bpsToPercent(feeConfig.buyFeeBps)} lands in a vault that
            can pay exactly one address, has no owner and no withdrawal
            function, and whose payout anyone can trigger — including you, if
            you would rather not wait for us.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <ButtonLink href="#vault">Read the vault contract</ButtonLink>
            <ButtonLink href="#recipient" variant="outline">
              Where the money goes
            </ButtonLink>
          </div>

          <p className="type-fine mt-7 max-w-[56ch] border-l border-rule-strong pl-4">
            {isLive
              ? "Every figure on this page is read from the chain or from a published transaction."
              : "Nothing is deployed. No donation has been made, and no charity has agreed to anything. The figures on the right are zero because they are real — there is no demo mode on this page and never will be."}
          </p>
        </div>

        <div className="flex flex-col items-center gap-9">
          <div className="relative">
            <Ribbon progress={progress} className="h-[230px] w-auto md:h-[280px]" />
            {hasDonated ? (
              <span className="type-label absolute -right-2 bottom-0 text-gold">
                {laps > 0 ? `${laps}× ${usd(RIBBON_LAP_USD, 0)}` : null}
              </span>
            ) : null}
          </div>

          <dl className="grid w-full max-w-[380px] grid-cols-3 gap-px overflow-hidden rounded-[7px] border border-rule bg-rule">
            <Figure
              label="Donated"
              value={usd(totalDonatedUsd, 0)}
              gold={hasDonated}
            />
            <Figure label="Receipts" value={String(receipts.length)} />
            <Figure label="In vault" value={isLive ? "—" : "—"} />
          </dl>

          <p className="type-fine max-w-[380px] text-center">
            The ribbon fills once per {usd(RIBBON_LAP_USD, 0)} donated. It is a
            display, not a target — nothing in the contract changes at the line.
          </p>
        </div>
      </div>
    </section>
  );
}

function Figure({
  label,
  value,
  gold = false,
}: {
  label: string;
  value: string;
  gold?: boolean;
}) {
  return (
    <div className="bg-paper-raised px-3 py-4 text-center">
      <dt className="type-label">{label}</dt>
      <dd
        className={`mt-2 font-mono text-[19px] tabular-nums tracking-[-0.02em] ${
          gold ? "text-gold" : "text-ink"
        }`}
      >
        {value}
      </dd>
    </div>
  );
}

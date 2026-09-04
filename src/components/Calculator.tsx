"use client";

import { useState } from "react";
import { bpsToPercent, donationOnTrade, feeConfig, usd } from "@/lib/vault";

/*
 * The only moving thing on the page.
 *
 * There is a real temptation on a site like this to open with a counter that
 * ticks — it looks alive and it converts. Every version of that is a
 * fabricated donation figure, so instead the motion comes from arithmetic the
 * reader drives themselves: they type a number they recognise, and the page
 * multiplies. Nothing here is a projection or a promise about volume.
 */

const PRESETS = [1_000, 25_000, 250_000, 1_000_000];

export function Calculator() {
  const [volume, setVolume] = useState(250_000);

  const perDay = donationOnTrade(volume);
  const perMonth = perDay * 30;
  const perYear = perDay * 365;

  return (
    <section className="shell py-20 md:py-28">
      <div className="reveal grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <p className="type-label">The arithmetic</p>
          <h2 className="type-display mt-4 max-w-[16ch] text-balance">
            What a day of trading pays for.
          </h2>
          <p className="type-lead mt-5 max-w-[48ch]">
            Move the number to a daily volume you find plausible. The rest is
            multiplication — {bpsToPercent(feeConfig.buyFeeBps)} of it, all of
            which is donated.
          </p>
          <p className="type-fine mt-6 max-w-[48ch]">
            This is a calculator, not a forecast. We have no idea what the
            volume will be, and neither does anyone else who tells you.
          </p>
        </div>

        <div className="card p-6 md:p-8">
          <label
            htmlFor="volume"
            className="type-label block"
          >
            Daily trading volume
          </label>

          <output
            htmlFor="volume"
            className="type-figure mt-3 block text-ink"
          >
            {usd(volume, 0)}
          </output>

          <input
            id="volume"
            type="range"
            min={1_000}
            max={2_000_000}
            step={1_000}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="mt-6 w-full accent-[var(--ink)]"
          />

          <div className="mt-4 flex flex-wrap gap-2">
            {PRESETS.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setVolume(preset)}
                className={`pill type-label transition-colors ${
                  volume === preset
                    ? "bg-ink text-paper"
                    : "text-ink-soft hover:bg-paper-sunk"
                }`}
              >
                {usd(preset, 0)}
              </button>
            ))}
          </div>

          <dl className="mt-8 border-t border-rule pt-6">
            {[
              ["Donated that day", perDay],
              ["Over a month", perMonth],
              ["Over a year", perYear],
            ].map(([label, value]) => (
              <div
                key={label as string}
                className="flex items-baseline justify-between gap-4 border-b border-rule py-3 last:border-b-0"
              >
                <dt className="type-body text-ink">{label as string}</dt>
                <dd className="font-mono text-[16px] tabular-nums tracking-[-0.02em] text-ink">
                  {usd(value as number, 0)}
                </dd>
              </div>
            ))}
          </dl>

          <p className="type-fine mt-5">
            Figures are ink, not gold. On this site gold is reserved for money
            that has actually left the vault.
          </p>
        </div>
      </div>
    </section>
  );
}

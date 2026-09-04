import { ReleaseButton } from "@/components/ReleaseButton";
import { bpsToPercent, feeConfig, releaseConfig } from "@/lib/vault";
import { chainConfig, isLive } from "@/lib/site-config";
import { explorerAddress, shortAddress, chain } from "@/lib/chain";

/*
 * The mechanism section, and the only dark surface on the site — code belongs
 * on a terminal, and reserving the dark panel for it means the eye lands on
 * the contract rather than on a headline about the contract.
 *
 * The excerpt is not decorative. It is the three lines a sceptical reader
 * would go looking for, in the order they would look for them: where can the
 * money go, who can change that, and who is allowed to press the button.
 */

const CODE: { text: string; dim?: boolean }[] = [
  { text: "// The only address this contract can ever pay.", dim: true },
  { text: "address payable public immutable recipient;" },
  { text: "" },
  { text: "constructor(address payable recipient_) {" },
  { text: "    if (recipient_ == address(0)) revert ZeroRecipient();" },
  { text: "    recipient = recipient_;" },
  { text: "}" },
  { text: "" },
  { text: "// Unguarded on purpose. Anyone may call this.", dim: true },
  { text: "function release() external returns (uint256 amount) {" },
  { text: "    amount = address(this).balance;" },
  { text: "    if (amount == 0) revert NothingToRelease();" },
  { text: "" },
  { text: "    totalReleased += amount;" },
  { text: "    releaseCount  += 1;" },
  { text: "    emit Released(releaseCount, amount, block.timestamp);" },
  { text: "" },
  { text: "    (bool ok, ) = recipient.call{value: amount}(\"\");" },
  { text: "    if (!ok) revert TransferFailed();" },
  { text: "}" },
];

const NOTES = [
  {
    n: "01",
    title: "One destination, written once",
    body: "`recipient` is immutable — set in the constructor and impossible to change afterwards. There is no setter, not even an owner-only one, because there is no owner.",
  },
  {
    n: "02",
    title: "No way out but forward",
    body: "There is no withdraw, no sweep, no rescue function. The two functions that move value both send the full balance to `recipient`. Money that enters this contract has exactly one exit.",
  },
  {
    n: "03",
    title: "You can press it yourself",
    body: `release() is external and unguarded, so the payout does not depend on us being around, solvent or willing. We commit to calling it on ${releaseConfig.cadence}; you never have to take that on trust.`,
  },
];

export function VaultSection() {
  return (
    <section id="vault" className="shell py-20 md:py-28">
      <div className="reveal">
        <p className="type-label">The mechanism</p>
        <h2 className="type-display mt-4 max-w-[20ch] text-balance">
          The fee is the donation.
        </h2>
        <p className="type-lead mt-5 max-w-[62ch]">
          Not a share of the fee. Not the fee after costs. There is no treasury
          wallet, no marketing allocation and no split — the number the token
          collects and the number the charity receives are the same number.
        </p>
      </div>

      <ol className="reveal mt-12 grid gap-px overflow-hidden rounded-[7px] border border-rule bg-rule md:grid-cols-3">
        {[
          [
            "A trade pays " + bpsToPercent(feeConfig.buyFeeBps),
            "Charged on buys and on sells, symmetrically, so the fee cannot be dodged by choosing a direction.",
          ],
          [
            "The vault holds it",
            "The fee goes straight to the vault contract. It is never routed through a wallet a person controls.",
          ],
          [
            "release() pays it out",
            "The full balance goes to the recipient address burned into the contract at deployment.",
          ],
        ].map(([title, body], i) => (
          <li key={title} className="bg-paper-raised p-6">
            <span className="type-label">Step {i + 1}</span>
            <h3 className="type-title mt-3">{title}</h3>
            <p className="type-body mt-2">{body}</p>
          </li>
        ))}
      </ol>

      <div className="reveal slab mt-12 overflow-hidden md:mt-16">
        <div className="grid gap-10 p-6 md:grid-cols-[1.1fr_0.9fr] md:gap-12 md:p-10">
          <div>
            <div className="mb-5 flex items-baseline justify-between gap-4 border-b border-slate-line pb-4">
              <span className="type-data text-slate-muted">
                contracts/FeeVault.sol
              </span>
              <span className="type-label text-slate-muted">
                excerpt · full file in the repo
              </span>
            </div>
            <pre className="overflow-x-auto font-mono text-[12.5px] leading-[1.75] tabular-nums">
              <code>
                {CODE.map((line, i) => (
                  <div
                    key={i}
                    className={line.dim ? "text-slate-muted" : "text-slate-ink"}
                  >
                    {line.text || " "}
                  </div>
                ))}
              </code>
            </pre>
          </div>

          <div className="flex flex-col justify-between gap-8">
            <ul className="space-y-7">
              {NOTES.map((note) => (
                <li key={note.n} className="grid grid-cols-[34px_1fr] gap-3">
                  <span className="type-label pt-1 text-slate-muted">
                    {note.n}
                  </span>
                  <div>
                    <h3 className="text-[15px] font-medium tracking-[-0.015em] text-slate-ink">
                      {note.title}
                    </h3>
                    <p className="mt-1.5 text-[13.5px] leading-[1.6] text-slate-muted">
                      {note.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-slate-line pt-6">
              <p className="type-label text-slate-muted">Vault address</p>
              {chainConfig.vaultAddress ? (
                <a
                  href={explorerAddress(chainConfig.vaultAddress)}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 block font-mono text-[13px] text-slate-ink underline decoration-slate-line underline-offset-4"
                >
                  {shortAddress(chainConfig.vaultAddress)}
                </a>
              ) : (
                <p className="mt-2 font-mono text-[13px] text-slate-muted">
                  Not deployed — no address to show yet.
                </p>
              )}
              <p className="type-label mt-4 text-slate-muted">
                Network · {chain.name}
              </p>
              <div className="mt-5">
                <ReleaseButton />
              </div>
              <p className="mt-3 text-[12px] leading-[1.5] text-slate-muted">
                {isLive
                  ? "Sends the vault's whole balance to the recipient. You pay the gas; you receive nothing."
                  : "Enabled once the vault is deployed. It will pay the charity, not you — the contract has no path back to the caller."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

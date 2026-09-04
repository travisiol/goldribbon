import { bpsToPercent, feeConfig, releaseConfig } from "@/lib/vault";
import { siteConfig } from "@/lib/site-config";

/*
 * The questions a sceptic asks, answered as a sceptic would want them
 * answered. The first one is the accusation, not a warm-up — a page that
 * ducks "isn't this just a memecoin with a cause bolted on" has answered it.
 *
 * Native <details>, so it works with JavaScript off and costs nothing.
 */
const QA: { q: string; a: string }[] = [
  {
    q: "Isn't this a memecoin with a cause bolted on?",
    a: "That describes most of the category, and the accusation is fair enough that it deserves a checkable answer rather than a denial. The difference is not sincerity, which cannot be verified. It is that the recipient address is immutable, there is no owner and no withdrawal function, the payout is callable by anyone, and every donation is published with a hash. Those are four properties you can check yourself in about five minutes, and if any of them stops being true, the project has failed its own test.",
  },
  {
    q: "How do I know you will actually send the money?",
    a: `You do not have to know. The vault's release() function is external and unguarded — any wallet can call it and pay the gas, and the money can only go to the recipient address. We commit to calling it on ${releaseConfig.cadence}, but that commitment is a convenience, not the mechanism. If we vanish, the fees still leave.`,
  },
  {
    q: "Is the charity involved in this?",
    a: "No. No organisation named on this site has been approached for permission, has agreed to anything, or has received anything. That is the legally correct state, not an oversight: in roughly half of US states, telling people that buying something benefits a named charity is a commercial co-venture and requires a signed agreement with that charity first. The name goes on the page when the agreement exists, and not before.",
  },
  {
    q: "Is my purchase tax-deductible?",
    a: "No. You are buying a token from a market, which is a purchase. The donation is made afterwards by the vault, and the deduction — if any — belongs to whoever is legally treated as the donor, which is not you. Anyone who tells you a token purchase is a write-off is either wrong or selling something.",
  },
  {
    q: `Why ${bpsToPercent(feeConfig.sellFeeBps)} on sells as well as buys?`,
    a: "Because a fee only on buys is a fee you can avoid by waiting, and it punishes exactly the people who arrived early and stayed. Charging both sides symmetrically means the donation tracks activity rather than direction, and it removes any incentive for us to talk about the price.",
  },
  {
    q: "Can the fee be changed later?",
    a: "The fee lives in the token contract, and the honest answer is that it depends on how that contract is deployed — a fee that can be raised can also be raised to 100%. Before launch the token's fee setter will be renounced or handed to a timelock, and the checklist on this page will say which, with an address. Until then, treat the rate as unfixed.",
  },
  {
    q: "What if the charity refuses to be named?",
    a: "Then it is not named, and the next organisation on the list is asked. Several large children's cancer charities have publicly disowned tokens that used their name without asking, and a refusal is a reasonable answer to an unreasonable request. If none of them agrees, the vault points at a donor-advised fund that grants to childhood-cancer research, and this page says exactly that instead of pretending.",
  },
  {
    q: "What happens to donations if the token dies?",
    a: "Nothing. Money that has left the vault has left. The ledger stays up, the transactions stay on chain, and a token that goes to zero after donating $40,000 has still donated $40,000. That is the one nice property of putting the charity first in the pipe rather than last.",
  },
  {
    q: "Who is behind this?",
    a: `Not yet published — and that has to change before launch, not after. Anonymity is normal in this space and disqualifying in this particular corner of it, because "anonymous team, charity branding, trust us" is the exact shape of the scams that made charities hostile to crypto in the first place. Identifiable operators and a named point of contact are a launch requirement on the checklist${siteConfig.contact ? `; until then, ${siteConfig.contact}` : "."}`,
  },
];

export function Faq() {
  return (
    <section id="faq" className="shell py-20 md:py-28">
      <div className="reveal grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
        <div>
          <p className="type-label">Questions</p>
          <h2 className="type-display mt-4 max-w-[12ch] text-balance">
            The awkward ones.
          </h2>
        </div>

        <div className="border-t border-rule">
          {QA.map((item) => (
            <details key={item.q} className="group border-b border-rule">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5">
                <span className="text-[16px] font-medium tracking-[-0.018em]">
                  {item.q}
                </span>
                <span
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-ink-muted transition-transform duration-200 group-open:rotate-45"
                >
                  <svg viewBox="0 0 14 14" className="h-[14px] w-[14px]" fill="none">
                    <path
                      d="M7 1v12M1 7h12"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </summary>
              <p className="type-body max-w-[68ch] pb-6 pr-10">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

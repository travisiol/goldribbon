# GOLDRIBBON

A token whose trading fees are donated, in full, to childhood-cancer work.

The idea is one sentence and the implementation is deliberately small enough
to audit in an afternoon: a fee is charged on every trade, the whole fee goes
to a vault contract, and that vault can pay exactly one address — an address
written once at deployment, with no setter, no owner and no withdrawal
function. The payout call is unguarded, so anyone can push the money out.

Nothing is deployed. No charity has agreed to anything. The site says so on
every screen, and there is no demo data anywhere in it.

---

## Read this before doing anything else

**Naming a US charity as the beneficiary of something you sell is regulated.**
Roughly half of US states treat "buy this and a share goes to X" as a
*commercial co-venture*: it requires a written agreement with the charity
before the claim is made, and in several states registration or a bond as
well. Separately, a charity's name, logo and ribbon marks are trademarks —
using them to promote a token without a licence is infringement even when the
donation is completely real. Large children's-cancer charities have had to
publicly disown tokens that used their name without asking, which is why some
of them are hostile to crypto fundraising in general.

So the order of operations is not negotiable:

1. Approach one organisation, in writing, and ask.
2. Get a signed agreement covering the use of the name and the mechanics.
3. Get a receiving address the charity controls **on the deployment chain**,
   confirmed in writing.
4. Only then set `NEXT_PUBLIC_GOLDRIBBON_AGREEMENT_SIGNED=true` and deploy.

Until step 2, `src/lib/recipient.ts` lists candidates and the page states
plainly that none of them has agreed to anything. That state is a feature.

**Also check with a lawyer**, not with this file: depending on how the token
is sold and described, US securities law, state charitable-solicitation
registration and money-transmission rules can all attach. "The fees go to
charity" does not exempt anything.

---

## The mechanism

`contracts/FeeVault.sol` is the whole trust argument, and it is under 100
lines so that claim is checkable.

| Property | Why it matters |
| --- | --- |
| `recipient` is `immutable` | Set in the constructor, no setter of any kind. Not owner-gated — absent. |
| No owner, no withdrawal | The only two functions that move value both send the full balance to `recipient`. |
| `release()` is unguarded | Anyone can call it and pay the gas. A donation cannot be stalled by a key holder. |
| Everything is evented | `Released(index, amount, timestamp)` is what the public ledger is built from. |

The `releaseToken(IERC20)` twin exists because fees may accrue in a
stablecoin. Same single destination.

### The constraint that is easy to get wrong

The vault pays on **its own chain and cannot bridge**. A charity's published
donation address is usually custodial and usually Ethereum-mainnet only;
sending to the same `0x…` on Base can strand the funds permanently. Either the
recipient confirms an address it controls on Base, or the token moves to the
chain the charity can actually receive on. See the comment at the top of
`src/lib/chain.ts`.

---

## The economics

All of it lives in `src/lib/vault.ts`, so there is one place to diff against
the deployed contract.

- **2% on buys, 2% on sells.** Symmetric, so the fee cannot be dodged by
  choosing a direction.
- **100% of the fee to the recipient.** `toRecipientBps` is `10_000`. If that
  is ever anything else, this is a different project and should be renamed.
- **Released on the first business day of each month** — a convenience, not
  the guarantee. The guarantee is that `release()` is permissionless.
- No treasury, no team allocation, no marketing wallet. Which also means the
  project funds nothing: deployment and gas come out of pocket and the vault
  never pays them back.

---

## Rules the code enforces

**The colour rule.** Gold means money that has actually left the vault. The
ribbon is gold because the gold ribbon is the childhood-cancer symbol and
predates everyone; everywhere else, gold has to be earned by a released
transaction. A `$0` total is ink. A pending balance is ink. It is written at
the top of `src/app/globals.css` and it is the reason the page looks
restrained at launch.

**No simulated ledger.** `src/lib/receipts.ts` is empty and has no demo mode.
A placeholder row on a charity ledger is a fabricated donation. The empty
state is designed to carry the section, and the hero says the zeros are real.

**The checklist ships unticked.** `src/lib/commitments.ts` reads facts —
whether an agreement exists, whether an address is set, whether the vault is
deployed. `done` is never hardcoded `true` except for the one item that is
genuinely done (the contract is written).

**`isLive` gates every present-tense claim.** It requires the flag *and* a
vault *and* a recipient. Before it flips, the site speaks in the future tense.

---

## Configuration

Copy `.env.example` to `.env.local`. Everything is unset by default and the
site is built to be correct in that state.

Renaming the project is three strings in `src/lib/site-config.ts` (`name`,
`wordmark`, `ticker`) plus the `NEXT_PUBLIC_GOLDRIBBON_*` env prefix,
`src/lib/goldribbonAbi.ts`, `package.json` and `.claude/launch.json`. Nothing
else spells the name out — do not grep-and-replace through components.

## Development

```bash
npm install
npm run dev     # http://localhost:3011
npm run build
```

Next 16 (App Router, Turbopack), Tailwind 4, wagmi 3 / viem 2. Injected
wallets only. No backend, no database, no analytics.

## Layout

```
contracts/FeeVault.sol      the whole trust argument
src/lib/site-config.ts      name, addresses, the isLive gate
src/lib/recipient.ts        candidates + the signed-agreement gate
src/lib/vault.ts            fee rates, cadence, arithmetic
src/lib/receipts.ts         the donation ledger (empty, deliberately)
src/lib/commitments.ts      the checklist, each item reading a real fact
src/app/globals.css         the colour rule, at the top
```

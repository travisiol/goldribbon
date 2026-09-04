import {
  NO_AFFILIATION,
  agreement,
  candidates,
  namedRecipient,
} from "@/lib/recipient";
import { chainConfig } from "@/lib/site-config";
import { explorerAddress, shortAddress } from "@/lib/chain";

/*
 * Where it goes — and the honest admission that, until there is paper, it
 * goes nowhere.
 *
 * The block that matters most here is the last one: telling a reader that the
 * fastest way to help is to donate directly, without us. A charity project
 * that will not say that is selling the charity, not funding it.
 */
export function Recipient() {
  return (
    <section id="recipient" className="shell py-20 md:py-28">
      <div className="reveal">
        <p className="type-label">The recipient</p>
        <h2 className="type-display mt-4 max-w-[20ch] text-balance">
          {namedRecipient
            ? `Every release pays ${namedRecipient.name}.`
            : "Nobody has agreed to anything yet."}
        </h2>
      </div>

      {namedRecipient ? (
        <div className="reveal card mt-10 p-6 md:p-10">
          <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
            <div>
              <h3 className="type-title">{namedRecipient.name}</h3>
              <p className="type-body mt-1">{namedRecipient.city}</p>
              <p className="type-body mt-4 max-w-[52ch]">
                {namedRecipient.work}
              </p>
              <a
                href={namedRecipient.url}
                target="_blank"
                rel="noreferrer"
                className="type-data mt-5 inline-block text-ink underline decoration-rule-strong underline-offset-4"
              >
                {namedRecipient.url.replace("https://", "")}
              </a>
            </div>
            <div className="border-t border-rule pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0">
              <p className="type-label">Recipient address</p>
              {chainConfig.recipientAddress ? (
                <a
                  href={explorerAddress(chainConfig.recipientAddress)}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 block font-mono text-[13px] underline decoration-rule-strong underline-offset-4"
                >
                  {shortAddress(chainConfig.recipientAddress)}
                </a>
              ) : (
                <p className="type-data mt-2 text-ink-muted">Not set</p>
              )}
              <p className="type-fine mt-4">
                This is the address burned into the vault at deployment. Read
                <code className="mx-1 font-mono">recipient()</code>
                on the vault and check it matches.
              </p>
              {agreement.acknowledgementUrl ? (
                <a
                  href={agreement.acknowledgementUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="type-data mt-4 inline-block underline decoration-rule-strong underline-offset-4"
                >
                  The written agreement
                </a>
              ) : null}
            </div>
          </div>
        </div>
      ) : (
        <>
          <p className="type-lead reveal mt-6 max-w-[64ch]">
            Naming a US charity as the beneficiary of something you sell is a
            regulated act, not a marketing decision. About half of US states
            treat it as a commercial co-venture and require a signed agreement
            with the charity before the claim can be made at all, and a
            charity&rsquo;s name and marks are trademarks besides. So the
            recipient is not named here yet. These are the organisations under
            consideration — publicly known, US-based, working on childhood
            cancer — and none of them has been given anything or asked for
            anything.
          </p>

          <ul className="reveal mt-10 grid gap-px overflow-hidden rounded-[7px] border border-rule bg-rule md:grid-cols-2">
            {candidates.map((candidate) => (
              <li key={candidate.name} className="bg-paper-raised p-6">
                <h3 className="text-[15px] font-medium tracking-[-0.015em]">
                  {candidate.name}
                </h3>
                <p className="type-fine mt-1">{candidate.city}</p>
                <p className="type-body mt-3">{candidate.work}</p>
                <a
                  href={candidate.url}
                  target="_blank"
                  rel="noreferrer"
                  className="type-data mt-4 inline-block text-ink underline decoration-rule-strong underline-offset-4"
                >
                  {candidate.url.replace("https://", "")}
                </a>
              </li>
            ))}
          </ul>

          <p className="type-fine reveal mt-8 max-w-[70ch] border-l border-rule-strong pl-4">
            {NO_AFFILIATION}
          </p>
        </>
      )}

      <div className="reveal card mt-12 flex flex-col gap-4 border-gold/40 bg-gold-wash p-6 md:flex-row md:items-center md:justify-between md:p-8">
        <div>
          <h3 className="type-title">
            The fastest way to help is not to buy anything.
          </h3>
          <p className="type-body mt-2 max-w-[58ch]">
            Every organisation above takes donations directly, today, with no
            fee, no token and no us. If that is what you came here to do, go
            and do that instead — it is worth more per dollar than anything
            this project can route.
          </p>
        </div>
      </div>
    </section>
  );
}

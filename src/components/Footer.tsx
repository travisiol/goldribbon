import { RibbonMark } from "@/components/Ribbon";
import { siteConfig } from "@/lib/site-config";
import { NO_AFFILIATION, namedRecipient } from "@/lib/recipient";

export function Footer() {
  return (
    <footer className="border-t border-rule bg-paper-sunk">
      <div className="shell grid gap-10 py-14 md:grid-cols-[1.2fr_0.8fr] md:py-16">
        <div>
          <div className="flex items-center gap-2.5">
            <RibbonMark className="h-6 w-[18px] text-gold" />
            <span className="text-[15px] font-medium tracking-[-0.02em]">
              {siteConfig.wordmark}
            </span>
            <span className="type-data text-ink-muted">{siteConfig.ticker}</span>
          </div>
          <p className="type-body mt-4 max-w-[46ch]">{siteConfig.tagline}</p>
          {siteConfig.contact ? (
            <a
              href={`mailto:${siteConfig.contact}`}
              className="type-data mt-4 inline-block underline decoration-rule-strong underline-offset-4"
            >
              {siteConfig.contact}
            </a>
          ) : null}
        </div>

        <nav className="flex flex-col gap-3">
          {[
            ["The vault", "#vault"],
            ["Receipts", "#receipts"],
            ["Where it goes", "#recipient"],
            ["FAQ", "#faq"],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-[13px] text-ink-soft transition-colors hover:text-ink"
            >
              {label}
            </a>
          ))}
          {siteConfig.x ? (
            <a
              href={siteConfig.x}
              target="_blank"
              rel="noreferrer"
              className="text-[13px] text-ink-soft transition-colors hover:text-ink"
            >
              X
            </a>
          ) : null}
        </nav>
      </div>

      <div className="border-t border-rule">
        <div className="shell space-y-3 py-8">
          <p className="type-fine max-w-[86ch]">
            {namedRecipient
              ? `${siteConfig.wordmark} is an independent project. ${namedRecipient.name} is the recipient of the vault's donations under a written agreement; it does not operate, endorse or take responsibility for this project, the token or its market.`
              : NO_AFFILIATION}
          </p>
          <p className="type-fine max-w-[86ch]">
            Nothing on this page is an offer, solicitation or recommendation to
            buy or sell any asset, and nothing on it is financial, tax or legal
            advice. Buying a token is not a charitable donation and is not
            tax-deductible. Digital assets are volatile and can lose all of
            their value.
          </p>
          <p className="type-label pt-2">
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
        </div>
      </div>
    </footer>
  );
}

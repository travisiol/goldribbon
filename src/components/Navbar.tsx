import { RibbonMark } from "@/components/Ribbon";
import { siteConfig, isLive } from "@/lib/site-config";

/*
 * The status pill carries the one fact a visitor most needs and is least
 * likely to be told: whether any of this is running yet. It reads the same
 * gate as every claim on the page.
 */
export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper/85 backdrop-blur">
      <div className="shell flex h-[62px] items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-2.5">
          <RibbonMark className="h-6 w-[18px] text-gold" />
          <span className="text-[15px] font-medium tracking-[-0.02em]">
            {siteConfig.wordmark}
          </span>
          <span className="type-data hidden text-ink-muted sm:inline">
            {siteConfig.ticker}
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
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
        </nav>

        <span className="pill type-label">
          <span
            className={`h-[6px] w-[6px] rounded-full ${
              isLive ? "bg-gold-bright" : "bg-ink-muted"
            }`}
          />
          {isLive ? "Live" : "Awaiting launch"}
        </span>
      </div>
    </header>
  );
}

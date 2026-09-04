import { commitments } from "@/lib/commitments";

/*
 * Two halves, in this order on purpose: what is actually true today, then
 * what this thing is not. Both are the sort of copy a project writes at the
 * bottom in six-point grey; here they are a section, because on a page about
 * children with cancer the small print is the product.
 */

const NOT = [
  {
    title: "Buying this is not a donation",
    body: "You are buying a token. It is not a charitable gift, it is not tax-deductible, and no receipt is issued in your name. The donation is made later, by the vault, in its own name.",
  },
  {
    title: "This is not an investment",
    body: "No return is promised, implied or engineered. There is no revenue, no yield and no buyback. The price can go to zero, and the charity still keeps everything already sent.",
  },
  {
    title: "There is no cut for us",
    body: "The whole fee leaves. That also means this project funds no salaries and no marketing budget — deployment and gas are paid out of pocket, and the vault never pays them back.",
  },
];

export function Commitments() {
  const done = commitments.filter((c) => c.done).length;

  return (
    <section className="shell py-20 md:py-28">
      <div className="reveal grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <p className="type-label">Status</p>
          <h2 className="type-display mt-4 max-w-[16ch] text-balance">
            Published unticked.
          </h2>
          <p className="type-lead mt-5 max-w-[46ch]">
            A project asking to be trusted with other people&rsquo;s donations
            does not get to write its plans in the present tense. Here is the
            list, in the state it is genuinely in.
          </p>
          <p className="type-data mt-6 text-ink-muted">
            {done} of {commitments.length} complete
          </p>
        </div>

        <ul>
          {commitments.map((item) => (
            <li
              key={item.label}
              className="grid grid-cols-[26px_1fr] gap-4 border-b border-rule py-5 first:border-t first:border-rule"
            >
              <span
                aria-hidden="true"
                className={`mt-0.5 flex h-[18px] w-[18px] items-center justify-center rounded-[3px] border ${
                  item.done
                    ? "border-ink bg-ink text-paper"
                    : "border-rule-strong"
                }`}
              >
                {item.done ? (
                  <svg viewBox="0 0 12 12" className="h-[10px] w-[10px]" fill="none">
                    <path
                      d="M2.5 6.4 4.8 8.7 9.5 3.6"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : null}
              </span>
              <div>
                <h3
                  className={`text-[15px] font-medium tracking-[-0.015em] ${
                    item.done ? "text-ink" : "text-ink-soft"
                  }`}
                >
                  {item.label}
                </h3>
                {!item.done && item.outstanding ? (
                  <p className="type-fine mt-1.5">{item.outstanding}</p>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="reveal mt-20 grid gap-px overflow-hidden rounded-[7px] border border-rule bg-rule md:grid-cols-3">
        {NOT.map((item) => (
          <div key={item.title} className="bg-paper-raised p-6 md:p-7">
            <h3 className="type-title">{item.title}</h3>
            <p className="type-body mt-3">{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

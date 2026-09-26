const POINTS = [
  {
    title: "Digital",
    body: "No paper, boxes, or physical storage.",
  },
  {
    title: "Designed for longevity",
    body: "Built around distributed preservation technology.",
  },
  {
    title: "Simple",
    body: "No wallet, cryptocurrency, or technical knowledge required.",
  },
];

export function WhySection() {
  return (
    <section className="bg-surface border-y border-border px-5 py-14">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center text-2xl font-semibold tracking-tight text-ink sm:text-[1.7rem]">
          Your memories shouldn&apos;t depend on one phone, account, or company.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-[0.95rem] leading-relaxed text-muted">
          Phones break. Accounts disappear. Technology changes. Text Vault is
          exploring a different approach: preserving meaningful digital messages
          across decentralized infrastructure so they can remain available far
          into the future.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {POINTS.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-border bg-cream p-5"
            >
              <h3 className="mb-1.5 font-semibold text-ink">{p.title}</h3>
              <p className="text-sm text-muted">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

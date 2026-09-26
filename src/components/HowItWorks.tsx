const STEPS = [
  {
    n: "01",
    title: "Write",
    body: "Create your private digital message from your phone or computer.",
  },
  {
    n: "02",
    title: "Preserve",
    body: "Text Vault is being designed to preserve messages using distributed digital infrastructure rather than relying on one device or server.",
  },
  {
    n: "03",
    title: "Discover",
    body: "The person you choose can access your message years into the future.",
  },
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-14" id="how">
      <h2 className="text-center text-2xl font-semibold tracking-tight text-ink sm:text-[1.7rem]">
        Three quiet steps toward words that last.
      </h2>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {STEPS.map((s) => (
          <div
            key={s.n}
            className="rounded-2xl border border-border bg-surface p-5 shadow-sm"
          >
            <div className="mb-3 text-xs font-bold tracking-widest text-terracotta">
              {s.n}
            </div>
            <h3 className="mb-2 text-lg font-semibold text-ink">{s.title}</h3>
            <p className="text-sm leading-relaxed text-muted">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

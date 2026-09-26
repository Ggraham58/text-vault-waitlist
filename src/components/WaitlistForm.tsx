"use client";

import { useMemo, useState } from "react";
import {
  DEFAULT_USE_CASE_BY_VARIANT,
  PRICING_OPTIONS,
  USE_CASES,
  type Variant,
} from "@/lib/constants";
import { trackEvent } from "@/lib/tracking";

type Props = {
  variant: Variant;
  heading?: string;
  subheading?: string;
};

type Step = 1 | 2 | 3 | "done";

export function WaitlistForm({
  variant,
  heading = "Join early access",
  subheading = "Be first to write and preserve a message when Text Vault opens.",
}: Props) {
  const defaultUseCase = useMemo(() => {
    if (variant === "hub") return "";
    return DEFAULT_USE_CASE_BY_VARIANT[variant];
  }, [variant]);

  const [step, setStep] = useState<Step>(1);
  const [email, setEmail] = useState("");
  const [useCase, setUseCase] = useState(defaultUseCase);
  const [comment, setComment] = useState("");
  const [pricing, setPricing] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submitAll() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          use_case: useCase,
          comment: useCase === "something_else" ? comment : null,
          pricing_response: pricing,
          variant,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }
      trackEvent("waitlist_submit", variant, {
        use_case: useCase,
        pricing_response: pricing,
      });
      setStep("done");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section id="early-access" className="mx-auto max-w-3xl px-5 py-14">
      <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
        {step === "done" ? (
          <div className="text-center py-4">
            <h2 className="text-2xl font-semibold text-ink">You&apos;re on the list.</h2>
            <p className="mt-3 text-muted">
              We&apos;ll reach out at <strong className="text-ink">{email}</strong> when
              early access opens. Thank you for helping shape Text Vault.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6 text-center">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-terracotta">
                Step {step} of 3
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-ink">
                {heading}
              </h2>
              <p className="mt-2 text-sm text-muted">{subheading}</p>
            </div>

            {step === 1 && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!email.trim()) return;
                  setStep(2);
                }}
                className="space-y-4"
              >
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-ink">
                    Email
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-border bg-cream px-4 py-3 text-ink outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/20"
                  />
                </label>
                <button
                  type="submit"
                  className="w-full rounded-full bg-terracotta px-6 py-3.5 font-semibold text-white shadow-md transition hover:bg-terracotta-hover"
                >
                  Continue
                </button>
              </form>
            )}

            {step === 2 && (
              <div className="space-y-3">
                <p className="text-sm font-medium text-ink">
                  What would you most want to preserve?
                </p>
                <div className="grid gap-2">
                  {USE_CASES.map((uc) => (
                    <button
                      key={uc.id}
                      type="button"
                      onClick={() => {
                        setUseCase(uc.id);
                        trackEvent("use_case_selected", variant, {
                          use_case: uc.id,
                        });
                      }}
                      className={`rounded-xl border px-4 py-3 text-left text-sm transition ${
                        useCase === uc.id
                          ? "border-terracotta bg-soft text-ink"
                          : "border-border bg-cream text-ink hover:border-terracotta/60"
                      }`}
                    >
                      {uc.label}
                    </button>
                  ))}
                </div>
                {useCase === "something_else" && (
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Optional — tell us more"
                    rows={3}
                    className="mt-2 w-full rounded-xl border border-border bg-cream px-4 py-3 text-sm text-ink outline-none focus:border-terracotta"
                  />
                )}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="rounded-full border border-border bg-surface px-5 py-3 text-sm font-medium text-ink"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    disabled={!useCase}
                    onClick={() => setStep(3)}
                    className="flex-1 rounded-full bg-terracotta px-6 py-3 font-semibold text-white disabled:opacity-50"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-3">
                <p className="text-sm font-medium text-ink">
                  What would you pay for long-term message preservation?
                </p>
                <p className="text-xs text-muted">
                  Nothing is charged now — this helps us price thoughtfully.
                </p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {PRICING_OPTIONS.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => {
                        setPricing(p.id);
                        trackEvent("pricing_response", variant, {
                          pricing_response: p.id,
                        });
                      }}
                      className={`rounded-xl border px-3 py-3 text-sm font-medium transition ${
                        pricing === p.id
                          ? "border-terracotta bg-soft text-ink"
                          : "border-border bg-cream text-ink hover:border-terracotta/60"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
                {error ? (
                  <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                    {error}
                  </p>
                ) : null}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    disabled={busy}
                    className="rounded-full border border-border bg-surface px-5 py-3 text-sm font-medium text-ink"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    disabled={!pricing || busy}
                    onClick={submitAll}
                    className="flex-1 rounded-full bg-terracotta px-6 py-3 font-semibold text-white disabled:opacity-50"
                  >
                    {busy ? "Saving…" : "Join early access"}
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

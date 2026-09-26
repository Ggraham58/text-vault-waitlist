"use client";

import type { Variant } from "@/lib/constants";
import { trackEvent } from "@/lib/tracking";
import { HeroVideo } from "./HeroVideo";

type Props = {
  variant: Variant;
  headline: string;
  subhead: string;
  ctaLabel?: string;
  proof?: string;
  showVideo?: boolean;
  videoPosterLabel?: string;
};

export function LandingHero({
  variant,
  headline,
  subhead,
  ctaLabel = "Join early access",
  proof,
  showVideo = false,
  videoPosterLabel,
}: Props) {
  function onCta() {
    trackEvent("hero_cta_click", variant);
    const el = document.getElementById("early-access");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section className="px-5 pb-6 pt-12 text-center sm:pt-16">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-[1.75rem] font-semibold leading-tight tracking-tight text-ink sm:text-[2.35rem]">
          {headline}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-[1.05rem] leading-relaxed text-muted">
          {subhead}
        </p>
        <div className="mt-7">
          <button
            type="button"
            onClick={onCta}
            className="inline-flex rounded-full bg-terracotta px-7 py-3.5 text-base font-semibold text-white shadow-md transition hover:bg-terracotta-hover"
          >
            {ctaLabel}
          </button>
        </div>
        {proof ? (
          <p className="mt-4 text-sm italic text-muted">{proof}</p>
        ) : null}
        {showVideo ? (
          <HeroVideo variant={variant} posterLabel={videoPosterLabel} />
        ) : null}
      </div>
    </section>
  );
}

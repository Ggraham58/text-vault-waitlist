import { Header } from "./Header";
import { Footer } from "./Footer";
import { HowItWorks } from "./HowItWorks";
import { WhySection } from "./WhySection";
import { WaitlistForm } from "./WaitlistForm";
import { LandingHero } from "./LandingHero";
import { TrackPageView } from "./TrackPageView";
import type { Variant } from "@/lib/constants";

export type LandingConfig = {
  variant: Exclude<Variant, "hub">;
  badge: string;
  headline: string;
  subhead: string;
  proof?: string;
  ctaLabel?: string;
  showVideo?: boolean;
  videoPosterLabel?: string;
  waitlistHeading?: string;
  waitlistSub?: string;
};

export function LandingPage(config: LandingConfig) {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <TrackPageView variant={config.variant} />
      <Header badge={config.badge} />
      <main>
        <LandingHero
          variant={config.variant}
          headline={config.headline}
          subhead={config.subhead}
          proof={config.proof}
          ctaLabel={config.ctaLabel}
          showVideo={config.showVideo}
          videoPosterLabel={config.videoPosterLabel}
        />
        <HowItWorks />
        <WhySection />
        <WaitlistForm
          variant={config.variant}
          heading={config.waitlistHeading}
          subheading={config.waitlistSub}
        />
      </main>
      <Footer />
    </div>
  );
}

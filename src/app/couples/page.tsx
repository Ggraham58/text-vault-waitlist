import type { Metadata } from "next";
import { LandingPage } from "@/components/LandingPage";

export const metadata: Metadata = {
  title: "For Couples",
  description:
    "A note that finds them on the day they need it. Preserve a private digital message for your partner.",
};

export default function CouplesPage() {
  return (
    <LandingPage
      variant="couples"
      badge="Couples"
      headline="A note that finds them on the day they need it."
      subhead="Preserve a private digital message for your partner — for an anniversary, a tough week, or years into the future. No physical box required."
      proof="Words that wait — designed for long-term preservation."
      ctaLabel="Join early access"
      showVideo={false}
      waitlistHeading="Join early access"
      waitlistSub="Tell us what you’d write for them. We’ll reach out when Text Vault opens."
    />
  );
}

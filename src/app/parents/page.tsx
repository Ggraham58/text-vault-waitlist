import type { Metadata } from "next";
import { LandingPage } from "@/components/LandingPage";

export const metadata: Metadata = {
  title: "For Parents",
  description:
    "Leave words that can outlast today. Write a private digital message for your child and preserve it for the future.",
};

export default function ParentsPage() {
  return (
    <LandingPage
      variant="parents"
      badge="Parents"
      headline="Leave words that can outlast today."
      subhead="Write a private digital message for someone you love — a child, a future self — and preserve it so they can discover it years from now."
      proof="Built for parents who want love to outlast a phone note."
      ctaLabel="Join early access"
      showVideo
      videoPosterLabel="Parents reel — tap to play"
      waitlistHeading="Join early access"
      waitlistSub="Tell us what you’d write first. We’ll reach out when Text Vault opens."
    />
  );
}

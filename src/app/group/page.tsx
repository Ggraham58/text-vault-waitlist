import type { Metadata } from "next";
import { LandingPage } from "@/components/LandingPage";

export const metadata: Metadata = {
  title: "Group Gift",
  description:
    "The group gift that unlocks on the big day. Collect messages into one shared digital vault.",
};

export default function GroupPage() {
  return (
    <LandingPage
      variant="group"
      badge="Group"
      headline="The group gift that unlocks on the big day."
      subhead="Collect messages from friends and family into one shared digital vault — for a wedding, birthday, graduation, or milestone. No magical wooden box."
      proof="A group of voices, preserved for one important day."
      ctaLabel="Join early access"
      showVideo={false}
      waitlistHeading="Join early access"
      waitlistSub="Tell us about the milestone you’d celebrate. We’ll reach out when Text Vault opens."
    />
  );
}

import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TrackPageView } from "@/components/TrackPageView";

const ARMS = [
  {
    href: "/parents",
    tag: "Parents",
    title: "Leave words that can outlast today.",
    body: "Write a private message for your child — preserved for a future they can discover.",
  },
  {
    href: "/couples",
    tag: "Couples",
    title: "A note that finds them on the day they need it.",
    body: "Preserve a private note for your partner — for an anniversary, a hard week, or years from now.",
  },
  {
    href: "/group",
    tag: "Group",
    title: "The group gift that unlocks on the big day.",
    body: "Collect messages from everyone into one shared vault for a wedding, birthday, or milestone.",
  },
];

export default function HubPage() {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <TrackPageView variant="hub" />
      <Header />
      <main className="mx-auto max-w-3xl px-5 py-12 sm:py-16">
        <div className="mb-10 flex flex-col items-center text-center">
          <Image
            src="/logo-selected.svg"
            alt="Text Vault monogram"
            width={72}
            height={72}
            className="mb-5 rounded-2xl border border-border shadow-sm"
            priority
          />
          <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Text Vault
          </h1>
          <p className="mt-3 max-w-lg text-[1.05rem] leading-relaxed text-muted">
            Write a private digital message for someone you love and preserve it
            for the future. Designed for long-term, decentralized preservation.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {ARMS.map((arm) => (
            <Link
              key={arm.href}
              href={arm.href}
              className="group flex flex-col rounded-2xl border border-border bg-surface p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-terracotta"
            >
              <span className="mb-2 text-[0.7rem] font-bold uppercase tracking-wider text-terracotta">
                {arm.tag}
              </span>
              <h2 className="mb-2 text-[1.05rem] font-semibold leading-snug tracking-tight text-ink">
                {arm.title}
              </h2>
              <p className="flex-1 text-sm leading-relaxed text-muted">
                {arm.body}
              </p>
              <span className="mt-4 text-sm font-semibold text-terracotta group-hover:underline">
                Open →
              </span>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

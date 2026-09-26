import Link from "next/link";
import Image from "next/image";

type Props = {
  badge?: string;
};

export function Header({ badge }: Props) {
  return (
    <header className="border-b border-border bg-surface/90 backdrop-blur-sm sticky top-0 z-40">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-3.5">
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <Image
            src="/logo-selected.svg"
            alt="Text Vault"
            width={36}
            height={36}
            className="rounded-lg border border-border"
            priority
          />
          <span className="text-[1.05rem] font-semibold tracking-tight text-ink">
            Text <span className="text-terracotta">Vault</span>
          </span>
        </Link>
        {badge ? (
          <span className="rounded-full bg-soft px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wider text-terracotta">
            {badge}
          </span>
        ) : null}
      </div>
    </header>
  );
}

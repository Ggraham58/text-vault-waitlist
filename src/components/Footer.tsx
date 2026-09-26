export function Footer() {
  return (
    <footer className="border-t border-border bg-cream px-5 py-10 text-center">
      <p className="mx-auto max-w-xl text-sm leading-relaxed text-muted">
        Text Vault is currently in development. Early-access registration does
        not guarantee permanent storage or future delivery. Soft claims only —
        designed for long-term, decentralized preservation.
      </p>
      <p className="mt-4 text-sm text-muted">
        Questions?{" "}
        <a
          href="mailto:hello@textvault.app"
          className="font-medium text-terracotta underline-offset-2 hover:underline"
        >
          hello@textvault.app
        </a>
      </p>
      <p className="mt-3 text-xs text-muted/80">© {new Date().getFullYear()} Text Vault</p>
    </footer>
  );
}

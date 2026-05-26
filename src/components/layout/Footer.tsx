import Link from "next/link";

import Container from "@/components/primitive/Container";

export default function Footer() {
  return (
    <footer className="relative z-20 bg-black border-t border-white/10 py-6 text-white/70 font-mono text-sm">
      <Container>
        <div className="flex justify-between items-center">
          <span>
            <span className="text-[var(--color-accent)]">$</span> echo
            &quot;LUG@UoA — University of Auckland&quot;
          </span>
          <div className="flex gap-4">
            <Link
              href="/about"
              className="hover:text-[var(--color-accent)] transition-colors"
            >
              about
            </Link>
            <Link
              href="/blog"
              className="hover:text-[var(--color-accent)] transition-colors"
            >
              blog
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

import Link from "next/link";
import Image from "next/image";

export default function NavBar() {
  return (
    <header className="absolute top-0 left-0 right-0 z-30 px-4 sm:px-6 lg:px-10 pt-6">
      <nav className="flex w-full justify-between items-center">
        {/* logo and wordmark */}
        <Link
          href="/"
          className="flex gap-2 items-center group"
          aria-label="LUG@UoA home"
        >
          <Image
            src="/logo.svg"
            alt="LUG@UoA emblem"
            width={64}
            height={64}
            priority
            className="h-14 w-auto sm:h-16 float"
          />
          <span className="font-mono font-bold text-white text-2xl sm:text-3xl tracking-tight transition-colors group-hover:text-[var(--color-accent)]">
            LUG@UoA
          </span>
        </Link>

      </nav>
    </header>
  );
}

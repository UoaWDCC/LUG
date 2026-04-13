import Link from "next/link";
import Image from "next/image";

import Container from "../primitive/Container";

export default function NavBar() {
  return (
    <header className="border-b border-black/5 shadow-sm">
      <Container>
        <nav className="flex w-full justify-between items-center py-4">
          {/* Logo and Title */}
          <Link href="/" className="flex gap-2">
            <Image
              src="/logo.svg"
              alt="UoA Linux User Group Logo"
              width={24}
              height={24}
              className="h-6 w-auto"
            />
            <span className="font-bold">UoA Linux User Group</span>
          </Link>

          <ul className="hidden lg:flex items-center gap-4 text-sm">
            <li>
              <Link href="/about">About Us</Link>
            </li>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}

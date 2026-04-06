import Link from "next/link";

import Container from "@/components/primitive/Container";

export default function Footer() {
  return (
    <footer className="bg-gray-200 border-t border-black/5 shadow-sm py-5">
        <Container>
            <div className="flex justify-between">
              <Link href="/about">
                About
              </Link>
            </div>
        </Container>
    </footer>
  );
}

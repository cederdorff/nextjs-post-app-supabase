"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Main navigation">
        <Link href="/" className={`nav-link ${pathname === "/" ? "active" : ""}`}>
          Home
        </Link>
        <Link
          href="/create"
          className={`nav-link ${pathname === "/create" ? "active" : ""}`}
        >
          Create
        </Link>
      </nav>
    </header>
  );
}

"use client";

import { Navbar } from "flowbite-react";
import Link from "next/link";

export default function Header() {
  return (
    <Navbar rounded border className="h-16 flex sticky top-0">
      <Link href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Project Zero
        </span>
      </Link>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

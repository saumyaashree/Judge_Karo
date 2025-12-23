
'use client';

import Link from "next/link";
import Logo from "./shared/Logo";
import { ThemeToggle } from "./ThemeToggle";

export default function Header() {

  return (
    <header className="bg-card border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between h-16 gap-4">
        <Logo />
        <div className="flex items-center gap-2">
            <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

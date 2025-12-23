
'use client';

import Link from "next/link";
import Logo from "./shared/Logo";
import { ThemeToggle } from "./ThemeToggle";
import SearchBar from "./SearchBar";

export default function Header() {

  return (
    <header className="bg-card border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between h-16 gap-4">
        <div>
            <Logo />
        </div>
        <div className="flex-1 flex justify-center px-8">
            <div className="w-full max-w-2xl">
                <SearchBar />
            </div>
        </div>
        <div>
            <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

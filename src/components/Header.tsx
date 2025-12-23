import Link from "next/link";
import { Button } from "./ui/button";
import Logo from "./shared/Logo";
import { SECTORS } from "@/lib/constants";

export default function Header() {
  return (
    <header className="bg-card border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Logo />
        <nav className="hidden md:flex items-center space-x-2">
          <Button variant="ghost" asChild>
            <Link href={`/${SECTORS.SMARTPHONES.id}`}>{SECTORS.SMARTPHONES.name}</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href={`/${SECTORS.EARPHONES.id}`}>{SECTORS.EARPHONES.name}</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href={`/${SECTORS.LAPTOPS.id}`}>{SECTORS.LAPTOPS.name}</Link>
          </Button>
        </nav>
        <div className="flex items-center">
            {/* Placeholder for Accessibility Toggle */}
           <Button variant="outline" size="sm" disabled>
                Accessibility Mode
            </Button>
        </div>
      </div>
    </header>
  );
}

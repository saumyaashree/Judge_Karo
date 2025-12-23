
import Link from "next/link";
import AffiliateDisclaimer from "./shared/AffiliateDisclaimer";
import Logo from "./shared/Logo";
import { SECTORS } from "@/lib/constants";
import { Button } from "./ui/button";

export default function Footer() {
  return (
    <footer className="bg-card border-t mt-16 py-8">
      <div className="container mx-auto px-4 text-muted-foreground">
        <div className="flex flex-col items-center space-y-6">
          <Logo />
           <nav className="flex flex-wrap justify-center items-center gap-x-2 gap-y-1">
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
          <AffiliateDisclaimer />
          <p className="text-sm">
            &copy; {new Date().getFullYear()} JudgeKaro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

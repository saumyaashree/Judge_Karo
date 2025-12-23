
import Link from "next/link";
import { Telescope } from "lucide-react";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2 group">
      <Telescope className="h-7 w-7 text-accent group-hover:animate-pulse" />
      <span className="font-bold text-xl font-headline text-foreground">
        JudgeKaro
      </span>
    </Link>
  );
}

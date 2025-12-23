
import Link from 'next/link';
import { Scale, Award, Flame, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function FeatureBar() {
  return (
    <div className="bg-black text-white sticky top-16 z-40">
      <nav className="container mx-auto px-4">
        <ul className="flex items-center justify-center -mb-px h-12 space-x-2 md:space-x-4 lg:space-x-8 text-sm font-medium">
          <FeatureLink href="/compare?products=pixel-8-pro,iphone-15-pro">
            <Scale />
            Compare Devices
          </FeatureLink>
          <FeatureLink href="#">
            <Award />
            Top 10 Devices
          </FeatureLink>
          <FeatureLink href="#">
            <Flame />
            Leaks & Rumours
          </FeatureLink>
          <FeatureLink href="#">
            <Zap />
            Upcoming Devices
          </FeatureLink>
        </ul>
      </nav>
    </div>
  );
}

function FeatureLink({ children, href }: { children: React.ReactNode, href: string }) {
    return (
         <li>
            <Button variant="ghost" asChild className="text-white/80 hover:text-white hover:bg-white/10 h-full">
                <Link href={href} className="flex items-center gap-2 px-2">
                    {children}
                </Link>
            </Button>
        </li>
    )
}

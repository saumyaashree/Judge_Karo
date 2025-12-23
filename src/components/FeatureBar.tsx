
import Link from 'next/link';
import { Scale, Award, Flame, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function FeatureBar() {
  return (
    <div className="bg-card/80 border-b backdrop-blur-sm sticky top-16 z-40">
      <nav className="container mx-auto px-4">
        <ul className="flex items-center justify-center -mb-px h-12 space-x-2 md:space-x-4 lg:space-x-8 text-sm font-medium">
          <FeatureLink href="#" icon={<Scale />}>
            Compare Devices
          </FeatureLink>
          <FeatureLink href="#" icon={<Award />}>
            Top 10 Devices
          </FeatureLink>
          <FeatureLink href="#" icon={<Flame />}>
            Leaks & Rumours
          </FeatureLink>
          <FeatureLink href="#" icon={<Zap />}>
            Upcoming Devices
          </FeatureLink>
        </ul>
      </nav>
    </div>
  );
}

function FeatureLink({ children, href, icon }: { children: React.ReactNode, href: string, icon: React.ReactNode }) {
    return (
         <li>
            <Button variant="ghost" asChild className="text-muted-foreground hover:text-primary h-full">
                <Link href={href} className="flex items-center gap-2 px-2">
                    {icon}
                    <span className="hidden md:inline">{children}</span>
                </Link>
            </Button>
        </li>
    )
}

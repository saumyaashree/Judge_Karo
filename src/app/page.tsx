import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Smartphone, Headphones, Laptop } from "lucide-react";
import { SECTORS } from "@/lib/constants";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-accent-foreground font-headline">
          Find the best product for{" "}
          <span className="text-accent">your life</span>
          <br />— not for a brand.
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
          No marketing fluff. No paid rankings. Just honest, use-case driven
          recommendations to help you find what truly works for you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl pt-8">
        <CtaCard
          sector={SECTORS.SMARTPHONES.id}
          title={SECTORS.SMARTPHONES.name}
          icon={<Smartphone className="w-12 h-12" />}
        />
        <CtaCard
          sector={SECTORS.EARPHONES.id}
          title={SECTORS.EARPHONES.name}
          icon={<Headphones className="w-12 h-12" />}
        />
        <CtaCard
          sector={SECTORS.LAPTOPS.id}
          title={SECTORS.LAPTOPS.name}
          icon={<Laptop className="w-12 h-12" />}
        />
      </div>
    </div>
  );
}

function CtaCard({
  sector,
  title,
  icon,
}: {
  sector: string;
  title: string;
  icon: React.ReactNode;
}) {
  return (
    <Card className="text-center hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="mx-auto text-accent">{icon}</div>
        <CardTitle className="font-headline mt-4">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Button asChild size="lg" className="w-full bg-accent hover:bg-accent/90">
          <Link href={`/${sector}`}>Find My {title.split(" ")[0]}</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

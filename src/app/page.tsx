import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Smartphone, Headphones, Laptop } from "lucide-react";
import { SECTORS } from "@/lib/constants";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground font-headline">
          Welcome to{" "}
          <span className="text-accent">JudgeKro</span>
          .
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
          Find what fits your use — not just specs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl pt-8">
        <CtaCard
          sector={SECTORS.SMARTPHONES.id}
          title={SECTORS.SMARTPHONES.name}
          buttonText="Find My Phone"
          icon={<Smartphone className="w-12 h-12" />}
        />
        <CtaCard
          sector={SECTORS.EARPHONES.id}
          title={SECTORS.EARPHONES.name}
          buttonText="Find My Audio"
          icon={<Headphones className="w-12 h-12" />}
        />
        <CtaCard
          sector={SECTORS.LAPTOPS.id}
          title={SECTORS.LAPTOPS.name}
          buttonText="Find My Laptop"
          icon={<Laptop className="w-12 h-12" />}
        />
      </div>

       <div className="pt-4">
          <p className="text-sm text-muted-foreground">
            No login. No tracking. Just recommendations.
          </p>
        </div>
    </div>
  );
}

function CtaCard({
  sector,
  title,
  icon,
  buttonText,
}: {
  sector: string;
  title: string;
  icon: React.ReactNode;
  buttonText: string;
}) {
  return (
    <Card className="text-center hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="mx-auto text-accent">{icon}</div>
        <CardTitle className="font-headline mt-4">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Button asChild size="lg" className="w-full bg-accent hover:bg-accent/90">
          <Link href={`/${sector}`}>{buttonText}</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

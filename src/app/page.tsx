
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Smartphone, Headphones, Laptop, Scale, ShieldCheck, Microscope } from "lucide-react";
import { SECTORS } from "@/lib/constants";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-16">
      
      {/* Hero Section */}
      <div className="space-y-4 w-full max-w-2xl pt-8">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground font-headline">
          Find what fits your use — <br /> not just the specs.
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
         JudgeKaro delivers unbiased, data-driven recommendations to help you choose the right tech.
        </p>
      </div>

      {/* Categories Section */}
      <div className="w-full max-w-5xl">
         <h2 className="text-3xl font-bold font-headline mb-8">Start Your Search</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
      </div>
      
      {/* How It Works Section */}
      <div className="w-full max-w-4xl text-left">
        <h2 className="text-3xl font-bold font-headline mb-8 text-center">Why Trust JudgeKaro?</h2>
        <div className="grid md:grid-cols-3 gap-8">
            <Feature
                icon={<Scale className="w-8 h-8 text-accent" />}
                title="Completely Unbiased"
                description="Our recommendations are generated algorithmically based on real-world data. No paid placements, ever."
            />
             <Feature
                icon={<Microscope className="w-8 h-8 text-accent" />}
                title="Use-Case Driven"
                description="We focus on how a product performs for specific tasks, like 'gaming' or 'travel', not just meaningless specs."
            />
             <Feature
                icon={<ShieldCheck className="w-8 h-8 text-accent" />}
                title="Private & Secure"
                description="No login. No tracking. We don't store your answers. Your privacy is paramount."
            />
        </div>
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

function Feature({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="flex flex-col items-center text-center">
            {icon}
            <h3 className="text-xl font-bold mt-4 mb-2">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
        </div>
    )
}

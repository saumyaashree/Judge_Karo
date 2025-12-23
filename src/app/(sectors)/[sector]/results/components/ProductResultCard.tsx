import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RecommendedProduct } from "@/lib/types";
import { CheckCircle2, XCircle, TrendingUp, Info } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";

export default function ProductResultCard({ recommendation }: { recommendation: RecommendedProduct }) {
  const { product, rank, scoreBreakdown, fitReason, buyNowOrWait } = recommendation;
  const totalScore = Math.round(scoreBreakdown.total);

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="grid md:grid-cols-12 gap-6">
        <div className="md:col-span-4 relative bg-muted flex items-center justify-center p-4">
            <Badge className="absolute top-2 left-2 text-lg bg-accent text-accent-foreground rounded-full h-12 w-12 flex items-center justify-center font-bold border-4 border-background">
                #{rank}
            </Badge>
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={300}
            height={300}
            className="object-contain rounded-md"
            data-ai-hint={product.imageHint}
          />
        </div>

        <div className="md:col-span-8 p-6 flex flex-col">
          <CardHeader className="p-0">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl font-headline mb-1">{product.name}</CardTitle>
                <p className="text-muted-foreground font-semibold">₹{product.price.toLocaleString('en-IN')}</p>
              </div>
              <Badge variant={buyNowOrWait === 'WAIT' ? 'destructive' : 'default'}>{buyNowOrWait}</Badge>
            </div>
          </CardHeader>

          <CardContent className="p-0 flex-grow mt-4">
            <div className="bg-primary/10 p-4 rounded-lg mb-4">
              <h4 className="font-semibold flex items-center gap-2"><TrendingUp className="w-5 h-5 text-accent"/> Why this fits you</h4>
              <p className="text-foreground/80 mt-1">{fitReason}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                <div className="space-y-1">
                    <h5 className="font-semibold flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-500"/> Good for</h5>
                    <p className="text-muted-foreground">{product.goodFor[0]}</p>
                </div>
                <div className="space-y-1">
                    <h5 className="font-semibold flex items-center gap-1.5"><XCircle className="w-4 h-4 text-red-500"/> Not good for</h5>
                    <p className="text-muted-foreground">{product.notGoodFor[0]}</p>
                </div>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-base font-semibold hover:no-underline">
                  <div className="flex items-center gap-2">
                    <Info className="w-5 h-5 text-accent" />
                    Overall Match Score: {totalScore}/100
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pt-2">
                    <ScoreBar label="Use-case Match" value={scoreBreakdown.useCaseMatch} max={40} />
                    <ScoreBar label="Real-world Experience" value={scoreBreakdown.realWorldExperience} max={30} />
                    <ScoreBar label="Longevity" value={scoreBreakdown.longevity} max={15} />
                    <ScoreBar label="Budget Alignment" value={scoreBreakdown.budgetAlignment} max={10} />
                    <ScoreBar label="Buy-timing Advisor" value={scoreBreakdown.buyTimingAdvisor} max={5} />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>

          <CardFooter className="p-0 mt-4">
            <Button asChild className="w-full bg-accent hover:bg-accent/90">
              <Link href={`/products/${product.id}`}>View Details & Real-world Reviews</Link>
            </Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}

function ScoreBar({ label, value, max }: { label: string, value: number, max: number }) {
  const percentage = (value / max) * 100;
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="font-medium">{label}</span>
        <span className="text-muted-foreground">{Math.round(value)} / {max} pts</span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  )
}

import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductById, getScoresByProductId, getReviewsByProductId, products } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import HonestFit from "./components/HonestFit";
import RealWorldScores from "./components/RealWorldScores";
import ReviewSection from "./components/ReviewSection";
import Link from "next/link";
import { ArrowRight, MessageSquareWarning, ThumbsDown } from "lucide-react";
import ReviewForm from "./components/ReviewForm";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { isObject } from "util";

export default function ProductDetailPage({ params }: { params: { productId: string } }) {
  const product = getProductById(params.productId);
  if (!product) {
    notFound();
  }

  const scores = getScoresByProductId(product.id);
  const reviews = getReviewsByProductId(product.id);
  const alternativeProducts = product.alternatives.map(id => getProductById(id)).filter(Boolean);

  return (
    <div className="grid lg:grid-cols-12 gap-8">
      {/* Main Content */}
      <div className="lg:col-span-8 space-y-8">
        {/* Snapshot Summary */}
        <Card>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-muted rounded-l-lg flex items-center justify-center">
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={400}
                height={400}
                className="object-contain"
                data-ai-hint={product.imageHint}
              />
            </div>
            <div className="p-6">
              <Badge variant="secondary" className="mb-2">{product.brand}</Badge>
              <h1 className="text-3xl font-bold font-headline">{product.name}</h1>
              <p className="text-2xl font-semibold text-accent mt-2">₹{product.price.toLocaleString('en-IN')}</p>
              {product.upcomingModel && (
                   <Badge variant="destructive" className="mt-2">WAIT: A new model is expected soon.</Badge>
              )}
              <p className="text-muted-foreground mt-4">{product.goodFor.join(' | ')}</p>
            </div>
          </div>
        </Card>

        {/* Honest Fit & Misfit */}
        <HonestFit product={product} />

        {/* Real-World Experience Scores */}
        {scores && <RealWorldScores scores={scores} />}

        {/* Technical Specs */}
        <Card>
            <CardHeader>
                <CardTitle>Technical Specifications</CardTitle>
            </CardHeader>
            <CardContent>
                <Accordion type="multiple" defaultValue={Object.keys(product.specs)} className="w-full">
                    {Object.entries(product.specs).map(([groupName, groupSpecs]) => (
                        <AccordionItem value={groupName} key={groupName}>
                            <AccordionTrigger className="text-xl font-bold hover:no-underline">{groupName}</AccordionTrigger>
                            <AccordionContent>
                                <Table>
                                    <TableBody>
                                        {Object.entries(groupSpecs).map(([specName, specValue]) => (
                                            <TableRow key={specName}>
                                                <TableHead className="font-semibold">{specName}</TableHead>
                                                <TableCell>{typeof specValue === 'object' ? JSON.stringify(specValue) : String(specValue)}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </CardContent>
        </Card>

        {/* Scenario-Tagged Reviews */}
        <ReviewSection productId={product.id} initialReviews={reviews} />
      </div>

      {/* Sidebar */}
      <div className="lg:col-span-4 space-y-8">
         {/* Leave a Review */}
        <Card>
            <CardHeader>
                <CardTitle>✍️ Leave a Review</CardTitle>
                 <p className="text-sm text-muted-foreground pt-1">Share your real-world experience.</p>
            </CardHeader>
            <CardContent>
                <ReviewForm productId={product.id} />
            </CardContent>
        </Card>

        {/* Alternatives */}
        {alternativeProducts.length > 0 && (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><ArrowRight className="w-6 h-6 text-accent"/> Alternatives to Consider</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                    {alternativeProducts.map(alt => alt && (
                        <Link href={`/products/${alt.id}`} key={alt.id} className="block p-4 border rounded-lg hover:bg-muted transition-colors">
                            <div className="flex justify-between items-center">
                                <div>
                                  <p className="font-semibold">{alt.name}</p>
                                  <p className="text-sm text-muted-foreground">{alt.brand}</p>
                              </div>
                              <ArrowRight className="w-5 h-5 text-muted-foreground" />
                            </div>
                        </Link>
                    ))}
                </CardContent>
            </Card>
        )}
        
        {/* Common Regret Reasons */}
          <Card>
              <CardHeader>
                  <CardTitle className="flex items-center gap-2"><ThumbsDown className="w-6 h-6 text-destructive"/> Common Regret Reasons</CardTitle>
              </CardHeader>
              <CardContent>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      {product.commonRegrets.map((regret, i) => <li key={i}>{regret}</li>)}
                  </ul>
              </CardContent>
          </Card>
      </div>
    </div>
  );
}

export function generateStaticParams() {
    return products.map(product => ({
        productId: product.id,
    }));
}

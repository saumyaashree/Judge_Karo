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
import { ArrowRight } from "lucide-react";

export default function ProductDetailPage({ params }: { params: { productId: string } }) {
  const product = getProductById(params.productId);
  if (!product) {
    notFound();
  }

  const scores = getScoresByProductId(product.id);
  const reviews = getReviewsByProductId(product.id);
  const alternativeProducts = product.alternatives.map(id => getProductById(id)).filter(Boolean);

  return (
    <div className="space-y-8">
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
            <p className="text-2xl font-semibold text-accent mt-2">${product.price}</p>
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

      {/* Common Regret Reasons */}
        <Card>
            <CardHeader>
                <CardTitle>⚠ Common Regret Reasons</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    {product.commonRegrets.map((regret, i) => <li key={i}>{regret}</li>)}
                </ul>
            </CardContent>
        </Card>

      {/* Scenario-Tagged Reviews */}
      <ReviewSection productId={product.id} initialReviews={reviews} />

      {/* Technical Specs */}
      <Card>
        <CardHeader>
          <CardTitle>Technical Specs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(product.specs).map(([key, value]) => (
              <div key={key}>
                <p className="font-semibold">{key}</p>
                <p className="text-muted-foreground">{value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alternatives */}
      {alternativeProducts.length > 0 && (
          <Card>
              <CardHeader>
                  <CardTitle>Alternatives to Consider</CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
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

    </div>
  );
}

export function generateStaticParams() {
    return products.map(product => ({
        productId: product.id,
    }));
}

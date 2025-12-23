import { rankProducts } from "@/lib/ranking";
import { notFound } from "next/navigation";
import type { Sector } from "@/lib/types";
import { SECTOR_IDS, SECTORS } from "@/lib/constants";
import ProductResultCard from "./components/ProductResultCard";

export default function ResultsPage({
  params,
  searchParams,
}: {
  params: { sector: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const sector = params.sector as Sector;
  if (!SECTOR_IDS.includes(sector)) {
    notFound();
  }
  const sectorInfo = Object.values(SECTORS).find(s => s.id === sector);


  // Convert searchParams to UserAnswers format
  const answers: { [key: string]: string | number } = {};
  for (const key in searchParams) {
    const value = searchParams[key];
    if (typeof value === 'string') {
        const numValue = parseFloat(value);
        answers[key] = isNaN(numValue) ? value : numValue;
    }
  }

  const recommendations = rankProducts(answers, sector);

  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold">No recommendations found</h1>
        <p className="text-muted-foreground">
          We couldn't find a good match based on your answers. Please try again with different criteria.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-2 font-headline">Your Personalized {sectorInfo?.name} Recommendations</h1>
       <p className="text-muted-foreground text-center mb-8">
        Based on your answers, here are the top {recommendations.length} products for you.
      </p>

      <div className="space-y-6">
        {recommendations.map((rec) => (
          <ProductResultCard key={rec.product.id} recommendation={rec} />
        ))}
      </div>
    </div>
  );
}

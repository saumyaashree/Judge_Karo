import { getProductById, getScoresByProductId } from "@/lib/data";
import type { Product, ProductScores } from "@/lib/types";
import { notFound } from "next/navigation";
import CompareTable from "./components/CompareTable";

type ProductWithScores = {
    product: Product;
    scores: ProductScores | undefined;
}

export default function ComparePage({
  searchParams,
}: {
  searchParams: { products?: string };
}) {
  const productIds = searchParams.products?.split(',') || [];
  
  if (productIds.length < 2) {
      return (
          <div className="text-center py-16">
              <h1 className="text-3xl font-bold font-headline">Select Products to Compare</h1>
              <p className="text-muted-foreground mt-2">Please select at least two products to see a side-by-side comparison.</p>
          </div>
      )
  }

  const productsWithScores: ProductWithScores[] = productIds.map(id => {
      const product = getProductById(id);
      if (!product) return null;
      const scores = getScoresByProductId(id);
      return { product, scores };
  }).filter(Boolean) as ProductWithScores[];

  if (productsWithScores.length === 0) {
      notFound();
  }


  return (
    <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold font-headline text-center mb-8">Compare Products</h1>
        <CompareTable productsWithScores={productsWithScores} />
    </div>
  );
}

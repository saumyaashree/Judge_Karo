import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Product } from "@/lib/types";
import { CheckCircle2, XCircle } from "lucide-react";

export default function HonestFit({ product }: { product: Product }) {
  return (
    <Card>
      <div className="grid md:grid-cols-2">
        <div className="p-6">
          <CardTitle className="mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-green-500" />
            ✅ Good for...
          </CardTitle>
          <ul className="space-y-2 list-disc pl-5">
            {product.goodFor.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
        <div className="p-6 bg-muted/50 rounded-r-lg border-l">
          <CardTitle className="mb-4 flex items-center gap-2">
            <XCircle className="w-6 h-6 text-red-500" />
            ❌ Not good for...
          </CardTitle>
          <ul className="space-y-2 list-disc pl-5">
            {product.notGoodFor.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
      </div>
    </Card>
  );
}

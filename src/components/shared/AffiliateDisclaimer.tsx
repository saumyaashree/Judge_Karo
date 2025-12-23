import { Badge } from "@/components/ui/badge";

export default function AffiliateDisclaimer() {
  return (
    <div className="max-w-2xl mx-auto p-2 border rounded-lg bg-background text-sm text-muted-foreground">
      <Badge variant="secondary" className="mb-2">Transparency</Badge>
      <p>
        When you buy through links on our site, we may earn an affiliate commission. 
        This does not affect our recommendations, which are always based on rigorous,
        use-case driven analysis. Rankings are never, ever paid for.
      </p>
    </div>
  );
}

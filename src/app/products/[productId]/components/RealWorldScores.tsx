import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { ProductScores } from "@/lib/types";

export default function RealWorldScores({ scores }: { scores: ProductScores }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Real-World Experience Scores</CardTitle>
        <p className="text-muted-foreground pt-1">Aggregated from hundreds of real-world user reviews.</p>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ScoreItem label="Comfort Score" value={scores.comfort} max={10} unit="/ 10" color="bg-blue-500" />
          <ScoreItem label="Reliability Score" value={scores.reliability} max={10} unit="/ 10" color="bg-green-500" />
          <ScoreItem label="Repurchase Intent" value={scores.repurchaseIntent} max={100} unit="%" color="bg-purple-500" />
          <ScoreItem label="Longevity Estimate" value={scores.longevity} max={10} unit=" years" isEstimate />
        </div>
      </CardContent>
    </Card>
  );
}

function ScoreItem({ 
    label, 
    value, 
    max,
    unit, 
    color,
    isEstimate = false
}: { 
    label: string, 
    value: number, 
    max: number, 
    unit: string, 
    color?: string,
    isEstimate?: boolean
}) {
    return (
        <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="text-3xl font-bold my-1">{value}<span className="text-lg font-medium">{unit}</span></p>
            {!isEstimate && (
                <Progress value={(value/max) * 100} indicatorClassName={color} />
            )}
        </div>
    )
}

// Monkey-patching Progress to accept custom indicator class
const OriginalProgress = Progress;
const PatchedProgress = ({ indicatorClassName, ...props }: React.ComponentProps<typeof Progress> & { indicatorClassName?: string }) => (
  // @ts-ignore
  <OriginalProgress {...props} indicatorClassName={indicatorClassName} />
);
(PatchedProgress as any).displayName = "Progress";
const ProgressWithIndicator = PatchedProgress as typeof Progress;

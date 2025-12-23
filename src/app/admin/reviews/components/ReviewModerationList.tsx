'use client';

import type { Review } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { approveReviewAction, rejectReviewAction } from "@/lib/actions";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Check, X, Loader2 } from "lucide-react";
import { getProductById } from "@/lib/data";

function ActionButton({ action, children }: { action: () => void, children: React.ReactNode }) {
    const [isPending, startTransition] = useTransition();

    return (
        <Button 
            onClick={() => startTransition(action)}
            disabled={isPending}
            className="w-full"
        >
            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : children}
        </Button>
    )
}

export default function ReviewModerationList({ reviews }: { reviews: Review[] }) {
    return (
        <div className="space-y-4">
            {reviews.map((review) => {
                const product = getProductById(review.productId);
                return (
                    <Card key={review.id} className="bg-muted/30">
                        <CardHeader>
                            <CardTitle>Review for: {product?.name}</CardTitle>
                             <CardDescription>
                                Reason flagged: <span className="italic text-destructive">{review.flagReason || "No reason provided."}</span>
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <blockquote className="border-l-4 pl-4 italic">
                                "{review.text}"
                            </blockquote>
                            <div className="text-sm text-muted-foreground mt-2">
                                <p><strong>Scenario:</strong> {review.scenario}</p>
                                <p><strong>Comfort:</strong> {review.comfortRating}/10</p>
                                <p><strong>Duration:</strong> {review.durationOfUse} months</p>
                            </div>
                        </CardContent>
                        <CardFooter className="grid grid-cols-2 gap-4">
                            <ActionButton action={() => approveReviewAction(review.id, review.productId)}>
                                <Check className="w-4 h-4 mr-2" /> Approve
                            </ActionButton>
                            
                             <Button variant="destructive" asChild>
                                <ActionButton action={() => rejectReviewAction(review.id)}>
                                    <X className="w-4 h-4 mr-2" /> Reject
                                </ActionButton>
                            </Button>
                        </CardFooter>
                    </Card>
                );
            })}
        </div>
    );
}

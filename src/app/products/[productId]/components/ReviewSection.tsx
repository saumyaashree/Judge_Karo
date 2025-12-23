"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Review } from "@/lib/types";
import { ThumbsUp, User, Calendar, Star, Tag } from "lucide-react";
import ReviewForm from "./ReviewForm";
import { Badge } from "@/components/ui/badge";

export default function ReviewSection({
  productId,
  initialReviews,
}: {
  productId: string;
  initialReviews: Review[];
}) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Scenario-Tagged Reviews</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">What Users Are Saying</h3>
          {reviews.length > 0 ? (
            <div className="space-y-6">
              {reviews.map((review) => (
                <Card key={review.id} className="bg-muted/50">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                        <div className="space-y-2">
                             <Badge>
                                <Tag className="w-3 h-3 mr-1.5" /> {review.scenario}
                            </Badge>
                             <p className="font-semibold">{review.text}</p>
                        </div>
                       <div className="flex items-center space-x-2 text-sm text-muted-foreground shrink-0 pl-4">
                           <ThumbsUp className="w-4 h-4"/>
                           <span>{review.upvotes}</span>
                       </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground mt-3">
                      <div className="flex items-center gap-1.5"><User className="w-4 h-4" /> Anonymous</div>
                      <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Used for {review.durationOfUse} months</div>
                      <div className="flex items-center gap-1.5"><Star className="w-4 h-4" /> Comfort: {review.comfortRating}/10</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">
              No reviews yet. Be the first to share your experience!
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

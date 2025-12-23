import { getAllFlaggedReviews } from "@/lib/data";
import ReviewModerationList from "./components/ReviewModerationList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const dynamic = 'force-dynamic';

export default function AdminReviewsPage() {
    const flaggedReviews = getAllFlaggedReviews();

    return (
        <Card>
            <CardHeader>
                <CardTitle>Reviews Flagged for Moderation</CardTitle>
            </CardHeader>
            <CardContent>
                 {flaggedReviews.length > 0 ? (
                    <ReviewModerationList reviews={flaggedReviews} />
                ) : (
                    <p className="text-muted-foreground text-center py-8">No reviews are currently flagged for moderation.</p>
                )}
            </CardContent>
        </Card>
    );
}

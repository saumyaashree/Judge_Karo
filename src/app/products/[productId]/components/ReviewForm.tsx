'use client'

import { useFormState, useFormStatus } from 'react-dom';
import { submitReview, type ReviewState } from '@/lib/actions';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Slider } from '@/components/ui/slider';

const initialState: ReviewState = { message: null, errors: {} };

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending} className="w-full bg-accent hover:bg-accent/90">
             {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {pending ? "Submitting..." : "Submit Review"}
        </Button>
    )
}

export default function ReviewForm({ productId }: { productId: string }) {
    const [state, dispatch] = useFormState(submitReview, initialState);
    const formRef = useRef<HTMLFormElement>(null);
    const { toast } = useToast();
    const [comfortRating, setComfortRating] = useState(8);

    useEffect(() => {
        if (state.message) {
            if (Object.keys(state.errors || {}).length > 0) {
                 toast({
                    title: "Error submitting review",
                    description: state.message,
                    variant: "destructive",
                });
            } else {
                 toast({
                    title: "Review Submitted!",
                    description: state.message,
                    variant: "default",
                });
                formRef.current?.reset();
                setComfortRating(8);
            }
        }
    }, [state, toast]);

    return (
        <form ref={formRef} action={dispatch}>
            <input type="hidden" name="productId" value={productId} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                    <Label htmlFor="scenario">Usage Scenario (e.g., Gym, Travel, Student)</Label>
                    <Input id="scenario" name="scenario" required />
                     {state.errors?.scenario && <p className="text-sm text-destructive">{state.errors.scenario}</p>}
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="durationOfUse">Duration of Use (in months)</Label>
                    <Input id="durationOfUse" name="durationOfUse" type="number" required min="1" />
                    {state.errors?.durationOfUse && <p className="text-sm text-destructive">{state.errors.durationOfUse}</p>}
                </div>
            </div>
            <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                    <Label htmlFor="comfortRating">Comfort Rating</Label>
                    <span className="text-sm font-bold">{comfortRating}/10</span>
                </div>
                <Slider defaultValue={[comfortRating]} onValueChange={(value) => setComfortRating(value[0])} min={1} max={10} step={1} name="comfortRating" id="comfortRating"/>
                {state.errors?.comfortRating && <p className="text-sm text-destructive">{state.errors.comfortRating}</p>}
            </div>

            <div className="space-y-2 mb-4">
                <Label htmlFor="text">Your Review</Label>
                <Textarea id="text" name="text" required minLength={10} placeholder="Share your real-world experience..."/>
                {state.errors?.text && <p className="text-sm text-destructive">{state.errors.text}</p>}
            </div>
            
            <SubmitButton />
        </form>
    );
}

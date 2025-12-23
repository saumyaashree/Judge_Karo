'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import type { Sector, UserAnswers } from './types';
import { addReview } from './data';
import { moderateReview } from '@/ai/flows/ai-review-moderation';

export async function getRecommendations(answers: UserAnswers, sector: Sector) {
  const params = new URLSearchParams();
  Object.entries(answers).forEach(([key, value]) => {
    params.append(key, String(value));
  });

  redirect(`/${sector}/results?${params.toString()}`);
}

const ReviewSchema = z.object({
    productId: z.string(),
    scenario: z.string().min(1, "Scenario is required"),
    durationOfUse: z.coerce.number().min(1, "Duration is required"),
    comfortRating: z.coerce.number().min(1).max(10),
    text: z.string().min(10, "Review must be at least 10 characters long").max(1000),
});

export type ReviewState = {
    errors?: {
        productId?: string[];
        scenario?: string[];
        durationOfUse?: string[];
        comfortRating?: string[];
        text?: string[];
    };
    message?: string | null;
}

export async function submitReview(prevState: ReviewState, formData: FormData) {
    const validatedFields = ReviewSchema.safeParse({
        productId: formData.get('productId'),
        scenario: formData.get('scenario'),
        durationOfUse: formData.get('durationOfUse'),
        comfortRating: formData.get('comfortRating'),
        text: formData.get('text'),
    });

    if (!validatedFields.data) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Failed to submit review. Please check the fields.',
        }
    }
    
    const { productId, scenario, durationOfUse, comfortRating, text } = validatedFields.data;

    try {
        const moderationResult = await moderateReview({
            textReview: text,
            usageScenario: scenario,
            durationOfUse: String(durationOfUse),
            comfortRating: comfortRating
        });

        addReview({
            productId,
            author: 'Anonymous', // All reviews are anonymous
            scenario,
            durationOfUse,
            comfortRating,
            text,
            isFlagged: moderationResult.isSuspicious,
            isApproved: !moderationResult.isSuspicious,
            flagReason: moderationResult.reason
        });

        revalidatePath(`/products/${productId}`);
        return { message: moderationResult.isSuspicious ? 'Your review has been submitted for moderation.' : 'Thank you for your review!' };

    } catch (error) {
        console.error("Error submitting review:", error);
        return { message: 'An error occurred while submitting your review.' };
    }
}

export async function approveReviewAction(reviewId: string, productId: string) {
    // In a real app, you would import and call a DB function
    const { approveReview } = await import('./data');
    approveReview(reviewId);
    revalidatePath('/admin/reviews');
    revalidatePath(`/products/${productId}`);
}

export async function rejectReviewAction(reviewId: string) {
    // In a real app, you would import and call a DB function
    const { rejectReview } = await import('./data');
    rejectReview(reviewId);
    revalidatePath('/admin/reviews');
}

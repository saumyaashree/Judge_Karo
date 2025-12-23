'use server';

/**
 * @fileOverview An AI agent for flagging suspicious reviews for admin moderation.
 *
 * - moderateReview - A function that analyzes a review and flags it if it's likely fake or harmful.
 * - ModerateReviewInput - The input type for the moderateReview function.
 * - ModerateReviewOutput - The return type for the moderateReview function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ModerateReviewInputSchema = z.object({
  textReview: z.string().describe('The text content of the review.'),
  usageScenario: z.string().describe('The usage scenario tag associated with the review.'),
  durationOfUse: z.string().describe('The duration of use reported in the review (in months).'),
  comfortRating: z.number().describe('The comfort rating given in the review.'),
});

export type ModerateReviewInput = z.infer<typeof ModerateReviewInputSchema>;

const ModerateReviewOutputSchema = z.object({
  isSuspicious: z
    .boolean()
    .describe(
      'Whether the review is likely fake, harmful, or violates community standards. True indicates the review should be flagged for admin review.'
    ),
  reason: z.string().describe('The reason why the review is flagged as suspicious.'),
});

export type ModerateReviewOutput = z.infer<typeof ModerateReviewOutputSchema>;

export async function moderateReview(input: ModerateReviewInput): Promise<ModerateReviewOutput> {
  return moderateReviewFlow(input);
}

const moderateReviewPrompt = ai.definePrompt({
  name: 'moderateReviewPrompt',
  input: {schema: ModerateReviewInputSchema},
  output: {schema: ModerateReviewOutputSchema},
  prompt: `You are an AI assistant specializing in identifying fake and harmful online reviews.

  Analyze the following review based on its text, usage scenario, duration of use, and comfort rating.

  Review Text: {{{textReview}}}
  Usage Scenario: {{{usageScenario}}}
  Duration of Use (months): {{{durationOfUse}}}
  Comfort Rating: {{{comfortRating}}}

  Determine if the review is suspicious based on these factors:
  - Unrealistic or overly positive/negative sentiment
  - Contradictory information
  - Lack of specific details
  - Suspicious usage patterns (e.g., extremely short duration of use with strong opinions)
  - Harmful or offensive language

  Return a JSON object indicating whether the review is suspicious (isSuspicious: true/false) and the reason for your assessment (reason: string).
  If there is no reason to flag the review, isSuspicious should be false, and reason should be "Not suspicious".
  Be brief and to the point.
  `,
});

const moderateReviewFlow = ai.defineFlow(
  {
    name: 'moderateReviewFlow',
    inputSchema: ModerateReviewInputSchema,
    outputSchema: ModerateReviewOutputSchema,
  },
  async input => {
    const {output} = await moderateReviewPrompt(input);
    return output!;
  }
);

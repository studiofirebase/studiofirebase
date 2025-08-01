'use server';

/**
 * @fileOverview Provides content recommendations based on user viewing history.
 *
 * - recommendContent - A function that recommends content based on user viewing history.
 * - RecommendContentInput - The input type for the recommendContent function.
 * - RecommendContentOutput - The return type for the recommendContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendContentInputSchema = z.object({
  viewingHistory: z
    .array(z.string())
    .describe('An array of content IDs representing the user viewing history.'),
  currentContentId: z.string().describe('The ID of the content currently being viewed.'),
});
export type RecommendContentInput = z.infer<typeof RecommendContentInputSchema>;

const RecommendContentOutputSchema = z.object({
  recommendations: z
    .array(z.string())
    .describe('An array of content IDs recommended to the user.'),
});
export type RecommendContentOutput = z.infer<typeof RecommendContentOutputSchema>;

export async function recommendContent(input: RecommendContentInput): Promise<RecommendContentOutput> {
  return recommendContentFlow(input);
}

const recommendContentPrompt = ai.definePrompt({
  name: 'recommendContentPrompt',
  input: {schema: RecommendContentInputSchema},
  output: {schema: RecommendContentOutputSchema},
  prompt: `You are a content recommendation expert.

  Based on the user's viewing history and the content they are currently viewing,
  recommend other content items that they might be interested in.

  Viewing History: {{#if viewingHistory}}{{#each viewingHistory}}- {{{this}}}{{/each}}{{else}}No viewing history available.{{/if}}
  Current Content ID: {{{currentContentId}}}

  Consider the viewing history to understand the user's preferences. The viewing history is the history of content the user has previously consumed.

  Return an array of content IDs in the recommendations field.
  If there isn't enough viewing history, make general recommendations, but be sure to tailor the result towards the current content ID.
  Do not recommend content that is already in the viewing history.
  `,
});

const recommendContentFlow = ai.defineFlow(
  {
    name: 'recommendContentFlow',
    inputSchema: RecommendContentInputSchema,
    outputSchema: RecommendContentOutputSchema,
  },
  async input => {
    const {output} = await recommendContentPrompt(input);
    return output!;
  }
);

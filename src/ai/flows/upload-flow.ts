
'use server';
/**
 * @fileOverview Flow to handle file uploads to Firebase Storage.
 * - uploadMedia: Receives a base64 encoded file and uploads it.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { uploadMedia } from '@/services/storage-service';

// Input schema for media upload
const UploadMediaInputSchema = z.object({
  fileBase64: z.string().describe("A base64 encoded file string."),
  fileName: z.string().describe("The original name of the file."),
  category: z.enum(['image', 'video']).describe("The category of the media."),
});
export type UploadMediaInput = z.infer<typeof UploadMediaInputSchema>;

// Output schema for media upload
const UploadMediaOutputSchema = z.object({
  success: z.boolean(),
  url: z.string().optional().describe("The public URL of the uploaded file."),
  error: z.string().optional(),
});
export type UploadMediaOutput = z.infer<typeof UploadMediaOutputSchema>;


/**
 * Genkit flow to upload media to Firebase Storage.
 */
const uploadMediaFlow = ai.defineFlow(
  {
    name: 'uploadMediaFlow',
    inputSchema: UploadMediaInputSchema,
    outputSchema: UploadMediaOutputSchema,
  },
  async ({ fileBase64, fileName, category }) => {
    try {
      const url = await uploadMedia({ fileBase64, fileName, category });
      return { success: true, url };
    } catch (error: any) {
      console.error('Error during media upload flow:', error);
      return { success: false, error: error.message || 'Failed to upload media.' };
    }
  }
);


/**
 * Exported function to be called from the client-side.
 */
export async function uploadMediaClient(input: UploadMediaInput): Promise<UploadMediaOutput> {
  return uploadMediaFlow(input);
}

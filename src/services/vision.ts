
'use server';
/**
 * @fileOverview A service to interact with the Google Vision API for face detection.
 * This ensures that an uploaded image contains a usable face for registration or verification.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const FaceDetectionInputSchema = z.string().describe("A base64 encoded image.");
const FaceDetectionOutputSchema = z.object({
  faceDetected: z.boolean().describe("Whether a face was detected."),
  error: z.string().optional().describe("Error message if no face was detected."),
  errorCode: z.enum(['NO_FACE_DETECTED', 'POOR_IMAGE_QUALITY', 'UNKNOWN']).optional().describe("A code representing the specific error."),
});

type FaceDetectionOutput = z.infer<typeof FaceDetectionOutputSchema>;

/**
 * A prompt that asks the model to analyze an image for the presence of a clear human face.
 */
const faceDetectionPrompt = ai.definePrompt({
    name: 'faceDetectionPrompt',
    input: { schema: FaceDetectionInputSchema },
    output: { schema: FaceDetectionOutputSchema },
    prompt: `
        You are a face detection specialist. Your task is to analyze the provided image
        and determine if it contains a single, clear, forward-facing human face.
        The face must be suitable for a facial recognition system.

        - If a clear face is present, set "faceDetected" to true.
        - If no face is detected, set "faceDetected" to false, "error" to "Nenhuma face foi detectada na imagem.", and "errorCode" to "NO_FACE_DETECTED".
        - If the face is blurry, obscured, at a severe angle, or otherwise of poor quality,
          set "faceDetected" to false, "error" to "A qualidade da imagem é baixa. Por favor, use uma foto clara e bem iluminada.", and "errorCode" to "POOR_IMAGE_QUALITY".

        Image to analyze:
        {{media url=input}}
    `,
    config: {
        temperature: 0.1, // Low temperature for consistent results
    },
});


/**
 * Detects if a face is present in a base64 encoded image.
 * @param imageBase64 The base64 encoded image string.
 * @returns An object indicating if a face was detected and an optional error message.
 */
export async function detectFace(imageBase64: string): Promise<FaceDetectionOutput> {
    try {
        const { output } = await faceDetectionPrompt(imageBase64);
        if (!output) {
            throw new Error('The AI model did not return a valid response.');
        }
        return output;
    } catch (error: any) {
        console.error("Error in detectFace service:", error);
        return {
            faceDetected: false,
            error: "Ocorreu um erro ao analisar a imagem.",
            errorCode: 'UNKNOWN',
        };
    }
}

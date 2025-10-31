
'use server';
/**
 * @fileOverview User registration flow that communicates with a Google Apps Script webhook.
 * - registerUserWithGoogleSheet: Sends user data to a Google Script for processing.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

// Input schema for user registration
const RegisterUserInputSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  imageBase64: z.string().describe("A base64 encoded image captured from the user's camera."),
});
export type RegisterUserInput = z.infer<typeof RegisterUserInputSchema>;

// Output schema for registration
const RegisterUserOutputSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});
export type RegisterUserOutput = z.infer<typeof RegisterUserOutputSchema>;

const GOOGLE_SCRIPT_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbx-6JXFYiDsB6WSZzIrCGAfQxPICf22I5RHfDRGPTpHWI4PIRErm_po-uIdTec6TfMz/exec';

/**
 * Genkit flow to register a new user by sending their data to a Google Apps Script webhook.
 */
const registerUserWithGoogleSheetFlow = ai.defineFlow(
  {
    name: 'registerUserWithGoogleSheetFlow',
    inputSchema: RegisterUserInputSchema,
    outputSchema: RegisterUserOutputSchema,
  },
  async (userData: RegisterUserInput) => {
    try {
      // 1. Prepare data for the webhook
      const payload = {
          action: 'register', // Or another action your script expects
          ...userData
      };

      // 2. Send data to Google Apps Script
      const response = await fetch(GOOGLE_SCRIPT_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      const responseText = await response.text();
      
      // Handle non-200 responses or non-JSON responses
      if (!response.ok) {
          
          throw new Error(`O servidor do Google Script respondeu com um erro: ${response.status}`);
      }

      let result;
      try {
        result = JSON.parse(responseText);
      } catch (e) {
        
        throw new Error('A resposta do Google Script não estava no formato JSON esperado.');
      }
      
      // Check the response from your script to determine success
      if (result.status === 'success') {
  
          return { success: true, message: result.message || 'Usuário registrado com sucesso!' };
      } else {
  
          return { success: false, message: result.message || 'Falha ao registrar no Google Sheets.' };
      }

    } catch (e: any) {
      
      // It's important to not expose internal error details to the client
      return { success: false, message: 'Ocorreu um erro inesperado durante o registro. Tente novamente mais tarde.' };
    }
  }
);

// Exported function to be called from the client-side.
export async function registerUserWithGoogleSheet(input: RegisterUserInput): Promise<RegisterUserOutput> {
  return registerUserWithGoogleSheetFlow(input);
}

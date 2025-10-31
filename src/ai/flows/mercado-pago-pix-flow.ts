
'use server';
/**
 * @fileOverview Fluxo para criar um pagamento Pix no Mercado Pago.
 * - createPixPayment: Gera um QR Code Pix para um determinado valor e e-mail.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { MercadoPagoConfig, Payment } from 'mercadopago';

// Schema de entrada
const CreatePixPaymentInputSchema = z.object({
  amount: z.number().describe('O valor do pagamento em BRL.'),
  email: z.string().email().describe('O e-mail do pagador.'),
  name: z.string().describe('O nome completo do pagador.'),
  phone: z.string().optional().describe('O telefone do pagador.'),
});
export type CreatePixPaymentInput = z.infer<typeof CreatePixPaymentInputSchema>;

// Schema de saída
const CreatePixPaymentOutputSchema = z.object({
  qrCodeBase64: z.string().optional().describe('A imagem do QR Code em base64.'),
  qrCode: z.string().optional().describe('O código "copia e cola" do Pix.'),
  error: z.string().optional().describe('Mensagem de erro, se houver.'),
});
export type CreatePixPaymentOutput = z.infer<typeof CreatePixPaymentOutputSchema>;

/**
 * Fluxo Genkit para criar um pagamento Pix.
 */
const createPixPaymentFlow = ai.defineFlow(
  {
    name: 'createPixPaymentFlow',
    inputSchema: CreatePixPaymentInputSchema,
    outputSchema: CreatePixPaymentOutputSchema,
  },
  async (input: CreatePixPaymentInput) => {
    const { amount, email, name } = input;
    const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN || process.env.MERCADO_PAGO_ACCESS_TOKEN;

    if (!accessToken) {
      const errorMessage = "Token do Mercado Pago não configurado. Verifique a variável MERCADOPAGO_ACCESS_TOKEN.";
      return { error: errorMessage };
    }

    if (accessToken === "YOUR_MERCADOPAGO_ACCESS_TOKEN" || accessToken.includes("TEST-")) {
      
    }

    const client = new MercadoPagoConfig({ 
      accessToken, 
      options: { integratorId: 'dev_aa2d89add88111ebb2fb0242ac130004' }
    });
    const payment = new Payment(client);
    
    const nameParts = name.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || firstName;

    const paymentData = {
      transaction_amount: amount,
      description: 'Assinatura Mensal - Italo Santos',
      payment_method_id: 'pix',
      payer: {
        email: email,
        first_name: firstName,
        last_name: lastName,
      },
      // Só incluir notification_url se não estiver em desenvolvimento local
      ...(process.env.NODE_ENV === 'production' && {
        notification_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/webhook/mercadopago`,
      }),
    };

    try {
      const response = await payment.create({ body: paymentData });
      
      const qrCodeBase64 = response.point_of_interaction?.transaction_data?.qr_code_base64;
      const qrCode = response.point_of_interaction?.transaction_data?.qr_code;

      if (!qrCodeBase64 || !qrCode) {

        throw new Error('A resposta da API do Mercado Pago não incluiu os dados do QR Code.');
      }

      return {
        qrCodeBase64,
        qrCode,
      };

    } catch (error: any) {
      
      
      let errorMessage = 'Não foi possível gerar o código Pix. Por favor, tente novamente mais tarde.';
      
      if (error.cause) {
        // Erros da SDK do Mercado Pago geralmente têm uma causa aninhada

        
        if (error.cause.error) {
          if (error.cause.error.includes('invalid_access_token')) {
            errorMessage = 'Token do Mercado Pago inválido. Verifique as configurações.';
          } else if (error.cause.error.includes('invalid_amount')) {
            errorMessage = 'Valor inválido para pagamento PIX.';
          } else if (error.cause.error.includes('invalid_email')) {
            errorMessage = 'Email inválido para pagamento PIX.';
          } else {
            errorMessage = error.cause.error;
          }
        } else {
          errorMessage = error.cause.message || errorMessage;
        }
      } else if (error.message) {
        if (error.message.includes('fetch')) {
          errorMessage = 'Erro de conexão com Mercado Pago. Verifique sua internet.';
        } else {
          errorMessage = error.message;
        }
      }
      
      return { error: errorMessage };
    }
  }
);


/**
 * Função exportada para ser chamada do lado do cliente.
 */
export async function createPixPayment(input: CreatePixPaymentInput): Promise<CreatePixPaymentOutput> {
  return createPixPaymentFlow(input);
}

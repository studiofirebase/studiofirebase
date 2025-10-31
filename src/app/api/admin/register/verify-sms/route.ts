import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { otpStore, generateOTP, findSessionByPhone } from '@/lib/otp-store';
import { sendOTPEmail } from '@/lib/email-service';

const verifySmsSchema = z.object({
  phone: z.string(),
  code: z.string().length(6, 'Código deve ter 6 dígitos')
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar dados
    const { phone, code } = verifySmsSchema.parse(body);

    // Procurar sessão ativa
    const sessionResult = findSessionByPhone(phone);
    
    if (!sessionResult) {
      return NextResponse.json(
        { success: false, message: 'Sessão não encontrada ou já verificada' },
        { status: 400 }
      );
    }

    const [sessionId, sessionData] = sessionResult;

    // Verificar se código não expirado (10 minutos)
    const now = Date.now();
    const elapsed = now - sessionData.timestamp;
    if (elapsed > 10 * 60 * 1000) {
      otpStore.delete(sessionId);
      return NextResponse.json(
        { success: false, message: 'Código expirado' },
        { status: 400 }
      );
    }

    // Verificar código
    if (sessionData.code !== code) {
      return NextResponse.json(
        { success: false, message: 'Código SMS inválido' },
        { status: 400 }
      );
    }

    // Marcar SMS como verificado
    sessionData.smsVerified = true;
    otpStore.set(sessionId, sessionData);

    // Gerar e enviar código por email
    const emailCode = generateOTP();
    sessionData.code = emailCode; // Atualizar com código de email
    sessionData.timestamp = Date.now(); // Reset timer
    otpStore.set(sessionId, sessionData);

    const emailSent = await sendOTPEmail(sessionData.email, emailCode, sessionData.name);
    
    if (!emailSent) {
      throw new Error('Falha ao enviar email');
    }

    console.log(`[Admin Register] SMS verificado para ${phone}, email enviado para ${sessionData.email} com código ${emailCode}`);
    
    return NextResponse.json({
      success: true,
      message: 'SMS verificado! Código enviado por email',
      sessionId
    });

  } catch (error: any) {
    console.error('[Admin Register] Erro ao verificar SMS:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: error.errors[0].message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, message: error.message || 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
    import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { otpStore, findSessionByEmail } from '@/lib/otp-store';

const verifyEmailSchema = z.object({
  email: z.string().email(),
  code: z.string().length(6, 'Código deve ter 6 dígitos')
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar dados
    const { email, code } = verifyEmailSchema.parse(body);

    // Procurar sessão ativa
    const sessionResult = findSessionByEmail(email);
    
    if (!sessionResult) {
      return NextResponse.json(
        { success: false, message: 'Sessão não encontrada ou SMS não verificado' },
        { status: 400 }
      );
    }

    const [sessionId, sessionData] = sessionResult;

    // Verificar se código não expirou (10 minutos)
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
        { success: false, message: 'Código de email inválido' },
        { status: 400 }
      );
    }

    // Marcar email como verificado
    sessionData.emailVerified = true;
    otpStore.set(sessionId, sessionData);

    console.log(`[Admin Register] Email verificado para ${email}`);
    
    return NextResponse.json({
      success: true,
      message: 'Email verificado com sucesso!',
      sessionId
    });

  } catch (error: any) {
    console.error('[Admin Register] Erro ao verificar email:', error);
    
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
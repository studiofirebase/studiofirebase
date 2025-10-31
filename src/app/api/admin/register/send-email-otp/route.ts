import { NextResponse } from 'next/server';
import { z } from 'zod';
import { otpStore, OTPSession, generateOTP, findSessionByEmail } from '@/lib/otp-store';
import { sendOTPEmail } from '@/lib/email-service';

const bodySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6)
});

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const parsed = bodySchema.safeParse(data);
    if (!parsed.success) {
      return NextResponse.json({ message: 'Dados inválidos', errors: parsed.error.flatten() }, { status: 400 });
    }

    const { name, email, phone } = parsed.data;

    // Reutiliza sessão existente se houver; caso contrário, cria uma nova
    const existing = findSessionByEmail(email);
    const code = generateOTP();
    let sessionId: string;
    if (existing) {
      const [existingId, existingSession] = existing;
      existingSession.code = code;
      existingSession.timestamp = Date.now();
      existingSession.name = name;
      existingSession.phone = phone;
      existingSession.smsVerified = true;
      existingSession.emailVerified = false;
      otpStore.set(existingId, existingSession);
      sessionId = existingId;
    } else {
      sessionId = crypto.randomUUID();
      const session: OTPSession = {
        code,
        phone,
        email,
        name,
        timestamp: Date.now(),
        smsVerified: true,
        emailVerified: false
      };
      otpStore.set(sessionId, session);
    }

    // Enviar OTP por email (via Firestore + Extension)
    const emailOk = await sendOTPEmail(email, code, name);
    if (!emailOk) {
      // limpa sessão se falhou enviar email
      otpStore.delete(sessionId);
      return NextResponse.json({ message: 'Falha ao enviar email de verificação' }, { status: 500 });
    }

    return NextResponse.json({ success: true, sessionId });
  } catch (error: any) {
    console.error('[send-email-otp] Erro:', error);
    return NextResponse.json({ message: error.message || 'Erro interno' }, { status: 500 });
  }
}

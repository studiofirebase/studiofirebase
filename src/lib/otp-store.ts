// Store temporário para códigos OTP
// Em produção, usar Redis ou banco de dados

export interface OTPSession {
  code: string;
  phone: string;
  email: string;
  name: string;
  timestamp: number;
  smsVerified: boolean;
  emailVerified: boolean;
}

// Store em memória (apenas para desenvolvimento)
export const otpStore = new Map<string, OTPSession>();

// Função para limpar sessões expiradas
export function cleanExpiredSessions() {
  const now = Date.now();
  const expireTime = 30 * 60 * 1000; // 30 minutos
  
  for (const [sessionId, session] of otpStore.entries()) {
    if (now - session.timestamp > expireTime) {
      otpStore.delete(sessionId);
    }
  }
}

// Executar limpeza a cada 5 minutos
setInterval(cleanExpiredSessions, 5 * 60 * 1000);

// Utilitários
export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function findSessionByPhone(phone: string): [string, OTPSession] | null {
  for (const [sessionId, session] of otpStore.entries()) {
    if (session.phone === phone && !session.smsVerified) {
      return [sessionId, session];
    }
  }
  return null;
}

export function findSessionByEmail(email: string): [string, OTPSession] | null {
  for (const [sessionId, session] of otpStore.entries()) {
    if (session.email === email && session.smsVerified && !session.emailVerified) {
      return [sessionId, session];
    }
  }
  return null;
}

export function findVerifiedSession(email: string): [string, OTPSession] | null {
  for (const [sessionId, session] of otpStore.entries()) {
    if (session.email === email && session.smsVerified && session.emailVerified) {
      return [sessionId, session];
    }
  }
  return null;
}
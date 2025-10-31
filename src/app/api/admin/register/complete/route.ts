import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { getAdminAuth } from '@/lib/firebase-admin';
import bcrypt from 'bcryptjs';
import { otpStore, findVerifiedSession } from '@/lib/otp-store';
import { sendWelcomeEmail } from '@/lib/email-service';

const completeRegistrationSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  password: z.string().min(8)
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar dados
    const { name, email, phone, password } = completeRegistrationSchema.parse(body);

    // Procurar sessão verificada
    const sessionResult = findVerifiedSession(email);
    
    if (!sessionResult) {
      return NextResponse.json(
        { success: false, message: 'Verificações não concluídas' },
        { status: 400 }
      );
    }

    const [sessionId, sessionData] = sessionResult;

    // Verificar se os dados coincidem
    if (sessionData.name !== name || sessionData.phone !== phone) {
      return NextResponse.json(
        { success: false, message: 'Dados não coincidem com a verificação' },
        { status: 400 }
      );
    }

    try {
      // 1. Criar usuário no Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Hash da senha para armazenamento adicional (se necessário)
      const hashedPassword = await bcrypt.hash(password, 12);

      // 3. Definir custom claim de admin usando Firebase Admin
      const adminAuth = getAdminAuth();
      if (adminAuth) {
        await adminAuth.setCustomUserClaims(user.uid, {
          admin: true,
          role: 'admin'
        });
      }

      // 4. Salvar dados do admin no Firestore
      await setDoc(doc(db, 'admins', user.uid), {
        uid: user.uid,
        name,
        email,
        phone,
        role: 'admin',
        status: 'active',
        createdAt: new Date().toISOString(),
        lastLogin: null,
        twoFactorEnabled: false,
        adminClaimSet: true,
        adminClaimSetAt: new Date().toISOString(),
        authUserCreated: true,
        // Não salvar senha hasheada por segurança (Firebase Auth já cuida disso)
        registrationMethod: 'sms_email_verification'
      });

      // 5. Limpar sessão temporária
      otpStore.delete(sessionId);

      // 6. Enviar email de boas-vindas
      await sendWelcomeEmail(email, name);

      console.log(`[Admin Register] Administrador criado: ${email} (${name})`);
      
      return NextResponse.json({
        success: true,
        message: 'Administrador criado com sucesso!',
        adminId: user.uid
      });

    } catch (firebaseError: any) {
      console.error('[Admin Register] Erro do Firebase:', firebaseError);
      
      // Tratar erros específicos do Firebase
      let errorMessage = 'Erro ao criar administrador';
      
      if (firebaseError.code === 'auth/email-already-in-use') {
        errorMessage = 'Este email já está em uso';
      } else if (firebaseError.code === 'auth/weak-password') {
        errorMessage = 'Senha muito fraca';
      } else if (firebaseError.code === 'auth/invalid-email') {
        errorMessage = 'Email inválido';
      }
      
      return NextResponse.json(
        { success: false, message: errorMessage },
        { status: 400 }
      );
    }

  } catch (error: any) {
    console.error('[Admin Register] Erro ao completar cadastro:', error);
    
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
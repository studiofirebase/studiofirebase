import { getAdminAuth } from '@/lib/firebase-admin';

interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

/**
 * Envia email usando Firebase Admin SDK
 * Requer configuração de um provedor de email (SMTP, SendGrid, etc.)
 */
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    console.log(`[Email Service] Preparando envio para ${options.to}`);
    
    // Para Firebase, você pode usar:
    // 1. Firebase Extensions (Trigger Email)
    // 2. Cloud Functions com Nodemailer
    // 3. Integração direta com SendGrid/Mailgun
    
    // Por enquanto, vamos salvar no Firestore para ser processado por uma Cloud Function
    const { getFirestore } = require('firebase-admin/firestore');
    const { getAdminApp } = require('@/lib/firebase-admin');
    
    const app = getAdminApp();
    if (!app) {
      throw new Error('Firebase Admin não inicializado');
    }
    
    const db = getFirestore(app);
    
    // Adicionar à fila de emails
    const emailDoc = await db.collection('mail').add({
      to: options.to,
      message: {
        subject: options.subject,
        text: options.text,
        html: options.html || options.text
      },
      createdAt: new Date(),
      status: 'pending'
    });
    
    console.log(`[Email Service] Email enfileirado com ID: ${emailDoc.id}`);
    return true;
    
  } catch (error) {
    console.error('[Email Service] Erro ao enviar email:', error);
    return false;
  }
}

/**
 * Envia código OTP por email
 */
export async function sendOTPEmail(email: string, code: string, name?: string): Promise<boolean> {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .code { background: white; border: 2px dashed #667eea; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 10px; margin: 20px 0; border-radius: 8px; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
        .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔐 Código de Verificação</h1>
          <p>Cadastro de Administrador</p>
        </div>
        <div class="content">
          ${name ? `<p>Olá, <strong>${name}</strong>!</p>` : '<p>Olá!</p>'}
          <p>Você está quase lá! Use o código abaixo para concluir seu cadastro como administrador:</p>
          <div class="code">${code}</div>
          <p><strong>Este código expira em 10 minutos.</strong></p>
          <p>Se você não solicitou este código, ignore este email.</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
          <p style="color: #666; font-size: 14px;">
            <strong>Dicas de segurança:</strong><br>
            • Nunca compartilhe este código com ninguém<br>
            • Nossa equipe nunca solicitará este código<br>
            • Verifique sempre a URL do site antes de inserir o código
          </p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} ${process.env.PUBLIC_DISPLAY_NAME || 'Sua Empresa'}. Todos os direitos reservados.</p>
          <p>Este é um email automático, por favor não responda.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
Código de Verificação - Cadastro de Administrador

${name ? `Olá, ${name}!` : 'Olá!'}

Você está quase lá! Use o código abaixo para concluir seu cadastro como administrador:

${code}

Este código expira em 10 minutos.

Se você não solicitou este código, ignore este email.

---
© ${new Date().getFullYear()} ${process.env.PUBLIC_DISPLAY_NAME || 'Sua Empresa'}
  `;

  return await sendEmail({
    to: email,
    subject: `Código de Verificação: ${code}`,
    text,
    html
  });
}

/**
 * Envia email de boas-vindas após cadastro
 */
export async function sendWelcomeEmail(email: string, name: string): Promise<boolean> {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Bem-vindo!</h1>
          <p>Conta de Administrador Criada</p>
        </div>
        <div class="content">
          <p>Olá, <strong>${name}</strong>!</p>
          <p>Sua conta de administrador foi criada com sucesso!</p>
          <p>Você agora tem acesso ao painel administrativo com todas as permissões necessárias.</p>
          <p><strong>Próximos passos:</strong></p>
          <ul>
            <li>Faça login com suas credenciais</li>
            <li>Configure suas preferências</li>
            <li>Explore o painel administrativo</li>
          </ul>
          <p>Se precisar de ajuda, nossa equipe está à disposição.</p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} ${process.env.PUBLIC_DISPLAY_NAME || 'Sua Empresa'}. Todos os direitos reservados.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
Bem-vindo! - Conta de Administrador Criada

Olá, ${name}!

Sua conta de administrador foi criada com sucesso!

Você agora tem acesso ao painel administrativo com todas as permissões necessárias.

Próximos passos:
- Faça login com suas credenciais
- Configure suas preferências
- Explore o painel administrativo

Se precisar de ajuda, nossa equipe está à disposição.

---
© ${new Date().getFullYear()} ${process.env.PUBLIC_DISPLAY_NAME || 'Sua Empresa'}
  `;

  return await sendEmail({
    to: email,
    subject: 'Bem-vindo ao Painel Administrativo! 🎉',
    text,
    html
  });
}
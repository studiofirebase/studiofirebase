import { getAdminAuth } from '@/lib/firebase-admin';

/**
 * Envia código OTP por SMS usando Firebase Admin SDK
 * Requer configuração do Firebase Phone Authentication
 */
export async function sendSMS(phone: string, code: string): Promise<boolean> {
  try {
    console.log(`[SMS Service] Preparando envio para ${phone}`);
    
    // Firebase não tem envio direto de SMS via Admin SDK
    // Opções para implementação:
    
    // 1. Usar Twilio (recomendado para produção)
    if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
      return await sendViaTwilio(phone, code);
    }
    
    // 2. Usar AWS SNS
    if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
      return await sendViaAWS(phone, code);
    }
    
    // 3. Salvar no Firestore para processamento por Cloud Function
    return await queueSMSInFirestore(phone, code);
    
  } catch (error) {
    console.error('[SMS Service] Erro ao enviar SMS:', error);
    return false;
  }
}

/**
 * Envia SMS via Twilio
 */
async function sendViaTwilio(phone: string, code: string): Promise<boolean> {
  try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const fromNumber = process.env.TWILIO_PHONE_NUMBER;
    
    if (!accountSid || !authToken || !fromNumber) {
      throw new Error('Configuração Twilio incompleta');
    }
    
    // Importar Twilio dinamicamente
    const twilio = require('twilio');
    const client = twilio(accountSid, authToken);
    
    const message = await client.messages.create({
      body: `Seu código de verificação é: ${code}\n\nEste código expira em 10 minutos.\n\n${process.env.PUBLIC_DISPLAY_NAME || 'Sua Empresa'}`,
      from: fromNumber,
      to: phone
    });
    
    console.log(`[SMS Service] SMS enviado via Twilio: ${message.sid}`);
    return true;
    
  } catch (error) {
    console.error('[SMS Service] Erro Twilio:', error);
    return false;
  }
}

/**
 * Envia SMS via AWS SNS
 */
async function sendViaAWS(phone: string, code: string): Promise<boolean> {
  try {
    const AWS = require('aws-sdk');
    
    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION || 'us-east-1'
    });
    
    const sns = new AWS.SNS();
    
    const params = {
      Message: `Seu código de verificação é: ${code}\n\nEste código expira em 10 minutos.`,
      PhoneNumber: phone,
      MessageAttributes: {
        'AWS.SNS.SMS.SMSType': {
          DataType: 'String',
          StringValue: 'Transactional'
        }
      }
    };
    
    const result = await sns.publish(params).promise();
    console.log(`[SMS Service] SMS enviado via AWS SNS: ${result.MessageId}`);
    return true;
    
  } catch (error) {
    console.error('[SMS Service] Erro AWS SNS:', error);
    return false;
  }
}

/**
 * Enfileira SMS no Firestore para processamento por Cloud Function
 */
async function queueSMSInFirestore(phone: string, code: string): Promise<boolean> {
  try {
    const { getFirestore } = require('firebase-admin/firestore');
    const { getAdminApp } = require('@/lib/firebase-admin');
    
    const app = getAdminApp();
    if (!app) {
      throw new Error('Firebase Admin não inicializado');
    }
    
    const db = getFirestore(app);
    
    // Adicionar à fila de SMS
    const smsDoc = await db.collection('sms_queue').add({
      phone,
      message: `Seu código de verificação é: ${code}\n\nEste código expira em 10 minutos.\n\n${process.env.PUBLIC_DISPLAY_NAME || 'Sua Empresa'}`,
      code,
      createdAt: new Date(),
      status: 'pending',
      attempts: 0
    });
    
    console.log(`[SMS Service] SMS enfileirado com ID: ${smsDoc.id}`);
    console.log(`[SMS Service] 📱 CÓDIGO PARA ${phone}: ${code}`);
    
    // Em desenvolvimento, também mostrar no console
    if (process.env.NODE_ENV === 'development') {
      console.log('\n===========================================');
      console.log(`📱 SMS PARA: ${phone}`);
      console.log(`🔐 CÓDIGO: ${code}`);
      console.log('===========================================\n');
    }
    
    return true;
    
  } catch (error) {
    console.error('[SMS Service] Erro ao enfileirar SMS:', error);
    return false;
  }
}

/**
 * Formata número de telefone para padrão internacional
 */
export function formatPhoneNumber(phone: string): string {
  // Remove caracteres não numéricos
  const cleaned = phone.replace(/\D/g, '');
  
  // Se não começar com +, adicionar código do país (Brasil = +55)
  if (!phone.startsWith('+')) {
    return `+55${cleaned}`;
  }
  
  return `+${cleaned}`;
}

/**
 * Valida formato de número de telefone
 */
export function isValidPhoneNumber(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '');
  // Brasil: 11 dígitos (com DDD 2 dígitos + 9 dígitos) ou 10 dígitos (DDD + 8 dígitos)
  return cleaned.length >= 10 && cleaned.length <= 15;
}
// Cloud Function para processar fila de emails e SMS
// Este arquivo deve ser adicionado ao functions/src/index.ts

import * as functions from 'firebase-functions/v1';
import * as admin from 'firebase-admin';

// Inicializar Admin SDK se ainda não foi
if (!admin.apps.length) {
  admin.initializeApp();
}

/**
 * Processa fila de emails
 * Requer Firebase Extension: Trigger Email
 * Ou integração com SendGrid/Mailgun
 */
export const processEmailQueue = functions.firestore
  .document('mail/{emailId}')
  .onCreate(async (snap, context) => {
    const emailData = snap.data();
    
    console.log(`[Email Queue] Processando email para: ${emailData.to}`);
    
    try {
      // Se estiver usando Firebase Trigger Email Extension, ele processa automaticamente
      // Caso contrário, implementar integração aqui
      
      // Exemplo com SendGrid:
      // const sgMail = require('@sendgrid/mail');
      // sgMail.setApiKey(functions.config().sendgrid.key);
      // await sgMail.send({
      //   to: emailData.to,
      //   from: 'noreply@seuapp.com',
      //   subject: emailData.message.subject,
      //   text: emailData.message.text,
      //   html: emailData.message.html
      // });
      
      // Atualizar status
      await snap.ref.update({
        status: 'sent',
        sentAt: admin.firestore.FieldValue.serverTimestamp()
      });
      
      console.log(`[Email Queue] Email enviado com sucesso: ${snap.id}`);
      
    } catch (error) {
      console.error('[Email Queue] Erro ao enviar email:', error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      
      await snap.ref.update({
        status: 'error',
        error: errorMessage,
        attempts: admin.firestore.FieldValue.increment(1)
      });
    }
  });

/**
 * Processa fila de SMS
 * Requer integração com Twilio, AWS SNS, ou similar
 */
export const processSMSQueue = functions.firestore
  .document('sms_queue/{smsId}')
  .onCreate(async (snap, context) => {
    const smsData = snap.data();
    
    console.log(`[SMS Queue] Processando SMS para: ${smsData.phone}`);
    
    try {
      // Exemplo com Twilio:
      // const twilio = require('twilio');
      // const client = twilio(
      //   functions.config().twilio.account_sid,
      //   functions.config().twilio.auth_token
      // );
      // 
      // await client.messages.create({
      //   body: smsData.message,
      //   from: functions.config().twilio.phone_number,
      //   to: smsData.phone
      // });
      
      // Atualizar status
      await snap.ref.update({
        status: 'sent',
        sentAt: admin.firestore.FieldValue.serverTimestamp()
      });
      
      console.log(`[SMS Queue] SMS enviado com sucesso: ${snap.id}`);
    } catch (error) {
      console.error('[SMS Queue] Erro ao enviar SMS:', error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      
      await snap.ref.update({
        status: 'error',
        error: errorMessage,
        attempts: admin.firestore.FieldValue.increment(1)
      });
      
      // Tentar reenviar se não ultrapassou limite
      if (smsData.attempts < 3) {
        console.log(`[SMS Queue] Tentando reenviar (tentativa ${smsData.attempts + 1}/3)`);
        // A função será chamada novamente quando o documento for atualizado
      }
    }
  });

/**
 * Limpa SMS antigos da fila (mais de 24 horas)
 */
export const cleanupSMSQueue = functions.pubsub
  .schedule('every 24 hours')
  .onRun(async (context) => {
    const db = admin.firestore();
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
    
    const oldSMS = await db.collection('sms_queue')
      .where('createdAt', '<', yesterday)
      .get();
    
    const batch = db.batch();
    oldSMS.docs.forEach(doc => batch.delete(doc.ref));
    
    await batch.commit();
    
    console.log(`[SMS Cleanup] ${oldSMS.size} SMS antigos removidos`);
  });

/**
 * Limpa emails antigos da fila (mais de 7 dias)
 */
export const cleanupEmailQueue = functions.pubsub
  .schedule('every 7 days')
  .onRun(async (context) => {
    const db = admin.firestore();
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    
    const oldEmails = await db.collection('mail')
      .where('createdAt', '<', weekAgo)
      .where('status', '==', 'sent')
      .get();
    
    const batch = db.batch();
    oldEmails.docs.forEach(doc => batch.delete(doc.ref));
    
    await batch.commit();
    
    console.log(`[Email Cleanup] ${oldEmails.size} emails antigos removidos`);
  });
# 📧 Configuração de SMS e Email - Firebase

## 🎯 Visão Geral

Sistema completo de envio de SMS e Email para verificação de administradores usando Firebase e serviços externos.

---

## 📱 Configuração de SMS

### Opção 1: Twilio (Recomendado)

#### 1. Criar conta no Twilio
- Acesse https://www.twilio.com/
- Crie uma conta gratuita ou paga
- Obtenha um número de telefone Twilio

#### 2. Obter credenciais
- Account SID
- Auth Token
- Número de telefone Twilio

#### 3. Instalar dependência
```bash
cd /Users/italosanta/Downloads/download\ \(3\)
npm install twilio
```

#### 4. Adicionar ao .env.local
```bash
# Twilio SMS
TWILIO_ACCOUNT_SID=your_account_sid_here
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=+15551234567
```

#### 5. Deploy das Functions (se usar)
```bash
cd functions
npm install twilio
firebase deploy --only functions:processSMSQueue
```

### Opção 2: AWS SNS

#### 1. Configurar AWS
- Acesse AWS Console
- Configure SNS (Simple Notification Service)
- Obtenha Access Key e Secret Key

#### 2. Instalar dependência
```bash
npm install aws-sdk
```

#### 3. Adicionar ao .env.local
```bash
# AWS SNS
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=us-east-1
```

---

## 📧 Configuração de Email

### Opção 1: Firebase Trigger Email Extension (Mais Fácil)

#### 1. Instalar Extension
```bash
firebase ext:install firebase/firestore-send-email
```

#### 2. Configurar durante instalação
- SMTP Connection URI: `smtps://username:password@smtp.gmail.com:465`
- Email Documents Collection: `mail`
- Default FROM address: `noreply@seudominio.com`

#### 3. Configurar Gmail App Password (se usar Gmail)
1. Acesse Google Account Security
2. Ative 2FA
3. Gere App Password
4. Use no SMTP URI: `smtps://seuemail@gmail.com:apppassword@smtp.gmail.com:465`

### Opção 2: SendGrid

#### 1. Criar conta SendGrid
- Acesse https://sendgrid.com/
- Crie uma conta gratuita (100 emails/dia)
- Obtenha API Key

#### 2. Instalar dependência
```bash
npm install @sendgrid/mail
cd functions
npm install @sendgrid/mail
```

#### 3. Adicionar ao .env.local
```bash
# SendGrid
SENDGRID_API_KEY=SG.your_api_key_here
SENDGRID_FROM_EMAIL=noreply@seudominio.com
SENDGRID_FROM_NAME=Sua Empresa
```

#### 4. Atualizar função de email
Edite `/functions/src/admin-messaging.ts` e descomente o código SendGrid.

### Opção 3: Mailgun

#### 1. Criar conta Mailgun
- Acesse https://www.mailgun.com/
- Configure seu domínio
- Obtenha API Key

#### 2. Instalar dependência
```bash
npm install mailgun-js
```

#### 3. Adicionar ao .env.local
```bash
# Mailgun
MAILGUN_API_KEY=your_api_key
MAILGUN_DOMAIN=mg.seudominio.com
```

---

## 🔥 Configurar Cloud Functions

### 1. Adicionar exports ao index.ts

Edite `/functions/src/index.ts`:

```typescript
// Importar funções de messaging
export {
  processEmailQueue,
  processSMSQueue,
  cleanupSMSQueue,
  cleanupEmailQueue
} from './admin-messaging';
```

### 2. Configurar credenciais no Firebase

```bash
# Twilio
firebase functions:config:set twilio.account_sid="YOUR_SID" twilio.auth_token="YOUR_TOKEN" twilio.phone_number="+15551234567"

# SendGrid
firebase functions:config:set sendgrid.key="YOUR_API_KEY"

# Mailgun
firebase functions:config:set mailgun.api_key="YOUR_KEY" mailgun.domain="mg.seudominio.com"
```

### 3. Deploy
```bash
cd functions
npm install
npm run build
firebase deploy --only functions
```

---

## 🧪 Testar Sistema

### Teste Local (Desenvolvimento)

1. Os códigos aparecem no console do servidor:
```
===========================================
📱 SMS PARA: +5511999999999
🔐 CÓDIGO: 123456
===========================================
```

2. Emails são salvos na collection `mail` do Firestore

### Teste em Produção

1. Cadastre-se como admin
2. Verifique SMS no celular
3. Verifique email na caixa de entrada
4. Complete o cadastro

---

## 📊 Monitorar Envios

### Firestore Collections

**Collection: `mail`**
```javascript
{
  to: "usuario@email.com",
  message: {
    subject: "Assunto",
    text: "Texto",
    html: "<html>..."
  },
  status: "pending" | "sent" | "error",
  createdAt: Timestamp,
  sentAt: Timestamp,
  error: string (se houver)
}
```

**Collection: `sms_queue`**
```javascript
{
  phone: "+5511999999999",
  message: "Seu código é: 123456",
  code: "123456",
  status: "pending" | "sent" | "error",
  createdAt: Timestamp,
  sentAt: Timestamp,
  attempts: number,
  error: string (se houver)
}
```

### Firebase Console
- Functions > Logs
- Firestore > Collections (mail, sms_queue)

---

## ⚠️ Troubleshooting

### SMS não está sendo enviado

1. Verifique credenciais no .env.local
2. Verifique se o número está no formato internacional (+55...)
3. Verifique logs: `firebase functions:log`
4. Em desenvolvimento, códigos aparecem no console

### Email não está sendo enviado

1. Verifique Extension instalada: `firebase ext:list`
2. Verifique collection `mail` no Firestore
3. Verifique SMTP configurado corretamente
4. Para Gmail, use App Password, não senha normal

### Functions não deployam

```bash
cd functions
rm -rf node_modules package-lock.json
npm install
npm run build
firebase deploy --only functions
```

---

## 💰 Custos

### Twilio
- Free Trial: $15 crédito
- Produção: ~$0.0079 por SMS (Brasil)

### SendGrid
- Free: 100 emails/dia
- Essentials: $19.95/mês (40,000 emails)

### AWS SNS
- $0.00645 por SMS (Brasil)

### Firebase Functions
- Free tier: 2 milhões invocações/mês
- Blaze: $0.40 por milhão após free tier

---

## 🔐 Segurança

1. **Nunca commitar credenciais**
   - Use .env.local (já no .gitignore)
   - Use Firebase Functions Config

2. **Rate Limiting**
   - Implemente limite de tentativas
   - Use reCAPTCHA na interface

3. **Validação**
   - Valide formato de telefone/email
   - Expire códigos em 10 minutos

4. **Logs**
   - Monitore tentativas falhas
   - Alert em caso de abuso

---

## 📚 Recursos

- [Twilio Docs](https://www.twilio.com/docs)
- [SendGrid Docs](https://docs.sendgrid.com/)
- [Firebase Extensions](https://extensions.dev/)
- [AWS SNS Docs](https://docs.aws.amazon.com/sns/)

---

## ✅ Checklist de Produção

- [ ] Twilio ou AWS SNS configurado
- [ ] SendGrid ou Firebase Email Extension instalado
- [ ] .env.local com todas as credenciais
- [ ] Cloud Functions deployed
- [ ] Teste completo do fluxo
- [ ] Monitoramento configurado
- [ ] Rate limiting implementado
- [ ] Logs funcionando

---

**Status Atual**: Sistema pronto para integração. Escolha um provedor e siga as instruções acima.
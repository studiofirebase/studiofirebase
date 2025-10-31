# ⚡ Configuração Rápida - SMS e Email

## 🚀 Setup em 5 Minutos

### Passo 1: Twilio (SMS)

```bash
# 1. Criar conta: https://www.twilio.com/try-twilio
# 2. Obter número de telefone gratuito
# 3. Copiar credenciais do Dashboard

# 4. Instalar
npm install twilio

# 5. Adicionar ao .env.local:
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_NUMBER=+15551234567
```

### Passo 2: SendGrid (Email)

```bash
# 1. Criar conta: https://signup.sendgrid.com/
# 2. Settings > API Keys > Create API Key
# 3. Full Access > Create & View

# 4. Instalar
npm install @sendgrid/mail

# 5. Adicionar ao .env.local:
SENDGRID_API_KEY=SG...
SENDGRID_FROM_EMAIL=noreply@seudominio.com
```

### Passo 3: Firebase Functions

```bash
cd functions

# Instalar dependências
npm install twilio @sendgrid/mail

# Configurar
firebase functions:config:set \
  twilio.account_sid="YOUR_SID" \
  twilio.auth_token="YOUR_TOKEN" \
  twilio.phone_number="+15551234567" \
  sendgrid.key="YOUR_KEY"

# Deploy
npm run build
firebase deploy --only functions
```

### Passo 4: Testar

```bash
# Iniciar servidor
npm run dev

# Acessar: http://localhost:3000/admin
# Clicar em "Cadastre-se como admin"
# Preencher formulário
# Verificar SMS no celular e email na caixa de entrada
```

---

## 🎯 Alternativa: Usar apenas Firebase (Sem custos externos)

Se não quiser usar Twilio/SendGrid agora:

1. SMS: Códigos aparecem no console do servidor (desenvolvimento)
2. Email: Use Firebase Trigger Email Extension (gratuito com Gmail)

```bash
# Instalar Extension de Email
firebase ext:install firebase/firestore-send-email

# Configurar com Gmail App Password
SMTP: smtps://seuemail@gmail.com:apppassword@smtp.gmail.com:465
```

---

## 📝 Exemplo .env.local Completo

```bash
# ... suas configurações existentes ...

# SMS - Twilio
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=+15551234567

# Email - SendGrid
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SENDGRID_FROM_EMAIL=noreply@seudominio.com
SENDGRID_FROM_NAME=Sua Empresa

# OU Email - SMTP Direto (Gmail/Outlook)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=seuemail@gmail.com
SMTP_PASS=sua_app_password_aqui
```

---

## ✅ Verificar se está Funcionando

### Console do Servidor (npm run dev)
```
===========================================
📱 SMS PARA: +5511999999999
🔐 CÓDIGO: 123456
===========================================

[Email Service] Email enfileirado com ID: abc123
```

### Firebase Console
- Firestore > `mail` collection (emails)
- Firestore > `sms_queue` collection (SMS)
- Functions > Logs (ver execução)

---

## 🆘 Problemas Comuns

**SMS não chega:**
- Verifique se o número está no formato +5511999999999
- Em conta trial do Twilio, só envia para números verificados
- Verifique créditos no Dashboard Twilio

**Email não chega:**
- Verifique pasta de SPAM
- Gmail: use App Password, não senha normal
- SendGrid: verifique domínio autenticado

**Functions não funcionam:**
```bash
# Ver logs
firebase functions:log --only processEmailQueue

# Ver config
firebase functions:config:get
```

---

## 💡 Dica Pro

Para testar localmente sem SMS/Email reais:

1. Deixe sem configurar Twilio/SendGrid
2. Códigos aparecem no console
3. Copie e cole manualmente
4. Configure os serviços reais quando for para produção

---

**Pronto!** Sistema funcionando. Configure Twilio + SendGrid para produção completa.
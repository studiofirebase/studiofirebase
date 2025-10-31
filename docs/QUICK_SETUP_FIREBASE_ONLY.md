# Configuração Rápida: Somente Firebase (SMS + Email)

Este guia mostra como usar apenas recursos do Firebase para o cadastro com verificação por SMS e por email:
- SMS: Firebase Authentication (Phone)
- Email: Firebase Extension Trigger Email (ou Cloud Function que processe a coleção `mail`)

## 1) Pré‑requisitos
- Projeto Firebase criado
- Firebase CLI instalado e logado
- Web App cadastrado no projeto (Firebase Console) com suas credenciais no frontend
- Admin SDK configurado no backend (variáveis de ambiente/Service Account)

## 2) Habilitar Autenticação por Telefone (Phone)
1. No Firebase Console, acesse Authentication > Sign-in method
2. Ative o provedor "Phone"
3. (Opcional) Adicione números de teste para desenvolvimento
4. No frontend, use o `RecaptchaVerifier` invisível e `signInWithPhoneNumber`:
   - O projeto já inclui a integração no arquivo `src/components/admin-registration-modal.tsx` usando `sendPhoneVerificationCode`/`verifyPhoneCode` de `@/services/admin-auth-service`.
   - O container reCAPTCHA invisível com id `recaptcha-admin-register` está no modal.

Dicas:
- Em localhost, o reCAPTCHA funciona normalmente (v2 invisível). Em produção, garanta que o domínio esteja autorizado no Firebase Console.

## 3) Envio de Email via Firebase (Trigger Email)
Opção A — Recomendado: Instalar a extensão "Trigger Email"
1. No Firebase Console, Extensions > Instalar a extensão "Trigger Email"
2. Configure o provedor de email (SMTP, Gmail, etc.) conforme a extensão
3. A extensão monitora a coleção `mail` e envia emails automaticamente
4. O projeto já enfileira emails criando documentos na coleção `mail` via `src/lib/email-service.ts`

Opção B — Sem extensão: usar Cloud Functions próprias
- O arquivo `functions/src/admin-messaging.ts` contém um exemplo de função `processEmailQueue` que reage à coleção `mail`.
- Se você instalar a extensão Trigger Email, não publique a função `processEmailQueue` (evita duplicar envio). Use apenas uma das opções.

## 4) Fluxo de Cadastro (Resumo)
- Passo Telefone (SMS):
  - O usuário informa Nome, Email, Telefone no modal
  - O app dispara `signInWithPhoneNumber` (Firebase Auth) e envia o SMS
- Passo SMS OTP:
  - Usuário digita código de 6 dígitos
  - App confirma com `confirmationResult.confirm(code)`
  - Se OK, o app chama `POST /api/admin/register/send-email-otp` para gerar/enviar OTP por email
- Passo Email OTP:
  - Usuário digita código recebido por email
  - App chama `POST /api/admin/register/verify-email` para validar o código
- Passo Senha:
  - App chama `POST /api/admin/register/complete` para criar o usuário, definir claims de admin e gravar no Firestore

## 5) Rotas/API relevantes
- `POST /api/admin/register/send-email-otp` — Gera/reenvia OTP por email e salva/atualiza sessão OTP (smsVerified=true)
- `POST /api/admin/register/verify-email` — Valida OTP de email
- `POST /api/admin/register/complete` — Cria admin no Auth, define claims e salva no Firestore

## 6) Reenvio de Códigos (UX)
- SMS: o modal possui botão "Reenviar código por SMS" que chama novamente `signInWithPhoneNumber`
- Email: o modal possui botão "Reenviar código por email" que chama novamente `/api/admin/register/send-email-otp`

## 7) Deploy
Se você usa a extensão Trigger Email (recomendado):
- Não precisa publicar `processEmailQueue` das funções. Foque apenas no deploy do app web.

Se você usa Cloud Functions próprias (sem extensão):
1. Certifique‑se que `functions/src/admin-messaging.ts` está exportado no `functions/src/index.ts`
2. Faça o deploy das funções:
   ```bash
   firebase deploy --only functions
   ```

## 8) Testes Rápidos
- Teste SMS em `/admin` > Abrir modal de cadastro > preencher telefone
- Valide o SMS via código de 6 dígitos
- Verifique no Firestore se foi criado um doc em `mail` e confira o envio
- Conclua com a senha e veja o admin criado no Auth e no `admins` no Firestore

## 9) Observações de Segurança
- Não exponha chaves ou credenciais sensíveis no frontend
- Use HTTPS/host confiável em produção
- Considere Auditoria/Logs e limite de tentativas para OTP

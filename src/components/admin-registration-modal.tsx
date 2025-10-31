'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ShieldCheck, Phone, Mail, Lock, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { sendPhoneVerificationCode, verifyPhoneCode } from '@/services/admin-auth-service';

// Schemas de validação
const phoneSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(10, 'Telefone deve ter pelo menos 10 dígitos').regex(/^[\d\s\-\+\(\)]+$/, 'Telefone inválido')
});

const otpSchema = z.object({
  code: z.string().length(6, 'Código deve ter 6 dígitos').regex(/^\d+$/, 'Apenas números')
});

const passwordSchema = z.object({
  password: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
      'Senha deve conter: maiúscula, minúscula, número e símbolo'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Senhas não coincidem",
  path: ["confirmPassword"]
});

type PhoneFormData = z.infer<typeof phoneSchema>;
type OtpFormData = z.infer<typeof otpSchema>;
type PasswordFormData = z.infer<typeof passwordSchema>;

interface AdminRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 'phone' | 'sms-otp' | 'email-otp' | 'password' | 'success';

export default function AdminRegistrationModal({ isOpen, onClose }: AdminRegistrationModalProps) {
  const [currentStep, setCurrentStep] = useState<Step>('phone');
  const [loading, setLoading] = useState(false);
  const [adminData, setAdminData] = useState<PhoneFormData | null>(null);
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [resendSmsLoading, setResendSmsLoading] = useState(false);
  const [resendEmailLoading, setResendEmailLoading] = useState(false);
  const { toast } = useToast();

  // Forms
  const phoneForm = useForm<PhoneFormData>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { name: '', email: '', phone: '' }
  });

  const smsOtpForm = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: { code: '' }
  });

  const emailOtpForm = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: { code: '' }
  });

  const passwordForm = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { password: '', confirmPassword: '' }
  });

  // Reset modal ao fechar
  const handleClose = () => {
    setCurrentStep('phone');
    setAdminData(null);
    phoneForm.reset();
    smsOtpForm.reset();
    emailOtpForm.reset();
    passwordForm.reset();
    onClose();
  };

  // Passo 1: Enviar dados iniciais e SMS OTP via Firebase Phone Auth
  const handlePhoneSubmit = async (data: PhoneFormData) => {
    setLoading(true);
    try {
      // Envia SMS usando Firebase Auth (reCAPTCHA invisível)
      const confirmation = await sendPhoneVerificationCode(data.phone, 'recaptcha-admin-register');
      setConfirmationResult(confirmation);
      setAdminData(data);
      setCurrentStep('sms-otp');
      toast({
        title: 'SMS Enviado!',
        description: `Código enviado para ${data.phone}`
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: error.message || 'Falha ao enviar SMS. Verifique o número e tente novamente.'
      });
    } finally {
      setLoading(false);
    }
  };

  // Passo 2: Verificar SMS OTP (Firebase) e disparar envio de OTP por email
  const handleSmsOtpSubmit = async (data: OtpFormData) => {
    setLoading(true);
    try {
      if (!confirmationResult || !adminData) throw new Error('Sessão de verificação inválida');

      // Verifica o código via Firebase
      await verifyPhoneCode(confirmationResult, data.code);

      // Dispara envio do OTP por email usando Firebase (Firestore + Extension)
      const emailResp = await fetch('/api/admin/register/send-email-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: adminData.name,
          email: adminData.email,
          phone: adminData.phone
        })
      });
      const emailResult = await emailResp.json();
      if (!emailResp.ok) {
        throw new Error(emailResult.message || 'Falha ao enviar código por email');
      }

      setCurrentStep('email-otp');
      toast({
        title: 'SMS Verificado!',
        description: 'Enviamos um código para seu email.'
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: error.message || 'Falha ao verificar SMS. Tente novamente.'
      });
    } finally {
      setLoading(false);
    }
  };

  // Reenviar SMS via Firebase Phone Auth
  const handleResendSms = async () => {
    if (!adminData) return;
    setResendSmsLoading(true);
    try {
      const confirmation = await sendPhoneVerificationCode(adminData.phone, 'recaptcha-admin-register');
      setConfirmationResult(confirmation);
      toast({ title: 'SMS reenviado', description: `Novo código enviado para ${adminData.phone}` });
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Erro', description: error.message || 'Não foi possível reenviar o SMS.' });
    } finally {
      setResendSmsLoading(false);
    }
  };

  // Reenviar Email OTP
  const handleResendEmail = async () => {
    if (!adminData) return;
    setResendEmailLoading(true);
    try {
      const emailResp = await fetch('/api/admin/register/send-email-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: adminData.name,
          email: adminData.email,
          phone: adminData.phone
        })
      });
      const res = await emailResp.json();
      if (!emailResp.ok) throw new Error(res.message || 'Falha ao reenviar código por email');
      toast({ title: 'Email reenviado', description: `Novo código enviado para ${adminData.email}` });
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Erro', description: error.message || 'Não foi possível reenviar o email.' });
    } finally {
      setResendEmailLoading(false);
    }
  };

  // Passo 3: Verificar Email OTP
  const handleEmailOtpSubmit = async (data: OtpFormData) => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/register/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: adminData?.email,
          code: data.code
        })
      });

      const result = await response.json();
      
      if (response.ok) {
        setCurrentStep('password');
        toast({
          title: "Email Verificado!",
          description: "Agora defina sua senha"
        });
      } else {
        throw new Error(result.message || 'Código de email inválido');
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  // Passo 4: Criar conta final
  const handlePasswordSubmit = async (data: PasswordFormData) => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/register/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...adminData,
          password: data.password
        })
      });

      const result = await response.json();
      
      if (response.ok) {
        setCurrentStep('success');
        toast({
          title: "Cadastro Concluído!",
          description: "Administrador criado com sucesso"
        });
      } else {
        throw new Error(result.message || 'Erro ao criar administrador');
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  const getStepContent = () => {
    switch (currentStep) {
      case 'phone':
        return (
          <div className="space-y-4">
            <div className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                <Phone className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold">Cadastro de Administrador</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Preencha seus dados para iniciar o cadastro
              </p>
            </div>
            
            <form onSubmit={phoneForm.handleSubmit(handlePhoneSubmit)} className="space-y-4 mt-6">
                <div>
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input
                    id="name"
                    {...phoneForm.register('name')}
                    placeholder="Seu nome completo"
                  />
                  {phoneForm.formState.errors.name && (
                    <p className="text-sm text-destructive mt-1">
                      {phoneForm.formState.errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    {...phoneForm.register('email')}
                    placeholder="seu.email@exemplo.com"
                  />
                  {phoneForm.formState.errors.email && (
                    <p className="text-sm text-destructive mt-1">
                      {phoneForm.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    {...phoneForm.register('phone')}
                    placeholder="+55 11 99999-9999"
                  />
                  {phoneForm.formState.errors.phone && (
                    <p className="text-sm text-destructive mt-1">
                      {phoneForm.formState.errors.phone.message}
                    </p>
                  )}
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enviando SMS...
                    </>
                  ) : (
                    'Enviar Código SMS'
                  )}
                </Button>
              </form>
            </div>
          );

      case 'sms-otp':
        return (
          <div className="space-y-4">
            <div className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                <Phone className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold">Verificar SMS</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Digite o código de 6 dígitos enviado para<br />
                <strong>{adminData?.phone}</strong>
              </p>
            </div>
            
            <form onSubmit={smsOtpForm.handleSubmit(handleSmsOtpSubmit)} className="space-y-4 mt-6">
                <div>
                  <Label htmlFor="sms-code">Código SMS</Label>
                  <Input
                    id="sms-code"
                    {...smsOtpForm.register('code')}
                    placeholder="123456"
                    maxLength={6}
                    className="text-center text-2xl tracking-widest"
                  />
                  {smsOtpForm.formState.errors.code && (
                    <p className="text-sm text-destructive mt-1">
                      {smsOtpForm.formState.errors.code.message}
                    </p>
                  )}
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verificando...
                    </>
                  ) : (
                    'Verificar SMS'
                  )}
                </Button>

                <Button
                  type="button"
                  variant="secondary"
                  className="w-full"
                  onClick={handleResendSms}
                  disabled={resendSmsLoading}
                >
                  {resendSmsLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Reenviando SMS...
                    </>
                  ) : (
                    'Reenviar código por SMS'
                  )}
                </Button>

                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setCurrentStep('phone')}
                >
                  Voltar
                </Button>
              </form>
            </div>
          );

      case 'email-otp':
        return (
          <div className="space-y-4">
            <div className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
                <Mail className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-lg font-semibold">Verificar Email</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Digite o código de 6 dígitos enviado para<br />
                <strong>{adminData?.email}</strong>
              </p>
            </div>
            
            <form onSubmit={emailOtpForm.handleSubmit(handleEmailOtpSubmit)} className="space-y-4 mt-6">
                <div>
                  <Label htmlFor="email-code">Código Email</Label>
                  <Input
                    id="email-code"
                    {...emailOtpForm.register('code')}
                    placeholder="123456"
                    maxLength={6}
                    className="text-center text-2xl tracking-widest"
                  />
                  {emailOtpForm.formState.errors.code && (
                    <p className="text-sm text-destructive mt-1">
                      {emailOtpForm.formState.errors.code.message}
                    </p>
                  )}
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verificando...
                    </>
                  ) : (
                    'Verificar Email'
                  )}
                </Button>

                <Button
                  type="button"
                  variant="secondary"
                  className="w-full"
                  onClick={handleResendEmail}
                  disabled={resendEmailLoading}
                >
                  {resendEmailLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Reenviando email...
                    </>
                  ) : (
                    'Reenviar código por email'
                  )}
                </Button>

                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setCurrentStep('sms-otp')}
                >
                  Voltar
                </Button>
              </form>
            </div>
        );

      case 'password':
        return (
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                <Lock className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <CardTitle>Definir Senha</CardTitle>
              <CardDescription>
                Crie uma senha forte para sua conta de administrador
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)} className="space-y-4">
                <div>
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    {...passwordForm.register('password')}
                    placeholder="Sua senha segura"
                  />
                  {passwordForm.formState.errors.password && (
                    <p className="text-sm text-destructive mt-1">
                      {passwordForm.formState.errors.password.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    {...passwordForm.register('confirmPassword')}
                    placeholder="Confirme sua senha"
                  />
                  {passwordForm.formState.errors.confirmPassword && (
                    <p className="text-sm text-destructive mt-1">
                      {passwordForm.formState.errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <div className="text-xs text-muted-foreground">
                  A senha deve conter:
                  <ul className="list-disc list-inside mt-1">
                    <li>Pelo menos 8 caracteres</li>
                    <li>Uma letra maiúscula</li>
                    <li>Uma letra minúscula</li>
                    <li>Um número</li>
                    <li>Um símbolo especial</li>
                  </ul>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Criando Conta...
                    </>
                  ) : (
                    'Criar Administrador'
                  )}
                </Button>

                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setCurrentStep('email-otp')}
                >
                  Voltar
                </Button>
              </form>
            </CardContent>
          </Card>
        );

      case 'success':
        return (
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle>Cadastro Concluído!</CardTitle>
              <CardDescription>
                Sua conta de administrador foi criada com sucesso
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-sm text-green-800 dark:text-green-200">
                  <strong>Nome:</strong> {adminData?.name}<br />
                  <strong>Email:</strong> {adminData?.email}<br />
                  <strong>Telefone:</strong> {adminData?.phone}
                </p>
              </div>
              
              <p className="text-sm text-muted-foreground">
                Você já pode fazer login com suas credenciais
              </p>

              <Button className="w-full" onClick={handleClose}>
                Fazer Login
              </Button>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="sr-only">
          <DialogTitle>Cadastro de Administrador</DialogTitle>
          <DialogDescription>
            Sistema de cadastro com verificação por SMS e email
          </DialogDescription>
        </DialogHeader>
        {/* Container do reCAPTCHA invisível (Firebase Phone Auth) */}
        <div id="recaptcha-admin-register" className="hidden" />
        
        {getStepContent()}
      </DialogContent>
    </Dialog>
  );
}
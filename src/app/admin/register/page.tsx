
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Lock, Mail, ShieldCheck, ArrowLeft, User, Phone, KeyRound } from 'lucide-react';
import FaceIDSetup from '@/components/face-id-setup';
import { registerAdmin } from '@/services/admin-auth-service';
import { sendVerificationCode, verifyCode } from '@/services/verification-service';

export default function AdminRegisterPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [emailCode, setEmailCode] = useState('');
  const [phoneCode, setPhoneCode] = useState('');
  
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [isSendingPhone, setIsSendingPhone] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  const handleSendCode = async (type: 'email' | 'sms') => {
    const recipient = type === 'email' ? email : phone;
    if (!recipient) {
      toast({ variant: "destructive", title: "Entrada necessária", description: `Por favor, insira um ${type === 'email' ? 'e-mail' : 'telefone'} válido.` });
      return;
    }
    
    if (type === 'email') setIsSendingEmail(true);
    if (type === 'sms') setIsSendingPhone(true);

    const result = await sendVerificationCode(type, recipient);
    
    if (result.success) {
      toast({ title: "Código enviado!", description: `Verifique seu ${type === 'email' ? 'e-mail' : 'SMS'} para o código de verificação.` });
    } else {
      toast({ variant: "destructive", title: "Falha no envio", description: result.message });
    }
    
    if (type === 'email') setIsSendingEmail(false);
    if (type === 'sms') setIsSendingPhone(false);
  };

  const handleNextStep = async () => {
    setIsVerifying(true);
    try {
      // Verificar ambos os códigos em paralelo
      const [emailResult, phoneResult] = await Promise.all([
        verifyCode(email, emailCode),
        verifyCode(phone, phoneCode)
      ]);

      if (!emailResult.success) {
        throw new Error(`Código de e-mail inválido: ${emailResult.message}`);
      }
      if (!phoneResult.success) {
        throw new Error(`Código de SMS inválido: ${phoneResult.message}`);
      }

      toast({ title: "Códigos verificados com sucesso!", description: "Continue para o cadastro facial." });
      setStep(2);

    } catch (error: any) {
      toast({ variant: "destructive", title: "Falha na verificação", description: error.message });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleRegistrationSuccess = async () => {
    try {
        await registerAdmin(email, password, name, phone);
        toast({ title: "Cadastro de administrador concluído!", description: "Você será redirecionado para o painel de administração." });
        router.push('/admin');
    } catch(error: any) {
        toast({ variant: "destructive", title: "Erro ao finalizar cadastro", description: error.message || "Tente novamente mais tarde."});
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center relative">
          <Button variant="ghost" size="icon" className="absolute top-4 left-4" onClick={() => router.push('/admin')}>
            <ArrowLeft />
          </Button>
          <div className="flex justify-center mb-4 pt-8">
             <ShieldCheck className="h-10 w-10 text-primary"/>
          </div>
          <CardTitle className="text-2xl">Cadastro de Administrador</CardTitle>
          <CardDescription>
            {step === 1 ? "Preencha seus dados para se cadastrar." : "Realize o cadastro facial para continuar."}
          </CardDescription>
        </CardHeader>
        
        {step === 1 && (
          <>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name"><User className="inline-block mr-2 h-4 w-4" />Nome</Label>
                  <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Seu nome completo"/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email"><Mail className="inline-block mr-2 h-4 w-4" />Email</Label>
                  <div className="flex items-center space-x-2">
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seu@email.com"/>
                    <Button onClick={() => handleSendCode('email')} disabled={isSendingEmail || !email}>
                      {isSendingEmail ? 'Enviando...' : 'Enviar Código'}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="emailCode"><KeyRound className="inline-block mr-2 h-4 w-4" />Código de Verificação (Email)</Label>
                    <Input id="emailCode" type="text" value={emailCode} onChange={(e) => setEmailCode(e.target.value)} placeholder="123456"/>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone"><Phone className="inline-block mr-2 h-4 w-4" />Telefone</Label>
                   <div className="flex items-center space-x-2">
                    <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+55 (00) 00000-0000"/>
                    <Button onClick={() => handleSendCode('sms')} disabled={isSendingPhone || !phone}>
                        {isSendingPhone ? 'Enviando...' : 'Enviar Código'}
                    </Button>
                  </div>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="phoneCode"><KeyRound className="inline-block mr-2 h-4 w-4" />Código de Verificação (Telefone)</Label>
                    <Input id="phoneCode" type="text" value={phoneCode} onChange={(e) => setPhoneCode(e.target.value)} placeholder="123456"/>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password"><Lock className="inline-block mr-2 h-4 w-4" />Senha</Label>
                  <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="********"/>
                </div>
            </CardContent>

            <CardFooter>
                <Button type="button" className="w-full" onClick={handleNextStep} disabled={isVerifying || !name || !email || !phone || !password || !emailCode || !phoneCode}>
                    {isVerifying ? 'Verificando...' : 'Próximo'}
                </Button>
            </CardFooter>
          </>
        )}

        {step === 2 && (
          <CardContent>
            <FaceIDSetup onRegistrationSuccess={handleRegistrationSuccess} userEmail={email} />
          </CardContent>
        )}
      </Card>
    </div>
  );
}

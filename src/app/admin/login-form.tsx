
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Lock, Mail, ShieldCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import AdminRegistrationModal from '@/components/admin-registration-modal';

const ADMIN_PASSWORD = "Severe123@";
const ADMIN_EMAIL = "pix@italosantos.com";

interface AdminLoginFormProps {
  onAuthSuccess: () => void;
}

export default function AdminLoginForm({ onAuthSuccess }: AdminLoginFormProps) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = () => {
    setIsLoggingIn(true);
    setError('');

    console.log('[Admin Login] Tentativa de login:', { email: email.toLowerCase() });

    // Adicionado um pequeno delay para simular uma chamada de rede
    setTimeout(() => {
      if (email.toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        console.log('[Admin Login] Login bem-sucedido');
        
        toast({ title: "Login bem-sucedido!", description: "Bem-vindo ao painel." });
        
        // Definir localStorage específico do admin
        localStorage.setItem("adminAuthenticated", "true");
        localStorage.setItem("adminUser", email);
        
        // Definir cookies específicos do admin
        document.cookie = `isAuthenticated=true; path=/; max-age=86400; SameSite=Lax`;
        document.cookie = `isAdmin=true; path=/; max-age=86400; SameSite=Lax`;
        
        setIsLoggingIn(false);
        onAuthSuccess();
      } else {
        console.log('[Admin Login] Login falhou - credenciais inválidas');
        setError("E-mail ou senha incorretos.");
        toast({ variant: "destructive", title: "Falha na Autenticação" });
        setIsLoggingIn(false);
      }
    }, 500);
  };
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center relative">
          <Button variant="ghost" size="icon" className="absolute top-4 left-4 text-muted-foreground hover:text-primary hover:bg-primary/10" onClick={() => router.push('/')}>
            <ArrowLeft />
            <span className="sr-only">Voltar para a página inicial</span>
          </Button>
          <div className="flex justify-center mb-4 pt-8">
             <ShieldCheck className="h-10 w-10 text-primary"/>
          </div>
          <CardTitle className="text-2xl">Acesso Restrito ao Painel</CardTitle>
          <CardDescription>
            Insira suas credenciais de administrador.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                placeholder="admin@exemplo.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                placeholder="********"
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
        </CardContent>

        <CardFooter className="flex-col items-center">
            <Button 
                type="button" 
                className="w-full" 
                onClick={handleLogin} 
                disabled={isLoggingIn || !email || !password}
            >
                <Lock className="mr-2 h-4 w-4" />
                {isLoggingIn ? 'Verificando...' : 'Entrar'}
            </Button>
            <div className="mt-4 text-center text-sm">
              <button 
                type="button"
                onClick={() => setIsRegistrationModalOpen(true)}
                className="underline hover:no-underline"
              >
                Cadastre-se como admin
              </button>
              <span className="mx-2">/</span>
              <Link href="/admin/forgot-password" className="underline">
                Esqueci minha senha
              </Link>
            </div>
        </CardFooter>
      </Card>

      <AdminRegistrationModal 
        isOpen={isRegistrationModalOpen}
        onClose={() => setIsRegistrationModalOpen(false)}
      />
    </div>
  );
}

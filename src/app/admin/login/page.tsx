"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Shield } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const { toast } = useToast();

    const handleLogin = () => {
        if (email === 'app@italosantos.com' && password === 'app123@') {
            toast({
                title: "Login bem-sucedido!",
                description: "Redirecionando para o painel de administrador.",
            });
            router.push('/admin/dashboard');
        } else {
            toast({
                variant: "destructive",
                title: "Falha no login",
                description: "E-mail ou senha incorretos.",
            });
        }
    };

  return (
    <div className="container flex min-h-[calc(100vh-10rem)] items-center justify-center py-12">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl">
          <CardHeader className="text-center">
             <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
                <Shield className="h-12 w-12 text-primary" />
             </div>
            <CardTitle className="font-headline text-3xl text-primary">
              Acesso Restrito
            </CardTitle>
            <CardDescription>
              Faça login para gerenciar o conteúdo do site.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="admin@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button className="w-full" onClick={handleLogin}>Entrar como Administrador</Button>
            <p className="text-center text-sm text-muted-foreground">
                <Link href="/login" className="underline-offset-4 hover:underline">
                    Não é um administrador? Acesse como cliente.
                </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

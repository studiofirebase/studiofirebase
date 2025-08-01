
"use client";

import { useState, useRef, useEffect } from 'react';
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
import { Camera, User, Loader2, ArrowLeft, CheckCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { registerUser } from '@/ai/flows/user-auth-flow';

type Step = 'form' | 'camera' | 'success';

export default function RegisterPage() {
  const [step, setStep] = useState<Step>('form');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    let stream: MediaStream;
    const enableCamera = async () => {
      if (step === 'camera') {
        try {
          stream = await navigator.mediaDevices.getUserMedia({ video: true });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (err) {
          console.error("Error accessing camera: ", err);
          setError("Não foi possível acessar a câmera. Por favor, verifique as permissões no seu navegador.");
          setStep('form');
        }
      }
    };

    enableCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [step]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleProceedToCamera = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.phone) {
      setError(null);
      setStep('camera');
    } else {
      setError("Por favor, preencha todos os campos.");
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setImageBase64(dataUrl);
      }
    }
  };

  const handleRegister = async () => {
    if (!imageBase64) {
      setError("Nenhuma imagem foi capturada.");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const result = await registerUser({ ...formData, imageBase64 });
      if (result.success) {
        toast({
          title: "Cadastro realizado com sucesso!",
          description: "Sua conta foi criada e seu rosto registrado.",
        });
        setStep('success');
      } else {
        setError(result.message || "Ocorreu um erro desconhecido.");
        toast({
          variant: "destructive",
          title: "Falha no Cadastro",
          description: result.message,
        });
        // Reset to allow retake
        setImageBase64(null); 
      }
    } catch (e: any) {
      setError(e.message || "Falha ao se comunicar com o servidor.");
       toast({
          variant: "destructive",
          title: "Erro de Servidor",
          description: e.message || "Não foi possível completar o registro.",
        });
       setImageBase64(null);
    } finally {
      setIsLoading(false);
    }
  };

  const renderForm = () => (
    <Card className="shadow-2xl">
      <CardHeader className="text-center">
        <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
          <User className="h-12 w-12 text-primary" />
        </div>
        <CardTitle className="font-headline text-3xl text-primary">Crie sua Conta</CardTitle>
        <CardDescription>Cadastre-se para ter acesso a conteúdos exclusivos.</CardDescription>
      </CardHeader>
      <form onSubmit={handleProceedToCamera}>
        <CardContent className="space-y-4">
          {error && <Alert variant="destructive"><AlertTitle>Erro</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}
          <div className="space-y-2">
            <Label htmlFor="name">Nome Completo</Label>
            <Input id="name" placeholder="Seu nome" value={formData.name} onChange={handleInputChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="seu@email.com" value={formData.email} onChange={handleInputChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Telefone</Label>
            <Input id="phone" type="tel" placeholder="(11) 99999-9999" value={formData.phone} onChange={handleInputChange} required />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full">
            <Camera className="mr-2 h-4 w-4" /> Continuar para Foto
          </Button>
        </CardFooter>
      </form>
    </Card>
  );

  const renderCamera = () => (
    <Card className="shadow-2xl">
      <CardHeader>
        <Button variant="ghost" size="sm" onClick={() => setStep('form')} className="absolute top-4 left-4">
            <ArrowLeft className="mr-2 h-4 w-4"/> Voltar
        </Button>
        <CardTitle className="font-headline text-3xl text-primary text-center pt-8">Registro Facial</CardTitle>
        <CardDescription className="text-center">Centralize seu rosto no quadro e capture a imagem.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && <Alert variant="destructive"><AlertTitle>Erro</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}
        <div className="relative aspect-video bg-muted rounded-lg overflow-hidden flex items-center justify-center">
          {imageBase64 ? (
            <img src={imageBase64} alt="Captura do usuário" className="w-full h-full object-cover" />
          ) : (
            <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover"></video>
          )}
           <div className="absolute inset-0 border-4 border-primary/50 rounded-lg" style={{ clipPath: 'ellipse(35% 45% at 50% 50%)' }}></div>
        </div>
        <canvas ref={canvasRef} className="hidden"></canvas>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        {imageBase64 ? (
          <div className="flex w-full gap-2">
            <Button variant="outline" onClick={() => setImageBase64(null)} className="w-full">Tirar Outra Foto</Button>
            <Button onClick={handleRegister} className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Finalizar Cadastro
            </Button>
          </div>
        ) : (
          <Button onClick={captureImage} className="w-full">
            <Camera className="mr-2 h-4 w-4" /> Capturar Foto
          </Button>
        )}
      </CardFooter>
    </Card>
  );
  
  const renderSuccess = () => (
     <Card className="shadow-2xl text-center">
        <CardHeader>
            <div className="mx-auto bg-green-500/10 p-4 rounded-full w-fit mb-4">
                <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
            <CardTitle className="font-headline text-3xl text-primary">Cadastro Concluído!</CardTitle>
            <CardDescription>Seu rosto agora é sua chave de acesso. Você pode fazer login usando o reconhecimento facial.</CardDescription>
        </CardHeader>
        <CardFooter className="flex flex-col gap-4">
            <Button onClick={() => router.push('/facial-login')} className="w-full">
                Ir para o Login Facial
            </Button>
             <Button variant="outline" onClick={() => router.push('/')} className="w-full">
                Voltar para a Home
            </Button>
        </CardFooter>
     </Card>
  );

  const renderContent = () => {
    switch (step) {
      case 'camera': return renderCamera();
      case 'success': return renderSuccess();
      case 'form':
      default:
        return renderForm();
    }
  }

  return (
    <div className="container flex min-h-[calc(100vh-10rem)] items-center justify-center py-12">
      <div className="w-full max-w-md">
        {renderContent()}
      </div>
    </div>
  );
}

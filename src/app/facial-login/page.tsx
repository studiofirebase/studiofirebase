
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
import { useToast } from "@/hooks/use-toast";
import { Camera, Loader2, UserCheck, UserX, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { verifyUser } from '@/ai/flows/user-auth-flow';

type VerificationStatus = 'idle' | 'verifying' | 'success' | 'failure';

export default function FacialLoginPage() {
  const [status, setStatus] = useState<VerificationStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    let stream: MediaStream;
    const getCameraPermission = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasCameraPermission(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera: ", err);
        setHasCameraPermission(false);
        setError("Por favor, habilite o acesso à câmera nas configurações do seu navegador para usar o login facial.");
      }
    };
    getCameraPermission();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleVerification = async () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');

      if (context) {
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        const imageBase64 = canvas.toDataURL('image/jpeg');
        
        setStatus('verifying');
        setError(null);

        try {
          const result = await verifyUser({ imageBase64 });
          if (result.success && result.redirectUrl) {
            setStatus('success');
            toast({
              title: "Autenticação bem-sucedida!",
              description: result.message,
            });
            setTimeout(() => router.push(result.redirectUrl!), 1000);
          } else {
            setStatus('failure');
            setError(result.message || "Não foi possível verificar seu rosto.");
            toast({
              variant: "destructive",
              title: "Falha na Autenticação",
              description: result.message,
            });
          }
        } catch (e: any) {
          setStatus('failure');
          setError(e.message || "Ocorreu um erro no servidor.");
          toast({
            variant: "destructive",
            title: "Erro de Servidor",
            description: e.message || "Não foi possível completar a verificação.",
          });
        }
      }
    }
  };
  
  const getStatusIcon = () => {
    switch (status) {
        case 'verifying':
            return <Loader2 className="h-12 w-12 text-primary animate-spin" />;
        case 'success':
            return <UserCheck className="h-12 w-12 text-green-500" />;
        case 'failure':
            return <UserX className="h-12 w-12 text-destructive" />;
        default:
            return <Camera className="h-12 w-12 text-primary" />;
    }
  }
  
  const getStatusMessage = () => {
     switch (status) {
        case 'verifying':
            return "Verificando seu rosto...";
        case 'success':
            return "Autenticado com sucesso!";
        case 'failure':
            return "Verificação Falhou";
        default:
            return "Acesse com seu Rosto";
    }
  }

  return (
    <div className="container flex min-h-[calc(100vh-10rem)] items-center justify-center py-12">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl">
          <CardHeader className="text-center">
             <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
                {getStatusIcon()}
             </div>
            <CardTitle className="font-headline text-3xl text-primary">
              {getStatusMessage()}
            </CardTitle>
            <CardDescription>
              Posicione seu rosto na frente da câmera para fazer login.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="relative aspect-video bg-muted rounded-lg overflow-hidden flex items-center justify-center">
                 <video 
                    ref={videoRef} 
                    autoPlay 
                    muted 
                    playsInline 
                    className="w-full h-full object-cover"
                />
                 {!hasCameraPermission && (
                    <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center p-4">
                        <Camera className="h-10 w-10 text-destructive mb-4" />
                        <p className="text-destructive-foreground text-center">Câmera não disponível.</p>
                    </div>
                 )}
                 <div className="absolute inset-0 border-4 border-primary/50 rounded-lg" style={{ clipPath: 'ellipse(35% 45% at 50% 50%)' }}></div>
            </div>
            <canvas ref={canvasRef} className="hidden"></canvas>
            
            {error && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Erro</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

          </CardContent>
          <CardFooter>
            <Button 
                onClick={handleVerification} 
                className="w-full" 
                disabled={status === 'verifying' || status === 'success' || !hasCameraPermission}
            >
              {status === 'verifying' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {status === 'failure' ? 'Tentar Novamente' : 'Verificar Rosto'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}


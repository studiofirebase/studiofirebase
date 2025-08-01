
"use client";

import { useState, useEffect } from "react";
import { getAllContent } from "@/lib/content";
import { ContentCard } from "@/components/content/ContentCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Testimonials } from "@/components/home/Testimonials";
import { CreditCard, User, Shield, ScanFace } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { LocationMap } from "@/components/home/LocationMap";
import { Separator } from "@/components/ui/separator";

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
);

const AppleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M16.125 10.875c0-2.438-1.5-3.75-3.375-3.75-1.5 0-3.375 1.125-4.5 3-2.625.25-4.5 2.125-4.5 4.875 0 2.875 2.25 5.25 5.25 5.25.75 0 1.5-.25 2.25-.5 1 .25 2.25.5 3.375.5 3 0 5.25-2.25 5.25-5.25-.001-1.625-.876-3.125-2.251-4.125zm-6.375-2.625c.875-1.125 2-1.875 3-1.875s1.875.625 2.625 1.5c-.75.875-1.875 1.5-2.875 1.5s-1.875-.75-2.75-1.125z"/>
    </svg>
);



export default function Home() {
  const allContent = getAllContent();
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [isAgeGateOpen, setIsAgeGateOpen] = useState(false);

  useEffect(() => {
    // We only want this to run on the client after hydration
    // to avoid a server-client mismatch.
    const hasSeenAgeGate = sessionStorage.getItem("ageGateConfirmed");
    if (!hasSeenAgeGate) {
      setIsAgeGateOpen(true);
    }
  }, []);

  const handleAgeGateConfirm = () => {
    sessionStorage.setItem("ageGateConfirmed", "true");
    setIsAgeGateOpen(false);
  }

  // Futuramente, estes valores virão do painel de administração
  const siteName = "Italo Santos";
  const presentationText = "Este é o espaço para o seu texto de apresentação. Fale sobre sua plataforma, seus vídeos e o que os visitantes encontrarão aqui.";
  const price = "99,00";


  return (
    <>
      <Dialog open={isAgeGateOpen} onOpenChange={setIsAgeGateOpen}>
        <DialogContent className="sm:max-w-[425px]" onInteractOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>Aviso de Conteúdo Adulto</DialogTitle>
            <DialogDescription>
              Este site contém material destinado a maiores de 18 anos.
              Ao prosseguir, você confirma que tem idade legal para visualizar este conteúdo.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
              <Button onClick={handleAgeGateConfirm}>Tenho mais de 18 e concordo</Button>
          </div>
        </DialogContent>
      </Dialog>


      <section className="pb-8">
        <div className="text-center">
          
          <div className="mb-8 relative flex justify-center">
            <Image 
              src="https://placehold.co/1200x600.png"
              alt="Hambúrguer de destaque"
              width={1200}
              height={600}
              className="rounded-lg shadow-lg"
              data-ai-hint="gourmet burger"
            />
             <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg">
                <div className="bg-black/50 p-6 md:p-8 rounded-lg">
                    <h1 className="font-headline text-6xl md:text-8xl text-white drop-shadow-lg">
                        {siteName}
                    </h1>
                </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center gap-4">
                <div className="w-full max-w-sm mx-auto space-y-4">
                    <Button asChild variant="default" className="w-full" size="lg">
                        <Link href="/login"><ScanFace className="mr-2"/> Face ID</Link>
                    </Button>
                    <div className="grid grid-cols-2 gap-2">
                         <Button asChild size="lg" className="w-full" variant="default">
                            <Link href="/login">Entrar</Link>
                        </Button>
                        <div className="grid grid-cols-2 gap-2">
                            <Button variant="outline" size="lg"><GoogleIcon /> Google</Button>
                            <Button variant="outline" size="lg"><AppleIcon /> Apple</Button>
                        </div>
                    </div>
                </div>

                 <div className="mt-8 text-center">
                    {/* O preço será editável no painel ADM */}
                    <span className="text-6xl font-bold neon-gold-text">{price}</span>
                    <span className="text-lg text-muted-foreground ml-1">BRL</span>
                </div>
                <div className="mt-4 w-full max-w-sm mx-auto flex justify-center">
                    <Dialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen}>
                      <DialogTrigger asChild>
                         <Button size="lg" className="w-full" variant="default">Assinar Agora</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Escolha o tipo de acesso</DialogTitle>
                          <DialogDescription>
                            Selecione se você é um cliente ou administrador para continuar.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <Button asChild>
                                <Link href="/login" onClick={() => setIsLoginDialogOpen(false)}><User /> Acesso Cliente</Link>
                            </Button>
                            <Button asChild variant="outline">
                                <Link href="/admin/login" onClick={() => setIsLoginDialogOpen(false)}><Shield/> Acesso ADM</Link>
                            </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
      </section>

      <div className="my-8 separator-strong"></div>
      
      <section id="featured-content" className="py-12 md:py-16">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="font-headline text-4xl md:text-5xl text-primary">
              SOBRE
            </h2>
            {/* O texto de apresentação será editável no painel ADM */}
            <p className="mx-auto max-w-2xl mt-4 text-lg text-muted-foreground">
              {presentationText}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-12">
            {allContent.map((content, index) => (
              <ContentCard key={content.id} content={content} priority={index < 3} />
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <LocationMap />
    </>
  );
}

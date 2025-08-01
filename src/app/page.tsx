
"use client";

import { useState, useEffect } from "react";
import { getAllContent } from "@/lib/content";
import { ContentCard } from "@/components/content/ContentCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Testimonials } from "@/components/home/Testimonials";
import { Apple, CreditCard, User, Shield, Camera } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { LocationMap } from "@/components/home/LocationMap";
import { Separator } from "@/components/ui/separator";

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
);

const PayPalIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M16.48 4.24c-.23-.02-.47.01-.7.09-.45.16-.83.48-1.03.93l-2.34 9.47c-.08.33-.42.56-.76.56h-2.2c-.38 0-.7-.26-.78-.63l-.77-3.93-.01.01c-.1-.47-.47-.8-1-.87-.41-.05-.8.14-1.03.48l-1.35 1.9c-.19.26-.5.4-.81.4H2.4c-.38 0-.68-.28-.75-.66L1.2 9.5c-.05-.3.08-.6.31-.79.23-.19.53-.26.81-.19L3.8 9c.43.12.78.44.9.88l.65 2.52c.08.32.4.54.74.54h.47c.36 0 .68-.24.76-.59l2.33-9.43c.1-.42.45-.73.89-.73h2.32c.42 0 .79.28 1 .68l.65 2.45c.18.68.83 1.13 1.55 1.13h.8c.4 0 .75.28.84.67l.38 1.63c.09.37.45.62.83.62h.43c.32 0 .6-.2.7-.49l.79-3.4c.1-.42.47-.72.9-.72h.4c.37 0 .68.27.75.64l.01.06c.11.49-.19.99-.68 1.1l-2.43.56c-.72.17-1.24.78-1.24 1.52v.02c0 .48.33.9.79 1.02l2.3.6c.72.18 1.45.69 1.68 1.42l.02.04c.15.52-.14 1.07-.65 1.25-.33.12-.7.11-1.02.01-.45-.16-.83-.48-1.03-.93l-2.34-9.47c-.08-.33-.42-.56-.76-.56h-2.2c-.32 0-.6.2-.7.49l-.65-2.45c-.09-.34-.39-.58-.74-.58h-.81c-.79 0-1.48.53-1.69 1.29l-2.33 9.43c-.1.42-.45.73-.89-.73h-.47c-.36 0-.68-.24-.76-.59l-.65-2.52c-.08-.32-.4-.54-.74-.54h-.4c-.45 0-.84.3-.95.73l-1.34 1.88c-.19.26-.5.4-.81.4H3.8c-.34 0-.63-.22-.72-.54l-.45-1.9c-.04-.15.02-.31.14-.42.12-.11.29-.14.44-.08l1.45.42c.75.21 1.48-.18 1.75-.89l.77-2.01c.1-.25.34-.42.61-.42h.47c.32 0 .6.2.7.49l.77 3.93c.07.37.39.63.77.63h2.2c.75 0 1.39-.52 1.53-1.26l2.34-9.47c.1-.42.45-.73.89-.73h2.2c.38 0 .7.26.78.63l.38-1.63c.09-.37.45-.62.83-.62h.43c.79 0 1.48-.53 1.69 1.29l.79-3.4c.1-.42.47-.72.9-.72h.4c.75 0 1.38.52 1.52 1.25l.01.06c.11.49-.19.99-.68 1.1l-2.43.56c-.72.17-1.24.78-1.24 1.52v.02c0 .48.33.9.79 1.02l2.3.6c.72.18 1.45.69 1.68 1.42l.02.04c.15.52-.14 1.07-.65 1.25z"/>
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
          
          <div className="mb-8 flex justify-center">
            <Image 
              src="https://placehold.co/1200x600.png"
              alt="Hambúrguer de destaque"
              width={1200}
              height={600}
              className="rounded-lg shadow-lg"
              data-ai-hint="gourmet burger"
            />
          </div>

          <div className="mt-8 flex flex-col items-center gap-4">
                <div className="w-full max-w-sm mx-auto space-y-4">
                    <Button variant="outline" className="w-full"><Camera className="mr-2 h-5 w-5" /> Acessar com Face ID</Button>
                    <div>
                        <p className="text-sm text-muted-foreground mb-2">Pague com</p>
                        <div className="grid grid-cols-4 gap-2">
                            <Button variant="outline"><GoogleIcon className="h-5 w-5" /> Google</Button>
                            <Button variant="outline"><CreditCard className="h-5 w-5" /> Pix</Button>
                            <Button variant="outline"><Apple className="h-5 w-5" /> Apple</Button>
                            <Button variant="outline"><PayPalIcon className="h-5 w-5" /> PayPal</Button>
                        </div>
                    </div>
                </div>

                 <div className="mt-8 text-center">
                    {/* O preço será editável no painel ADM */}
                    <span className="text-6xl font-bold text-primary">{price}</span>
                    <span className="text-lg text-muted-foreground ml-1">BRL</span>
                </div>
                <div className="mt-4 w-full max-w-sm mx-auto flex justify-center">
                    <Dialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen}>
                      <DialogTrigger asChild>
                         <Button size="lg" className="w-1/2">Entrar</Button>
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

      <Separator className="my-8" />
      
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

    

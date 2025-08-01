
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Testimonials } from "@/components/home/Testimonials";
import { ScanFace, CheckCircle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { LocationMap } from "@/components/home/LocationMap";
import { cn } from "@/lib/utils";

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

const marqueeItems = [
    "Acesso a vídeos e ensaios completos.",
    "Atualizações semanais com novas produções.",
    "Comunidade e interação direta.",
    "Conteúdo exclusivo e sem censura"
];

const Marquee = () => {
    return (
        <div className="relative flex w-full overflow-hidden border-y border-border/50 py-4 my-12">
            <div className="animate-marquee whitespace-nowrap flex">
                {marqueeItems.map((item, index) => (
                    <div key={index} className="marquee-item">
                        <CheckCircle className="h-5 w-5 text-accent" />
                        <span className="text-lg font-semibold">{item}</span>
                    </div>
                ))}
                 {marqueeItems.map((item, index) => (
                    <div key={`dup-${index}`} className="marquee-item" aria-hidden="true">
                        <CheckCircle className="h-5 w-5 text-accent" />
                        <span className="text-lg font-semibold">{item}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default function Home() {
  const [isAgeGateOpen, setIsAgeGateOpen] = useState(false);

  useEffect(() => {
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
  const presentationText = `1,69m de altura e 70kg com cabelo castanho claro corpo atlético magro definido um dote de 20cm.

Fetichista elite. Costumo dizer isso pois para meus servos o cachê que pagam indiferente em suas vidas.

Independentemente do status social trato todos igualmente mesmo aqueles que só possam ter o prazer de desfrutar da minha companhia uma vez ao mês.

Sou cordial e autoritário, o acompanhante ideal para te iniciar em suas maiores fantasias sexuais.`;
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


      <section className="pb-8 container">
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
                <div className="bg-primary/80 p-6 md:p-8 rounded-lg neon-border-primary">
                    <h1 className="font-headline text-8xl text-primary-foreground">
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
                    <div className="grid grid-cols-3 gap-2">
                         <Button variant="outline-social" className="w-full neon-border-primary"><GoogleIcon /> Google</Button>
                         <Button asChild className="w-full" variant="default">
                            <Link href="/login">Pix</Link>
                        </Button>
                        <Button variant="outline-social" className="w-full neon-border-primary"><AppleIcon /> Apple</Button>
                    </div>
                </div>

                 <div className="mt-8 text-center">
                    {/* O preço será editável no painel ADM */}
                    <span className="text-8xl font-bold neon-gold-text">{price}</span>
                    <span className="text-lg text-muted-foreground ml-1">BRL</span>
                </div>
                <div className="mt-4 w-full max-w-sm mx-auto flex justify-center">
                    <Button size="lg" className="w-full" variant="default">Entrar</Button>
                </div>
            </div>
        </div>
      </section>

      <Marquee />

      <section className="py-16 md:py-24 container">
        <div className="text-center mb-12">
            <h2 className="font-headline text-4xl md:text-5xl">SOBRE</h2>
            <div className="mx-auto max-w-2xl mt-4 text-muted-foreground whitespace-pre-wrap">
              <p className="mb-4">
                <span className="text-primary font-bold">Características Físicas</span>
                <br />
                1,69m de altura e 70kg com cabelo castanho claro corpo atlético magro definido um dote de 20cm.
              </p>
              <p className="mb-4">
                Fetichista elite. Costumo dizer isso pois para meus servos o cachê que pagam indiferente em suas vidas.
              </p>
              <p className="mb-4">
                Independentemente do status social trato todos igualmente mesmo aqueles que só possam ter o prazer de desfrutar da minha companhia uma vez ao mês.
              </p>
              <p className="mb-4">
                Sou cordial e autoritário, o acompanhante ideal para te iniciar em suas maiores fantasias sexuais.
              </p>
              <p className="mb-4">
                <span className="text-primary font-bold">Durante as sessões</span>
                <br />
                Gosto de proporcionar experiências únicas libertando os desejos mais obscuros e reprimidos. Realizo vários fetichessendo minhas práticas com mais experiência: D/s, fisting, pet-play, pissing, spit, leather, anal play, nipple play, ass play, spanking, humilhação, CBT, wax, sissificação, e-stim, bondage, asfixia. Disponho de acessórios e brinquedos para aquecer a relação.
              </p>
              <p className="mb-4">
                <span className="text-primary font-bold">Para aqueles que não têm fantasias e fetiches, podemos ter uma relação sexual normal sem práticas.</span>
              </p>
               <p className="mb-4">
                Tudo à disposição em um ambiente climatizado, seguro e confortável, com chuveiro quente, toalha limpa, sabonete, álcool gel, camisinha e lubrificante. Contrate-me no WhatsApp e me encontre aqui no meu local.
              </p>
            </div>
        </div>

        <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
            {Array.from({ length: 7 }).map((_, index) => (
                <div key={index} className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer hover:neon-border-primary">
                    <div className="aspect-video">
                        <Image
                            src="https://placehold.co/600x400.png"
                            alt={`Foto do feed ${index + 1}`}
                            width={600}
                            height={400}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            data-ai-hint="male model"
                        />
                    </div>
                </div>
            ))}
        </div>
      </section>

      <Testimonials />
      <LocationMap />
    </>
  );
}

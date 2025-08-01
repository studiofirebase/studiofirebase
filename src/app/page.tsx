
"use client";

import { useState } from "react";
import { getAllContent } from "@/lib/content";
import { ContentCard } from "@/components/content/ContentCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Testimonials } from "@/components/home/Testimonials";
import { Apple, CreditCard, User, Shield, Camera } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
);


export default function Home() {
  const allContent = getAllContent();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <section className="bg-card border-b">
        <div className="container text-center py-20 md:py-32">
          <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter text-primary leading-tight">
            Os Melhores Hambúrgueres da Cidade
          </h1>
          <p className="mx-auto max-w-[700px] text-lg text-muted-foreground mt-4">
            Descubra um mundo de sabores únicos, criações artesanais e os hambúrgueres mais suculentos que você já provou.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4">
                <div className="w-full max-w-sm mx-auto space-y-4">
                    <Button variant="outline" className="w-full"><Camera className="mr-2 h-5 w-5" /> Acessar com Face ID</Button>
                    <div>
                        <p className="text-sm text-muted-foreground mb-2">Pague com</p>
                        <div className="grid grid-cols-3 gap-2">
                            <Button variant="outline"><GoogleIcon className="mr-2 h-5 w-5" /> Google</Button>
                            <Button variant="outline"><CreditCard className="mr-2 h-5 w-5" /> Pix</Button>
                            <Button variant="outline"><Apple className="mr-2 h-5 w-5" /> Apple</Button>
                        </div>
                    </div>
                </div>

                 <div className="mt-8 text-center">
                    <span className="text-6xl font-bold text-primary">99,00</span>
                    <span className="text-lg text-muted-foreground ml-1">BRL</span>
                </div>
                <div className="mt-4 w-full max-w-sm mx-auto">
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
                                <Link href="/login" onClick={() => setIsDialogOpen(false)}><User /> Acesso Cliente</Link>
                            </Button>
                            <Button asChild variant="outline">
                                <Link href="/admin/login" onClick={() => setIsDialogOpen(false)}><Shield/> Acesso ADM</Link>
                            </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
      </section>

      <section id="featured-content" className="py-16 md:py-24">
        <div className="container">
          <h2 className="font-headline text-3xl md:text-4xl text-center mb-10">
            SOBRE
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {allContent.map((content, index) => (
              <ContentCard key={content.id} content={content} priority={index < 3} />
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
    </>
  );
}

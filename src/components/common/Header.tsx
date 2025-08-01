
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, User, Shield } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogFooter, DialogTrigger, DialogTitle } from "@/components/ui/dialog";

export function Header() {
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/photos", label: "Fotos" },
    { href: "/videos", label: "Vídeos" },
    { href: "/store", label: "Loja" },
    { href: "/subscriptions", label: "Assinatura" },
    { href: "/channels", label: "Canais" },
  ];

  const closeSheetAndDialog = () => {
    setIsSheetOpen(false);
    setIsDialogOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <div className="flex items-center gap-2">
           <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <div className="flex flex-col gap-6">
                    <Link href="/" className="flex items-center gap-2" onClick={() => setIsSheetOpen(false)}>
                        <Menu className="h-6 w-6 text-primary" />
                        <span className="font-headline text-xl font-bold text-primary">
                            Italo Santos
                        </span>
                    </Link>
                    <nav className="grid gap-4">
                        {navLinks.map((link) => (
                          <SheetClose asChild key={link.href}>
                            <Link
                              href={link.href}
                              className={cn(
                                "transition-colors hover:text-foreground/80",
                                pathname === link.href ? "text-foreground" : "text-foreground/60"
                              )}
                            >
                              {link.label}
                            </Link>
                          </SheetClose>
                        ))}
                    </nav>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger asChild>
                         <Button variant="default">Entrar</Button>
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
                                <Link href="/login" onClick={closeSheetAndDialog}><User className="mr-2 h-4 w-4" /> Acesso Cliente</Link>
                            </Button>
                            <Button asChild variant="outline">
                                <Link href="/admin/login" onClick={closeSheetAndDialog}><Shield className="mr-2 h-4 w-4" /> Acesso ADM</Link>
                            </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                </div>
            </SheetContent>
          </Sheet>
          <Link href="/" className="hidden items-center gap-2 md:flex">
            <Menu className="h-6 w-6 text-primary" />
            <span className="font-headline text-xl font-bold text-primary">
              Italo Santos
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === link.href ? "text-foreground" : "text-foreground/60"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
           <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                 <Button variant="default" size="sm" className="hidden md:flex">Entrar</Button>
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
                        <Link href="/login" onClick={() => setIsDialogOpen(false)}><User className="mr-2 h-4 w-4" /> Acesso Cliente</Link>
                    </Button>
                    <Button asChild variant="outline">
                        <Link href="/admin/login" onClick={() => setIsDialogOpen(false)}><Shield className="mr-2 h-4 w-4" /> Acesso ADM</Link>
                    </Button>
                </div>
              </DialogContent>
            </Dialog>
        </div>
      </div>
    </header>
  );
}

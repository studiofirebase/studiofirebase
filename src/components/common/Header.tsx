
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, User, Shield, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogFooter, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { fetishData } from "@/lib/fetishes";


const FetishMenu = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="text-foreground/60 hover:text-foreground/80 transition-colors">
          FETISH & BDSM
          <ChevronDown className="relative top-[1px] ml-1 h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Categorias</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {fetishData.map((category) => (
          <DropdownMenuSub key={category.title}>
            <DropdownMenuSubTrigger>{category.title}</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {category.items.map((item) => (
                  <Dialog key={item.id}>
                    <DialogTrigger asChild>
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>{item.title}</DropdownMenuItem>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="font-headline text-2xl text-primary">{item.title}</DialogTitle>
                        <DialogDescription className="pt-4 text-base">
                          {item.description}
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );


export function Header() {
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const navLinks = [
    { href: "/fetish-bdsm", label: "FETISH & BDSM" },
    { href: "/photos", label: "Fotos" },
    { href: "/videos", label: "Vídeos" },
    { href: "/store", label: "Loja" },
    { href: "/subscriptions", label: "Assinatura" },
    { href: "/channels", label: "Canais" },
    { href: "/", label: "Home" },
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
            <SheetContent side="left" className="bg-background text-foreground">
                <div className="flex flex-col gap-6">
                    <Link href="/" className="flex items-center gap-2" onClick={() => setIsSheetOpen(false)}>
                        <Menu className="h-6 w-6 text-primary" />
                        <span className="font-headline text-xl font-bold text-primary">
                            Italo Santos
                        </span>
                    </Link>
                    <nav className="grid gap-2">
                        {navLinks.map((link) => {
                            if (link.href === "/fetish-bdsm") {
                                return (
                                    <Accordion type="single" collapsible className="w-full" key={link.href}>
                                        <AccordionItem value="item-1" className="border-b-0">
                                            <AccordionTrigger className="py-1 -mx-2 px-2 rounded hover:bg-muted/50 hover:no-underline text-foreground/80 hover:text-foreground transition-colors">
                                                {link.label}
                                            </AccordionTrigger>
                                            <AccordionContent className="pl-2">
                                                <Accordion type="multiple" className="w-full">
                                                    {fetishData.map((category) => (
                                                        <AccordionItem value={category.title} key={category.title} className="border-b-0">
                                                            <AccordionTrigger className="py-1 -mx-2 px-2 rounded text-sm hover:bg-muted/50 hover:no-underline text-foreground/60 hover:text-foreground/80 transition-colors">
                                                                {category.title}
                                                            </AccordionTrigger>
                                                            <AccordionContent className="pl-4 pt-1">
                                                                <div className="flex flex-col gap-1 text-foreground/60">
                                                                    {category.items.map((item) => (
                                                                        <Dialog key={item.id}>
                                                                            <DialogTrigger asChild>
                                                                                <Button variant="ghost" className="justify-start text-left h-auto py-1 text-sm -mx-2 px-2" onSelect={(e) => e.preventDefault()}>{item.title}</Button>
                                                                            </DialogTrigger>
                                                                            <DialogContent>
                                                                                <DialogHeader>
                                                                                    <DialogTitle className="font-headline text-2xl text-primary">{item.title}</DialogTitle>
                                                                                    <DialogDescription className="pt-4 text-base">
                                                                                        {item.description}
                                                                                    </DialogDescription>
                                                                                </DialogHeader>
                                                                            </DialogContent>
                                                                        </Dialog>
                                                                    ))}
                                                                </div>
                                                            </AccordionContent>
                                                        </AccordionItem>
                                                    ))}
                                                </Accordion>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                )
                            }
                            return (
                              <SheetClose asChild key={link.href}>
                                <Link
                                  href={link.href}
                                  className={cn(
                                    "transition-colors -mx-2 px-2 py-1 rounded hover:bg-muted/50",
                                    pathname === link.href ? "text-foreground" : "text-foreground/60"
                                  )}
                                >
                                  {link.label}
                                </Link>
                              </SheetClose>
                            )
                        })}
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
          {navLinks.map((link) => {
             if (link.href === "/fetish-bdsm") {
                return <FetishMenu key={link.href} />;
              }
            return (
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
            )
          })}
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

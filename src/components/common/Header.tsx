
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

const fetishCategories = [
  {
    title: "Dirty",
    items: [
      "Urinolagnia (Wetlook, Golden Shower)",
      "Scat (Coprophilia)",
      "Olfactofilia (Fetiche por Cheiros)",
      "Omorashi (Incontinência Controlada)",
      "Pissing (Urinar)",
      "Podolatria (Fetiche por Pés)",
      "Salirophilia (Salirofilia)",
      "Ass-to-Mouth (ATM)",
    ],
  },
  {
    title: "Leather/Latex",
    items: [
      "Látex e Couro (Leather & Latex)",
      "Leather (Couro)",
      "Clothed Sex (Sexo com Roupa)",
    ],
  },
  {
    title: "Fantasy",
    items: [
      "Cenoura-Play",
      "Daddy/Boy",
      "Adult Nursing (Enfermagem Adulta)",
      "Hirsutofilia (Fetiche por Cabelo Corporal)",
      "Clamping (Clamp & Squeeze)",
      "Feederism (Fetiche por Alimentação/Engorda)",
      "Tickling (Cócegas)",
    ],
  },
  {
    title: "Dominação e Submissão",
    items: [
      "Candle Wax Play",
      "Military Play",
      "Pet Play",
      "Butt Plug Play",
      "Medical Play",
      "Ass Play (Jogo Anal)",
      "Gender Play",
      "Role Play (Jogo de Papéis)",
      "Diaper Play (Jogo de Fraldas)",
      "Furry Play",
    ],
  },
  {
    title: "Sadomasoquismo",
    items: [
      "Master/Slave",
      "Anal Hook",
      "Spanking (Palmadas)",
      "Nipple Torture (Tortura de Mamilos)",
      "Tease and Denial (Provocação e Negação)",
      "Sounding",
      "Asfixiofilia (Breath Play)",
      "CBT (Cock and Ball Torture)",
    ],
  },
  {
    title: "Fetiche Interracial",
    items: [
      "Super-Herói",
      "Inch-High (Gigantes e Pequeninos)",
      "Barber Fetish (Barbeiro)",
      "Armpit Fetish (Axilas)",
      "Inflatable Suit Fetish (Traje Inflável)",
      "Body Hair Fetish (Pelos Corporais)",
    ],
  },
  {
    title: "Sissy/Crossdresser",
    items: ["Sissy", "Sissy / Drag"],
  },
  {
    title: "Sex",
    items: [
      "Cuckolding",
      "Oral Worship (Adoração Oral)",
      "Rimming (Anilingus)",
      "Voyeurismo",
      "Garganta Profunda (Deepthroat)",
      "DP (Double Penetration)",
    ],
  },
  {
    title: "Mumification/Shibari",
    items: ["Bondage", "Shibari (Bondage Japonês)", "Hogtie"],
  },
  {
    title: "Outros",
    items: ["Findom (Dominação Financeira)", "Enema Play (Jogo de Enema)"],
  },
];


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
      {fetishCategories.map((category) => (
         <DropdownMenuSub key={category.title}>
            <DropdownMenuSubTrigger>{category.title}</DropdownMenuSubTrigger>
             <DropdownMenuPortal>
                <DropdownMenuSubContent>
                {category.items.map((item) => (
                    <Link href="/fetish-bdsm" key={item}>
                        <DropdownMenuItem>{item}</DropdownMenuItem>
                    </Link>
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
            <SheetContent side="left" className="bg-background text-foreground">
                <div className="flex flex-col gap-6">
                    <Link href="/" className="flex items-center gap-2" onClick={() => setIsSheetOpen(false)}>
                        <Menu className="h-6 w-6 text-foreground" />
                        <span className="font-headline text-xl font-bold text-foreground">
                            Italo Santos
                        </span>
                    </Link>
                    <nav className="grid gap-2">
                         <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="item-1" className="border-b-0">
                            <AccordionTrigger className="py-1 -mx-2 px-2 rounded hover:bg-accent/10 hover:no-underline text-foreground/60 hover:text-foreground/80 transition-colors">FETISH & BDSM</AccordionTrigger>
                            <AccordionContent className="pl-4">
                               <div className="flex flex-col gap-1 mt-1">
                                {fetishCategories.map((category) => (
                                    <SheetClose asChild key={category.title}>
                                      <Link href="/fetish-bdsm" className="block transition-colors -mx-2 px-2 py-1 rounded hover:bg-accent/10 text-foreground/60">{category.title}</Link>
                                    </SheetClose>
                                ))}
                               </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                        {navLinks.map((link) => (
                          <SheetClose asChild key={link.href}>
                            <Link
                              href={link.href}
                              className={cn(
                                "transition-colors -mx-2 px-2 py-1 rounded hover:bg-accent/10",
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
          <FetishMenu />
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

    
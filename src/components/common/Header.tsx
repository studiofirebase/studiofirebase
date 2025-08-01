"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { useState } from "react";

export function Header() {
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Início" },
    { href: "/subscriptions", label: "Assinaturas" },
  ];

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
                            BurgerHub
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
                    <SheetClose asChild>
                      <Button asChild variant="default">
                          <Link href="/login">Entrar</Link>
                      </Button>
                    </SheetClose>
                </div>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center gap-2">
            <span className="font-headline text-xl font-bold text-primary">
              BurgerHub
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
          <Button asChild variant="default" size="sm" className="hidden md:flex">
            <Link href="/login">Entrar</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

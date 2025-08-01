
import Link from "next/link";
import { Facebook, Twitter, Instagram } from "lucide-react";

// Como o ícone do WhatsApp não está disponível em lucide-react, criamos um componente SVG personalizado.
const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M16.75 13.96c.25.13.41.2.46.3.05.1.03.48-.02.65-.05.17-.24.3-.5.43-.26.13-.68.24-1.13.12-.44-.12-1.04-.42-1.84-1.13-.93-.84-1.52-1.86-1.6-2.12-.08-.26-.03-.4.08-.53.09-.1.2-.15.28-.15s.2.03.28-.02c.08-.05.13-.1.18-.17.05-.07.03-.12 0-.22s-.13-.28-.18-.38c-.05-.09-.1-.1-.15-.12-.05-.02-.1 0-.15.03s-.2.05-.28.1c-.08.05-.13.1-.18.17-.05.07-.12.18-.17.3-.05.12-.1.27-.1.4 0 .22.07.43.2.65.13.22.28.48.5.78.22.3.48.6.8.93.32.33.68.63 1.08.88.4.25.75.43 1.1.58.22.1.43.15.63.18.2.03.4.02.58-.02.18-.04.35-.12.48-.23.13-.12.22-.27.28-.43.06-.17.08-.33.06-.5-.02-.17-.05-.3-.1-.4-.05-.1-.1-.15-.17-.2s-.12-.1-.18-.1-.1.02-.15.03c-.05.02-.1.03-.13.04s-.07.03-.08.03c-.02 0-.03.02-.05.03zM12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
    </svg>
);


export function Footer() {
  // Futuramente, estes valores virão do painel de administração
  const copyrightText = "Copyrights © Italo Santos 2019 - Todos os direitos reservados";
  const warningText = "Este site inclui conteúdo protegido por direitos autorais, é proibida reprodução total ou parcial deste conteúdo sem autorização prévia do proprietário do site.";


  return (
    <footer className="border-t bg-background">
      <div className="container py-8 text-center text-sm text-muted-foreground">
        
        <div className="flex justify-center gap-6 mb-6">
            <Link href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-6 w-6" />
            </Link>
             <Link href="#" aria-label="WhatsApp" className="text-muted-foreground hover:text-primary transition-colors">
                <WhatsAppIcon className="h-6 w-6" />
            </Link>
            <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-6 w-6" />
            </Link>
            <Link href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-6 w-6" />
            </Link>
        </div>

        <p className="mb-4">{copyrightText}</p>
        <div className="mb-4">
          <Link href="#" className="underline-offset-4 hover:text-primary hover:underline">
            Termos &amp; Condições
          </Link>
          <span className="mx-2">|</span>
          <Link href="#" className="underline-offset-4 hover:text-primary hover:underline">
            Política de Privacidade
          </Link>
        </div>
        <p className="text-xs">{warningText}</p>
      </div>
    </footer>
  );
}

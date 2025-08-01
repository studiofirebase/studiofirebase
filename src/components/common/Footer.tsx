import Link from "next/link";

export function Footer() {
  // Futuramente, estes valores virão do painel de administração
  const copyrightText = "Copyrights © Italo Santos 2019 - Todos os direitos reservados";
  const legalLinksText = "Termos & Condições | Política de Privacidade";
  const warningText = "Este site inclui conteúdo protegido por direitos autorais, é proibida reprodução total ou parcial deste conteúdo sem autorização prévia do proprietário do site.";


  return (
    <footer className="border-t bg-background">
      <div className="container py-8 text-center text-sm text-muted-foreground">
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

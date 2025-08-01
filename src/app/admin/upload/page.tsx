import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function UploadPage() {
  return (
    <div className="container py-16 md:py-24">
      <div className="flex justify-between items-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl text-primary">
          Upload de Mídia
        </h1>
        <Button asChild variant="outline">
          <Link href="/admin/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar ao Painel
          </Link>
        </Button>
      </div>
      <div>
        <p className="text-muted-foreground">
          Aqui você poderá fazer o upload de novas fotos e vídeos para a plataforma. Esta funcionalidade será implementada em breve.
        </p>
      </div>
    </div>
  );
}

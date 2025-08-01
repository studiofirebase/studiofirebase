
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, UploadCloud, FileImage, Video } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

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

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline">
            <UploadCloud className="h-6 w-6" />
            Enviar Novos Arquivos
          </CardTitle>
          <CardDescription>
            Faça o upload de fotos e vídeos aqui. As mídias enviadas ficarão disponíveis em uma galeria para que você possa selecioná-las e utilizá-las em diversas áreas do site, como na imagem de capa da página inicial, na galeria de fotos e na página de vídeos.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-8 border-2 border-dashed rounded-lg text-center cursor-pointer hover:border-primary transition-colors">
            <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
            <p className="mt-4 text-muted-foreground">Arraste e solte os arquivos aqui ou clique para selecionar.</p>
            <p className="text-xs text-muted-foreground mt-1">PNG, JPG, GIF, MP4 até 100MB</p>
          </div>
          <div className="flex justify-center gap-4">
              <Button variant="outline"><FileImage className="mr-2 h-4 w-4" /> Enviar Fotos</Button>
              <Button variant="outline"><Video className="mr-2 h-4 w-4" /> Enviar Vídeos</Button>
          </div>
        </CardContent>
      </Card>
      
    </div>
  );
}

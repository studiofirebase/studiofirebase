import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Upload, Film, FileImage, Settings } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="container py-16 md:py-24">
      <div className="flex justify-between items-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl text-primary">
          Painel do Administrador
        </h1>
        <Button asChild variant="outline">
            <Link href="/">Voltar para o site</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
                <Upload className="h-6 w-6" /> Fazer Upload
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p>Faça upload de novas fotos e vídeos para o site.</p>
            <Button>
                <FileImage className="mr-2" /> Upload de Foto
            </Button>
             <Button>
                <Film className="mr-2" /> Upload de Vídeo
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
                <Settings className="h-6 w-6" /> Gerenciar Conteúdo
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p>Edite ou remova conteúdo existente no site.</p>
            <Button variant="outline">Gerenciar Cardápio</Button>
            <Button variant="outline">Gerenciar Canais</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

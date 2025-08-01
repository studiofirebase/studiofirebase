import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
    MessageSquare, 
    Users, 
    Package, 
    Image as ImageIcon, 
    Film, 
    Upload, 
    GitMerge, 
    Star, 
    Settings 
} from "lucide-react";

const adminFeatures = [
    {
        icon: MessageSquare,
        title: "Conversas",
        description: "Gerencie as conversas do chat em tempo real.",
        buttonText: "Ver Chats"
    },
    {
        icon: Users,
        title: "Assinantes",
        description: "Visualize e gerencie os assinantes dos seus canais.",
        buttonText: "Gerenciar Assinantes"
    },
    {
        icon: Package,
        title: "Produtos",
        description: "Adicione e edite os produtos da sua loja online.",
        buttonText: "Ver Produtos"
    },
    {
        icon: ImageIcon,
        title: "Fotos",
        description: "Gerencie a galeria de fotos do site.",
        buttonText: "Gerenciar Fotos"
    },
    {
        icon: Film,
        title: "Vídeos",
        description: "Faça a gestão dos vídeos que aparecem no site.",
        buttonText: "Gerenciar Vídeos"
    },
    {
        icon: Upload,
        title: "Upload de Mídia",
        description: "Faça upload de novas fotos e vídeos.",
        buttonText: "Fazer Upload"
    },
    {
        icon: GitMerge,
        title: "Integrações",
        description: "Conecte o site com redes sociais e outras ferramentas.",
        buttonText: "Configurar Integrações"
    },
    {
        icon: Star,
        title: "Avaliações",
        description: "Modere as avaliações de produtos e conteúdos.",
        buttonText: "Ver Avaliações"
    },
    {
        icon: Settings,
        title: "Configurações",
        description: "Ajuste as configurações gerais do site.",
        buttonText: "Ajustar Configurações"
    },
]

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
        {adminFeatures.map((feature) => (
            <Card key={feature.title}>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-headline">
                        <feature.icon className="h-6 w-6" /> {feature.title}
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <p className="text-muted-foreground flex-grow">{feature.description}</p>
                    <Button variant="outline">{feature.buttonText}</Button>
                </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );
}

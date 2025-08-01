import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
    MessageSquare, 
    Users, 
    Film, 
    ImageIcon, 
    Upload, 
    GitMerge, 
    Star, 
    Settings 
} from "lucide-react";

const adminFeatures = [
    {
        icon: MessageSquare,
        title: "Conversas",
        description: "Gerencie conversas iniciadas, histórico e veja visitantes em tempo real.",
        buttonText: "Ver Chats",
        href: "/admin/conversations"
    },
    {
        icon: Users,
        title: "Assinantes",
        description: "Visualize as listas de assinantes ativos e inativos e ofereça acessos de teste (free trial).",
        buttonText: "Gerenciar Assinantes",
        href: "/admin/subscribers"
    },
    {
        icon: Film,
        title: "Vídeos Avulsos",
        description: "Gerencie os vídeos avulsos para venda, adicione preços e vincule mídias do upload.",
        buttonText: "Gerenciar Vídeos Avulsos",
        href: "/admin/products"
    },
    {
        icon: ImageIcon,
        title: "Fotos",
        description: "Gerencie a galeria de fotos do site.",
        buttonText: "Gerenciar Fotos",
        href: "/admin/photos"
    },
    {
        icon: Film,
        title: "Vídeos (Feed)",
        description: "Faça a gestão dos vídeos que aparecem no feed da página de vídeos.",
        buttonText: "Gerenciar Vídeos do Feed",
        href: "/admin/videos"
    },
    {
        icon: Upload,
        title: "Upload de Mídia",
        description: "Faça o upload de novas fotos e vídeos para usar no site.",
        buttonText: "Fazer Upload",
        href: "/admin/upload"
    },
    {
        icon: GitMerge,
        title: "Integrações",
        description: "Conecte o site com Facebook, Instagram, Twitter, PayPal e Mercado Pago.",
        buttonText: "Configurar Integrações",
        href: "/admin/integrations"
    },
    {
        icon: Star,
        title: "Avaliações",
        description: "Modere os comentários e avaliações que aguardam aprovação.",
        buttonText: "Ver Avaliações",
        href: "/admin/reviews"
    },
    {
        icon: Settings,
        title: "Configurações",
        description: "Ajuste as configurações gerais do site.",
        buttonText: "Ajustar Configurações",
        href: "/admin/settings"
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
                    <Button asChild variant="outline">
                        <Link href={feature.href}>{feature.buttonText}</Link>
                    </Button>
                </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );
}

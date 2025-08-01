import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { User, Heart, ShoppingBag } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="container py-16 md:py-24">
       <div className="flex justify-between items-center mb-12">
         <h1 className="font-headline text-4xl md:text-5xl text-primary">
          Minha Conta
        </h1>
        <Button asChild variant="outline">
            <Link href="/">Continuar comprando</Link>
        </Button>
       </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
                <User className="h-6 w-6" /> Meus Dados
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p>Atualize suas informações pessoais e de contato.</p>
            <Button>Editar Perfil</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
                <ShoppingBag className="h-6 w-6" /> Meus Pedidos
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p>Acompanhe seus pedidos e veja seu histórico.</p>
            <Button variant="outline">Ver Pedidos</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
                <Heart className="h-6 w-6" /> Minhas Assinaturas
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p>Gerencie suas assinaturas e canais.</p>
            <Button variant="outline">Ver Assinaturas</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

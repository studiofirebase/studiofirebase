import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const channels = [
  {
    id: 1,
    name: "Canal do Chef",
    description: "Aulas de culinária, dicas e truques exclusivos com nosso chef principal.",
    price: "R$ 29,90/mês",
  },
  {
    id: 2,
    name: "Canal dos Bastidores",
    description: "Acesso exclusivo à nossa cozinha, veja como tudo é feito.",
    price: "R$ 19,90/mês",
  },
  {
    id: 3,
    name: "Canal de Degustação",
    description: "Seja o primeiro a experimentar novos hambúrgueres e dê seu feedback.",
    price: "R$ 39,90/mês",
  },
];

export default function ChannelsPage() {
  return (
    <div className="container py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl text-primary">
          Canais Exclusivos
        </h1>
        <p className="mx-auto max-w-2xl mt-4 text-lg text-muted-foreground">
          Alugue um canal e tenha acesso a conteúdo exclusivo.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {channels.map((channel) => (
          <Card key={channel.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="font-headline">{channel.name}</CardTitle>
              <CardDescription>{channel.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-end">
                <div>
                    <p className="text-2xl font-bold text-primary mb-4">{channel.price}</p>
                    <Button className="w-full">Assinar Canal</Button>
                </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

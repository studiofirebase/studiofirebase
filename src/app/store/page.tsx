import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";

const storeItems = [
  {
    id: 1,
    name: "Boné BurgerHub",
    price: "R$ 49,90",
    image: "https://placehold.co/600x400.png",
    dataAiHint: "cap fashion"
  },
  {
    id: 2,
    name: "Camiseta Clássica",
    price: "R$ 79,90",
    image: "https://placehold.co/600x400.png",
    dataAiHint: "t-shirt fashion"
  },
  {
    id: 3,
    name: "Molho Especial (Garrafa)",
    price: "R$ 25,90",
    image: "https://placehold.co/600x400.png",
    dataAiHint: "sauce bottle"
  },
  {
    id: 4,
    name: "Kit de Temperos do Chef",
    price: "R$ 39,90",
    image: "https://placehold.co/600x400.png",
    dataAiHint: "spices cooking"
  },
];

export default function StorePage() {
  return (
    <div className="container py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl text-primary">
          Nossa Loja
        </h1>
        <p className="mx-auto max-w-2xl mt-4 text-lg text-muted-foreground">
          Leve um pedaço da BurgerHub para casa.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {storeItems.map((item) => (
          <Card key={item.id} className="overflow-hidden group">
            <CardHeader className="p-0">
                <div className="aspect-square relative">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform group-hover:scale-105" data-ai-hint={item.dataAiHint} />
                </div>
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="font-headline text-lg">{item.name}</CardTitle>
            </CardContent>
            <CardFooter className="flex justify-between items-center p-4 pt-0">
                <p className="text-xl font-bold text-primary">{item.price}</p>
                <Button variant="outline">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Comprar
                </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
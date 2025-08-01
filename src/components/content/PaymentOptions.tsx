import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface PaymentOptionsProps {
    price: number;
}

const PixIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z"/><path d="m9.5 7 5 5-5 5"/></svg>
);

const CardIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
);

export function PaymentOptions({ price }: PaymentOptionsProps) {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline">Peça o seu agora!</CardTitle>
        <CardDescription>Adicione este item ao seu carrinho.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-4xl font-bold text-primary">R${price.toFixed(2).replace('.',',')}</div>
        <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" size="lg">
            Adicionar ao Carrinho
        </Button>
        <div className="relative">
            <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                Ou pague com
                </span>
            </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <Button variant="outline"><CardIcon /> Cartão</Button>
            <Button variant="outline"><PixIcon /> Pix</Button>
        </div>
      </CardContent>
    </Card>
  );
}

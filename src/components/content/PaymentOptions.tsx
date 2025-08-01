import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface PaymentOptionsProps {
    price: number;
}

const PayPalIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M16.5 7.5a2.5 2.5 0 0 0-4.82-1.44A2.5 2.5 0 0 0 9 7.5H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-3.5Z"/><path d="M16.5 11.5a2.5 2.5 0 0 1-2.5 2.5h-3a2.5 2.5 0 0 1 0-5h0a2.5 2.5 0 0 1 2.5 2.5Z"/></svg>
);

const MercadoPagoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z"/><path d="M14.59 13.993C14.845 13.147 15 12.26 15 11.333c0-1.43-.5-2.733-1.35-3.666-.85-.934-2.125-1.5-3.65-1.5-1.59 0-2.865.567-3.65 1.5-.85.933-1.35 2.233-1.35 3.666 0 .927.155 1.814.41 2.66"/></svg>
);

export function PaymentOptions({ price }: PaymentOptionsProps) {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline">Unlock this Content</CardTitle>
        <CardDescription>Get lifetime access to this item.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-4xl font-bold text-primary">${price.toFixed(2)}</div>
        <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" size="lg">
            Buy Now
        </Button>
        <div className="relative">
            <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                Or use
                </span>
            </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <Button variant="outline"><MercadoPagoIcon /> Mercado Pago</Button>
            <Button variant="outline"><PayPalIcon /> PayPal</Button>
        </div>
      </CardContent>
    </Card>
  );
}

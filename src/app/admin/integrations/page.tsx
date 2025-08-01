
"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Facebook, Instagram, Twitter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const PayPalIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M16.48 4.24c-.23-.02-.47.01-.7.09-.45.16-.83.48-1.03.93l-2.34 9.47c-.08.33-.42.56-.76.56h-2.2c-.38 0-.7-.26-.78-.63l-.77-3.93-.01.01c-.1-.47-.47-.8-1-.87-.41-.05-.8.14-1.03.48l-1.35 1.9c-.19.26-.5.4-.81.4H2.4c-.38 0-.68-.28-.75-.66L1.2 9.5c-.05-.3.08-.6.31-.79.23-.19.53-.26.81-.19L3.8 9c.43.12.78.44.9.88l.65 2.52c.08.32.4.54.74.54h.47c.36 0 .68-.24.76-.59l2.33-9.43c.1-.42.45-.73.89-.73h2.32c.42 0 .79.28 1 .68l.65 2.45c.18.68.83 1.13 1.55 1.13h.8c.4 0 .75.28.84.67l.38 1.63c.09.37.45.62.83.62h.43c.32 0 .6-.2.7-.49l.79-3.4c.1-.42.47-.72.9-.72h.4c.37 0 .68.27.75.64l.01.06c.11.49-.19.99-.68 1.1l-2.43.56c-.72.17-1.24.78-1.24 1.52v.02c0 .48.33.9.79 1.02l2.3.6c.72.18 1.45.69 1.68 1.42l.02.04c.15.52-.14 1.07-.65 1.25-.33.12-.7.11-1.02.01-.45-.16-.83-.48-1.03-.93l-2.34-9.47c-.08-.33-.42-.56-.76-.56h-2.2c-.32 0-.6.2-.7.49l-.65-2.45c-.09-.34-.39-.58-.74-.58h-.81c-.79 0-1.48.53-1.69 1.29l-2.33 9.43c-.1.42-.45.73-.89-.73h-.47c-.36 0-.68-.24-.76-.59l-.65-2.52c-.08-.32-.4-.54-.74-.54h-.4c-.45 0-.84.3-.95.73l-1.34 1.88c-.19.26-.5.4-.81.4H3.8c-.34 0-.63-.22-.72-.54l-.45-1.9c-.04-.15.02-.31.14-.42.12-.11.29-.14.44-.08l1.45.42c.75.21 1.48-.18 1.75-.89l.77-2.01c.1-.25.34-.42.61-.42h.47c.32 0 .6.2.7.49l.77 3.93c.07.37.39.63.77.63h2.2c.75 0 1.39-.52 1.53-1.26l2.34-9.47c.1-.42.45-.73.89-.73h2.2c.38 0 .7.26.78.63l.38-1.63c.09-.37.45.62.83.62h.43c.79 0 1.48-.53 1.69 1.29l.79-3.4c.1-.42.47-.72.9-.72h.4c.75 0 1.38.52 1.52 1.25l.01.06c.11.49-.19.99-.68 1.1l-2.43.56c-.72.17-1.24.78-1.24 1.52v.02c0 .48.33.9.79 1.02l2.3.6c.72.18 1.45.69 1.68 1.42l.02.04c.15.52-.14 1.07-.65 1.25z"/>
    </svg>
);

const MercadoPagoIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M18.393 4.072C18.318 4.027 18.237 4 18.153 4h-12.3c-.084 0-.165.027-.24.072l-2.028 1.223c-.13.078-.205.228-.205.385v12.639c0 .157.075.307.205.385l2.028 1.223c.075.045.156.072.24.072h12.3c.084 0 .165-.027.24-.072l2.028-1.223c.13-.078.205-.228.205-.385V5.68c0-.157-.075-.307-.205-.385l-2.028-1.223zm-2.06 13.593H7.667v-1.157h8.666v1.157zm0-2.313H7.667v-1.157h8.666v1.157zm0-2.314H7.667v-1.157h8.666v1.157zm-5.06-2.502c-1.637 0-2.965-1.328-2.965-2.965s1.328-2.965 2.965-2.965 2.965 1.328 2.965 2.965-1.328 2.965-2.965 2.965z"/>
    </svg>
);


const initialIntegrations = {
    facebook: { name: 'Facebook', icon: Facebook, connected: true },
    instagram: { name: 'Instagram', icon: Instagram, connected: true },
    twitter: { name: 'Twitter (X)', icon: Twitter, connected: false },
    paypal: { name: 'PayPal', icon: PayPalIcon, connected: true },
    mercadopago: { name: 'Mercado Pago', icon: MercadoPagoIcon, connected: false },
};

type IntegrationKey = keyof typeof initialIntegrations;

export default function IntegrationsPage() {
    const [integrations, setIntegrations] = useState(initialIntegrations);

    const toggleIntegration = (key: IntegrationKey) => {
        setIntegrations(prev => ({
            ...prev,
            [key]: {
                ...prev[key],
                connected: !prev[key].connected,
            },
        }));
    };

  return (
    <div className="container py-16 md:py-24">
      <div className="flex justify-between items-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl text-primary">
          Gerenciar Integrações
        </h1>
        <Button asChild variant="outline">
          <Link href="/admin/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar ao Painel
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Object.entries(integrations).map(([key, item]) => (
            <Card key={key}>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center gap-3 font-headline">
                            <item.icon className="h-7 w-7" /> {item.name}
                        </div>
                        <Badge variant={item.connected ? 'default' : 'secondary'}>
                            {item.connected ? "Conectado" : "Desconectado"}
                        </Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Button 
                        className="w-full" 
                        variant={item.connected ? 'destructive' : 'outline'}
                        onClick={() => toggleIntegration(key as IntegrationKey)}
                    >
                        {item.connected ? 'Desconectar' : 'Conectar'}
                    </Button>
                </CardContent>
            </Card>
        ))}
      </div>
       <p className="text-center text-sm text-muted-foreground mt-8">
            As integrações com redes sociais alimentarão as páginas de Fotos e Vídeos. As de pagamento habilitarão novas opções no checkout.
        </p>
    </div>
  );
}

    
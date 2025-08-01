import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import Image from "next/image";

export function LocationMap() {
    return (
        <section className="py-16 md:py-24 bg-card border-t">
            <div className="container">
                <div className="text-center mb-12">
                    <h2 className="font-headline text-3xl md:text-4xl">
                        Nossa Localização
                    </h2>
                    <p className="mx-auto max-w-2xl mt-4 text-muted-foreground flex items-center justify-center gap-2">
                        <MapPin className="h-5 w-5" />
                        Rua Fictícia, 123 - Bairro Imaginário, Cidade Exemplo - SP
                    </p>
                </div>
                <Card className="overflow-hidden shadow-lg">
                    <div className="relative aspect-video w-full">
                         <Image
                            src="https://placehold.co/1200x600.png"
                            alt="Mapa da localização da hamburgueria"
                            fill
                            className="object-cover"
                            data-ai-hint="map location"
                        />
                    </div>
                </Card>
                 <p className="text-center text-sm text-muted-foreground mt-4">
                    O endereço poderá ser alterado no painel administrativo.
                </p>
            </div>
        </section>
    )
}

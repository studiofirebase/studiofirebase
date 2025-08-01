
"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function SettingsPage() {
  const [siteName, setSiteName] = useState("Italo Santos");
  const [aboutText, setAboutText] = useState(`Características Físicas
1,69m de altura e 70kg com cabelo castanho claro corpo atlético magro definido um dote de 20cm.

Fetichista elite. Costumo dizer isso pois para meus servos o cachê que pagam indiferente em suas vidas.

Independentemente do status social trato todos igualmente mesmo aqueles que só possam ter o prazer de desfrutar da minha companhia uma vez ao mês.

Sou cordial e autoritário, o acompanhante ideal para te iniciar em suas maiores fantasias sexuais.

Durante as sessões
Gosto de proporcionar experiências únicas libertando os desejos mais obscuros e reprimidos. Realizo vários fetichessendo minhas práticas com mais experiência: D/s, fisting, pet-play, pissing, spit, leather, anal play, nipple play, ass play, spanking, humilhação, CBT, wax, sissificação, e-stim, bondage, asfixia. Disponho de acessórios e brinquedos para aquecer a relação.

Para aqueles que não têm fantasias e fetiches, podemos ter uma relação sexual normal sem práticas.

Tudo à disposição em um ambiente climatizado, seguro e confortável, com chuveiro quente, toalha limpa, sabonete, álcool gel, camisinha e lubrificante. Contrate-me no WhatsApp e me encontre aqui no meu local.`);
  const [price, setPrice] = useState("99,00");
  const [copyrightText, setCopyrightText] = useState("Copyrights © Italo Santos 2019 - Todos os direitos reservados");
  const [legalLinksText, setLegalLinksText] = useState("Termos & Condições | Política de Privacidade");
  const [warningText, setWarningText] = useState("Este site inclui conteúdo protegido por direitos autorais, é proibida reprodução total ou parcial deste conteúdo sem autorização prévia do proprietário do site.");


  const { toast } = useToast();

  const handleSave = () => {
    // Futuramente, esta função salvará os dados em um banco de dados.
    console.log("Saving data:", { siteName, aboutText, price, copyrightText, legalLinksText, warningText });
    toast({
      title: "Sucesso!",
      description: "As configurações foram salvas.",
    });
  };

  return (
    <div className="container py-16 md:py-24">
      <div className="flex justify-between items-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl text-primary">
          Configurações Gerais
        </h1>
        <Button asChild variant="outline">
          <Link href="/admin/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar ao Painel
          </Link>
        </Button>
      </div>
      
      <div className="space-y-8">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Conteúdo da Página Inicial</CardTitle>
                <CardDescription>Edite os textos e o preço exibidos na página principal do site.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="site-name">Nome de Destaque (Capa)</Label>
                    <Input
                    id="site-name"
                    value={siteName}
                    onChange={(e) => setSiteName(e.target.value)}
                    placeholder="Nome para exibir na capa"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="about-text">Texto da Seção "SOBRE"</Label>
                    <Textarea
                    id="about-text"
                    value={aboutText}
                    onChange={(e) => setAboutText(e.target.value)}
                    rows={15}
                    placeholder="Fale sobre sua plataforma, seus vídeos e o que os visitantes encontrarão aqui."
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="price">Preço Principal (Ex: 99,00)</Label>
                    <Input
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="99,00"
                    className="max-w-xs"
                    />
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Conteúdo do Rodapé</CardTitle>
                <CardDescription>Edite os textos exibidos no rodapé do site.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                 <div className="space-y-2">
                    <Label htmlFor="copyright-text">Texto de Copyright</Label>
                    <Textarea
                        id="copyright-text"
                        value={copyrightText}
                        onChange={(e) => setCopyrightText(e.target.value)}
                        rows={2}
                        placeholder="Ex: Copyrights © Italo Santos 2019..."
                    />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="warning-text">Aviso de Direitos Autorais</Label>
                    <Textarea
                        id="warning-text"
                        value={warningText}
                        onChange={(e) => setWarningText(e.target.value)}
                        rows={3}
                        placeholder="Ex: Este site inclui conteúdo protegido..."
                    />
                </div>
            </CardContent>
        </Card>
        
        <div className="flex justify-end">
            <Button onClick={handleSave} size="lg">
                <Save className="mr-2 h-4 w-4" />
                Salvar Todas as Alterações
            </Button>
        </div>
      </div>

    </div>
  );
}

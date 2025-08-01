
"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function SettingsPage() {
  const [aboutText, setAboutText] = useState("Este é o espaço para o seu texto de apresentação. Fale sobre sua plataforma, seus vídeos e o que os visitantes encontrarão aqui.");
  const [price, setPrice] = useState("99,00");
  const { toast } = useToast();

  const handleSave = () => {
    // Futuramente, esta função salvará os dados em um banco de dados.
    console.log("Saving data:", { aboutText, price });
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
      
      <Card>
        <CardHeader>
            <CardTitle className="font-headline">Editar Conteúdo da Página Inicial</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="about-text">Texto da Seção "SOBRE"</Label>
                <Textarea
                id="about-text"
                value={aboutText}
                onChange={(e) => setAboutText(e.target.value)}
                rows={5}
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

            <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Salvar Alterações
            </Button>
        </CardContent>
      </Card>
    </div>
  );
}

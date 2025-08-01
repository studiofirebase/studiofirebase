"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Ana Silva",
    handle: "@anasilva",
    avatarFallback: "AS",
    image: "https://placehold.co/100x100.png",
    dataAiHint: "woman portrait",
    review: "Os hambúrgueres são simplesmente divinos! O Bacon Supreme é de outro mundo. Atendimento rápido e o ambiente da loja é super acolhedor. Virei cliente fiel!",
  },
  {
    name: "Carlos Pereira",
    handle: "@carlosp",
    avatarFallback: "CP",
    image: "https://placehold.co/100x100.png",
    dataAiHint: "man portrait",
    review: "Pedi o Double Trouble e que experiência! Carne no ponto certo, ingredientes frescos e o molho barbecue é sensacional. Vale cada centavo. Recomendo muito!",
  },
  {
    name: "Juliana Costa",
    handle: "@jcosta",
    avatarFallback: "JC",
    image: "https://placehold.co/100x100.png",
    dataAiHint: "person portrait",
    review: "Amei o Veggie Paradise! É difícil achar um hambúrguer vegetariano tão saboroso e bem feito. A combinação de queijo de cabra com pesto é perfeita. Com certeza pedirei de novo.",
  },
];

export function Testimonials() {
  const [newReview, setNewReview] = useState("");
  const [newName, setNewName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newName && newReview) {
      console.log("Nova avaliação:", { name: newName, review: newReview });
      // Aqui, futuramente, a avaliação seria enviada para moderação
      setNewName("");
      setNewReview("");
    }
  };


  return (
    <section className="py-16 md:py-24 bg-card border-y">
      <div className="container">
        <div className="text-center">
          <h2 className="font-headline text-3xl md:text-4xl">
            O que nossos clientes dizem
          </h2>
          <p className="mx-auto max-w-2xl mt-4 text-muted-foreground">
            Opiniões reais de quem já provou e aprovou nossos sabores.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 mt-12 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar>
                    <AvatarImage src={testimonial.image} alt={testimonial.name} data-ai-hint={testimonial.dataAiHint} />
                    <AvatarFallback>{testimonial.avatarFallback}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.handle}</p>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-muted-foreground">{testimonial.review}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 max-w-2xl mx-auto">
          <h3 className="font-headline text-2xl md:text-3xl text-center mb-8">
            Deixe sua Avaliação
          </h3>
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Seu Nome</Label>
                  <Input
                    id="name"
                    placeholder="Ex: João Silva"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="review">Sua Avaliação</Label>
                  <Textarea
                    id="review"
                    placeholder="Conte-nos o que você achou..."
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Enviar para Moderação
                </Button>
                 <p className="text-xs text-center text-muted-foreground">
                    Sua avaliação será enviada para moderação antes de ser publicada.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>

      </div>
    </section>
  );
}

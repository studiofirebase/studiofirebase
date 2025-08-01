
"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, CheckCircle, XCircle, Star, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';

const mockReviews = [
    { id: 1, name: "Fisting SP", text: "Italo é um querido, educado, safado na medida...", status: 'pending', avatar: "FS" },
    { id: 2, name: "AnonimoSpT", text: "Vários brinquedos, sabe usa-los, sabe fistar...", status: 'pending', avatar: "AS" },
    { id: 3, name: "Edu", text: "Que delícia de carioca! Gosta do que faz...", status: 'approved', avatar: "E" },
    { id: 4, name: "O Gato Puto", text: "Que experiência sensacional! Um putão de confiança!", status: 'approved', avatar: "GP" },
    { id: 5, name: "Padre Hercilio", text: "Sou padre da Igreja de verdade e não é segredo...", status: 'rejected', avatar: "PH" },
];

type ReviewStatus = 'pending' | 'approved' | 'rejected';

interface Review {
    id: number;
    name: string;
    text: string;
    status: ReviewStatus;
    avatar: string;
    reply?: string;
}

export default function ReviewsPage() {
    const [reviews, setReviews] = useState<Review[]>(mockReviews);

    const handleStatusChange = (id: number, status: ReviewStatus) => {
        setReviews(reviews.map(r => r.id === id ? { ...r, status } : r));
    };
    
    const pendingReviews = reviews.filter(r => r.status === 'pending');
    const approvedReviews = reviews.filter(r => r.status === 'approved');

  return (
    <div className="container py-16 md:py-24">
      <div className="flex justify-between items-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl text-primary">
          Moderar Avaliações
        </h1>
        <Button asChild variant="outline">
          <Link href="/admin/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar ao Painel
          </Link>
        </Button>
      </div>
      
      <Tabs defaultValue="pending">
        <TabsList className="mb-6">
            <TabsTrigger value="pending">
                Aguardando Aprovação <Badge variant="secondary" className="ml-2">{pendingReviews.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="approved">
                Publicadas <Badge variant="secondary" className="ml-2">{approvedReviews.length}</Badge>
            </TabsTrigger>
        </TabsList>
        <TabsContent value="pending">
            <div className="space-y-6">
                {pendingReviews.length > 0 ? (
                    pendingReviews.map(review => (
                        <Card key={review.id}>
                            <CardHeader>
                                <div className="flex items-center gap-4">
                                    <Avatar>
                                        <AvatarFallback>{review.avatar}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <CardTitle className="text-xl font-headline">{review.name}</CardTitle>
                                        <div className="flex gap-0.5 mt-1">
                                            {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />)}
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{review.text}</p>
                            </CardContent>
                            <CardFooter className="flex justify-end gap-2">
                                <Button variant="outline" size="sm" onClick={() => handleStatusChange(review.id, 'rejected')}>
                                    <XCircle className="mr-2 h-4 w-4" /> Rejeitar
                                </Button>
                                <Button size="sm" onClick={() => handleStatusChange(review.id, 'approved')}>
                                    <CheckCircle className="mr-2 h-4 w-4" /> Aprovar
                                </Button>
                            </CardFooter>
                        </Card>
                    ))
                ) : (
                    <p className="text-muted-foreground text-center py-8">Nenhuma avaliação aguardando moderação.</p>
                )}
            </div>
        </TabsContent>
        <TabsContent value="approved">
             <div className="space-y-6">
                {approvedReviews.length > 0 ? (
                    approvedReviews.map(review => (
                        <Card key={review.id}>
                            <CardHeader>
                                <div className="flex items-center gap-4">
                                     <Avatar>
                                        <AvatarFallback>{review.avatar}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <CardTitle className="text-xl font-headline">{review.name}</CardTitle>
                                        <div className="flex gap-0.5 mt-1">
                                            {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />)}
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-muted-foreground">{review.text}</p>
                                <div className="space-y-2">
                                    <Label htmlFor={`reply-${review.id}`} className="flex items-center gap-2 font-semibold">
                                        <MessageSquare className="h-4 w-4" /> Responder
                                    </Label>
                                    <Textarea id={`reply-${review.id}`} placeholder="Escreva sua resposta..." />
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between items-center">
                                <Button variant="link" className="p-0 text-red-500 hover:text-red-600" onClick={() => handleStatusChange(review.id, 'rejected')}>
                                    Mover para Rejeitadas
                                </Button>
                                <Button size="sm">Salvar Resposta</Button>
                            </CardFooter>
                        </Card>
                    ))
                ) : (
                    <p className="text-muted-foreground text-center py-8">Nenhuma avaliação publicada.</p>
                )}
            </div>
        </TabsContent>
      </Tabs>

    </div>
  );
}

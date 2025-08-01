
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { fetishData } from "@/lib/fetishes";

export default function FetishBdsmPage() {
  return (
    <div className="container py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl text-primary">
          FETISH & BDSM
        </h1>
        <p className="mx-auto max-w-2xl mt-4 text-lg text-muted-foreground">
          Explore a lista de fetiches e práticas BDSM disponíveis. Clique em um item para saber mais.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {fetishData.map((category) => (
          <Card key={category.title}>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">{category.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                {category.items.map((item) => (
                    <Dialog key={item.id}>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="justify-start text-left">{item.title}</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                            <DialogTitle className="font-headline text-2xl text-primary">{item.title}</DialogTitle>
                            <DialogDescription className="pt-4 text-base">
                                {item.description}
                            </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

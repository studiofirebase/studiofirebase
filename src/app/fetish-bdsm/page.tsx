
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

const fetishCategories = [
  {
    title: "Dirty",
    items: [
      "Urinolagnia (Wetlook, Golden Shower)",
      "Scat (Coprophilia)",
      "Olfactofilia (Fetiche por Cheiros)",
      "Omorashi (Incontinência Controlada)",
      "Pissing (Urinar)",
      "Podolatria (Fetiche por Pés)",
      "Salirophilia (Salirofilia)",
      "Ass-to-Mouth (ATM)",
    ],
  },
  {
    title: "Leather/Latex",
    items: [
      "Látex e Couro (Leather & Latex)",
      "Leather (Couro)",
      "Clothed Sex (Sexo com Roupa)",
    ],
  },
  {
    title: "Fantasy",
    items: [
      "Cenoura-Play",
      "Daddy/Boy",
      "Adult Nursing (Enfermagem Adulta)",
      "Hirsutofilia (Fetiche por Cabelo Corporal)",
      "Clamping (Clamp & Squeeze)",
      "Feederism (Fetiche por Alimentação/Engorda)",
      "Tickling (Cócegas)",
    ],
  },
  {
    title: "Dominação e Submissão",
    items: [
      "Candle Wax Play",
      "Military Play",
      "Pet Play",
      "Butt Plug Play",
      "Medical Play",
      "Ass Play (Jogo Anal)",
      "Gender Play",
      "Role Play (Jogo de Papéis)",
      "Diaper Play (Jogo de Fraldas)",
      "Furry Play",
    ],
  },
  {
    title: "Sadomasoquismo",
    items: [
      "Master/Slave",
      "Anal Hook",
      "Spanking (Palmadas)",
      "Nipple Torture (Tortura de Mamilos)",
      "Tease and Denial (Provocação e Negação)",
      "Sounding",
      "Asfixiofilia (Breath Play)",
      "CBT (Cock and Ball Torture)",
    ],
  },
  {
    title: "Fetiche Interracial",
    items: [
      "Super-Herói",
      "Inch-High (Gigantes e Pequeninos)",
      "Barber Fetish (Barbeiro)",
      "Armpit Fetish (Axilas)",
      "Inflatable Suit Fetish (Traje Inflável)",
      "Body Hair Fetish (Pelos Corporais)",
    ],
  },
  {
    title: "Sissy/Crossdresser",
    items: ["Sissy", "Sissy / Drag"],
  },
  {
    title: "Sex",
    items: [
      "Cuckolding",
      "Oral Worship (Adoração Oral)",
      "Rimming (Anilingus)",
      "Voyeurismo",
      "Garganta Profunda (Deepthroat)",
      "DP (Double Penetration)",
    ],
  },
  {
    title: "Mumification/Shibari",
    items: ["Bondage", "Shibari (Bondage Japonês)", "Hogtie"],
  },
  {
    title: "Outros",
    items: ["Findom (Dominação Financeira)", "Enema Play (Jogo de Enema)"],
  },
];


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
        {fetishCategories.map((category) => (
          <Card key={category.title}>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">{category.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                {category.items.map((item) => (
                    <Dialog key={item}>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="justify-start text-left">{item}</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                            <DialogTitle className="font-headline text-2xl text-primary">{item}</DialogTitle>
                            <DialogDescription className="pt-4 text-base">
                                Aqui virá a descrição detalhada sobre a prática de {item}. 
                                Este texto poderá ser editado futuramente para fornecer mais informações aos visitantes do site.
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

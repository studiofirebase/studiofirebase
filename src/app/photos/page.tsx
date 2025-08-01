import { Card, CardContent } from "@/components/ui/card";
import { Twitter, Instagram, Upload } from "lucide-react";

const photos = [
  {
    id: 1,
    title: "Making of do Bacon Supreme",
    thumbnail: "https://placehold.co/600x400.png",
    dataAiHint: "burger photo shoot",
  },
  {
    id: 2,
    title: "Ingredientes Frescos",
    thumbnail: "https://placehold.co/600x400.png",
    dataAiHint: "fresh ingredients",
  },
  {
    id: 3,
    title: "Nossa Equipe na Cozinha",
    thumbnail: "https://placehold.co/600x400.png",
    dataAiHint: "kitchen staff",
  },
   {
    id: 4,
    title: "Clientes Satisfeitos",
    thumbnail: "https://placehold.co/600x400.png",
    dataAiHint: "happy customer",
  },
];

export default function PhotosPage() {
  return (
    <div className="container py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl text-primary">
          Galeria de Fotos
        </h1>
        <p className="mx-auto max-w-2xl mt-4 text-lg text-muted-foreground">
          Um banquete para os olhos. Veja nossos hambúrgueres em alta resolução, direto do nosso Instagram, Twitter e uploads exclusivos.
        </p>
        <div className="flex justify-center gap-4 mt-4">
            <Twitter className="h-6 w-6 text-muted-foreground" />
            <Instagram className="h-6 w-6 text-muted-foreground" />
            <Upload className="h-6 w-6 text-muted-foreground" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {photos.map((photo) => (
          <Card key={photo.id} className="overflow-hidden group cursor-pointer">
            <CardContent className="p-0">
              <div className="relative aspect-video">
                <img src={photo.thumbnail} alt={photo.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" data-ai-hint={photo.dataAiHint} />
              </div>
               <div className="p-4">
                <h3 className="font-headline text-xl">{photo.title}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

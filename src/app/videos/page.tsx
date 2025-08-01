import { Card, CardContent } from "@/components/ui/card";
import { PlayCircle } from "lucide-react";

const videos = [
  {
    id: 1,
    title: "A Montagem do Nosso Bacon Supreme",
    thumbnail: "https://placehold.co/600x400.png",
    dataAiHint: "making burger",
  },
  {
    id: 2,
    title: "O Segredo do Nosso Molho Especial",
    thumbnail: "https://placehold.co/600x400.png",
    dataAiHint: "burger sauce",
  },
  {
    id: 3,
    title: "Tour Pela Nossa Cozinha",
    thumbnail: "https://placehold.co/600x400.png",
    dataAiHint: "restaurant kitchen",
  },
   {
    id: 4,
    title: "Desafio: O Double Trouble Burger",
    thumbnail: "https://placehold.co/600x400.png",
    dataAiHint: "large burger",
  },
];

export default function VideosPage() {
  return (
    <div className="container py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl text-primary">
          Nossos Vídeos
        </h1>
        <p className="mx-auto max-w-2xl mt-4 text-lg text-muted-foreground">
          Fique por dentro dos bastidores, receitas e os melhores momentos da BurgerHub.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {videos.map((video) => (
          <Card key={video.id} className="overflow-hidden group cursor-pointer">
            <CardContent className="p-0">
              <div className="relative aspect-video">
                <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" data-ai-hint={video.dataAiHint} />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <PlayCircle className="h-16 w-16 text-white/80 group-hover:text-white transition-colors" />
                </div>
              </div>
               <div className="p-4">
                <h3 className="font-headline text-xl">{video.title}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
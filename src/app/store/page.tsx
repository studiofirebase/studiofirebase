
import { Card, CardContent } from "@/components/ui/card";
import { PlayCircle, Instagram, Upload } from "lucide-react";

const videos = [
  {
    id: 1,
    title: "Vídeo do Produto 1",
    thumbnail: "https://placehold.co/600x400.png",
    dataAiHint: "product video",
  },
  {
    id: 2,
    title: "Vídeo do Produto 2",
    thumbnail: "https://placehold.co/600x400.png",
    dataAiHint: "product video",
  },
  {
    id: 3,
    title: "Vídeo do Produto 3",
    thumbnail: "https://placehold.co/600x400.png",
    dataAiHint: "product video",
  },
   {
    id: 4,
    title: "Vídeo do Produto 4",
    thumbnail: "https://placehold.co/600x400.png",
    dataAiHint: "product video",
  },
];

export default function StorePage() {
  return (
    <div className="container py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl text-primary">
          Loja
        </h1>
        <p className="mx-auto max-w-2xl mt-4 text-lg text-muted-foreground">
          Explore nossos produtos em vídeo, diretamente da nossa loja do Instagram e de uploads exclusivos.
        </p>
        <div className="flex justify-center gap-4 mt-4">
            <Instagram className="h-6 w-6 text-muted-foreground" />
            <Upload className="h-6 w-6 text-muted-foreground" />
        </div>
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

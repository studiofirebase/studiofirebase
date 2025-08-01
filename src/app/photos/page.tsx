import { Card, CardContent } from "@/components/ui/card";
import { Twitter, Instagram, Upload } from "lucide-react";
import { fetchTwitterFeed, TweetWithMedia } from "@/ai/flows/twitter-feed-flow";
import Image from "next/image";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

interface MediaItem {
  id: string;
  text: string;
  imageUrl: string;
  tweetUrl: string;
}

export default async function PhotosPage() {
  let photos: MediaItem[] = [];
  let error: string | null = null;

  try {
    const feed = await fetchTwitterFeed({ username: "italosantosbr" });
    photos = feed.tweets.flatMap((tweet: TweetWithMedia) => 
        tweet.media
            .filter(media => media.type === 'photo' && media.url)
            .map(media => ({
                id: media.media_key,
                text: tweet.text,
                imageUrl: media.url!,
                tweetUrl: `https://twitter.com/italosantosbr/status/${tweet.id}`
            }))
    );
  } catch (e: any) {
    error = e.message || "An unexpected error occurred.";
  }

  return (
    <div className="container py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl text-primary">
          Galeria de Fotos
        </h1>
        <p className="mx-auto max-w-2xl mt-4 text-lg text-muted-foreground">
          Um banquete para os olhos. Veja nossas fotos mais recentes, direto do nosso Twitter e de uploads exclusivos.
        </p>
        <div className="flex justify-center gap-4 mt-4">
            <Link href="https://twitter.com/italosantosbr" target="_blank" aria-label="Twitter">
                <Twitter className="h-6 w-6 text-muted-foreground hover:text-primary" />
            </Link>
            <Instagram className="h-6 w-6 text-muted-foreground" />
            <Upload className="h-6 w-6 text-muted-foreground" />
        </div>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-8">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Erro ao Carregar Fotos</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {photos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <Card key={photo.id} className="overflow-hidden group cursor-pointer">
              <Link href={photo.tweetUrl} target="_blank" rel="noopener noreferrer">
                  <CardContent className="p-0">
                  <div className="relative aspect-square">
                      {photo.imageUrl && (
                        <Image 
                            src={photo.imageUrl} 
                            alt={photo.text} 
                            className="w-full h-full object-cover transition-transform group-hover:scale-105" 
                            fill 
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            priority={false}
                        />
                      )}
                  </div>
                  </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      ) : !error && (
         <div className="text-center py-8 text-muted-foreground">
            <p>Nenhuma foto encontrada no feed do Twitter.</p>
         </div>
      )}
    </div>
  );
}

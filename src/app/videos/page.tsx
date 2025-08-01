import { Card, CardContent } from "@/components/ui/card";
import { PlayCircle, Twitter, Instagram, Upload } from "lucide-react";
import { fetchTwitterFeed, TweetWithMedia } from "@/ai/flows/twitter-feed-flow";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import Image from "next/image";

interface VideoItem {
  id: string;
  text: string | null;
  thumbnailUrl: string;
  postUrl: string;
  source: 'Twitter' | 'Instagram';
}

export default async function VideosPage() {
  let allVideos: VideoItem[] = [];
  const errors: string[] = [];

  // Fetch from Twitter
  try {
    const twitterFeed = await fetchTwitterFeed({ username: "italosantosbr" });
    const twitterVideos = twitterFeed.tweets.flatMap((tweet: TweetWithMedia) => 
        tweet.media
            .filter(media => (media.type === 'video' || media.type === 'animated_gif') && media.preview_image_url)
            .map(media => ({
                id: media.media_key,
                text: tweet.text,
                thumbnailUrl: media.preview_image_url!,
                postUrl: `https://twitter.com/italosantosbr/status/${tweet.id}`,
                source: 'Twitter' as const,
            }))
    );
    allVideos.push(...twitterVideos);
  } catch (e: any) {
    errors.push(e.message || "An unexpected error occurred while fetching from Twitter.");
  }
  
  // Sort by date if possible (assuming timestamp is available and consistent)
  // For now, we just combine them.

  return (
    <div className="container py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl text-primary">
          Nossos Vídeos
        </h1>
        <p className="mx-auto max-w-2xl mt-4 text-lg text-muted-foreground">
          Assista aos nossos vídeos mais recentes, direto do Twitter e de uploads exclusivos.
        </p>
        <div className="flex justify-center gap-4 mt-4">
            <Link href="https://twitter.com/italosantosbr" target="_blank" aria-label="Twitter">
              <Twitter className="h-6 w-6 text-muted-foreground hover:text-primary" />
            </Link>
            <Upload className="h-6 w-6 text-muted-foreground" />
        </div>
      </div>

       {errors.length > 0 && (
        <Alert variant="destructive" className="mb-8">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Erro ao Carregar Vídeos</AlertTitle>
          <AlertDescription>
            <ul>
              {errors.map((error, index) => <li key={index}>- {error}</li>)}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {allVideos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {allVideos.map((video) => (
            <Card key={`${video.source}-${video.id}`} className="overflow-hidden group cursor-pointer">
              <Link href={video.postUrl} target="_blank" rel="noopener noreferrer">
                <CardContent className="p-0">
                  <div className="relative aspect-video">
                    <Image 
                      src={video.thumbnailUrl} 
                      alt={video.text || 'Thumbnail do vídeo'} 
                      className="w-full h-full object-cover transition-transform group-hover:scale-105" 
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <PlayCircle className="h-16 w-16 text-white/80 group-hover:text-white transition-colors" />
                    </div>
                     <div className="absolute bottom-2 right-2">
                        {video.source === 'Twitter' && <Twitter className="h-5 w-5 text-white/80 bg-black/50 rounded-full p-1"/>}
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-muted-foreground line-clamp-2">{video.text}</p>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      ) : errors.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
            <p>Nenhum vídeo encontrado nos feeds.</p>
        </div>
      )}
    </div>
  );
}

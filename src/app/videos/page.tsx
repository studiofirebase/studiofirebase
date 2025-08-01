import { Card, CardContent } from "@/components/ui/card";
import { PlayCircle, Twitter, Upload } from "lucide-react";
import { fetchTwitterFeed, TweetWithMedia } from "@/ai/flows/twitter-feed-flow";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

interface VideoItem {
  id: string;
  text: string;
  thumbnailUrl: string;
  tweetUrl: string;
}

export default async function VideosPage() {
  let videos: VideoItem[] = [];
  let error: string | null = null;

  try {
    const feed = await fetchTwitterFeed({ username: "italosantosbr" });
    videos = feed.tweets.flatMap((tweet: TweetWithMedia) => 
        tweet.media
            .filter(media => media.type === 'video' || media.type === 'animated_gif')
            .map(media => ({
                id: media.media_key,
                text: tweet.text,
                thumbnailUrl: media.preview_image_url!,
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
          Nossos Vídeos
        </h1>
        <p className="mx-auto max-w-2xl mt-4 text-lg text-muted-foreground">
          Assista aos nossos vídeos mais recentes, direto do Twitter e de uploads exclusivos. Fique por dentro dos bastidores, receitas e os melhores momentos.
        </p>
        <div className="flex justify-center gap-4 mt-4">
            <Link href="https://twitter.com/italosantosbr" target="_blank" aria-label="Twitter">
              <Twitter className="h-6 w-6 text-muted-foreground hover:text-primary" />
            </Link>
            <Upload className="h-6 w-6 text-muted-foreground" />
        </div>
      </div>

       {error && (
        <Alert variant="destructive" className="mb-8">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Erro ao Carregar Vídeos</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {videos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {videos.map((video) => (
            <Card key={video.id} className="overflow-hidden group cursor-pointer">
              <Link href={video.tweetUrl} target="_blank" rel="noopener noreferrer">
                <CardContent className="p-0">
                  <div className="relative aspect-video">
                    <img src={video.thumbnailUrl} alt={video.text} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <PlayCircle className="h-16 w-16 text-white/80 group-hover:text-white transition-colors" />
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
      ) : !error && (
        <div className="text-center py-8 text-muted-foreground">
            <p>Nenhum vídeo encontrado no feed do Twitter.</p>
        </div>
      )}
    </div>
  );
}

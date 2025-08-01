
import { Card, CardContent } from "@/components/ui/card";
import { Twitter, Instagram, Upload } from "lucide-react";
import { getLatestTweetsWithImages } from "@/services/twitter";
import Image from "next/image";
import Link from "next/link";

export default async function PhotosPage() {
  const tweets = await getLatestTweetsWithImages('italosantosbr');

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {tweets.map((tweet) => (
          <Card key={tweet.id} className="overflow-hidden group cursor-pointer">
            <Link href={`https://twitter.com/italosantosbr/status/${tweet.id}`} target="_blank">
                <CardContent className="p-0">
                <div className="relative aspect-video">
                    <Image src={tweet.imageUrl} alt={tweet.text} className="w-full h-full object-cover transition-transform group-hover:scale-105" fill />
                </div>
                <div className="p-4">
                    <p className="text-muted-foreground">{tweet.text}</p>
                </div>
                </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}

import type { Content } from "@/lib/content";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ContentCardProps {
  content: Content;
  priority?: boolean;
}

export function ContentCard({ content, priority = false }: ContentCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-xl h-full">
      <Link href={`/content/${content.id}`} className="flex flex-col h-full">
        <CardHeader className="p-0">
          <div className="relative aspect-video">
            <Image
              src={content.image}
              alt={content.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={priority}
              data-ai-hint={`${content.category} ${content.title.split(' ')[0]}`}
            />
          </div>
        </CardHeader>
        <CardContent className="flex-grow p-4 md:p-6">
          <Badge variant="secondary" className="mb-2">{content.category}</Badge>
          <CardTitle className="font-headline text-lg md:text-xl mb-2 leading-tight">
            {content.title}
          </CardTitle>
          <CardDescription className="text-sm line-clamp-3">
            {content.description}
          </CardDescription>
        </CardContent>
        <CardFooter className="p-4 md:p-6 pt-0 mt-auto">
          <div className="w-full flex justify-between items-center">
            <p className="text-lg font-bold text-primary">
              ${content.price.toFixed(2)}
            </p>
            <Button variant="outline" size="sm" asChild>
                <span className="z-10">View Content</span>
            </Button>
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
}

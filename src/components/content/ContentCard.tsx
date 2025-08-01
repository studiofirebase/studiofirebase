import type { Content } from "@/lib/content";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "../ui/badge";

interface ContentCardProps {
  content: Content;
  priority?: boolean;
}

export function ContentCard({ content, priority = false }: ContentCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-colors duration-300 h-full group hover:bg-primary hover:text-primary-foreground hover:neon-border-primary">
      <Link href={`/content/${content.id}`} className="flex flex-col h-full">
        <CardHeader className="p-0">
          <div className="relative aspect-video">
            <Image
              src={content.image}
              alt={content.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={priority}
              data-ai-hint={`hamburguer ${content.category}`}
            />
          </div>
        </CardHeader>
        <CardContent className="flex-grow p-4 flex flex-col">
            <div className="flex-grow">
                <Badge variant="secondary" className="mb-2 group-hover:bg-primary-foreground group-hover:text-primary">{content.category}</Badge>
                <CardTitle className="font-headline text-xl mb-2">{content.title}</CardTitle>
                <CardDescription className="group-hover:text-primary-foreground/80">{content.description}</CardDescription>
            </div>
        </CardContent>
      </Link>
    </Card>
  );
}

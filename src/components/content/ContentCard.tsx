import type { Content } from "@/lib/content";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ContentCardProps {
  content: Content;
  priority?: boolean;
}

export function ContentCard({ content, priority = false }: ContentCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-xl h-full">
      <Link href={`/content/${content.id}`} className="flex flex-col h-full group">
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
        <CardContent className="flex-grow p-4">
            {/* Content removed as requested */}
        </CardContent>
      </Link>
    </Card>
  );
}

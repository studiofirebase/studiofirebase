import type { Content } from "@/lib/content";
import Image from "next/image";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

interface ContentCardProps {
  content: Content;
  priority?: boolean;
}

export function ContentCard({ content, priority = false }: ContentCardProps) {
  return (
    <Card className="overflow-hidden transition-transform duration-300 h-full group hover:scale-105">
        <div className="relative aspect-video">
          <Image
            src={content.image}
            alt={content.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priority}
            data-ai-hint={`hamburguer ${content.category}`}
          />
        </div>
    </Card>
  );
}

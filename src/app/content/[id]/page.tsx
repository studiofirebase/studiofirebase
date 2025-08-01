import { getContentById, contentData } from "@/lib/content";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { PaymentOptions } from "@/components/content/PaymentOptions";
import { SocialShareButtons } from "@/components/content/SocialShareButtons";
import { RecommendationList } from "@/components/content/RecommendationList";
import { Separator } from "@/components/ui/separator";

export default function ContentPage({ params }: { params: { id: string } }) {
  const content = getContentById(params.id);

  if (!content) {
    notFound();
  }
  
  // Mock viewing history for recommendation engine. In a real app, this would come from the user's data.
  const mockViewingHistory = contentData
    .map(c => c.id)
    .filter(id => id !== content.id)
    .slice(0, 2);

  return (
    <div className="container py-12 md:py-16">
      <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
        <div className="lg:col-span-2">
            <Badge variant="secondary" className="mb-2">{content.category}</Badge>
            <h1 className="font-headline text-4xl md:text-5xl font-bold leading-tight mb-4">
                {content.title}
            </h1>
            <p className="text-muted-foreground text-lg mb-6">By {content.author}</p>
            <div className="relative aspect-video w-full rounded-lg overflow-hidden mb-8 shadow-md">
                <Image 
                    src={content.image}
                    alt={content.title}
                    fill
                    className="object-cover"
                    priority
                    data-ai-hint={`${content.category} landscape`}
                />
            </div>

            <article className="prose prose-lg max-w-none font-body">
                <p className="lead text-xl">
                    {content.description}
                </p>
                <p>
                    {content.longDescription}
                </p>
            </article>
            <Separator className="my-8" />
            <SocialShareButtons />
        </div>

        <aside className="lg:col-span-1">
            <div className="sticky top-24">
                <PaymentOptions price={content.price} />
            </div>
        </aside>
      </div>

      <Separator className="my-12 md:my-16" />

      <RecommendationList currentContentId={content.id} viewingHistory={mockViewingHistory} />
    </div>
  );
}

// Generate static paths for all content
export async function generateStaticParams() {
    return contentData.map((content) => ({
        id: content.id,
    }));
}

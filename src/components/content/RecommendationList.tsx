import { recommendContent } from "@/ai/flows/content-recommendations";
import { getContentByIds } from "@/lib/content";
import { ContentCard } from "./ContentCard";

interface RecommendationListProps {
  currentContentId: string;
  viewingHistory: string[];
}

export async function RecommendationList({
  currentContentId,
  viewingHistory,
}: RecommendationListProps) {
  let recommendations = [];
  try {
    const result = await recommendContent({
      currentContentId,
      viewingHistory,
    });
    const recommendedIds = result.recommendations.filter(id => id !== currentContentId && !viewingHistory.includes(id)).slice(0, 3);
    recommendations = getContentByIds(recommendedIds);
  } catch (error) {
    console.error("Failed to get content recommendations:", error);
    // In a real app, you might want to show a default list or an error message
    return null;
  }

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className="mt-12 md:mt-16">
      <h2 className="font-headline text-3xl mb-6">Você também pode gostar</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((content) => (
          <ContentCard key={content.id} content={content} />
        ))}
      </div>
    </div>
  );
}

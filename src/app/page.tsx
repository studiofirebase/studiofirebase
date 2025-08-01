import { getAllContent } from "@/lib/content";
import { ContentCard } from "@/components/content/ContentCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  const allContent = getAllContent();

  return (
    <>
      <section className="py-20 md:py-32 bg-card border-b">
        <div className="container text-center">
          <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter text-primary leading-tight">
            Os Melhores Hambúrgueres da Cidade
          </h1>
          <p className="mx-auto max-w-[700px] text-lg text-muted-foreground mt-4">
            Descubra um mundo de sabores únicos, criações artesanais e os hambúrgueres mais suculentos que você já provou.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link href="/subscriptions">Clube do Hambúrguer</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="#featured-content">Ver Cardápio</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="featured-content" className="py-16 md:py-24">
        <div className="container">
          <h2 className="font-headline text-3xl md:text-4xl text-center mb-10">
            Destaques do Cardápio
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {allContent.map((content, index) => (
              <ContentCard key={content.id} content={content} priority={index < 3} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

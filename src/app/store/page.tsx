import { Card, CardContent } from "@/components/ui/card";
import { PlayCircle, Instagram, Facebook, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { fetchFacebookProducts, FacebookProduct } from "@/ai/flows/facebook-products-flow";
import { fetchInstagramShopFeed, InstagramMedia } from "@/ai/flows/instagram-shop-flow";
import { Button } from "@/components/ui/button";

interface DisplayItem {
  id: string;
  name: string;
  description: string | null;
  price: string;
  imageUrl: string;
  postUrl: string;
  type: 'product' | 'media';
  source: 'Facebook' | 'Instagram';
}

export default async function StorePage() {
  let storeItems: DisplayItem[] = [];
  const errors: string[] = [];

  // Fetch from Facebook Catalog
  try {
    const { products, error } = await fetchFacebookProducts();
    if (error) {
      errors.push(error);
    } else {
      const facebookProducts = products.map((product: FacebookProduct) => ({
        id: product.id,
        name: product.name,
        description: product.description || null,
        price: product.price,
        imageUrl: product.image_url,
        postUrl: product.url || `https://www.facebook.com/products/${product.id}`,
        type: 'product' as const,
        source: 'Facebook' as const,
      }));
      storeItems.push(...facebookProducts);
    }
  } catch (e: any) {
    errors.push(e.message || "An unexpected error occurred while fetching from Facebook.");
  }

  // Fetch from Instagram Shop (@severetoys)
  try {
    const { media, error } = await fetchInstagramShopFeed();
    if (error) {
      errors.push(error);
    } else {
      const instagramProducts = media.map((item: InstagramMedia) => ({
        id: item.id,
        name: item.caption?.split('\n')[0] || "Produto do Instagram",
        description: item.caption,
        price: "Consulte", // Instagram API doesn't provide price directly in this feed
        imageUrl: item.media_type === 'VIDEO' ? item.thumbnail_url! : item.media_url!,
        postUrl: item.permalink,
        type: 'media' as const,
        source: 'Instagram' as const,
      }));
      storeItems.push(...instagramProducts);
    }
  } catch (e: any) {
    errors.push(e.message || "An unexpected error occurred while fetching from Instagram Shop.");
  }

  return (
    <div className="container py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl text-primary">
          Loja
        </h1>
        <p className="mx-auto max-w-2xl mt-4 text-lg text-muted-foreground">
          Explore nossos produtos, diretamente do nosso catálogo do Facebook, da loja do Instagram e de uploads exclusivos.
        </p>
        <div className="flex justify-center gap-4 mt-4">
            <Link href="https://instagram.com/severetoys" target="_blank" aria-label="Instagram">
              <Instagram className="h-6 w-6 text-muted-foreground hover:text-primary" />
            </Link>
             <Link href="#" target="_blank" aria-label="Facebook">
              <Facebook className="h-6 w-6 text-muted-foreground hover:text-primary" />
            </Link>
        </div>
      </div>

       {errors.length > 0 && (
        <Alert variant="destructive" className="mb-8">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Erro ao Carregar Produtos</AlertTitle>
          <AlertDescription>
             <ul>
              {errors.map((error, index) => <li key={index}>- {error}</li>)}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {storeItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {storeItems.map((item) => (
            <Card key={`${item.source}-${item.id}`} className="overflow-hidden group flex flex-col">
              <Link href={item.postUrl} target="_blank" rel="noopener noreferrer" className="flex flex-col flex-grow">
                <CardContent className="p-0 flex flex-col flex-grow">
                  <div className="relative aspect-square">
                    <Image 
                      src={item.imageUrl} 
                      alt={item.name} 
                      className="w-full h-full object-cover transition-transform group-hover:scale-105" 
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                     <div className="absolute bottom-1 right-1">
                          {item.source === 'Facebook' && <Facebook className="h-5 w-5 text-white/80 bg-black/50 rounded-full p-1"/>}
                          {item.source === 'Instagram' && <Instagram className="h-5 w-5 text-white/80 bg-black/50 rounded-full p-1"/>}
                      </div>
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="font-headline text-lg flex-grow">{item.name}</h3>
                    <p className="font-bold text-primary text-xl mt-2">{item.price}</p>
                     <Button variant="outline" className="w-full mt-4">
                       <ShoppingBag className="mr-2 h-4 w-4" /> Ver Produto
                    </Button>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      ) : errors.length === 0 && (
         <div className="text-center py-8 text-muted-foreground">
            <p>Nenhum produto encontrado nos catálogos.</p>
         </div>
      )}
    </div>
  );
}

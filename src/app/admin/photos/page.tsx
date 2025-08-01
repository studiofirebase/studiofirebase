import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Image from 'next/image';
import { listMedia } from "@/services/storage-service"; // Importar a função

export default async function AdminPhotosPage() {
  let storagePhotosUrls: string[] = [];
  const errors: string[] = [];

  // Fetch from Firebase Storage
  try {
    storagePhotosUrls = await listMedia('uploads/images/'); // Chamar a função
  } catch (e: any) {
      errors.push(e.message || "An unexpected error occurred while fetching photos from Storage.");
  }

  return (
    <div className="container py-16 md:py-24">
      <div className="flex justify-between items-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl text-primary">
          Gerenciar Fotos
        </h1>
        <Button asChild variant="outline">
          <Link href="/admin/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar ao Painel
          </Link>
        </Button>
      </div>

       {errors.length > 0 && (
        <Alert variant="destructive" className="mb-8">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Erro ao Carregar Fotos</AlertTitle>
          <AlertDescription>
            <ul>
              {errors.map((error, index) => <li key={index}>- {error}</li>)}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {storagePhotosUrls.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {storagePhotosUrls.map((url, index) => (
            <div key={index} className="relative aspect-square overflow-hidden rounded-lg">
               <Image 
                  src={url} 
                  alt={`Foto do Storage ${index + 1}`} 
                  className="w-full h-full object-cover" 
                  fill 
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  priority={false}
              />
            </div>
          ))}
        </div>
      ) : errors.length === 0 && (
         <div className="text-center py-8 text-muted-foreground">
            <p>Nenhuma foto encontrada no Storage.</p>
         </div>
      )}
    </div>
  );
}

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

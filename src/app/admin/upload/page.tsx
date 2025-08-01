
"use client";

import { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, UploadCloud, FileImage, Video, X, Loader2, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useDropzone } from 'react-dropzone';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { uploadMediaClient } from '@/ai/flows/upload-flow';
import Image from 'next/image';

interface UploadableFile {
  file: File;
  id: string;
  progress: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  preview: string;
  error?: string;
}

export default function UploadPage() {
  const [imageFiles, setImageFiles] = useState<UploadableFile[]>([]);
  const [videoFiles, setVideoFiles] = useState<UploadableFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[], target: 'image' | 'video') => {
    const newFiles = acceptedFiles.map(file => ({
      file,
      id: `${file.name}-${file.lastModified}`,
      progress: 0,
      status: 'pending' as const,
      preview: URL.createObjectURL(file)
    }));

    if (target === 'image') {
      setImageFiles(prev => [...prev, ...newFiles]);
    } else {
      setVideoFiles(prev => [...prev, ...newFiles]);
    }
  }, []);

  const { getRootProps: getImageRootProps, getInputProps: getImageInputProps, isDragActive: isImageDragActive } = useDropzone({
    onDrop: (files) => onDrop(files, 'image'),
    accept: { 'image/*': ['.jpeg', '.png', '.gif', '.webp'] }
  });

  const { getRootProps: getVideoRootProps, getInputProps: getVideoInputProps, isDragActive: isVideoDragActive } = useDropzone({
    onDrop: (files) => onDrop(files, 'video'),
    accept: { 'video/*': ['.mp4', '.mov', '.webm'] }
  });
  
  const fileToBase64 = (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = (error) => reject(error);
      });
  };

  const handleUpload = async (target: 'image' | 'video') => {
    const filesToUpload = target === 'image' ? imageFiles : videoFiles;
    const setFiles = target === 'image' ? setImageFiles : setVideoFiles;
    
    const pendingFiles = filesToUpload.filter(f => f.status === 'pending');
    if (pendingFiles.length === 0) return;
    
    setIsUploading(true);

    for (const uploadableFile of pendingFiles) {
      setFiles(prev => prev.map(f => f.id === uploadableFile.id ? { ...f, status: 'uploading', progress: 10 } : f));
      
      try {
        const fileBase64 = await fileToBase64(uploadableFile.file);
        
        // Simulate progress while uploading
        const progressInterval = setInterval(() => {
            setFiles(prev => prev.map(f => {
                if (f.id === uploadableFile.id && f.progress < 80) {
                    return {...f, progress: f.progress + 15};
                }
                return f;
            }));
        }, 300);

        const result = await uploadMediaClient({
          fileBase64,
          fileName: uploadableFile.file.name,
          category: target
        });
        
        clearInterval(progressInterval);

        if (result.success) {
            setFiles(prev => prev.map(f => f.id === uploadableFile.id ? { ...f, status: 'success', progress: 100 } : f));
        } else {
            throw new Error(result.error || 'Unknown upload error');
        }
      } catch (error: any) {
        setFiles(prev => prev.map(f => f.id === uploadableFile.id ? { ...f, status: 'error', progress: 0, error: error.message } : f));
      }
    }
    
    setIsUploading(false);
    toast({
        title: "Upload Concluído",
        description: `O processamento de ${pendingFiles.length} arquivo(s) foi finalizado.`
    });
  };

  const removeFile = (id: string, target: 'image' | 'video') => {
    if (target === 'image') {
      setImageFiles(prev => prev.filter(f => f.id !== id));
    } else {
      setVideoFiles(prev => prev.filter(f => f.id !== id));
    }
  }

  const renderFilePreview = (files: UploadableFile[], target: 'image' | 'video') => (
     <div className="mt-4 space-y-4">
        {files.map(uploadableFile => (
          <div key={uploadableFile.id} className="border rounded-lg p-4 flex items-center gap-4">
            {target === 'image' ? (
                <Image src={uploadableFile.preview} alt={uploadableFile.file.name} width={64} height={64} className="rounded-md object-cover h-16 w-16" />
            ) : (
                <video src={uploadableFile.preview} className="rounded-md h-16 w-16 bg-black" />
            )}
            <div className="flex-grow">
              <p className="font-semibold truncate">{uploadableFile.file.name}</p>
              <p className="text-xs text-muted-foreground">{(uploadableFile.file.size / 1024 / 1024).toFixed(2)} MB</p>
              {uploadableFile.status !== 'error' && <Progress value={uploadableFile.progress} className="mt-2" />}
              {uploadableFile.status === 'error' && <p className="text-xs text-destructive mt-1">{uploadableFile.error}</p>}
            </div>
            {uploadableFile.status === 'uploading' && <Loader2 className="h-5 w-5 animate-spin text-primary" />}
            {uploadableFile.status === 'success' && <CheckCircle className="h-5 w-5 text-green-500" />}
            <Button variant="ghost" size="icon" onClick={() => removeFile(uploadableFile.id, target)} disabled={uploadableFile.status === 'uploading'}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
         {files.filter(f => f.status === 'pending').length > 0 && (
          <Button onClick={() => handleUpload(target)} className="w-full" disabled={isUploading}>
            {isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UploadCloud className="mr-2 h-4 w-4" />}
             Iniciar Upload de {files.filter(f => f.status === 'pending').length} arquivo(s)
          </Button>
        )}
      </div>
  );

  return (
    <div className="container py-16 md:py-24">
      <div className="flex justify-between items-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl text-primary">
          Upload de Mídia
        </h1>
        <Button asChild variant="outline">
          <Link href="/admin/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar ao Painel
          </Link>
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <FileImage className="h-6 w-6" />
              Enviar Fotos
            </CardTitle>
            <CardDescription>
              Arraste e solte ou clique para selecionar as imagens. Formatos aceitos: JPG, PNG, GIF, WebP.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div {...getImageRootProps()} className="p-8 border-2 border-dashed rounded-lg text-center cursor-pointer hover:border-primary transition-colors data-[drag-active=true]:border-primary" data-drag-active={isImageDragActive}>
              <input {...getImageInputProps()} />
              <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="mt-4 text-muted-foreground">{isImageDragActive ? 'Solte as imagens aqui...' : 'Arraste e solte ou clique para selecionar'}</p>
            </div>
            {renderFilePreview(imageFiles, 'image')}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <Video className="h-6 w-6" />
              Enviar Vídeos
            </CardTitle>
            <CardDescription>
              Arraste e solte ou clique para selecionar os vídeos. Formatos aceitos: MP4, MOV, WebM.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div {...getVideoRootProps()} className="p-8 border-2 border-dashed rounded-lg text-center cursor-pointer hover:border-primary transition-colors data-[drag-active=true]:border-primary" data-drag-active={isVideoDragActive}>
              <input {...getVideoInputProps()} />
              <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="mt-4 text-muted-foreground">{isVideoDragActive ? 'Solte os vídeos aqui...' : 'Arraste e solte ou clique para selecionar'}</p>
            </div>
            {renderFilePreview(videoFiles, 'video')}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

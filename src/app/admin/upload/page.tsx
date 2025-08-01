
"use client";

import { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, UploadCloud, FileImage, Video, X, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useDropzone } from 'react-dropzone';
import { Progress } from '@/components/ui/progress';

interface UploadableFile {
  file: File;
  id: string;
  progress: number;
  preview: string;
}

export default function UploadPage() {
  const [imageFiles, setImageFiles] = useState<UploadableFile[]>([]);
  const [videoFiles, setVideoFiles] = useState<UploadableFile[]>([]);

  const onDrop = useCallback((acceptedFiles: File[], target: 'image' | 'video') => {
    const newFiles = acceptedFiles.map(file => ({
      file,
      id: `${file.name}-${file.lastModified}`,
      progress: 0,
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
    accept: { 'image/*': ['.jpeg', '.png', '.gif'] }
  });

  const { getRootProps: getVideoRootProps, getInputProps: getVideoInputProps, isDragActive: isVideoDragActive } = useDropzone({
    onDrop: (files) => onDrop(files, 'video'),
    accept: { 'video/*': ['.mp4', '.mov'] }
  });

  const handleUpload = (target: 'image' | 'video') => {
    const filesToUpload = target === 'image' ? imageFiles : videoFiles;
    const setFiles = target === 'image' ? setImageFiles : setVideoFiles;

    filesToUpload.forEach(uploadableFile => {
      // Simulate upload progress
      const interval = setInterval(() => {
        setFiles(prevFiles => prevFiles.map(f => {
          if (f.id === uploadableFile.id && f.progress < 100) {
            return { ...f, progress: f.progress + 10 };
          }
          return f;
        }));
      }, 200);
      
      setTimeout(() => {
        clearInterval(interval);
         setFiles(prevFiles => prevFiles.map(f => f.id === uploadableFile.id ? { ...f, progress: 100 } : f));
      }, 2200);
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
              <Progress value={uploadableFile.progress} className="mt-2" />
            </div>
            <Button variant="ghost" size="icon" onClick={() => removeFile(uploadableFile.id, target)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
         {files.length > 0 && (
          <Button onClick={() => handleUpload(target)} className="w-full">
            <UploadCloud className="mr-2 h-4 w-4" /> Iniciar Upload de {files.length} arquivo(s)
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
              Arraste e solte ou clique para selecionar as imagens. Formatos aceitos: JPG, PNG, GIF.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div {...getImageRootProps()} className="p-8 border-2 border-dashed rounded-lg text-center cursor-pointer hover:border-primary transition-colors data-[drag-active=true]:border-primary">
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
              Arraste e solte ou clique para selecionar os vídeos. Formatos aceitos: MP4, MOV.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div {...getVideoRootProps()} className="p-8 border-2 border-dashed rounded-lg text-center cursor-pointer hover:border-primary transition-colors data-[drag-active=true]:border-primary">
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

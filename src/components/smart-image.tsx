'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ImageIcon, AlertCircle } from 'lucide-react'
import { isFeatureEnabled, debugLog } from '@/utils/build-config'

interface SmartImageProps {
  src: string
  alt: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
  fallbackSrc?: string
  sizes?: string
  priority?: boolean
  onError?: () => void
}

export default function SmartImage({
  src,
  alt,
  fill,
  width,
  height,
  className = '',
  fallbackSrc,
  sizes,
  priority,
  onError
}: SmartImageProps) {
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const handleError = () => {
    debugLog('SmartImage: Erro ao carregar imagem', { src, alt })
    setHasError(true)
    setIsLoading(false)
    onError?.()
  }

  const handleLoad = () => {
    debugLog('SmartImage: Imagem carregada com sucesso', { src, alt })
    setIsLoading(false)
  }

  // Se houve erro e há fallback, tentar o fallback
  if (hasError && fallbackSrc && fallbackSrc !== src) {
    return (
      <SmartImage
        src={fallbackSrc}
        alt={alt}
        fill={fill}
        width={width}
        height={height}
        className={className}
        sizes={sizes}
        priority={priority}
        onError={() => setHasError(true)}
      />
    )
  }

  // Se houve erro final, mostrar placeholder
  if (hasError) {
    return (
      <div className={`bg-gray-100 flex items-center justify-center ${className} ${fill ? 'absolute inset-0' : ''}`}>
        <div className="text-center p-4">
          <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-xs text-gray-500">Imagem não disponível</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`${fill ? 'relative w-full h-full' : ''} ${className}`}>
      {isLoading && (
        <div className={`${fill ? 'absolute inset-0' : 'w-full h-full'} bg-gray-100 animate-pulse flex items-center justify-center`}>
          <div className="w-6 h-6 border-2 border-gray-300 border-t-primary rounded-full animate-spin" />
        </div>
      )}
      
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={width}
        height={height}
        className={`${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300 ${className}`}
        sizes={sizes}
        priority={priority}
        onError={handleError}
        onLoad={handleLoad}
        // Adicionar propriedades para melhor compatibilidade
        unoptimized={process.env.NODE_ENV === 'development'}
      />
      
      {/* Debug info - só em desenvolvimento */}
      {process.env.NODE_ENV === 'development' && hasError && (
        <div className="absolute top-1 left-1 bg-red-500 text-white text-xs px-1 rounded z-10">
          Erro
        </div>
      )}
    </div>
  )
}

// Componente especializado para thumbnails de vídeo
interface VideoThumbnailProps extends Omit<SmartImageProps, 'fallbackSrc'> {
  platform?: 'youtube' | 'vimeo' | 'dailymotion' | 'unknown'
}

export function VideoThumbnail({ platform = 'unknown', ...props }: VideoThumbnailProps) {
  const fallbackImages = {
    youtube: '/placeholder-youtube.svg',
    vimeo: '/placeholder-vimeo.svg',
    dailymotion: '/placeholder-dailymotion.svg',
    unknown: '/placeholder-video.svg'
  }

  return (
    <SmartImage
      {...props}
      fallbackSrc={fallbackImages[platform]}
    />
  )
}

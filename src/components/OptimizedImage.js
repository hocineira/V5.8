'use client'

import Image from 'next/image'
import { useState } from 'react'

const OptimizedImage = ({ 
  src, 
  alt, 
  className = "", 
  priority = false, 
  quality = 75,
  sizes = "(max-width: 768px) 100vw, 50vw",
  ...props 
}) => {
  const [isLoading, setIsLoading] = useState(true)
  
  // Créer la version WebP optimisée du src
  const getOptimizedSrc = (originalSrc) => {
    // Si c'est déjà une image optimisée, on la retourne
    if (originalSrc.includes('optimized_')) {
      return originalSrc
    }
    
    // Sinon on crée le chemin vers la version optimisée
    const pathParts = originalSrc.split('/')
    const fileName = pathParts[pathParts.length - 1]
    const baseName = fileName.replace(/\.(jpg|jpeg|png)$/i, '')
    pathParts[pathParts.length - 1] = `optimized_${baseName}.webp`
    
    return pathParts.join('/')
  }

  const optimizedSrc = getOptimizedSrc(src)

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={optimizedSrc}
        alt={alt}
        fill
        className={`object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        priority={priority}
        quality={quality}
        sizes={sizes}
        onLoad={() => setIsLoading(false)}
        {...props}
      />
      
      {/* Loading skeleton */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
      )}
    </div>
  )
}

export default OptimizedImage
'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { usePerformanceDetection, useScrollOptimization } from '../hooks/useMobileOptimization'

/**
 * PageWrapper - Wrapper avec optimisations de performance
 * Détecte les appareils faibles et optimise les animations en conséquence
 */
export default function PageWrapper({ children }) {
  const pathname = usePathname()
  const { shouldReduceAnimations } = usePerformanceDetection()
  
  // Activer l'optimisation au scroll
  useScrollOptimization()
  
  // Appliquer la classe reduce-motion si nécessaire
  useEffect(() => {
    if (shouldReduceAnimations) {
      document.documentElement.classList.add('reduce-motion')
    } else {
      document.documentElement.classList.remove('reduce-motion')
    }
    
    return () => {
      document.documentElement.classList.remove('reduce-motion')
    }
  }, [shouldReduceAnimations])

  return (
    <div key={pathname}>
      {children}
    </div>
  )
}

'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

/**
 * Composant FadeIn OPTIMISÉ - Apparition en fondu avec mouvement vertical
 * Se déclenche au montage ET au scroll pour les éléments hors écran
 */
export default function FadeIn({ 
  children, 
  delay = 0, 
  duration = 0.6,
  direction = 'up',
  distance = 30,
  className = ''
}) {
  const [hasAnimated, setHasAnimated] = useState(false)
  
  const directions = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 }
  }

  // Déclencher l'animation au montage
  useEffect(() => {
    const timer = setTimeout(() => setHasAnimated(true), 50)
    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div
      initial={{ 
        opacity: 0,
        ...directions[direction]
      }}
      animate={hasAnimated ? { 
        opacity: 1,
        x: 0,
        y: 0
      } : undefined}
      whileInView={{ 
        opacity: 1,
        x: 0,
        y: 0
      }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      style={{ 
        willChange: 'opacity, transform',
        transform: 'translateZ(0)'
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

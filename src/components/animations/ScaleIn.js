'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

/**
 * Composant ScaleIn OPTIMISÉ - Apparition avec effet de zoom
 * Se déclenche au montage ET au scroll
 */
export default function ScaleIn({ 
  children, 
  delay = 0, 
  duration = 0.5,
  scale = 0.8,
  className = ''
}) {
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setHasAnimated(true), 50)
    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div
      initial={{ 
        opacity: 0,
        scale: scale
      }}
      animate={hasAnimated ? { 
        opacity: 1,
        scale: 1
      } : undefined}
      whileInView={{ 
        opacity: 1,
        scale: 1
      }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration,
        delay,
        ease: [0.34, 1.56, 0.64, 1]
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

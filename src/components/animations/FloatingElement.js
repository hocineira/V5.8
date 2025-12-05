'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

/**
 * Composant FloatingElement OPTIMISÉ - Élément flottant avec mouvement perpétuel
 * Animation active quand visible, pause quand hors écran
 */
export default function FloatingElement({ 
  children, 
  duration = 4,
  distance = 15,
  className = ''
}) {
  const shouldReduceMotion = useReducedMotion()
  const [isVisible, setIsVisible] = useState(true) // Actif par défaut
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Si reduced motion est activé ou non monté, retourner sans animation
  if (shouldReduceMotion || !isMounted) {
    return (
      <div className={className}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      initial={{ y: 0, rotate: 0 }}
      animate={{
        y: [0, -distance, 0],
        rotate: [0, 2, -2, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        repeatType: "loop"
      }}
      onViewportLeave={() => setIsVisible(false)}
      onViewportEnter={() => setIsVisible(true)}
      viewport={{ margin: "100px" }}
      style={{ 
        willChange: 'transform',
        transform: 'translateZ(0)',
        animationPlayState: isVisible ? 'running' : 'paused'
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

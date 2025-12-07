'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

/**
 * Composant AnimatedCard OPTIMISÉ - Carte avec animations hover dynamiques
 * Se déclenche au montage ET au scroll
 */
export default function AnimatedCard({ 
  children, 
  delay = 0,
  className = '',
  hoverScale = 1.03,
  hoverRotate = 1,
  ...props
}) {
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setHasAnimated(true), 50)
    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={hasAnimated ? { opacity: 1, y: 0, scale: 1 } : undefined}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ 
        duration: 0.5,
        delay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      whileHover={{ 
        scale: hoverScale,
        rotate: hoverRotate,
        transition: { 
          duration: 0.2,
          ease: "easeOut"
        }
      }}
      whileTap={{ scale: 0.98 }}
      style={{ 
        willChange: 'transform',
        transform: 'translateZ(0)'
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

'use client'

import { motion } from 'framer-motion'

/**
 * Composant HoverScale - Effet de zoom au survol
 */
export default function HoverScale({ 
  children, 
  scale = 1.05,
  className = ''
}) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      whileHover={{ 
        scale: scale,
        transition: { 
          duration: 0.2,
          ease: "easeOut"
        }
      }}
      whileTap={{ scale: 0.98 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

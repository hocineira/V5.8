'use client'

import { motion, useReducedMotion } from 'framer-motion'

/**
 * Composant AnimatedButton OPTIMISÉ - Bouton avec animations dynamiques
 * Optimisations: reduced motion support, simplified hover, GPU acceleration
 */
export default function AnimatedButton({ 
  children, 
  onClick,
  className = '',
  variant = 'primary',
  ...props
}) {
  const shouldReduceMotion = useReducedMotion()

  // Animations simplifiées pour reduced motion
  const hoverAnimation = shouldReduceMotion 
    ? { scale: 1.02 }
    : { 
        scale: 1.05,
        transition: { duration: 0.15, ease: "easeOut" }
      }

  const tapAnimation = { scale: 0.97 }

  return (
    <motion.button
      whileHover={hoverAnimation}
      whileTap={tapAnimation}
      onClick={onClick}
      style={{ 
        willChange: 'transform',
        transform: 'translateZ(0)'
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  )
}

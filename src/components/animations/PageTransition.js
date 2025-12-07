'use client'

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { usePathname } from 'next/navigation'

/**
 * Composant PageTransition OPTIMISÉ - Transitions fluides entre les pages
 * Optimisations: reduced motion support, simplified animation, GPU acceleration
 */
export default function PageTransition({ children }) {
  const pathname = usePathname()
  const shouldReduceMotion = useReducedMotion()

  // Animations simplifiées pour reduced motion
  const variants = shouldReduceMotion 
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 }
      }
    : {
        initial: { opacity: 0, y: 15 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 }
      }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        transition={{
          duration: shouldReduceMotion ? 0.15 : 0.3,
          ease: [0.25, 0.1, 0.25, 1]
        }}
        style={{ 
          willChange: 'opacity, transform',
          transform: 'translateZ(0)'
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

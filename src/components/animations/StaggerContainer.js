'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

/**
 * Composant StaggerContainer OPTIMISÉ - Animation en cascade pour les enfants
 * Se déclenche au montage ET au scroll
 */
export const StaggerContainer = ({ 
  children, 
  staggerDelay = 0.08,
  className = ''
}) => {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 50)
    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div
      initial="hidden"
      animate={animate ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-30px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.1
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * Composant StaggerItem OPTIMISÉ - Élément enfant à utiliser dans StaggerContainer
 */
export const StaggerItem = ({ 
  children, 
  className = '',
  direction = 'up',
  distance = 25
}) => {
  const directions = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 }
  }

  return (
    <motion.div
      variants={{
        hidden: { 
          opacity: 0,
          ...directions[direction]
        },
        visible: { 
          opacity: 1,
          x: 0,
          y: 0,
          transition: {
            duration: 0.4,
            ease: [0.25, 0.1, 0.25, 1]
          }
        }
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

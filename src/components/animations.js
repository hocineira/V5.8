'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState, useRef, useCallback } from 'react'

/**
 * FadeIn OPTIMISÉ - Animation d'apparition en fondu
 * Se déclenche au montage ET au scroll
 */
export function FadeIn({ children, delay = 0, duration = 0.5, direction = 'none', className = '' }) {
  const [hasAnimated, setHasAnimated] = useState(false)
  
  const directionOffset = {
    up: { y: 25 },
    down: { y: -25 },
    left: { x: 25 },
    right: { x: -25 },
    none: {}
  }

  useEffect(() => {
    const timer = setTimeout(() => setHasAnimated(true), 50)
    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, ...directionOffset[direction] }}
      animate={hasAnimated ? { opacity: 1, y: 0, x: 0 } : undefined}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      style={{ willChange: 'opacity, transform', transform: 'translateZ(0)' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * ScaleIn OPTIMISÉ - Animation d'apparition avec effet de zoom
 */
export function ScaleIn({ children, delay = 0, duration = 0.4, scale = 0.85, className = '' }) {
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setHasAnimated(true), 50)
    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale }}
      animate={hasAnimated ? { opacity: 1, scale: 1 } : undefined}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      style={{ willChange: 'opacity, transform', transform: 'translateZ(0)' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * SlideIn OPTIMISÉ - Animation de glissement
 */
export function SlideIn({ children, delay = 0, duration = 0.5, direction = 'left', className = '' }) {
  const [hasAnimated, setHasAnimated] = useState(false)
  
  const directionOffset = {
    left: { x: -40 },
    right: { x: 40 },
    up: { y: 40 },
    down: { y: -40 }
  }

  useEffect(() => {
    const timer = setTimeout(() => setHasAnimated(true), 50)
    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, ...directionOffset[direction] }}
      animate={hasAnimated ? { opacity: 1, x: 0, y: 0 } : undefined}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      style={{ willChange: 'opacity, transform', transform: 'translateZ(0)' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * RotateIn OPTIMISÉ - Animation de rotation à l'apparition
 */
export function RotateIn({ children, delay = 0, duration = 0.5, className = '' }) {
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setHasAnimated(true), 50)
    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, rotate: -8, scale: 0.92 }}
      animate={hasAnimated ? { opacity: 1, rotate: 0, scale: 1 } : undefined}
      whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      style={{ willChange: 'opacity, transform', transform: 'translateZ(0)' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * StaggerContainer OPTIMISÉ - Conteneur pour animer des éléments en cascade
 */
export function StaggerContainer({ children, staggerDelay = 0.08, className = '' }) {
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
            delayChildren: 0.05
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
 * StaggerItem OPTIMISÉ - Élément enfant pour StaggerContainer
 */
export function StaggerItem({ children, direction = 'up', className = '' }) {
  const directionOffset = {
    up: { y: 20 },
    down: { y: -20 },
    left: { x: 20 },
    right: { x: -20 }
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, ...directionOffset[direction] },
        visible: {
          opacity: 1,
          y: 0,
          x: 0,
          transition: {
            duration: 0.4,
            ease: [0.25, 0.1, 0.25, 1]
          }
        }
      }}
      style={{ willChange: 'opacity, transform', transform: 'translateZ(0)' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * AnimatedCard OPTIMISÉ - Carte avec animation hover et apparition
 */
export function AnimatedCard({ children, delay = 0, className = '' }) {
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setHasAnimated(true), 50)
    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={hasAnimated ? { opacity: 1, y: 0 } : undefined}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      transition={{
        duration: 0.4,
        delay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      style={{ willChange: 'transform', transform: 'translateZ(0)' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * FloatingElement OPTIMISÉ - Élément flottant avec animation continue
 */
export function FloatingElement({ children, delay = 0, duration = 4, className = '' }) {
  const shouldReduceMotion = useReducedMotion()
  const [isVisible, setIsVisible] = useState(true)

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      animate={{ 
        y: [0, -8, 0],
      }}
      onViewportEnter={() => setIsVisible(true)}
      onViewportLeave={() => setIsVisible(false)}
      viewport={{ margin: "50px" }}
      transition={{
        y: {
          duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay
        }
      }}
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

/**
 * HoverScale OPTIMISÉ - Animation de zoom au survol
 */
export function HoverScale({ children, scale = 1.03, className = '' }) {
  return (
    <motion.div
      whileHover={{ scale }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      style={{ willChange: 'transform', transform: 'translateZ(0)' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * CountUp OPTIMISÉ - Animation de compteur avec requestAnimationFrame
 */
export function CountUp({ from = 0, to, duration = 2, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(from)
  const frameRef = useRef(null)

  useEffect(() => {
    let startTime = null

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = Math.floor(from + (to - from) * easeOutQuart)
      
      setCount(currentCount)

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate)
      }
    }

    frameRef.current = requestAnimationFrame(animate)
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [from, to, duration])

  return <span>{prefix}{count}{suffix}</span>
}

/**
 * RevealText OPTIMISÉ - Animation de révélation de texte
 */
export function RevealText({ children, delay = 0, className = '' }) {
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setHasAnimated(true), 50)
    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={hasAnimated ? { opacity: 1, y: 0 } : undefined}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }}
      style={{ willChange: 'opacity, transform', transform: 'translateZ(0)' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * ParallaxElement OPTIMISÉ - Effet parallaxe au scroll (simplifié)
 */
export function ParallaxElement({ children, className = '' }) {
  return (
    <motion.div
      initial={{ y: 0 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true }}
      style={{ transform: 'translateZ(0)' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * PulseElement OPTIMISÉ - Animation de pulsation (respect reduced motion)
 */
export function PulseElement({ children, duration = 2.5, className = '' }) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      animate={{
        scale: [1, 1.02, 1],
        opacity: [1, 0.9, 1]
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      style={{ willChange: 'transform, opacity', transform: 'translateZ(0)' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * BouncingElement OPTIMISÉ - Animation de rebond
 */
export function BouncingElement({ children, delay = 0, className = '' }) {
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setHasAnimated(true), 50)
    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div
      initial={{ y: -15, opacity: 0 }}
      animate={hasAnimated ? { y: 0, opacity: 1 } : undefined}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        type: "spring",
        stiffness: 250,
        damping: 20,
        delay
      }}
      style={{ willChange: 'transform, opacity', transform: 'translateZ(0)' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

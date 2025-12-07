'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/**
 * Composant CountUp - Animation de comptage de nombre
 */
export default function CountUp({ 
  to = 0, 
  duration = 2,
  className = ''
}) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true
      const startTime = Date.now()
      const endTime = startTime + duration * 1000
      
      const animate = () => {
        const now = Date.now()
        const progress = Math.min((now - startTime) / (duration * 1000), 1)
        const easeProgress = 1 - Math.pow(1 - progress, 3) // easeOutCubic
        setCount(Math.floor(easeProgress * to))
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          setCount(to)
        }
      }
      
      requestAnimationFrame(animate)
    }
  }, [isInView, to, duration])

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 1 }}
      className={className}
    >
      {count}
    </motion.span>
  )
}

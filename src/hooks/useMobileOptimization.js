'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

/**
 * Hook de détection de performance d'appareil
 * Détecte les appareils faibles pour réduire les animations
 */
export function usePerformanceDetection() {
  const [isLowEndDevice, setIsLowEndDevice] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    
    // Vérifier prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    
    const handleChange = (e) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handleChange)

    // Détection d'appareil faible
    const detectLowEndDevice = () => {
      const checks = []
      
      // Vérifier le nombre de cores CPU
      if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) {
        checks.push(true)
      }
      
      // Vérifier la mémoire de l'appareil
      if (navigator.deviceMemory && navigator.deviceMemory <= 4) {
        checks.push(true)
      }
      
      // Vérifier si c'est un mobile
      const isMobile = window.innerWidth < 768
      if (isMobile) {
        checks.push(true)
      }
      
      // Vérifier le User Agent pour les anciens appareils
      const ua = navigator.userAgent.toLowerCase()
      const isOldDevice = /android\s[1-6]|iphone\sos\s[1-9]_|ipad.*os\s[1-9]_/i.test(ua)
      if (isOldDevice) {
        checks.push(true)
      }
      
      // Si plus de 2 indicateurs, considérer comme appareil faible
      setIsLowEndDevice(checks.length >= 2)
    }
    
    detectLowEndDevice()
    
    // Appliquer la classe à l'élément HTML si appareil faible
    if (isLowEndDevice || prefersReducedMotion) {
      document.documentElement.classList.add('low-end-device')
    }
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange)
      document.documentElement.classList.remove('low-end-device')
    }
  }, [isLowEndDevice, prefersReducedMotion])

  return { 
    isLowEndDevice, 
    prefersReducedMotion, 
    shouldReduceAnimations: isLowEndDevice || prefersReducedMotion,
    isMounted
  }
}

export function useMobileDetection() {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth
      setIsMobile(width < 768)
      setIsTablet(width >= 768 && width < 1024)
      setIsTouch('ontouchstart' in window)
    }

    checkDevice()
    window.addEventListener('resize', checkDevice, { passive: true })
    return () => window.removeEventListener('resize', checkDevice)
  }, [])

  return { isMobile, isTablet, isTouch, isDesktop: !isMobile && !isTablet }
}

/**
 * Hook pour gérer le scroll et pause des animations
 */
export function useScrollOptimization() {
  const scrollTimeoutRef = useRef(null)
  
  useEffect(() => {
    const handleScroll = () => {
      // Ajouter la classe scrolling
      document.documentElement.classList.add('scrolling')
      
      // Retirer après un délai
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      
      scrollTimeoutRef.current = setTimeout(() => {
        document.documentElement.classList.remove('scrolling')
      }, 150)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [])
}

export function useTouchFeedback() {
  const addRippleEffect = useCallback((event) => {
    const button = event.currentTarget
    const ripple = document.createElement('span')
    const rect = button.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = event.clientX - rect.left - size / 2
    const y = event.clientY - rect.top - size / 2
    
    ripple.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      position: absolute;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.4);
      pointer-events: none;
      transform: scale(0);
      animation: ripple 0.5s ease-out;
      z-index: 1;
    `

    button.style.position = 'relative'
    button.style.overflow = 'hidden'
    button.appendChild(ripple)

    setTimeout(() => ripple.remove(), 500)
  }, [])

  return { addRippleEffect }
}

export function useSwipeGesture(onSwipeLeft, onSwipeRight, threshold = 50) {
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  const onTouchStart = useCallback((e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }, [])

  const onTouchMove = useCallback((e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }, [])

  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > threshold
    const isRightSwipe = distance < -threshold

    if (isLeftSwipe && onSwipeLeft) onSwipeLeft()
    if (isRightSwipe && onSwipeRight) onSwipeRight()
  }, [touchStart, touchEnd, threshold, onSwipeLeft, onSwipeRight])

  return { onTouchStart, onTouchMove, onTouchEnd }
}
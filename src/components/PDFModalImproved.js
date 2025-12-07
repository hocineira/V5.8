'use client'

import { useState, useEffect, useRef } from 'react'
import { X, Download, ExternalLink, Maximize2, AlertCircle, RefreshCw } from 'lucide-react'
import { Button } from './ui/button'

export default function PDFModalImproved({ isOpen, onClose, pdfUrl, title }) {
  const [isLoading, setIsLoading] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [error, setError] = useState(false)
  const [usePDFJS, setUsePDFJS] = useState(false)
  const [loadTimeout, setLoadTimeout] = useState(null)
  const iframeRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setIsLoading(true)
      setError(false)
      setUsePDFJS(false)
      
      // Set up a timeout to detect if iframe fails to load
      const timeout = setTimeout(() => {
        console.log('PDF loading timeout, switching to PDF.js')
        setIsLoading(false)
        setUsePDFJS(true)
      }, 6000) // 6 seconds timeout
      
      setLoadTimeout(timeout)
    } else {
      document.body.style.overflow = 'unset'
      if (loadTimeout) {
        clearTimeout(loadTimeout)
        setLoadTimeout(null)
      }
    }

    return () => {
      document.body.style.overflow = 'unset'
      if (loadTimeout) {
        clearTimeout(loadTimeout)
      }
    }
  }, [isOpen, loadTimeout])

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = pdfUrl
    link.download = title ? `${title.replace(/[^a-z0-9]/gi, '_')}.pdf` : 'procedure.pdf'
    link.click()
  }

  const handleOpenInNewTab = () => {
    window.open(pdfUrl, '_blank')
  }

  const handleIframeLoad = () => {
    console.log('PDF iframe loaded successfully')
    if (loadTimeout) {
      clearTimeout(loadTimeout)
      setLoadTimeout(null)
    }
    setIsLoading(false)
    setError(false)
  }

  const handleIframeError = () => {
    console.log('PDF iframe failed to load, switching to PDF.js')
    if (loadTimeout) {
      clearTimeout(loadTimeout)
      setLoadTimeout(null)
    }
    setIsLoading(false)
    setUsePDFJS(true)
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  // PDF.js URL generator
  const getPDFJSUrl = () => {
    // Use Mozilla's hosted PDF.js viewer
    return `https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(window.location.origin + pdfUrl)}`
  }

  const handleRetry = () => {
    setIsLoading(true)
    setError(false)
    setUsePDFJS(false)
    
    // Setup timeout again
    const timeout = setTimeout(() => {
      setIsLoading(false)
      setUsePDFJS(true)
    }, 6000)
    setLoadTimeout(timeout)
  }

  const switchToPDFJS = () => {
    if (loadTimeout) {
      clearTimeout(loadTimeout)
      setLoadTimeout(null)
    }
    setIsLoading(false)
    setUsePDFJS(true)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className={`relative bg-white rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 ${
        isFullscreen 
          ? 'w-full h-full max-w-none max-h-none m-0 rounded-none' 
          : 'w-full h-full max-w-6xl max-h-[90vh] m-4'
      }`}>
        
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-3 sm:p-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <h3 className="text-sm sm:text-lg font-semibold truncate">{title}</h3>
            {isLoading && (
              <div className="flex items-center gap-2 text-xs sm:text-sm opacity-75">
                <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span className="hidden sm:inline">Chargement...</span>
              </div>
            )}
            {usePDFJS && (
              <div className="flex items-center gap-2 text-xs sm:text-sm opacity-75">
                <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Mode compatibilité</span>
              </div>
            )}
          </div>
          
          {/* Controls */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Retry Button */}
            {(error || usePDFJS) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRetry}
                className="text-white hover:bg-white/20 p-2"
                title="Réessayer"
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
            )}
            
            {/* Mobile-friendly controls */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleFullscreen}
              className="text-white hover:bg-white/20 p-2"
              title={isFullscreen ? "Sortir du plein écran" : "Plein écran"}
            >
              <Maximize2 className="w-4 h-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDownload}
              className="text-white hover:bg-white/20 p-2"
              title="Télécharger"
            >
              <Download className="w-4 h-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleOpenInNewTab}
              className="text-white hover:bg-white/20 p-2"
              title="Ouvrir dans un nouvel onglet"
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
            
            <div className="w-px h-4 sm:h-6 bg-white/30 mx-1 sm:mx-2" />
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/20 p-2"
              title="Fermer"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {/* PDF Container */}
        <div className="w-full h-full pt-12 sm:pt-16">
          {error ? (
            // Error fallback
            <div className="flex flex-col items-center justify-center h-full p-4 text-center">
              <div className="text-6xl mb-4">📄</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Impossible d'afficher le PDF</h3>
              <p className="text-gray-600 mb-6 max-w-md">
                Votre navigateur ne peut pas afficher ce PDF directement. 
                Vous pouvez le télécharger, l'ouvrir dans un nouvel onglet, ou réessayer.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={switchToPDFJS}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
                >
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Mode compatibilité
                </Button>
                <Button
                  onClick={handleDownload}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger le PDF
                </Button>
                <Button
                  variant="outline"
                  onClick={handleOpenInNewTab}
                  className="border-purple-600 text-purple-600 hover:bg-purple-50 px-6 py-2"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Ouvrir dans un nouvel onglet
                </Button>
              </div>
            </div>
          ) : usePDFJS ? (
            // PDF.js Fallback
            <div className="w-full h-full">
              <div className="absolute top-16 left-4 right-4 p-2 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800 mb-2 z-20">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>Mode compatibilité activé pour une meilleure visualisation</span>
                </div>
              </div>
              <iframe
                src={getPDFJSUrl()}
                className="w-full h-full border-0 mt-12"
                title={title}
                onLoad={() => console.log('PDF.js loaded')}
                onError={() => setError(true)}
              />
            </div>
          ) : (
            // Standard PDF Iframe
            <iframe
              ref={iframeRef}
              src={`${pdfUrl}#toolbar=1&navpanes=1&scrollbar=1&zoom=fit`}
              className="w-full h-full border-0"
              title={title}
              onLoad={handleIframeLoad}
              onError={handleIframeError}
            />
          )}
        </div>
        
        {/* Loading Overlay */}
        {isLoading && !error && !usePDFJS && (
          <div className="absolute inset-0 bg-white flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mb-4" />
              <p className="text-gray-600">Chargement du PDF...</p>
              <p className="text-sm text-gray-500 mt-2">Cela peut prendre quelques secondes</p>
              <div className="mt-4">
                <Button
                  variant="outline"
                  onClick={switchToPDFJS}
                  className="text-sm"
                >
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Utiliser le mode compatibilité
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {/* Mobile instructions */}
        {!isLoading && !error && (
          <div className="absolute bottom-4 left-4 right-4 sm:hidden">
            <div className="bg-black/70 text-white text-xs px-3 py-2 rounded-lg backdrop-blur-sm">
              {usePDFJS ? (
                <>🔧 Mode compatibilité : Utilisez les contrôles intégrés pour naviguer</>
              ) : (
                <>💡 Pincez pour zoomer, balayez pour naviguer dans le document</>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
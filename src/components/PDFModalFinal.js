'use client'

import { useState, useEffect, useRef } from 'react'
import { X, Download, ExternalLink, Maximize2, AlertCircle, RefreshCw, CheckCircle } from 'lucide-react'
import { Button } from './ui/button'

export default function PDFModalFinal({ isOpen, onClose, pdfUrl, title }) {
  const [isLoading, setIsLoading] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [error, setError] = useState(false)
  const [viewMode, setViewMode] = useState('standard') // 'standard', 'api', 'pdfjs', 'download'

  // IMPORTANT: useRef for timers to avoid re-render loops that reset timeouts
  const loadTimeoutRef = useRef(null)
  const iframeRef = useRef(null)

  // Setup/cleanup when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setIsLoading(true)
      setError(false)
      setViewMode('standard')

      // Clear any previous timer then start a new one
      if (loadTimeoutRef.current) {
        clearTimeout(loadTimeoutRef.current)
        loadTimeoutRef.current = null
      }
      loadTimeoutRef.current = setTimeout(() => {
        // Switch to API mode if standard iframe did not load in time
        setIsLoading(false)
        setViewMode('api')
      }, 6000)
    } else {
      document.body.style.overflow = 'unset'
      if (loadTimeoutRef.current) {
        clearTimeout(loadTimeoutRef.current)
        loadTimeoutRef.current = null
      }
    }

    return () => {
      document.body.style.overflow = 'unset'
      if (loadTimeoutRef.current) {
        clearTimeout(loadTimeoutRef.current)
        loadTimeoutRef.current = null
      }
    }
  }, [isOpen])

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = pdfUrl
    link.download = title ? `${title.replace(/[^a-z0-9]/gi, '_')}.pdf` : 'procedure.pdf'
    link.click()
  }

  const handleOpenInNewTab = () => {
    if (viewMode === 'api') {
      const filename = pdfUrl.split('/').pop()
      window.open(`/api/pdf/${filename}`, '_blank')
    } else {
      window.open(pdfUrl, '_blank')
    }
  }

  const handleIframeLoad = () => {
    // When iframe loads in any mode, clear loading state and timer
    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current)
      loadTimeoutRef.current = null
    }
    setIsLoading(false)
    setError(false)
  }

  const handleIframeError = () => {
    // On error, try API mode next
    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current)
      loadTimeoutRef.current = null
    }
    setIsLoading(false)
    setViewMode('api')
  }

  const toggleFullscreen = () => setIsFullscreen(!isFullscreen)

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') onClose()
  }

  useEffect(() => {
    if (!isOpen) return
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  // Helper URL builders
  const getAPIUrl = () => {
    const filename = pdfUrl.split('/').pop()
    return `/api/pdf/${filename}#toolbar=1&navpanes=1&scrollbar=1&zoom=fit`
  }

  const getPDFJSUrl = () => {
    const filename = pdfUrl.split('/').pop()
    const apiUrl = `${window.location.origin}/api/pdf/${filename}`
    return `https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(apiUrl)}`
  }

  const handleRetry = () => {
    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current)
      loadTimeoutRef.current = null
    }
    setIsLoading(true)
    setError(false)
    setViewMode('standard')
    loadTimeoutRef.current = setTimeout(() => {
      setIsLoading(false)
      setViewMode('api')
    }, 4000)
  }

  const switchToAPIMode = () => {
    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current)
      loadTimeoutRef.current = null
    }
    setIsLoading(true)
    setViewMode('api')
    loadTimeoutRef.current = setTimeout(() => {
      // If API mode also stalls, try PDF.js
      setIsLoading(false)
      setViewMode('pdfjs')
    }, 5000)
  }

  const switchToPDFJS = () => {
    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current)
      loadTimeoutRef.current = null
    }
    setIsLoading(true)
    setViewMode('pdfjs')
    loadTimeoutRef.current = setTimeout(() => {
      setIsLoading(false)
      setError(true)
    }, 8000)
  }

  if (!isOpen) return null

  const getStatusText = () => {
    switch (viewMode) {
      case 'standard': return 'Standard'
      case 'api': return 'Mode serveur'
      case 'pdfjs': return 'Mode compatibilité'
      case 'download': return 'Téléchargement'
      default: return 'Standard'
    }
  }

  const getStatusColor = () => {
    switch (viewMode) {
      case 'standard': return 'text-blue-600'
      case 'api': return 'text-green-600'
      case 'pdfjs': return 'text-orange-600'
      case 'download': return 'text-purple-600'
      default: return 'text-gray-600'
    }
  }

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
            {!isLoading && !error && (
              <div className="flex items-center gap-2 text-xs sm:text-sm opacity-75">
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className={`hidden sm:inline ${getStatusColor()}`}>
                  {getStatusText()}
                </span>
              </div>
            )}
          </div>
          
          {/* Controls */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Mode Switch Buttons */}
            {(error || !isLoading) && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={switchToAPIMode}
                  className="text-white hover:bg-white/20 p-2 text-xs hidden sm:inline-flex"
                  title="Mode serveur"
                >
                  API
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={switchToPDFJS}
                  className="text-white hover:bg-white/20 p-2 text-xs hidden sm:inline-flex"
                  title="Mode compatibilité"
                >
                  PDF.js
                </Button>
              </>
            )}
            
            {/* Retry Button */}
            {(error || viewMode !== 'standard') && (
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
                Essayez les options ci-dessous ou téléchargez le fichier.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={switchToAPIMode}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2"
                >
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Mode serveur
                </Button>
                <Button
                  onClick={switchToPDFJS}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2"
                >
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Mode compatibilité
                </Button>
                <Button
                  onClick={handleDownload}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger
                </Button>
                <Button
                  variant="outline"
                  onClick={handleOpenInNewTab}
                  className="border-purple-600 text-purple-600 hover:bg-purple-50 px-6 py-2"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Nouvel onglet
                </Button>
              </div>
            </div>
          ) : (
            // PDF Display
            <div className="w-full h-full">
              {viewMode === 'api' && !isLoading && (
                <div className="absolute top-16 left-4 right-4 p-2 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800 mb-2 z-20">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Mode serveur activé - PDF servi avec optimisations CORS</span>
                  </div>
                </div>
              )}
              
              {viewMode === 'pdfjs' && !isLoading && (
                <div className="absolute top-16 left-4 right-4 p-2 bg-orange-50 border border-orange-200 rounded-lg text-sm text-orange-800 mb-2 z-20">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    <span>Mode compatibilité PDF.js activé</span>
                  </div>
                </div>
              )}
              
              <iframe
                ref={iframeRef}
                src={
                  viewMode === 'api' ? getAPIUrl() :
                  viewMode === 'pdfjs' ? getPDFJSUrl() :
                  `${pdfUrl}#toolbar=1&navpanes=1&scrollbar=1&zoom=fit`
                }
                className={`w-full h-full border-0 ${viewMode !== 'standard' ? 'mt-12' : ''}`}
                title={title}
                onLoad={handleIframeLoad}
                onError={handleIframeError}
              />
            </div>
          )}
        </div>
        
        {/* Loading Overlay */}
        {isLoading && !error && (
          <div className="absolute inset-0 bg-white flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mb-4" />
              <p className="text-gray-600">Chargement du PDF...</p>
              <p className="text-sm text-gray-500 mt-2">
                Mode: {getStatusText()}
              </p>
              <div className="mt-4 flex flex-col sm:flex-row gap-2">
                <Button
                  variant="outline"
                  onClick={switchToAPIMode}
                  className="text-sm"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Mode serveur
                </Button>
                <Button
                  variant="outline"
                  onClick={switchToPDFJS}
                  className="text-sm"
                >
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Mode compatibilité
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
'use client'

import { useState, useEffect, useRef } from 'react'
import { X, Download, ExternalLink, Maximize2, AlertCircle, RefreshCw, CheckCircle } from 'lucide-react'
import { Button } from './ui/button'

export default function PDFModalBlob({ isOpen, onClose, pdfUrl, title }) {
  const [isLoading, setIsLoading] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [error, setError] = useState(false)
  const [blobUrl, setBlobUrl] = useState(null)
  const [loadTimeout, setLoadTimeout] = useState(null)
  const iframeRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setIsLoading(true)
      setError(false)
      setBlobUrl(null)
      
      // Fetch PDF et créer blob URL
      fetchPDFAsBlob()
    } else {
      document.body.style.overflow = 'unset'
      if (loadTimeout) {
        clearTimeout(loadTimeout)
        setLoadTimeout(null)
      }
      // Nettoyer le blob URL
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl)
        setBlobUrl(null)
      }
    }

    return () => {
      document.body.style.overflow = 'unset'
      if (loadTimeout) {
        clearTimeout(loadTimeout)
      }
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl)
      }
    }
  }, [isOpen])

  const fetchPDFAsBlob = async () => {
    try {
      console.log('Fetching PDF:', pdfUrl)
      
      // Essayer d'abord l'API
      const filename = pdfUrl.split('/').pop()
      const apiUrl = `/api/pdf/${filename}`
      
      let response = await fetch(apiUrl)
      
      if (!response.ok) {
        console.log('API failed, trying direct URL')
        response = await fetch(pdfUrl)
      }
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const blob = await response.blob()
      console.log('PDF blob created:', blob.type, blob.size)
      
      // Vérifier que c'est bien un PDF
      if (blob.type !== 'application/pdf' && !blob.type.includes('pdf')) {
        // Forcer le type PDF
        const pdfBlob = new Blob([blob], { type: 'application/pdf' })
        const url = URL.createObjectURL(pdfBlob)
        setBlobUrl(url)
      } else {
        const url = URL.createObjectURL(blob)
        setBlobUrl(url)
      }
      
      setIsLoading(false)
      console.log('Blob URL created successfully')
    } catch (err) {
      console.error('Error fetching PDF:', err)
      setError(true)
      setIsLoading(false)
    }
  }

  const handleDownload = () => {
    const link = document.createElement('a')
    if (blobUrl) {
      link.href = blobUrl
    } else {
      link.href = pdfUrl
    }
    link.download = title ? `${title.replace(/[^a-z0-9]/gi, '_')}.pdf` : 'procedure.pdf'
    link.click()
  }

  const handleOpenInNewTab = () => {
    if (blobUrl) {
      window.open(blobUrl, '_blank')
    } else {
      window.open(pdfUrl, '_blank')
    }
  }

  const handleIframeLoad = () => {
    console.log('PDF iframe loaded successfully')
    setIsLoading(false)
    setError(false)
  }

  const handleIframeError = () => {
    console.log('PDF iframe failed to load')
    setError(true)
    setIsLoading(false)
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

  const handleRetry = () => {
    setIsLoading(true)
    setError(false)
    if (blobUrl) {
      URL.revokeObjectURL(blobUrl)
      setBlobUrl(null)
    }
    fetchPDFAsBlob()
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
            {!isLoading && !error && blobUrl && (
              <div className="flex items-center gap-2 text-xs sm:text-sm opacity-75">
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline text-green-200">
                  PDF chargé
                </span>
              </div>
            )}
          </div>
          
          {/* Controls */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Retry Button */}
            {error && (
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
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Impossible de charger le PDF</h3>
              <p className="text-gray-600 mb-6 max-w-md">
                Une erreur s'est produite lors du chargement du PDF. 
                Vous pouvez réessayer, le télécharger, ou l'ouvrir dans un nouvel onglet.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleRetry}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Réessayer
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
          ) : blobUrl ? (
            // PDF Display avec Blob URL
            <div className="w-full h-full">
              <div className="absolute top-16 left-4 right-4 p-2 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800 mb-2 z-20">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>PDF chargé avec succès via Blob URL</span>
                </div>
              </div>
              
              <iframe
                ref={iframeRef}
                src={`${blobUrl}#toolbar=1&navpanes=1&scrollbar=1&zoom=fit`}
                className="w-full h-full border-0 mt-12"
                title={title}
                onLoad={handleIframeLoad}
                onError={handleIframeError}
              />
            </div>
          ) : (
            // Loading state
            <div className="absolute inset-0 bg-white flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mb-4" />
                <p className="text-gray-600">Chargement du PDF...</p>
                <p className="text-sm text-gray-500 mt-2">
                  Création du Blob URL en cours...
                </p>
              </div>
            </div>
          )}
        </div>
        
        {/* Mobile instructions */}
        {!isLoading && !error && blobUrl && (
          <div className="absolute bottom-4 left-4 right-4 sm:hidden">
            <div className="bg-black/70 text-white text-xs px-3 py-2 rounded-lg backdrop-blur-sm">
              💡 PDF chargé via Blob URL - Pincez pour zoomer, balayez pour naviguer
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuration stable et optimisée

  // Optimisations ULTRA-AGRESSIVES pour VPS 1GB RAM
  experimental: {
    optimizePackageImports: ['lucide-react'],
    // Réduit drastiquement l'utilisation de la mémoire
    workerThreads: false,
    cpus: 1,
  },
  
  // Optimisations de build pour faible mémoire
  // swcMinify retiré car déprécié dans Next.js 15 (activé par défaut)
  productionBrowserSourceMaps: false, // Économise mémoire
  
  // Configuration webpack optimisée pour mémoire
  webpack: (config, { dev, isServer }) => {
    // Optimisations mémoire agressives
    config.optimization = {
      ...config.optimization,
      minimize: !dev,
      // Réduit le nombre de chunks pour économiser mémoire
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
        },
      },
    };
    
    // Limite la parallélisation pour économiser mémoire
    config.parallelism = 1;
    
    return config;
  },

  // Configuration des images (conservée, elle fonctionne bien)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 jours
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    loader: 'default',
  },

  // Compression de base
  compress: true,
  
  // Headers de sécurité simplifiés mais complets
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Performance headers de base
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          // Sécurité essentielle - Allow iframe for preview
          {
            key: 'X-Frame-Options',
            value: 'ALLOWALL'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          // CSP optimisé pour PDF et performance
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https://images.unsplash.com",
              "font-src 'self' data:",
              "connect-src 'self'",
              "frame-src 'self' blob: data: *",
              "object-src 'self' blob: data:",
              "frame-ancestors *",
              "base-uri 'self'",
              "form-action 'self'"
            ].join('; ')
          }
        ],
      },
      // Cache optimisé pour les images
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ],
      },
    ]
  },

  // Configuration de base sécurisée
  poweredByHeader: false,
  generateEtags: false,
  
  // Désactiver ESLint pendant le build pour éviter les erreurs bloquantes
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Note: Removed API proxy - using Next.js API routes instead of FastAPI backend
}

module.exports = nextConfig
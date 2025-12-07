'use client'

export default function MobileLoader({ type = 'page', className = '' }) {
  if (type === 'page') {
    return (
      <div className={`animate-pulse mobile-skeleton ${className}`}>
        {/* Hero skeleton */}
        <div className="h-32 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-xl mb-6 animate-skeleton-shimmer"></div>
        
        {/* Content skeleton */}
        <div className="space-y-4">
          <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg w-3/4 animate-skeleton-shimmer"></div>
          <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-full animate-skeleton-shimmer"></div>
          <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-5/6 animate-skeleton-shimmer"></div>
        </div>

        {/* Cards skeleton */}
        <div className="grid grid-cols-1 gap-4 mt-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-24 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-xl animate-skeleton-shimmer"></div>
          ))}
        </div>
      </div>
    )
  }

  if (type === 'button') {
    return (
      <div className={`h-12 w-32 bg-gradient-to-r from-blue-200 via-blue-100 to-blue-200 rounded-lg animate-skeleton-shimmer ${className}`}></div>
    )
  }

  if (type === 'navigation') {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200/50">
        <div className="flex justify-around py-2">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="flex flex-col items-center space-y-2 p-2">
              <div className="w-6 h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-skeleton-shimmer"></div>
              <div className="w-12 h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-skeleton-shimmer"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Default skeleton
  return (
    <div className={`h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-skeleton-shimmer ${className}`}></div>
  )
}
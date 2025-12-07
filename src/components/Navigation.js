'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Home, User, GraduationCap, ShieldCheck, FolderOpen, Eye, Server, Network, ChevronDown, Building, BookOpen } from 'lucide-react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [openDropdownId, setOpenDropdownId] = useState(null) // null = fermé, 'about' = À propos ouvert, 'projects' = Projets ouvert
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      setScrolled(offset > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Fonction pour basculer un dropdown
  const toggleDropdown = (dropdownId) => {
    setOpenDropdownId(prev => prev === dropdownId ? null : dropdownId)
  }

  // Fermer le dropdown quand on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Ne pas fermer si on clique sur un bouton de dropdown ou sur le contenu du dropdown
      if (event.target.closest('button[data-dropdown]') || 
          event.target.closest('[data-dropdown-content]')) {
        return
      }
      setOpenDropdownId(null)
    }

    if (openDropdownId) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [openDropdownId])

  const navigation = [
    {
      name: 'Accueil',
      href: '/accueil',
      icon: Home,
      description: 'Découvrez mon profil'
    },
    {
      name: 'À propos',
      href: '/a-propos',
      icon: User,
      description: 'Mon parcours et mes compétences',
      hasDropdown: true,
      submenu: [
        {
          name: 'À propos de moi',
          href: '/a-propos',
          icon: User,
          description: 'Mon parcours et mes compétences'
        },
        {
          name: 'Mes Stages',
          href: '/a-propos/stages',
          icon: Building,
          description: 'Mon expérience en entreprise'
        }
      ]
    },
    {
      name: 'TCS',
      href: '/tcs',
      icon: ShieldCheck,
      description: 'Technicien Cybersécurité'
    },
    {
      name: 'BTS SIO',
      href: '/bts-sio',
      icon: GraduationCap,
      description: 'Ma formation'
    },
    {
      name: 'Projets',
      href: '/projets',
      icon: FolderOpen,
      description: 'Mes réalisations SISR',
      hasDropdown: true,
      submenu: [
        {
          name: 'Toutes les procédures',
          href: '/projets',
          icon: FolderOpen,
          description: 'Procédures techniques détaillées'
        },
        {
          name: 'Projets Professionnels E5',
          href: '/projets/professionnels',
          icon: Building,
          description: 'Projets réalisés en entreprise'
        },
        {
          name: 'Projets Scolaires E6',
          href: '/projets/scolaires',
          icon: BookOpen,
          description: 'Projets académiques et scolaires'
        }
      ]
    },
    {
      name: 'Veilles',
      href: '/veilles',
      icon: Eye,
      description: 'Veille technologique'
    }
  ]

  const isActive = (href) => {
    if (href === '/projets') {
      return pathname === '/projets' || pathname.startsWith('/projets/')
    }
    if (href === '/a-propos') {
      return pathname === '/a-propos' || pathname.startsWith('/a-propos/')
    }
    return pathname === href
  }

  const isProjectsActive = () => {
    return pathname === '/projets' || pathname.startsWith('/projets/')
  }

  const isAboutActive = () => {
    return pathname === '/a-propos' || pathname.startsWith('/a-propos/')
  }

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 hidden md:block ${
        scrolled 
          ? 'glass-effect-strong border-b border-white/20 shadow-2xl shadow-black/10' 
          : 'glass-effect border-b border-white/10 shadow-lg shadow-black/5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo - Optimisé pour mobile */}
            <div className="flex-shrink-0">
              <Link href="/accueil" className="flex items-center space-x-2 group">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <Network className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <span className="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Hocine IRATNI
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-1">
                {navigation.map((item) => {
                  const Icon = item.icon
                  
                  // Menu avec dropdown pour Projets et À propos
                  if (item.hasDropdown) {
                    const isMenuActive = item.name === 'Projets' ? isProjectsActive() : isAboutActive()
                    const dropdownId = item.name === 'Projets' ? 'projects' : 'about'
                    const isOpen = openDropdownId === dropdownId
                    
                    return (
                      <div key={item.name} className="relative">
                        <button
                          data-dropdown={dropdownId}
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            toggleDropdown(dropdownId)
                          }}
                          className={`relative group flex items-center px-4 py-2 rounded-lg text-sm font-normal transition-all duration-300 glass-nav-item glass-shine ${
                            isMenuActive ? 'nav-active' : ''
                          }`}
                        >
                          <Icon className="w-4 h-4 mr-2" />
                          {item.name}
                          <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                            isOpen ? 'rotate-180' : ''
                          }`} />
                          
                          {/* Tooltip */}
                          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                            {item.description}
                            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                          </div>
                        </button>

                        {/* Dropdown Menu */}
                        {isOpen && (
                          <div 
                            data-dropdown-content="true"
                            className="absolute top-full left-0 mt-2 w-64 bg-white/95 backdrop-blur-lg shadow-lg rounded-lg border border-white/20 overflow-hidden z-50"
                          >
                            {item.submenu.map((subItem) => {
                              const SubIcon = subItem.icon
                              return (
                                <Link
                                  key={subItem.name}
                                  href={subItem.href}
                                  className={`flex items-center px-4 py-3 text-sm transition-colors duration-200 hover:bg-gray-100/50 ${
                                    isActive(subItem.href) ? 'bg-blue-50/50 text-blue-600' : 'text-gray-700'
                                  }`}
                                  onClick={() => setOpenDropdownId(null)}
                                >
                                  <SubIcon className="w-4 h-4 mr-3" />
                                  <div>
                                    <div className="font-medium">{subItem.name}</div>
                                    <div className="text-xs text-gray-500">
                                      {subItem.description}
                                    </div>
                                  </div>
                                </Link>
                              )
                            })}
                          </div>
                        )}
                      </div>
                    )
                  }

                  // Menu normal
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      prefetch={true}
                      className={`relative group flex items-center px-4 py-2 rounded-lg text-sm font-normal transition-all duration-300 glass-nav-item glass-shine ${
                        isActive(item.href) ? 'nav-active' : ''
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {item.name}
                      
                      {/* Tooltip */}
                      <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                        {item.description}
                        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Mobile menu button - Touch optimisé */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="mobile-glass-button glass-shine rounded-xl p-3 inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 active:scale-95"
                style={{ minWidth: '48px', minHeight: '48px' }}
                aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              >
                <div className="w-6 h-6 relative">
                  <span className={`absolute inset-0 transition-all duration-300 ${
                    isOpen ? 'rotate-45 opacity-0' : 'rotate-0 opacity-100'
                  }`}>
                    <Menu className="w-6 h-6" />
                  </span>
                  <span className={`absolute inset-0 transition-all duration-300 ${
                    isOpen ? 'rotate-0 opacity-100' : '-rotate-45 opacity-0'
                  }`}>
                    <X className="w-6 h-6" />
                  </span>
                </div>
                
                {/* Ripple effect on tap */}
                <div className="absolute inset-0 rounded-xl bg-blue-500/20 opacity-0 pointer-events-none animate-ping" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Overlay - Slide from right */}
      <div className={`md:hidden fixed inset-0 z-50 transition-all duration-500 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-500 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsOpen(false)}
        />
        
        {/* Menu Panel */}
        <div className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] mobile-glass-menu shadow-2xl transition-transform duration-500 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200/50">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Network className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Menu
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
              aria-label="Fermer le menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col py-6">
            {navigation.map((item, index) => {
              const Icon = item.icon
              
              // Menu avec submenu pour mobile
              if (item.hasDropdown) {
                const isMenuActive = item.name === 'Projets' ? isProjectsActive() : isAboutActive()
                return (
                  <div key={item.name}>
                    {/* Menu principal */}
                    <Link
                      href={item.href}
                      className={`group flex items-center px-6 py-4 text-base font-medium transition-all duration-200 hover:bg-blue-50/50 active:scale-95 ${
                        isMenuActive
                          ? 'text-blue-600 bg-blue-50/50 border-r-2 border-blue-600'
                          : 'text-gray-700 hover:text-blue-600'
                      }`}
                      onClick={() => setIsOpen(false)}
                      style={{ 
                        animationDelay: `${index * 50}ms`,
                        minHeight: '60px' 
                      }}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mr-4 transition-all duration-200 ${
                        isMenuActive
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                          : 'bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{item.name}</div>
                        <div className={`text-sm mt-0.5 ${
                          isMenuActive
                            ? 'text-blue-500'
                            : 'text-gray-500 group-hover:text-blue-500'
                        }`}>
                          {item.description}
                        </div>
                      </div>
                      {isMenuActive && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                      )}
                    </Link>
                    
                    {/* Sous-menus */}
                    <div className="ml-6 border-l-2 border-gray-200">
                      {item.submenu.map((subItem, subIndex) => {
                        const SubIcon = subItem.icon
                        return (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className={`group flex items-center px-6 py-3 text-sm font-medium transition-all duration-200 hover:bg-blue-50/50 active:scale-95 ${
                              isActive(subItem.href)
                                ? 'text-blue-600 bg-blue-50/30'
                                : 'text-gray-600 hover:text-blue-600'
                            }`}
                            onClick={() => setIsOpen(false)}
                            style={{ 
                              animationDelay: `${(index * 50) + (subIndex * 25)}ms`,
                              minHeight: '50px' 
                            }}
                          >
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 transition-all duration-200 ${
                              isActive(subItem.href)
                                ? 'bg-blue-500 text-white shadow-md shadow-blue-500/25'
                                : 'bg-gray-100 text-gray-500 group-hover:bg-blue-100 group-hover:text-blue-600'
                            }`}>
                              <SubIcon className="w-4 h-4" />
                            </div>
                            <div className="flex-1">
                              <div className="font-medium">{subItem.name}</div>
                              <div className={`text-xs mt-0.5 ${
                                isActive(subItem.href)
                                  ? 'text-blue-500'
                                  : 'text-gray-500 group-hover:text-blue-500'
                              }`}>
                                {subItem.description}
                              </div>
                            </div>
                            {isActive(subItem.href) && (
                              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                            )}
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                )
              }

              // Menu normal
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-6 py-4 text-base font-medium transition-all duration-200 hover:bg-blue-50/50 active:scale-95 ${
                    isActive(item.href)
                      ? 'text-blue-600 bg-blue-50/50 border-r-2 border-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                  onClick={() => setIsOpen(false)}
                  style={{ 
                    animationDelay: `${index * 50}ms`,
                    minHeight: '60px' 
                  }}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mr-4 transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                      : 'bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{item.name}</div>
                    <div className={`text-sm mt-0.5 ${
                      isActive(item.href)
                        ? 'text-blue-500'
                        : 'text-gray-500 group-hover:text-blue-500'
                    }`}>
                      {item.description}
                    </div>
                  </div>
                  {isActive(item.href) && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                  )}
                </Link>
              )
            })}
          </div>

          {/* Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200/50">
            <div className="text-center">
              <p className="text-xs text-gray-500">
                Portfolio • Hocine IRATNI
              </p>
              <p className="text-xs text-gray-400 mt-1">
                BTS SIO SISR
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
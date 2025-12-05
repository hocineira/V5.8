'use client'

import { Monitor, Shield, ExternalLink, TrendingUp, ArrowRight, Calendar, FileText } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import Link from 'next/link'
import { FadeIn, ScaleIn, StaggerContainer, StaggerItem, AnimatedCard, CountUp } from '../../components/animations'

export default function VeillesPage() {
  const veillesCategories = [
    {
      id: 'technologique',
      title: 'Veille Technologique',
      description: 'Suivez les dernières évolutions Windows/Windows Server et technologies Microsoft pour votre spécialisation BTS SIO SISR.',
      icon: Monitor,
      color: 'blue',
      bgGradient: 'from-blue-500 to-indigo-600',
      items: [
        'Windows Server 2025',
        'Windows 11 24H2',
        'Sécurité Microsoft',
        'Infrastructure IT'
      ],
      link: '/veilles/technologique',
      stats: 'Focus Windows Server'
    },
    {
      id: 'cloud',
      title: 'Veille Cloud Computing',
      description: 'Suivez les évolutions du Cloud Computing et de la cybersécurité : AWS, Azure, Google Cloud, sécurité et innovations.',
      icon: () => <div className="text-2xl">☁️</div>,
      color: 'sky',
      bgGradient: 'from-blue-500 via-sky-400 to-cyan-400',
      items: [
        'Cloud Computing',
        'AWS, Azure, GCP',
        'Cybersécurité Cloud',
        'Innovations Cloud'
      ],
      link: '/veilles/cloud',
      stats: 'Sources internationales'
    },
    {
      id: 'juridique',
      title: 'Veille Juridique',  
      description: 'Restez informé sur les évolutions du RGPD et les obligations de conformité.',
      icon: Shield,
      color: 'indigo',
      bgGradient: 'from-indigo-500 to-purple-600',
      items: [
        'Obligations cybersécurité 2025',
        'Droits des utilisateurs',
        'Sanctions et amendes',
        'Conformité entreprise'
      ],
      link: '/veilles/juridique',
      stats: '3 sujets traités'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section with Animations */}
      <section className="relative overflow-hidden py-12 sm:py-20 lg:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-72 sm:h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-indigo-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative container mx-auto px-3 sm:px-4">
          <div className="text-center">
            <ScaleIn delay={0.2} scale={0.5}>
              <div className="flex justify-center mb-6 sm:mb-8">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
              </div>
            </ScaleIn>
            
            <FadeIn delay={0.3} direction="up">
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 text-slate-900 leading-tight">
                Mes Veilles
              </h1>
            </FadeIn>
            
            <FadeIn delay={0.5} direction="up">
              <p className="text-lg sm:text-xl text-slate-600 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
                Découvrez mes veilles spécialisées dans les domaines technologique et juridique. 
                Restez informé sur les dernières évolutions et réglementations importantes.
              </p>
            </FadeIn>
            
            <StaggerContainer staggerDelay={0.1} className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <StaggerItem>
                <Badge className="bg-blue-100 text-blue-800 px-3 py-2 sm:px-4 text-xs sm:text-sm">
                  <Monitor className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  Windows/Microsoft
                </Badge>
              </StaggerItem>
              <StaggerItem>
                <Badge className="bg-sky-100 text-sky-800 px-3 py-2 sm:px-4 text-xs sm:text-sm">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-sm">☁️</div>
                  Cloud Computing
                </Badge>
              </StaggerItem>
              <StaggerItem>
                <Badge className="bg-indigo-100 text-indigo-800 px-3 py-2 sm:px-4 text-xs sm:text-sm">
                  <Shield className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  Juridique
                </Badge>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Veilles Cards Section with Animations */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-3 sm:px-4">
          <StaggerContainer staggerDelay={0.15} className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
            {veillesCategories.map((veille, index) => {
              const Icon = veille.icon
              return (
                <StaggerItem key={veille.id}>
                  <AnimatedCard delay={index * 0.1}>
                    <Link href={veille.link}>
                      <Card className="group cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 overflow-hidden border-0 shadow-lg h-full">
                        {/* Header with Gradient - Mobile Optimized */}
                        <div className={`relative h-24 sm:h-32 bg-gradient-to-r ${veille.bgGradient} flex items-center justify-center overflow-hidden ${
                          veille.id === 'cloud' ? 'text-white' : ''
                        }`}>
                          <div className="absolute inset-0 bg-black/10"></div>
                          {/* Nuages pour le thème Cloud */}
                          {veille.id === 'cloud' && (
                            <>
                              <div className="absolute top-2 left-4 w-8 h-4 bg-white/30 rounded-full animate-pulse"></div>
                              <div className="absolute top-4 right-6 w-10 h-5 bg-white/20 rounded-full animate-pulse delay-500"></div>
                              <div className="absolute bottom-3 left-8 w-12 h-6 bg-white/25 rounded-full animate-pulse delay-1000"></div>
                            </>
                          )}
                          <div className="relative z-10">
                            <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-white drop-shadow-lg" />
                          </div>
                          <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-white/80 group-hover:text-white group-hover:transform group-hover:translate-x-1 transition-all duration-300" />
                          </div>
                        </div>
                        
                        <CardHeader className="pb-3 sm:pb-4 p-4 sm:p-6">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2 sm:gap-0">
                            <Badge className={`${
                              veille.color === 'blue' ? 'bg-blue-100 text-blue-800' : 
                              veille.color === 'sky' ? 'bg-sky-100 text-sky-800' : 
                              'bg-indigo-100 text-indigo-800'
                            } text-xs sm:text-sm w-fit`}>
                              {veille.stats}
                            </Badge>
                            <div className="text-xs sm:text-sm text-slate-500 flex items-center">
                              <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                              2025
                            </div>
                          </div>
                          <CardTitle className="text-xl sm:text-2xl text-slate-900 group-hover:text-blue-600 transition-colors mb-2 sm:mb-3">
                            {veille.title}
                          </CardTitle>
                          <CardDescription className="text-slate-600 leading-relaxed text-sm sm:text-base">
                            {veille.description}
                          </CardDescription>
                        </CardHeader>
                        
                        <CardContent className="pt-0 p-4 sm:p-6">
                          <div className="mb-4 sm:mb-6">
                            <h4 className="font-semibold text-slate-900 mb-3 text-xs sm:text-sm uppercase tracking-wide">
                              Contenus disponibles :
                            </h4>
                            <ul className="space-y-2">
                              {veille.items.map((item, idx) => (
                                <li key={idx} className="flex items-start">
                                  <div className={`w-2 h-2 ${
                                    veille.color === 'blue' ? 'bg-blue-600' : 
                                    veille.color === 'sky' ? 'bg-sky-600' : 
                                    'bg-indigo-600'
                                  } rounded-full mt-1.5 sm:mt-2 mr-3 flex-shrink-0`}></div>
                                  <span className="text-slate-700 text-xs sm:text-sm">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className={`${
                            veille.color === 'blue' ? 'bg-blue-50 group-hover:bg-blue-100' : 
                            veille.color === 'sky' ? 'bg-sky-50 group-hover:bg-sky-100' :
                            'bg-indigo-50 group-hover:bg-indigo-100'
                          } p-3 sm:p-4 rounded-lg transition-colors duration-300`}>
                            <div className="flex items-center justify-between">
                              <span className={`${
                                veille.color === 'blue' ? 'text-blue-800' : 
                                veille.color === 'sky' ? 'text-sky-800' : 
                                'text-indigo-800'
                              } font-medium text-xs sm:text-sm`}>
                                Accéder à la veille
                              </span>
                              <ArrowRight className={`w-3 h-3 sm:w-4 sm:h-4 ${
                                veille.color === 'blue' ? 'text-blue-700' : 
                                veille.color === 'sky' ? 'text-sky-700' : 
                                'text-indigo-700'
                              } group-hover:transform group-hover:translate-x-1 transition-all duration-300`} />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </AnimatedCard>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Stats Section with Animations */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="container mx-auto px-3 sm:px-4">
          <FadeIn delay={0.2} direction="up">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                Aperçu de mes veilles
              </h2>
              <div className="w-16 sm:w-20 h-1 bg-blue-600 mx-auto"></div>
            </div>
          </FadeIn>
          
          <StaggerContainer staggerDelay={0.1} className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 text-center max-w-4xl mx-auto">
            {[
              { value: 3, label: 'Types de veilles' },
              { value: 4, label: 'Sources Windows' },
              { value: 7, label: 'Sources Cloud' },
              { value: 3, label: 'Sujets RGPD' }
            ].map((stat, index) => (
              <StaggerItem key={index}>
                <div className="space-y-2">
                  <div className="text-2xl sm:text-3xl font-bold text-blue-600">
                    <CountUp to={stat.value} duration={2} />
                  </div>
                  <div className="text-slate-600 text-xs sm:text-sm">{stat.label}</div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section with Animations */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <FadeIn delay={0.2} direction="up">
            <h2 className="text-4xl font-bold mb-6 text-white">
              Besoin d'informations complémentaires ?
            </h2>
          </FadeIn>
          
          <FadeIn delay={0.4} direction="up">
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Pour toute question sur ces veilles ou pour discuter de vos besoins spécifiques en matière technologique, Cloud Computing et juridique.
            </p>
          </FadeIn>
          
          <StaggerContainer staggerDelay={0.15} className="flex flex-col sm:flex-row gap-4 justify-center">
            <StaggerItem>
              <Button 
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
                onClick={() => window.location.href = 'mailto:hocineira@gmail.com'}
              >
                Me contacter
                <ExternalLink className="ml-2 w-5 h-5" />
              </Button>
            </StaggerItem>
            <StaggerItem>
              <Button 
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
                onClick={() => window.open('/projets', '_self')}
              >
                Voir mes procédures
                <FileText className="ml-2 w-5 h-5" />
              </Button>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>
    </div>
  )
}


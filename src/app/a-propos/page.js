'use client'

import { 
  User, 
  GraduationCap, 
  MapPin, 
  Calendar,
  Heart
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { FadeIn, ScaleIn, StaggerContainer, StaggerItem, FloatingElement, RotateIn } from '../../components/animations'

export default function AboutPage() {
  const education = [
    {
      degree: 'BTS SIO Option SISR',
      period: 'De septembre 2024 a juin 2026',
      institution: 'IFC Marseille',
      status: 'En cours',
      description: 'Services Informatiques aux Organisations - Specialite Solutions d Infrastructure, Systemes et Reseaux'
    },
    {
      degree: 'Licence 1 : INFORMATIQUE - MATHEMATIQUES - MECANIQUE - PHYSIQUE',
      period: 'Septembre 2023 - Janvier 2024',
      institution: 'Aix-Marseille Universite Marseille',
      status: 'Reorientation',
      description: 'Une annee de formation pluridisciplinaire - Reorientation vers le BTS SIO pour se specialiser en informatique'
    },
    {
      degree: 'Baccalaureat general',
      period: 'De septembre 2021 a juin 2022',
      institution: 'Lycee Prive International Alexandre Dumas, Algiers, Algerie',
      status: 'Obtenu',
      description: 'Formation generale avec bases scientifiques solides'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation Spacing */}
      <div className="h-16 md:h-20"></div>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <FloatingElement duration={3} distance={15}>
            <ScaleIn delay={0.1} scale={0.5} duration={0.8}>
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6 shadow-2xl">
                <User className="w-12 h-12 text-white" />
              </div>
            </ScaleIn>
          </FloatingElement>
          
          <FadeIn delay={0.3} direction="up" distance={40}>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              À propos de moi
            </h1>
          </FadeIn>
          
          <FadeIn delay={0.5} direction="up" distance={30}>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Découvrez mon parcours, mes compétences et ma passion pour l'informatique
            </p>
          </FadeIn>

          {/* Contact Info Cards */}
          <StaggerContainer staggerDelay={0.15} className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto mt-8">
            <StaggerItem>
              <ScaleIn scale={0.7} duration={0.6}>
                <div className="flex items-center justify-center space-x-2 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-md hover:shadow-xl transition-all hover:scale-105 cursor-pointer border border-blue-100">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">Marseille, France</span>
                </div>
              </ScaleIn>
            </StaggerItem>
            <StaggerItem>
              <ScaleIn scale={0.7} duration={0.6}>
                <div className="flex items-center justify-center space-x-2 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-md hover:shadow-xl transition-all hover:scale-105 cursor-pointer border border-green-100">
                  <Calendar className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-700">20 ans</span>
                </div>
              </ScaleIn>
            </StaggerItem>
            <StaggerItem>
              <ScaleIn scale={0.7} duration={0.6}>
                <div className="flex items-center justify-center space-x-2 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-md hover:shadow-xl transition-all hover:scale-105 cursor-pointer border border-purple-100">
                  <GraduationCap className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-medium text-gray-700">BTS SIO SISR</span>
                </div>
              </ScaleIn>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Personal Presentation */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <ScaleIn delay={0.2} scale={0.95} duration={0.7}>
            <Card className="bg-gradient-to-br from-white to-blue-50/30 backdrop-blur-sm border-2 border-blue-100 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]">
              <CardHeader className="text-center pb-6">
                <FadeIn delay={0.3} direction="down" distance={20}>
                  <CardTitle className="text-3xl md:text-4xl font-bold flex items-center justify-center gap-3">
                    <Heart className="w-9 h-9 text-red-500 animate-pulse" />
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Ma présentation
                    </span>
                  </CardTitle>
                </FadeIn>
              </CardHeader>
              <CardContent className="space-y-6 px-6 md:px-8">
                <FadeIn delay={0.4} direction="up" distance={20}>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Passionné par <strong className="text-blue-600">l'univers de l'informatique et les technologies émergentes</strong>, j'ai trouvé ma voie 
                    après une année en licence pluridisciplinaire qui m'a permis de confirmer mon attrait pour le domaine technique. 
                    Cette réorientation vers le BTS SIO SISR a été une décision réfléchie pour me spécialiser dans ce qui me motive vraiment : 
                    <strong className="text-purple-600"> l'infrastructure, les systèmes et les réseaux informatiques</strong>.
                  </p>
                </FadeIn>
                <FadeIn delay={0.5} direction="up" distance={20}>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Curieux de nature et doté d'un esprit analytique, j'aime <strong className="text-green-600">résoudre des problèmes complexes</strong> et 
                    comprendre le fonctionnement des systèmes. Mon approche collaborative et ma capacité d'adaptation me permettent 
                    de m'intégrer facilement dans une équipe et de contribuer efficacement aux projets qui me sont confiés.
                  </p>
                </FadeIn>
                <FadeIn delay={0.6} direction="up" distance={20}>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Actuellement en <strong className="text-indigo-600">deuxième année de BTS SIO option SISR</strong> à l'IFC Marseille, 
                    je développe mes compétences en administration système, sécurité réseau et virtualisation. 
                    Je suis à la recherche d'une <strong className="text-orange-600">alternance</strong> pour mettre en application mes connaissances 
                    et enrichir mon expérience professionnelle dans un environnement technique stimulant.
                  </p>
                </FadeIn>
              </CardContent>
            </Card>
          </ScaleIn>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="max-w-6xl mx-auto">
          <FadeIn delay={0.2} direction="up" distance={40}>
            <div className="text-center mb-12">
              <ScaleIn scale={0.8} duration={0.6}>
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  Mon Parcours Scolaire
                </h2>
              </ScaleIn>
              <FadeIn delay={0.3} direction="up">
                <p className="text-lg md:text-xl text-gray-600">
                  Formation et diplômes obtenus
                </p>
              </FadeIn>
            </div>
          </FadeIn>

          <StaggerContainer staggerDelay={0.2} className="space-y-6">
            {education.map((edu, index) => (
              <StaggerItem key={index}>
                <ScaleIn scale={0.92} duration={0.7}>
                  <Card className="bg-white/90 backdrop-blur-md border-2 border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.03] hover:border-blue-200 group">
                    <CardContent className="p-6 md:p-8">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start md:items-center gap-3 mb-3 flex-wrap">
                            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg group-hover:scale-110 transition-transform">
                              <GraduationCap className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 flex-1">
                              {edu.degree}
                            </h3>
                            <span className={`px-3 py-1.5 text-xs font-semibold rounded-full shadow-sm ${
                              edu.status === 'En cours' 
                                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' 
                                : edu.status === 'Obtenu'
                                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white'
                                : edu.status === 'Reorientation'
                                ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {edu.status}
                            </span>
                          </div>
                          <p className="text-gray-700 font-medium mb-2 text-base md:text-lg">{edu.institution}</p>
                          <p className="text-sm md:text-base text-gray-600 leading-relaxed">{edu.description}</p>
                        </div>
                        <div className="mt-4 md:mt-0 md:ml-6">
                          <div className="flex items-center text-sm md:text-base text-gray-500 bg-gray-50 px-4 py-2 rounded-lg">
                            <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                            <span className="font-medium">{edu.period}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </ScaleIn>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Bottom Spacing */}
      <div className="h-20 md:h-8"></div>
    </div>
  )
}
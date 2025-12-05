'use client'

import { ArrowLeft, Network, FileCheck2, BookOpen, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { FadeIn, ScaleIn, SlideIn, StaggerContainer, StaggerItem, AnimatedCard, FloatingElement } from '../../../components/animations'

export default function ProjetsE6Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-blue-900/40 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-cyan-900/40 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-slate-700/40 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-900/20" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          {/* Navigation breadcrumb */}
          <FadeIn delay={0.1} direction="left">
            <div className="mb-8">
              <Link 
                href="/projets" 
                className="inline-flex items-center text-cyan-300 hover:text-cyan-200 transition-colors duration-200 bg-slate-800/60 backdrop-blur-md px-4 py-2 rounded-full border border-slate-600/50"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour aux Projets
              </Link>
            </div>
          </FadeIn>

          <div className="text-center">
            {/* Badge E6 */}
            <FloatingElement delay={0.2} duration={3}>
              <ScaleIn delay={0.3} scale={0.5}>
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800/60 backdrop-blur-md border border-cyan-500/30 rounded-full mb-8 shadow-lg shadow-cyan-500/10">
                  <BookOpen className="w-5 h-5 text-cyan-400" />
                  <span className="text-sm text-cyan-300 font-semibold">Épreuve E6 - BTS SIO SISR</span>
                </div>
              </ScaleIn>
            </FloatingElement>

            {/* Titre principal */}
            <FadeIn delay={0.4} direction="up">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 drop-shadow-2xl">
                <span className="block mb-2 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Projets Scolaires
                </span>
                <span className="block text-white">
                  Épreuve E6
                </span>
              </h1>
            </FadeIn>

            {/* Description */}
            <SlideIn delay={0.6} direction="up" duration={0.7}>
              <div className="max-w-4xl mx-auto mb-16">
                <div className="bg-slate-800/40 backdrop-blur-lg border border-slate-600/40 rounded-3xl p-8 shadow-2xl">
                  <p className="text-slate-300 leading-relaxed text-lg">
                    Vous trouverez dans cette section les réalisations détaillées effectuées au centre de formation IFC Marseille 
                    sur mon plot attitré et avec les ressources matérielles et logicielles mises à ma disposition par l'établissement 
                    et prescrites par mon tuteur M. Bernard FERNANDEZ.
                  </p>
                </div>
              </div>
            </SlideIn>
          </div>
        </div>
      </div>

      {/* Cards Section - Sous-pages */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <StaggerContainer staggerDelay={0.15} className="grid lg:grid-cols-2 gap-8">
          
          {/* Card 1: Infrastructure S4P2 */}
          <StaggerItem>
            <AnimatedCard delay={0.1} className="h-full">
              <Link 
                href="/projets/scolaires/infrastructure-s4p2"
                className="group relative bg-slate-800/40 backdrop-blur-lg border border-slate-600/40 rounded-3xl p-8 shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 hover:scale-105 hover:border-cyan-500/50 block h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative">
                  {/* Icon */}
                  <FloatingElement delay={0.2} duration={2.5}>
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Network className="w-8 h-8 text-white" />
                    </div>
                  </FloatingElement>

                  {/* Titre */}
                  <h2 className="text-3xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors duration-300">
                    Infrastructure S4P2
                  </h2>

                  {/* Description */}
                  <p className="text-slate-300 leading-relaxed text-lg mb-6">
                    Découvrez le schéma d'infrastructure réseau complet de mon plot S4P2 ainsi que la description détaillée 
                    de mon environnement technologique et des ressources déployées.
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 text-sm rounded-full border border-cyan-500/30">
                      Schéma réseau
                    </span>
                    <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 text-sm rounded-full border border-cyan-500/30">
                      Infrastructure
                    </span>
                    <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 text-sm rounded-full border border-cyan-500/30">
                      Plot S4P2
                    </span>
                  </div>

                  {/* Arrow */}
                  <div className="flex items-center text-cyan-300 group-hover:text-cyan-200 font-semibold">
                    <span>Voir l'infrastructure</span>
                    <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            </AnimatedCard>
          </StaggerItem>

          {/* Card 2: Réalisation 1 et 2 */}
          <StaggerItem>
            <AnimatedCard delay={0.2} className="h-full">
              <Link 
                href="/projets/scolaires/realisations"
                className="group relative bg-slate-800/40 backdrop-blur-lg border border-slate-600/40 rounded-3xl p-8 shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 hover:scale-105 hover:border-cyan-500/50 block h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative">
                  {/* Icon */}
                  <FloatingElement delay={0.3} duration={2.8}>
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                      <FileCheck2 className="w-8 h-8 text-white" />
                    </div>
                  </FloatingElement>

                  {/* Titre */}
                  <h2 className="text-3xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors duration-300">
                    Réalisation 1 et 2
                  </h2>

                  {/* Description */}
                  <p className="text-slate-300 leading-relaxed text-lg mb-6">
                    Consultez mon dossier E6 officiel soumis sur Cyclade avec les deux réalisations complètes 
                    de solutions d'infrastructure réseau, incluant configurations et procédures de tests.
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-full border border-blue-500/30">
                      Dossier E6
                    </span>
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-full border border-blue-500/30">
                      Réalisations
                    </span>
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-full border border-blue-500/30">
                      Documentation
                    </span>
                  </div>

                  {/* Arrow */}
                  <div className="flex items-center text-cyan-300 group-hover:text-cyan-200 font-semibold">
                    <span>Voir les réalisations</span>
                    <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            </AnimatedCard>
          </StaggerItem>

        </StaggerContainer>
      </div>
    </div>
  )
}

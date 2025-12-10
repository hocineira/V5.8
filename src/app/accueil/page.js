'use client'

import { useState, useEffect, memo } from 'react'
import { ArrowRight, Linkedin, Mail, MapPin, GraduationCap, Server, Network, Monitor, Database, Shield, Globe, Settings, Code, Terminal, Wifi } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { FadeIn, ScaleIn, StaggerContainer, StaggerItem, AnimatedCard, FloatingElement, RotateIn } from '../../components/animations'

// Données statiques modernes pour un design technologique unifié
const StaticData = {
  personalInfo: {
    name: 'Hocine IRATNI',
    title: 'Étudiant en BTS SIO SISR',
    subtitle: 'Spécialiste Systèmes et Réseaux Informatiques',
    description: 'Passionné par l\'infrastructure IT et les nouvelles technologies, je développe des compétences en administration système, sécurité réseau et virtualisation.',
    email: 'hocineira@gmail.com',
    phone: '06 XX XX XX XX',
    location: 'Marseille, France',
    social: {
      github: 'https://github.com/hocineira',
      linkedin: 'https://linkedin.com/in/hocine-iratni',
      email: 'mailto:hocineira@gmail.com'
    }
  },
  features: [
    {
      icon: GraduationCap,
      title: 'Formation BTS SIO',
      description: 'Découvrez le parcours BTS Services Informatiques aux Organisations',
      href: '/bts-sio'
    },
    {
      icon: Server,
      title: 'Projets Techniques',
      description: 'Explorez mes réalisations en infrastructure et réseaux',
      href: '/projets'
    },
    {
      icon: Monitor,
      title: 'Veilles Technologiques',
      description: 'Suivez mes analyses des dernières innovations IT',
      href: '/veilles'
    }
  ],
  // Stack technologique unifié avec design moderne
  techStack: [
    { 
      icon: Network, 
      name: 'Cisco CCNA', 
      category: 'Réseaux',
      description: 'Configuration et maintenance',
      status: 'expert'
    },
    { 
      icon: Shield, 
      name: 'pfSense', 
      category: 'Sécurité',
      description: 'Firewall et VPN',
      status: 'avancé'
    },
    { 
      icon: Database, 
      name: 'Active Directory', 
      category: 'Systèmes',
      description: 'Gestion d\'identités',
      status: 'avancé'
    },
    { 
      icon: Settings, 
      name: 'Proxmox', 
      category: 'Virtualisation',
      description: 'Hyperviseur open-source',
      status: 'intermédiaire'
    },
    { 
      icon: Terminal, 
      name: 'Linux/Windows', 
      category: 'OS',
      description: 'Administration système',
      status: 'expert'
    },
    { 
      icon: Wifi, 
      name: 'VLANs', 
      category: 'Réseaux',
      description: 'Segmentation réseau',
      status: 'avancé'
    }
  ],
  infrastructure: [
    { name: 'pfSense Firewall', status: 'active', type: 'security' },
    { name: 'Switch Cisco Managé', status: 'active', type: 'network' },
    { name: 'Serveur AD', status: 'active', type: 'system' },
    { name: 'Virtualisation Proxmox/Hyper-V', status: 'active', type: 'virtualization' }
  ]
}

// Component moderne pour les compétences tech
const TechSkill = memo(function TechSkill({ skill, index }) {
  const Icon = skill.icon
  const getStatusColor = (status) => {
    switch (status) {
      case 'expert': return 'bg-gradient-to-r from-blue-400 to-purple-400'
      case 'avancé': return 'bg-gradient-to-r from-purple-400 to-violet-400' 
      case 'intermédiaire': return 'bg-gradient-to-r from-violet-400 to-blue-400'
      default: return 'bg-gradient-to-r from-slate-400 to-slate-500'
    }
  }
  
  return (
    <div className="group relative bg-slate-800/60 border border-purple-500/30 rounded-xl p-6 hover:border-blue-400/60 hover:bg-slate-800/80 transition-all duration-300 hover:translate-y-[-4px] hover:shadow-xl hover:shadow-blue-500/20">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg group-hover:from-blue-400/30 group-hover:to-purple-400/30 transition-all duration-300 border border-blue-400/20">
          <Icon className="w-6 h-6 text-blue-300 group-hover:text-blue-200" />
        </div>
        <div className={`w-3 h-3 rounded-full ${getStatusColor(skill.status)} opacity-80`}></div>
      </div>
      <h3 className="text-white font-semibold text-lg mb-1 group-hover:text-blue-100">{skill.name}</h3>
      <p className="text-purple-300 text-sm font-medium mb-2 group-hover:text-purple-200">{skill.category}</p>
      <p className="text-slate-300 text-sm leading-relaxed group-hover:text-slate-200">{skill.description}</p>
    </div>
  )
})

// Component moderne pour les features
const ModernFeatureCard = memo(function ModernFeatureCard({ feature, index, onAction }) {
  const Icon = feature.icon
  return (
    <Card 
      className="group relative bg-slate-800/30 border border-slate-700/30 hover:border-cyan-400/50 hover:bg-slate-800/50 cursor-pointer transition-all duration-300 hover:translate-y-[-8px] overflow-hidden"
      onClick={() => onAction(feature.href)}
    >
      {/* Effet de lueur moderne - simplifié */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <CardHeader className="text-center pb-4 relative z-10">
        <div className="w-16 h-16 mx-auto mb-4 bg-slate-700/50 rounded-2xl flex items-center justify-center group-hover:bg-cyan-400/10 transition-all duration-300 group-hover:scale-110">
          <Icon className="w-8 h-8 text-cyan-400" />
        </div>
        <CardTitle className="text-xl text-white group-hover:text-cyan-300 transition-colors duration-300">
          {feature.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 relative z-10">
        <CardDescription className="text-slate-300 text-center leading-relaxed mb-4">
          {feature.description}
        </CardDescription>
        <div className="flex justify-center">
          <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full group-hover:w-20 transition-all duration-300"></div>
        </div>
      </CardContent>
    </Card>
  )
})

export default function AccueilPage() {
  const [isVisible, setIsVisible] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleProjectsClick = () => router.push('/projets')
  const handleContactClick = () => window.open('mailto:hocineira@gmail.com', '_blank')
  const handleSocialClick = (url) => () => window.open(url, '_blank')
  const handleFeatureAction = (href) => router.push(href)

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-hidden">
      {/* Hero Section avec couleurs bleu/violet technologiques */}
      <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/30 to-purple-900/40">
        {/* Grille technologique en arrière-plan avec effet bleu/violet */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(90deg, rgb(59 130 246 / 0.3) 1px, transparent 1px),
              linear-gradient(180deg, rgb(139 92 246 / 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        {/* Éléments décoratifs tech bleu/violet - SIMPLIFIÉ pour Firefox */}
        <div className="absolute inset-0">
          {/* Effets lumineux subtils sans animation */}
          <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-blue-500/3 rounded-full blur-2xl"></div>
          <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-purple-500/3 rounded-full blur-2xl"></div>
          <div className="absolute top-2/3 left-1/2 w-48 h-48 bg-violet-500/2 rounded-full blur-xl"></div>
        </div>

        <div className="relative container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-10rem)]">
            {/* Contenu principal */}
            <div className="space-y-8">
              {/* Badge status avec couleurs technologiques bleu/violet - SIMPLIFIÉ */}
              <ScaleIn delay={0.2} scale={0.7}>
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-slate-800/60 border border-blue-400/40 rounded-full shadow-lg shadow-blue-500/20">
                  <div className="relative flex items-center justify-center w-2 h-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                  </div>
                  <span className="text-sm text-blue-300 font-medium">Infrastructure Active</span>
                </div>
              </ScaleIn>

              {/* Titre principal avec dégradé bleu/violet */}
              <div className="space-y-4">
                <FadeIn delay={0.3} direction="up">
                  <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                    <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-violet-400 bg-clip-text text-transparent">
                      {StaticData.personalInfo.name}
                    </span>
                  </h1>
                </FadeIn>
                <FadeIn delay={0.5} direction="up">
                  <h2 className="text-2xl lg:text-3xl font-semibold text-transparent bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text">
                    {StaticData.personalInfo.title}
                  </h2>
                </FadeIn>
                <FadeIn delay={0.7} direction="up">
                  <p className="text-xl text-blue-200 font-light">
                    {StaticData.personalInfo.subtitle}
                  </p>
                </FadeIn>
              </div>

              {/* Description */}
              <FadeIn delay={0.9} direction="up">
                <p className="text-lg text-slate-400 leading-relaxed max-w-2xl">
                  {StaticData.personalInfo.description}
                </p>
              </FadeIn>

              {/* Boutons d'action avec style technologique bleu/violet */}
              <FadeIn delay={1.1} direction="up">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-blue-600 via-purple-600 to-violet-600 hover:from-blue-700 hover:via-purple-700 hover:to-violet-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/30 border border-blue-400/20"
                    onClick={handleProjectsClick}
                  >
                    <Server className="mr-2 w-5 h-5" />
                    <span>Explorer mes projets</span>
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-2 border-purple-400/60 text-purple-300 hover:bg-purple-500/20 hover:border-purple-400 hover:text-purple-200 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20"
                    onClick={handleContactClick}
                  >
                    <Mail className="mr-2 w-5 h-5" />
                    <span>Me contacter</span>
                  </Button>
                </div>
              </FadeIn>

              {/* Contact info avec touches bleu/violet */}
              <FadeIn delay={1.3} direction="up">
                <div className="flex flex-col sm:flex-row gap-6 pt-4">
                  <div className="flex items-center gap-3 text-slate-300 hover:text-blue-300 transition-colors cursor-pointer group" onClick={handleContactClick}>
                    <Mail className="w-5 h-5 group-hover:text-blue-400" />
                    <span>{StaticData.personalInfo.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-300 hover:text-purple-300 transition-colors group">
                    <MapPin className="w-5 h-5 group-hover:text-purple-400" />
                    <span>{StaticData.personalInfo.location}</span>
                  </div>
                </div>
              </FadeIn>

              {/* Réseaux sociaux avec style bleu/violet */}
              <FadeIn delay={1.5} direction="up">
                <div className="flex gap-4 pt-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="border-slate-600 text-slate-300 hover:bg-blue-500/20 hover:border-blue-400 hover:text-blue-300 w-12 h-12 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
                    onClick={handleSocialClick(StaticData.personalInfo.social.linkedin)}
                  >
                    <Linkedin className="w-5 h-5" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="border-slate-600 text-slate-300 hover:bg-purple-500/20 hover:border-purple-400 hover:text-purple-300 w-12 h-12 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
                    onClick={handleSocialClick(StaticData.personalInfo.social.email)}
                  >
                    <Mail className="w-5 h-5" />
                  </Button>
                </div>
              </FadeIn>
            </div>

            {/* Section image avec infrastructure moderne */}
            <ScaleIn delay={0.5} duration={0.8}>
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <div className="aspect-[4/3] relative">
                    <Image 
                      src="/images/procedures/optimized_hero_image_new.webp" 
                      alt="Infrastructure réseau moderne" 
                      fill
                      className="object-cover"
                      priority
                      quality={85}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
                  </div>
              
                  {/* Overlay avec infrastructure status - SIMPLIFIÉ */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-slate-800/90 rounded-xl p-4 border border-cyan-400/30">
                      <div className="flex items-center gap-2 text-cyan-300 mb-3">
                        <Network className="w-4 h-4" />
                        <span className="text-sm font-medium">Infrastructure SISR</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {StaticData.infrastructure.map((item, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                            <span className="text-xs text-slate-300">{item.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScaleIn>
          </div>
        </div>
      </section>

      {/* Section Compétences Techniques Moderne */}
      <section className="py-20 bg-gradient-to-br from-slate-800/50 to-slate-900/80 relative">
        {/* Fond technique subtil */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, rgb(6 182 212 / 0.3) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        <div className="relative container mx-auto px-4">
          <FadeIn delay={0.2} direction="up">
            <div className="text-center mb-16">
              <RotateIn delay={0.3}>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-cyan-400/30 rounded-full mb-6">
                  <Code className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm text-cyan-300 font-medium">Stack Technologique</span>
                </div>
              </RotateIn>
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  Compétences
                </span>
                <span className="text-cyan-300"> SISR</span>
              </h2>
              <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                Technologies et outils maîtrisés dans le domaine des systèmes et réseaux informatiques
              </p>
            </div>
          </FadeIn>

          <StaggerContainer staggerDelay={0.1} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {StaticData.techStack.map((skill, index) => (
              <StaggerItem key={index}>
                <TechSkill skill={skill} index={index} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Section Navigation des Services */}
      <section className="py-20 bg-gradient-to-br from-slate-900/80 to-slate-800/50 relative">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-400/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative container mx-auto px-4">
          <FadeIn delay={0.2} direction="up">
            <div className="text-center mb-16">
              <ScaleIn delay={0.3} scale={0.7}>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-cyan-400/30 rounded-full mb-6">
                  <Globe className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm text-cyan-300 font-medium">Portfolio</span>
                </div>
              </ScaleIn>
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  Explorez mon
                </span>
                <span className="text-cyan-300"> parcours</span>
              </h2>
              <ScaleIn delay={0.5} duration={0.8}>
                <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 mx-auto rounded-full mb-8"></div>
              </ScaleIn>
            </div>
          </FadeIn>

          <StaggerContainer staggerDelay={0.15} className="grid md:grid-cols-3 gap-8">
            {StaticData.features.map((feature, index) => (
              <StaggerItem key={index}>
                <ModernFeatureCard 
                  feature={feature} 
                  index={index} 
                  onAction={handleFeatureAction}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Section CTA Finale Moderne */}
      <section className="py-20 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 relative">
        {/* Pattern technique */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(45deg, transparent 24%, rgb(6 182 212 / 0.1) 25%, rgb(6 182 212 / 0.1) 26%, transparent 27%, transparent 74%, rgb(6 182 212 / 0.1) 75%, rgb(6 182 212 / 0.1) 76%, transparent 77%),
              linear-gradient(-45deg, transparent 24%, rgb(59 130 246 / 0.1) 25%, rgb(59 130 246 / 0.1) 26%, transparent 27%, transparent 74%, rgb(59 130 246 / 0.1) 75%, rgb(59 130 246 / 0.1) 76%, transparent 77%)
            `,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="relative container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-slate-900/50 border border-cyan-400/30 rounded-full mb-8">
            <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
            <span className="text-sm text-cyan-300 font-medium">Prêt à collaborer</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Créons ensemble votre
            </span>
            <span className="text-cyan-300"> infrastructure</span>
          </h2>
          
          <p className="text-xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Découvrez mes réalisations en systèmes et réseaux, mes compétences techniques 
            et mon approche moderne de l'administration IT.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25"
              onClick={handleProjectsClick}
            >
              <Server className="mr-2 w-5 h-5" />
              <span>Voir mes projets</span>
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-cyan-400/50 text-cyan-300 hover:bg-cyan-400/10 hover:border-cyan-400 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
              onClick={handleContactClick}
            >
              <Mail className="mr-2 w-5 h-5" />
              <span>Établir une connexion</span>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
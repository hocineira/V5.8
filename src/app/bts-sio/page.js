'use client'

import { useState, useEffect } from 'react'
import { GraduationCap, BookOpen, Target, Users, Award, CheckCircle, ArrowRight, Building, Briefcase, TrendingUp, Calendar, Star, Code, Server, Database, Network, Shield, Monitor, Terminal, Cpu, Globe, Cloud, Zap, Play, ExternalLink, ChevronRight, Clock, MapPin, Lightbulb, Brain, Trophy, Rocket, Settings, FileCode } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { FadeIn, ScaleIn, SlideIn, StaggerContainer, StaggerItem, AnimatedCard, HoverScale } from '../../components/animations'

export default function BTSSIOPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [typedText, setTypedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedSpecialization, setSelectedSpecialization] = useState(null)

  const fullText = "BTS SIO_2025 > Formez-vous aux métiers du numérique_"

  // Animation de frappe pour le hero
  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)
      }, 100)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex])

  const tabs = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: Globe },
    { id: 'specializations', label: 'Spécialisations', icon: Target },
    { id: 'program', label: 'Programme', icon: BookOpen },
    { id: 'career', label: 'Débouchés', icon: Rocket }
  ]

  const specializations = [
    {
      id: 'sisr',
      name: 'SISR',
      fullName: 'Solutions d\'Infrastructure, Systèmes et Réseaux',
      color: 'from-cyan-500 to-blue-600',
      icon: Server,
      description: 'Administration systèmes, gestion des réseaux et infrastructure IT',
      focus: 'Infrastructure & Sécurité',
      skills: ['Administration Systèmes', 'Réseaux & Télécoms', 'Virtualisation', 'Cybersécurité', 'Cloud Computing', 'Supervision'],
      careers: ['Administrateur systèmes/réseaux', 'Technicien infrastructure', 'Consultant IT', 'Responsable sécurité'],
      tools: ['VMware', 'Cisco', 'Windows Server', 'Linux', 'pfSense', 'Zabbix']
    },
    {
      id: 'slam',
      name: 'SLAM',
      fullName: 'Solutions Logicielles et Applications Métiers',
      color: 'from-purple-500 to-pink-600',
      icon: Code,
      description: 'Développement d\'applications et solutions logicielles métier',
      focus: 'Développement & Innovation',
      skills: ['Programmation Objet', 'Développement Web/Mobile', 'Bases de Données', 'DevOps', 'Architecture Logicielle', 'Tests & Qualité'],
      careers: ['Développeur full-stack', 'Développeur mobile', 'Analyste-programmeur', 'Chef de projet technique'],
      tools: ['JavaScript', 'Python', 'Java', 'React', 'Node.js', 'MySQL', 'Git']
    }
  ]

  const timelineData = [
    { year: 'Année 1', title: 'Fondamentaux', items: ['Base de l\'informatique', 'Première spécialisation', 'Stage 5 semaines'] },
    { year: 'Année 2', title: 'Expertise', items: ['Approfondissement technique', 'Projet professionnel', 'Stage 5 semaines'] }
  ]

  const renderOverview = () => (
    <div className="space-y-12">
      {/* Stats Cards - Mobile Optimized with Animations */}
      <StaggerContainer staggerDelay={0.1} className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
        {[
          { label: 'Durée', value: '2 ans', icon: Clock, color: 'bg-gradient-to-r from-cyan-500 to-blue-600' },
          { label: 'Niveau', value: 'Bac+2', icon: GraduationCap, color: 'bg-gradient-to-r from-purple-500 to-pink-600' },
          { label: 'Spécialisations', value: '2', icon: Target, color: 'bg-gradient-to-r from-green-500 to-teal-600' },
          { label: 'Débouchés', value: '15+', icon: Rocket, color: 'bg-gradient-to-r from-orange-500 to-red-600' }
        ].map((stat, index) => (
          <StaggerItem key={index}>
            <AnimatedCard delay={index * 0.1}>
              <Card className="relative overflow-hidden group hover:scale-105 transition-all duration-300 border-0 shadow-lg">
                <div className={`absolute inset-0 ${stat.color} opacity-10`}></div>
                <CardContent className="p-3 sm:p-6 relative">
                  <div className="flex flex-col sm:flex-row items-center sm:justify-between text-center sm:text-left">
                    <div className="mb-2 sm:mb-0">
                      <div className="text-xl sm:text-2xl font-bold text-gray-900">{stat.value}</div>
                      <div className="text-gray-600 text-xs sm:text-sm">{stat.label}</div>
                    </div>
                    <div className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full ${stat.color} flex items-center justify-center`}>
                      <stat.icon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedCard>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Description moderne with Animations */}
      <FadeIn delay={0.5} direction="up">
        <Card className="border-0 shadow-xl bg-gradient-to-r from-slate-50 to-blue-50">
          <CardContent className="p-8">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <FadeIn delay={0.6} direction="left">
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">Une formation d'excellence</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Le BTS SIO forme des professionnels polyvalents capables de répondre aux enjeux numériques 
                    des organisations modernes. Entre infrastructure et développement, trouvez votre voie.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Innovation', 'Polyvalence', 'Excellence', 'Avenir'].map((tag, index) => (
                      <ScaleIn key={tag} delay={0.8 + index * 0.1} scale={0.8}>
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors">
                          {tag}
                        </Badge>
                      </ScaleIn>
                    ))}
                  </div>
                </div>
              </FadeIn>
              <StaggerContainer staggerDelay={0.15} className="grid grid-cols-2 gap-3 sm:gap-4">
                {[
                  { icon: Brain, label: 'Apprentissage', desc: 'Pédagogie active' },
                  { icon: Lightbulb, label: 'Innovation', desc: 'Technologies récentes' },
                  { icon: Users, label: 'Accompagnement', desc: 'Suivi personnalisé' },
                  { icon: Trophy, label: 'Réussite', desc: 'Taux d\'insertion élevé' }
                ].map((item, index) => (
                  <StaggerItem key={index}>
                    <HoverScale className="text-center p-3 sm:p-4 rounded-lg bg-white/50 hover:bg-white transition-colors">
                      <item.icon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 mx-auto mb-2" />
                      <div className="font-semibold text-gray-900 text-sm sm:text-base">{item.label}</div>
                      <div className="text-xs sm:text-sm text-gray-600">{item.desc}</div>
                    </HoverScale>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </CardContent>
        </Card>
      </FadeIn>
    </div>
  )

  const renderSpecializations = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold mb-4">Choisissez votre spécialisation</h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Deux parcours distincts pour répondre à vos aspirations professionnelles
        </p>
      </div>
      
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
        {specializations.map((spec) => (
          <Card 
            key={spec.id} 
            className={`group cursor-pointer border-0 shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-500 ${
              selectedSpecialization === spec.id ? 'ring-4 ring-blue-300' : ''
            }`}
            onClick={() => setSelectedSpecialization(selectedSpecialization === spec.id ? null : spec.id)}
          >
            <div className={`h-2 bg-gradient-to-r ${spec.color}`}></div>
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-r ${spec.color} flex items-center justify-center flex-shrink-0`}>
                  <spec.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg sm:text-2xl text-gray-900">{spec.name}</CardTitle>
                  <CardDescription className="text-gray-600 mt-1 text-sm sm:text-base">{spec.focus}</CardDescription>
                </div>
                <ChevronRight className={`w-5 h-5 sm:w-6 sm:h-6 text-gray-400 transition-transform duration-300 flex-shrink-0 ${
                  selectedSpecialization === spec.id ? 'rotate-90' : ''
                }`} />
              </div>
            </CardHeader>
            
            <CardContent>
              <p className="text-gray-700 mb-4 text-sm sm:text-base">{spec.description}</p>
              
              {selectedSpecialization === spec.id && (
                <div className="space-y-6 animate-slide-in-up">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center text-sm sm:text-base">
                      <Settings className="w-4 h-4 mr-2" />
                      Compétences développées
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {spec.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="justify-start text-xs w-full">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Briefcase className="w-4 h-4 mr-2" />
                      Débouchés principaux
                    </h4>
                    <ul className="space-y-1">
                      {spec.careers.map((career, index) => (
                        <li key={index} className="text-sm text-gray-700 flex items-center">
                          <ArrowRight className="w-3 h-3 mr-2 text-gray-400" />
                          {career}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <FileCode className="w-4 h-4 mr-2" />
                      Outils & Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {spec.tools.map((tool, index) => (
                        <Badge key={index} className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderProgram = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold mb-4">Programme de formation</h3>
        <p className="text-gray-600">Un cursus progressif sur 2 années</p>
      </div>
      
      {/* Timeline - Mobile Optimized */}
      <div className="relative">
        {/* Desktop: Center line, Mobile: Left line */}
        <div className="absolute left-8 sm:left-1/2 sm:transform sm:-translate-x-px h-full w-0.5 bg-gradient-to-b from-cyan-500 to-purple-600"></div>
        
        {timelineData.map((year, index) => (
          <div key={index} className="relative mb-8">
            {/* Mobile: Full width, Desktop: Alternating sides */}
            <div className={`sm:flex sm:items-center ${index % 2 === 0 ? 'sm:justify-start' : 'sm:justify-end'}`}>
              <div className={`w-full sm:w-1/2 pl-16 sm:pl-0 ${index % 2 === 0 ? 'sm:pr-8' : 'sm:pl-8'}`}>
                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="pb-3 sm:pb-4">
                    <CardTitle className="flex items-center gap-3 text-lg sm:text-xl">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base">
                        {index + 1}
                      </div>
                      <span className="text-base sm:text-xl">{year.year}</span>
                    </CardTitle>
                    <CardDescription className="text-base sm:text-lg font-semibold text-gray-900 ml-11 sm:ml-0">
                      {year.title}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {year.items.map((item, idx) => (
                        <li key={idx} className="flex items-start text-gray-700 text-sm sm:text-base">
                          <CheckCircle className="w-4 h-4 mr-3 mt-0.5 text-green-500 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Timeline dot - Mobile: Left aligned, Desktop: Center */}
            <div className="absolute left-6 top-6 sm:left-1/2 sm:top-8 sm:transform sm:-translate-x-1/2 w-4 h-4 bg-white border-4 border-cyan-500 rounded-full z-10"></div>
          </div>
        ))}
      </div>
      
      {/* Matières communes */}
      <Card className="border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <BookOpen className="w-6 h-6 text-blue-600" />
            Enseignements transversaux
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              'Support et mise à disposition de services informatiques',
              'Mathématiques pour l\'informatique',
              'Algorithmique appliquée',
              'Analyse économique et managériale',
              'Expression et communication',
              'Anglais professionnel'
            ].map((subject, index) => (
              <div key={index} className="p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border-l-4 border-blue-500">
                <span className="text-gray-800 font-medium text-sm sm:text-base break-words">{subject}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderCareer = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold mb-4">Votre avenir professionnel</h3>
        <p className="text-gray-600">De nombreuses opportunités dans le secteur du numérique</p>
      </div>
      
      {/* Secteurs d'activité - Mobile Optimized */}
      <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8 sm:mb-12">
        {[
          { icon: Building, title: 'Entreprises', desc: 'Services informatiques intégrés', color: 'from-blue-500 to-cyan-600' },
          { icon: Cloud, title: 'SSII/ESN', desc: 'Sociétés de services numériques', color: 'from-purple-500 to-pink-600' },
          { icon: Zap, title: 'Start-ups', desc: 'Innovation et nouvelles technologies', color: 'from-orange-500 to-red-600' }
        ].map((sector, index) => (
          <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <CardContent className="p-4 sm:p-6 text-center">
              <div className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-xl bg-gradient-to-r ${sector.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <sector.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2 text-base sm:text-lg">{sector.title}</h4>
              <p className="text-gray-600 text-sm">{sector.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Salaires et évolution - Mobile Optimized */}
      <Card className="border-0 shadow-xl bg-gradient-to-r from-green-50 to-emerald-50">
        <CardContent className="p-4 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
            <div>
              <h4 className="text-lg sm:text-xl font-bold mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                Évolution salariale
              </h4>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 bg-white rounded-lg gap-2 sm:gap-0">
                  <span className="text-sm sm:text-base font-medium">Débutant (0-2 ans)</span>
                  <Badge className="bg-green-100 text-green-800 self-start sm:self-center">25-30k€</Badge>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 bg-white rounded-lg gap-2 sm:gap-0">
                  <span className="text-sm sm:text-base font-medium">Confirmé (3-5 ans)</span>
                  <Badge className="bg-blue-100 text-blue-800 self-start sm:self-center">32-40k€</Badge>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 bg-white rounded-lg gap-2 sm:gap-0">
                  <span className="text-sm sm:text-base font-medium">Senior (5+ ans)</span>
                  <Badge className="bg-purple-100 text-purple-800 self-start sm:self-center">40-55k€</Badge>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg sm:text-xl font-bold mb-4 flex items-center">
                <Rocket className="w-5 h-5 mr-2 text-blue-600" />
                Poursuites d'études
              </h4>
              <ul className="space-y-3">
                {[
                  'Licence professionnelle Informatique',
                  'École d\'ingénieurs (admissions parallèles)',
                  'Bachelor spécialisé',
                  'Master en alternance'
                ].map((option, index) => (
                  <li key={index} className="flex items-start sm:items-center p-3 bg-white rounded-lg">
                    <ArrowRight className="w-4 h-4 mr-3 text-blue-500 flex-shrink-0 mt-0.5 sm:mt-0" />
                    <span className="text-sm sm:text-base">{option}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderTabContent = () => {
    switch(activeTab) {
      case 'overview': return renderOverview()
      case 'specializations': return renderSpecializations()
      case 'program': return renderProgram()
      case 'career': return renderCareer()
      default: return renderOverview()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      {/* Hero Section - Mobile Optimized Terminal Style */}
      <section className="relative overflow-hidden py-12 sm:py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900 opacity-95"></div>
        
        {/* Animated background elements - Reduced on mobile for performance */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-72 sm:h-72 bg-cyan-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-48 h-48 sm:w-64 sm:h-64 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <div className="relative container mx-auto px-3 sm:px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Terminal Window - Mobile Optimized */}
            <div className="bg-slate-800 rounded-t-xl p-3 sm:p-4 mb-0">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                <span className="text-slate-400 text-xs sm:text-sm ml-2 sm:ml-4">formation_info.sh</span>
              </div>
            </div>
            
            <div className="bg-black rounded-b-xl p-4 sm:p-8 font-mono text-left">
              <div className="text-green-400 text-sm sm:text-lg">
                $ <span className="text-cyan-300">{typedText}</span>
                <span className="animate-pulse">|</span>
              </div>
              
              <div className="mt-4 sm:mt-6 text-center">
                <div className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                    BTS SIO
                  </span>
                </div>
                <p className="text-lg sm:text-xl text-slate-300 mb-4 sm:mb-6 px-2">
                  Services Informatiques aux Organisations
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 mb-6 sm:mb-8">
                  <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/50 px-3 py-2 sm:px-4">
                    <Terminal className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    <span className="text-xs sm:text-sm">Niveau 5 (Bac+2)</span>
                  </Badge>
                  <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/50 px-3 py-2 sm:px-4">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    <span className="text-xs sm:text-sm">2 années</span>
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs - Mobile Optimized */}
      <section className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="flex justify-center">
            {/* Mobile: Scrollable horizontal tabs */}
            <nav className="flex space-x-1 p-2 overflow-x-auto scrollbar-hide w-full max-w-full sm:w-auto">
              <div className="flex space-x-1 min-w-max sm:min-w-0">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all duration-300 whitespace-nowrap text-sm sm:text-base ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg scale-105'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <tab.icon className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span className="hidden xs:inline sm:inline">{tab.label}</span>
                    <span className="xs:hidden sm:hidden">{tab.label.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </nav>
          </div>
        </div>
      </section>

      {/* Tab Content - Mobile Optimized */}
      <section className="py-8 sm:py-16">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="animate-fade-in">
            {renderTabContent()}
          </div>
        </div>
      </section>

      {/* CTA Section - Mobile Optimized */}
      <section className="py-12 sm:py-20 bg-gradient-to-r from-slate-900 via-blue-900 to-cyan-900">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6 text-white leading-tight">
              Prêt à rejoindre l'aventure BTS SIO ?
            </h2>
            <p className="text-lg sm:text-xl text-slate-300 mb-6 sm:mb-8">
              Transformez votre passion pour l'informatique en expertise professionnelle
            </p>
            <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row justify-center">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg w-full sm:w-auto"
                onClick={() => window.location.href = 'mailto:hocineira@gmail.com'}
              >
                <Play className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Commencer maintenant</span>
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-slate-900 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg w-full sm:w-auto"
                onClick={() => window.open('/tcs', '_self')}
              >
                <ExternalLink className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Voir mon parcours</span>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
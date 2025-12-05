'use client'

import { Shield, Download, Clock, Users, Award, CheckCircle, Target, Briefcase, TrendingUp, Star, Code, Server, Network, Lock } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { FadeIn, ScaleIn, SlideIn, StaggerContainer, StaggerItem, AnimatedCard } from '../../components/animations'

export default function TCSPage() {
  const tcsInfo = {
    title: 'Tableau De Compétences',
    description: 'Évaluation et présentation des compétences acquises dans le cadre du BTS SIO option SISR (Solutions d\'Infrastructure, Systèmes et Réseaux).',
    duration: '2 ans',
    level: 'Niveau 5 (Bac+2)',
    objectives: [
      'Gérer le patrimoine informatique',
      'Répondre aux incidents et aux demandes d\'assistance et d\'évolution',
      'Développer la présence en ligne de l\'organisation',
      'Travailler en mode projet',
      'Mettre à disposition des utilisateurs un service informatique',
      'Organiser son développement professionnel'
    ],
    skills: [
      { name: 'Administration Active Directory', level: 90, icon: Server },
      { name: 'Configuration VLAN et Switch', level: 85, icon: Network },
      { name: 'Hyperviseur PROXMOX', level: 88, icon: Code },
      { name: 'Déploiement GPO Windows', level: 82, icon: Lock },
      { name: 'Installation GLPI et ZABBIX', level: 80, icon: TrendingUp },
      { name: 'Configuration VPN Fortinet', level: 75, icon: Lock },
      { name: 'Cisco Packet Tracer', level: 78, icon: Network },
      { name: 'Maintenance et réparation PC', level: 85, icon: Users },
      { name: 'Exchange Server', level: 76, icon: Server },
      { name: 'Configuration WiFi D-Link', level: 70, icon: Network }
    ],
    timeline: [
      { year: 'Année 1', period: '2024-2025', focus: 'Fondamentaux IT', achievements: ['Bases systèmes', 'Réseaux TCP/IP', 'Virtualisation'] },
      { year: 'Année 2', period: '2025-2026', focus: 'Spécialisation SISR', achievements: ['Sécurité avancée', 'Projets infrastructure', 'Certifications'] }
    ],
    certifications: [
      { name: 'Cisco CCNA', status: 'En cours', icon: Network },
      { name: 'Stormshield Network Security', status: 'Prévu', icon: Lock },
      { name: 'VMware vSphere', status: 'Prévu', icon: Code }
    ],
    opportunities: [
      { title: 'Administrateur systèmes et réseaux', icon: Server, description: 'Gestion complète de l\'infrastructure IT' },
      { title: 'Technicien infrastructure', icon: Network, description: 'Maintenance et évolution des équipements' },
      { title: 'Responsable informatique', icon: Briefcase, description: 'Management d\'équipe et stratégie IT' },
      { title: 'Technicien de maintenance', icon: Users, description: 'Support et dépannage utilisateurs' },
      { title: 'Consultant en systèmes', icon: TrendingUp, description: 'Expertise et conseils techniques' },
      { title: 'Spécialiste sécurité', icon: Lock, description: 'Protection et sécurisation des systèmes' }
    ]
  }

  const handleDownloadPDF = () => {
    // Télécharger le PDF TCS
    const link = document.createElement('a');
    link.href = '/procedures/TCS.pdf';
    link.download = 'TCS_IRATNI_Hocine.pdf';
    link.click();
  }

  const ProgressBar = ({ level, color = 'blue' }) => (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div 
        className={`h-2 rounded-full bg-gradient-to-r from-${color}-400 to-${color}-600 transition-all duration-1000`}
        style={{ width: `${level}%` }}
      ></div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section - Thème bleu/violet with Animations */}
      <section className="relative overflow-hidden py-12 sm:py-20 lg:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-72 sm:h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative container mx-auto px-3 sm:px-4">
          <div className="text-center">
            <ScaleIn delay={0.2} scale={0.5}>
              <div className="flex justify-center mb-6 sm:mb-8">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
              </div>
            </ScaleIn>
            
            <FadeIn delay={0.3} direction="up">
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                {tcsInfo.title}
              </h1>
            </FadeIn>
            
            <FadeIn delay={0.5} direction="up">
              <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
                {tcsInfo.description}
              </p>
            </FadeIn>
            
            <StaggerContainer staggerDelay={0.1} className="flex flex-col gap-3 sm:gap-4 sm:flex-row justify-center items-center mb-6 sm:mb-8">
              <StaggerItem>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 px-3 py-2 sm:px-4">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  <span className="text-sm sm:text-base">{tcsInfo.duration}</span>
                </Badge>
              </StaggerItem>
              <StaggerItem>
                <Badge variant="secondary" className="bg-purple-100 text-purple-800 px-3 py-2 sm:px-4">
                  <Award className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  <span className="text-sm sm:text-base">{tcsInfo.level}</span>
                </Badge>
              </StaggerItem>
            </StaggerContainer>

            <ScaleIn delay={0.8}>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/30 w-full sm:w-auto max-w-md sm:max-w-none"
                onClick={handleDownloadPDF}
              >
                <Download className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Télécharger le tableau de compétences</span>
              </Button>
            </ScaleIn>
          </div>
        </div>
      </section>

      {/* Timeline Section with Animations */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-3 sm:px-4">
          <FadeIn delay={0.2} direction="up">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Parcours de formation
              </h2>
              <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
            </div>
          </FadeIn>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Desktop: Center line, Mobile: Left line */}
              <div className="absolute left-8 sm:left-1/2 sm:transform sm:-translate-x-px h-full w-0.5 bg-gradient-to-b from-blue-400 to-purple-400"></div>
              
              {tcsInfo.timeline.map((item, index) => (
                <FadeIn key={index} delay={0.3 + index * 0.2} direction={index % 2 === 0 ? 'left' : 'right'}>
                  <div className="relative mb-8">
                    {/* Mobile: Full width, Desktop: Alternating sides */}
                    <div className={`sm:flex sm:items-center ${index % 2 === 0 ? 'sm:justify-start' : 'sm:justify-end'}`}>
                      <div className={`w-full sm:w-1/2 pl-16 sm:pl-0 ${index % 2 === 0 ? 'sm:pr-8' : 'sm:pl-8'}`}>
                        <AnimatedCard delay={0.4 + index * 0.2}>
                          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <CardHeader>
                              <CardTitle className="text-lg text-blue-600">{item.year}</CardTitle>
                              <CardDescription className="text-purple-600">{item.period}</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <h4 className="font-semibold text-gray-900 mb-2">{item.focus}</h4>
                              <ul className="space-y-1">
                                {item.achievements.map((achievement, i) => (
                                  <li key={i} className="flex items-center text-sm text-gray-600">
                                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                    {achievement}
                                  </li>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>
                        </AnimatedCard>
                      </div>
                    </div>
                    
                    {/* Timeline dot - Mobile: Left aligned, Desktop: Center */}
                    <div className="absolute left-6 top-6 sm:left-1/2 sm:top-8 sm:transform sm:-translate-x-1/2 w-4 h-4 bg-white border-4 border-blue-500 rounded-full z-10"></div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections - Amélioré */}
      <section className="py-12 sm:py-20 bg-gray-50">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Objectifs */}
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl text-gray-900 flex items-center">
                  <Target className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-blue-600" />
                  Objectifs de formation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {tcsInfo.objectives.map((objective, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700 text-sm sm:text-base">{objective}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Compétences avec barres de progression */}
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl text-gray-900 flex items-center">
                  <Star className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-purple-600" />
                  Compétences développées
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tcsInfo.skills.map((skill, index) => {
                    const IconComponent = skill.icon;
                    return (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <IconComponent className="w-4 h-4 text-blue-600 mr-2" />
                            <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                          </div>
                          <span className="text-sm text-purple-600 font-semibold">{skill.level}%</span>
                        </div>
                        <ProgressBar level={skill.level} />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Certifications Section - Nouvelle section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Certifications
            </h2>
            <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
          </div>

          <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
            {tcsInfo.certifications.map((cert, index) => {
              const IconComponent = cert.icon;
              const getStatusColor = (status) => {
                switch(status) {
                  case 'Acquis': return 'bg-green-100 text-green-800';
                  case 'En cours': return 'bg-blue-100 text-blue-800';
                  case 'Prévu': return 'bg-purple-100 text-purple-800';
                  default: return 'bg-gray-100 text-gray-800';
                }
              };
              
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg text-gray-900">{cert.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Badge className={getStatusColor(cert.status)}>
                      {cert.status}
                    </Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Débouchés - Amélioré */}
      <section className="py-12 sm:py-20 bg-gray-50">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Débouchés professionnels
            </h2>
            <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tcsInfo.opportunities.map((opportunity, index) => {
              const IconComponent = opportunity.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:scale-105 group">
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg text-gray-900 leading-tight">{opportunity.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-sm text-gray-600">{opportunity.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
'use client'

import { useState, useMemo } from 'react'
import { FolderOpen, Github, ExternalLink, Calendar, Star, Server, Network, Shield, HardDrive, Monitor, FileText, Download, Eye } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import ImageModal from '../../components/ImageModal'
import PDFModalFinal from '../../components/PDFModalFinal'
import { FadeIn, ScaleIn, StaggerContainer, StaggerItem, AnimatedCard, FloatingElement, RotateIn } from '../../components/animations'

export default function ProjetsPage() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPDF, setSelectedPDF] = useState(null)
  const [isPDFModalOpen, setIsPDFModalOpen] = useState(false)
  
  const openImageModal = (imageSrc, title) => {
    setSelectedImage({ src: imageSrc, title })
    setIsModalOpen(true)
  }
  
  const closeImageModal = () => {
    setIsModalOpen(false)
    setSelectedImage(null)
  }

  const openPDFModal = (pdfUrl, title) => {
    setSelectedPDF({ url: pdfUrl, title })
    setIsPDFModalOpen(true)
  }
  
  const closePDFModal = () => {
    setIsPDFModalOpen(false)
    setSelectedPDF(null)
  }
  const handleCardOpen = (project) => {
    if (project.type === 'procedure' && project.pdfUrl) {
      openPDFModal(project.pdfUrl, project.title)
    } else if (project.schemaUrl) {
      openImageModal(project.schemaUrl, project.title)
    }
  }


  // Memoize projects data to prevent re-creation on every render
  const projects = useMemo(() => [
    {
      id: 1,
      title: 'Architecture Réseau d\'Entreprise - INFRA S4P2',
      description: 'Infrastructure complète mise en place avec pfSense, VLANs, Active Directory, et outils de monitoring. Schéma détaillé de mon environnement de test incluant la segmentation réseau, la sécurité périmétrique et la supervision avec configurations IP détaillées.',
      category: 'architecture',
      technologies: ['pfSense', 'VLANs', 'Active Directory', 'GLPI', 'Zabbix', 'Windows Server', 'Proxmox'],
      date: '2025',
      status: 'completed',
      type: 'project',
      schemaUrl: '/images/infrastructure/Infra_IRATNI_Hocine.png',
      image: '/images/infrastructure/Infra_IRATNI_Hocine.png',
      icon: Server
    },
    {
      id: 7,
      title: 'Procédure VLAN Interco',
      description: 'Procédure détaillée pour la création de VLAN sur Switch et Routeur. Configuration de l\'interconnexion entre différents réseaux virtuels avec gestion des politiques de routage.',
      category: 'procedure',
      technologies: ['VLAN', 'Switch', 'Routeur', 'Cisco', 'Networking'],
      date: '2025',
      status: 'completed',
      type: 'procedure',
      pdfUrl: '/procedures/VLAN_Interco.pdf',
      image: '/images/procedures/optimized_vlan_network_switch.webp',
      icon: Network
    },
    {
      id: 8,
      title: 'Procédure ZABBIX 7.4',
      description: 'Procédure complète d\'installation et de configuration de ZABBIX 7.4 sur Debian pour la supervision et monitoring des infrastructures réseau et serveurs.',
      category: 'procedure',
      technologies: ['ZABBIX 7.4', 'Debian', 'Monitoring', 'SNMP', 'MySQL'],
      date: '2025',
      status: 'completed',
      type: 'procedure',
      pdfUrl: '/procedures/Zabbix.pdf',
      image: '/images/procedures/optimized_zabbix_image.webp',
      icon: Monitor
    },
    {
      id: 9,
      title: 'Procédure Active Directory',
      description: 'Procédure détaillée d\'installation et de configuration de l\'Active Directory avec gestion des utilisateurs, groupes et GPO (Group Policy Objects).',
      category: 'procedure',
      technologies: ['Active Directory', 'Windows Server', 'GPO', 'Users', 'Groups'],
      date: '2025',
      status: 'completed',
      type: 'procedure',
      pdfUrl: '/procedures/Active_Directory.pdf',
      image: '/images/procedures/optimized_ad_image.webp',
      icon: Server
    },
    {
      id: 10,
      title: 'Procédure GLPI V11',
      description: 'Procédure complète d\'installation et de configuration de GLPI V11 (2025) sur Ubuntu pour la gestion des services informatiques et helpdesk.',
      category: 'procedure',
      technologies: ['GLPI V11', 'Ubuntu', 'ITSM', 'Helpdesk', 'Apache', 'MySQL'],
      date: '2025',
      status: 'completed',
      type: 'procedure',
      pdfUrl: '/procedures/GLPI.pdf',
      image: '/images/procedures/glpi_image.webp',
      icon: FileText
    },
    {
      id: 11,
      title: 'Procédure Proxmox',
      description: 'Procédure d\'installation et de configuration de Proxmox pour la virtualisation et gestion des machines virtuelles dans un environnement d\'entreprise.',
      category: 'procedure',
      technologies: ['Proxmox', 'Virtualisation', 'KVM', 'LXC', 'Cluster'],
      date: '2025',
      status: 'completed',
      type: 'procedure',
      pdfUrl: '/procedures/Proxmox.pdf',
      image: '/images/procedures/optimized_proxmox_image.webp',
      icon: HardDrive
    },
    {
      id: 12,
      title: 'Procédure GPO',
      description: 'Procédure de création et gestion des GPO (Group Policy Objects) pour la configuration centralisée des environnements Windows.',
      category: 'procedure',
      technologies: ['GPO', 'Active Directory', 'Windows Server', 'Policy', 'Configuration'],
      date: '2025',
      status: 'completed',
      type: 'procedure',
      pdfUrl: '/procedures/GPO.pdf',
      image: '/images/procedures/optimized_gpo_image.webp',
      icon: Shield
    },
    {
      id: 13,
      title: 'Attaque MITM - ARP Poisoning',
      description: 'Réalisation d\'attaques Man-in-the-Middle avec ARP Poisoning et test de la sécurité des réseaux avec Ettercap sur Kali Linux.',
      category: 'procedure',
      technologies: ['Kali Linux', 'Ettercap', 'ARP Poisoning', 'MITM', 'Sécurité'],
      date: '2025',
      status: 'completed',
      type: 'procedure',
      pdfUrl: '/procedures/MITM_Ettercap.pdf',
      image: '/images/procedures/optimized_kali_image.webp',
      icon: Shield
    },
    {
      id: 14,
      title: 'Attaque MITM - DNS Spoofing',
      description: 'Réalisation d\'une attaque Man-in-the-Middle avec DNS Spoofing et ARP Poisoning, évaluation de la sécurité des réseaux via l\'ingénierie sociale.',
      category: 'procedure',
      technologies: ['Kali Linux', 'DNS Spoofing', 'ARP Poisoning', 'Social Engineering', 'MITM'],
      date: '2025',
      status: 'completed',
      type: 'procedure',
      pdfUrl: '/procedures/MITM_DNS_Spoofing.pdf',
      image: '/images/procedures/optimized_kali_image.webp',
      icon: Shield
    },
    {
      id: 15,
      title: 'Procédure OpenVPN pfSense avec Active Directory LDAP',
      description: 'Procédure complète d\'installation et de configuration d\'OpenVPN sur pfSense avec authentification Active Directory LDAP. Configuration du serveur VPN, gestion des certificats, synchronisation AD-LDAP et accès distant sécurisé avec authentification centralisée.',
      category: 'procedure',
      technologies: ['OpenVPN', 'pfSense', 'VPN', 'Active Directory', 'LDAP', 'Certificats SSL', 'Firewall', 'Sécurité'],
      date: '2025',
      status: 'completed',
      type: 'procedure',
      pdfUrl: '/procedures/OpenVPN_pfSense.pdf',
      image: '/images/openvpn_reference.jpg',
      icon: Shield
    },
    {
      id: 16,
      title: 'Procédure SNORT',
      description: 'Procédure en cours de rédaction.',
      category: 'procedure',
      technologies: ['Snort', 'IDS', 'IPS', 'Sécurité', 'Réseau'],
      date: '2025',
      status: 'in-progress',
      type: 'procedure',
      image: '/images/procedures/snort.webp',
      icon: Shield
    },
    {
      id: 17,
      title: 'Procédure Artica Proxy',
      description: 'Procédure en cours de rédaction.',
      category: 'procedure',
      technologies: ['Artica Proxy', 'Proxy', 'Web Filter', 'Sécurité', 'Réseau'],
      date: '2025',
      status: 'in-progress',
      type: 'procedure',
      image: '/images/procedures/artica_proxy.jpeg',
      icon: Shield
    }
  ], []) // Fermeture du useMemo

  const filteredProjects = projects

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'in-progress': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Terminé'
      case 'in-progress': return 'En cours'
      default: return 'En attente'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Hero Section - Mobile Optimized */}
      <section className="relative overflow-hidden py-12 sm:py-20 lg:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-72 sm:h-72 bg-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-48 h-48 sm:w-64 sm:h-64 bg-indigo-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
          <div className="absolute bottom-1/3 left-1/3 w-64 h-64 sm:w-80 sm:h-80 bg-cyan-400/10 rounded-full blur-3xl animate-pulse delay-3000"></div>
        </div>

        <div className="relative container mx-auto px-3 sm:px-4">
          <div className="text-center">
            <FloatingElement duration={3} distance={15}>
              <ScaleIn delay={0.2} scale={0.5}>
                <div className="flex justify-center mb-6 sm:mb-8">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                    <FolderOpen className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>
                </div>
              </ScaleIn>
            </FloatingElement>
            
            <FadeIn delay={0.4} direction="up">
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 leading-tight">
                Mes Procédures Techniques
              </h1>
            </FadeIn>
            <FadeIn delay={0.6} direction="up">
              <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
                Découvrez mes procédures techniques détaillées dans les domaines des systèmes et réseaux informatiques. 
                Chaque procédure reflète ma passion pour l'infrastructure IT et ma volonté d'apprendre les dernières technologies.
              </p>
            </FadeIn>
            <StaggerContainer staggerDelay={0.1} className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 mb-6 sm:mb-8 px-4">
              <StaggerItem>
                <Badge className="bg-purple-100 text-purple-800 px-3 py-2 sm:px-4 text-xs sm:text-sm">
                  <Server className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Systèmes & Réseaux
                </Badge>
              </StaggerItem>
              <StaggerItem>
                <Badge className="bg-blue-100 text-blue-800 px-3 py-2 sm:px-4 text-xs sm:text-sm">
                  <Shield className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Sécurité
                </Badge>
              </StaggerItem>
              <StaggerItem>
                <Badge className="bg-green-100 text-green-800 px-3 py-2 sm:px-4 text-xs sm:text-sm">
                  <Network className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Infrastructure
                </Badge>
              </StaggerItem>
              <StaggerItem>
                <Badge className="bg-orange-100 text-orange-800 px-3 py-2 sm:px-4 text-xs sm:text-sm">
                  <FileText className="w-4 h-4 mr-2" />
                  Procédures
                </Badge>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Hero Project - Architecture Réseau - Mobile Optimized */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-3 sm:px-4">
          {/* Projet Principal - Architecture Réseau */}
          <ScaleIn delay={0.3} duration={0.8} scale={0.9}>
            <div className="mb-12 sm:mb-16">
              <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 p-1 shadow-2xl transform hover:scale-[1.02] transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 animate-pulse"></div>
              <div className="relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                  {/* Image Section - Mobile Optimized */}
                  <div className="lg:w-1/2 h-64 sm:h-80 lg:h-96 relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                    <img 
                      src="/images/infrastructure/Infra_IRATNI_Hocine.png" 
                      alt="Architecture Réseau d'Entreprise - INFRA S4P2"
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                        <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2 py-1 sm:px-3 text-xs font-bold animate-bounce">
                          🏆 PROJET PRINCIPAL
                        </Badge>
                        <Badge className="bg-green-500 text-white px-2 py-1 text-xs">
                          Terminé
                        </Badge>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  {/* Content Section - Mobile Optimized */}
                  <div className="lg:w-1/2 p-4 sm:p-8">
                    <div className="h-full flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                            <Server className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg sm:text-2xl font-bold text-gray-900 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent leading-tight">
                              Architecture Réseau d'Entreprise
                            </h3>
                            <p className="text-amber-600 font-semibold text-sm sm:text-base">INFRA S4P2 - Hocine IRATNI</p>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 mb-6 leading-relaxed">
                          Infrastructure complète mise en place avec pfSense, VLANs, Active Directory, et outils de monitoring. 
                          Schéma détaillé de mon environnement de test incluant la segmentation réseau, la sécurité périmétrique 
                          et la supervision avec configurations IP détaillées.
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-6">
                          {['pfSense', 'VLANs', 'Active Directory', 'GLPI', 'Zabbix', 'Windows Server', 'Proxmox'].map((tech, index) => (
                            <Badge key={index} className="bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 text-xs hover:from-amber-200 hover:to-orange-200 transition-all duration-200 border border-amber-300">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-3">
                        <div className="flex gap-3">
                          <Button 
                            className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
                            onClick={() => openImageModal('/images/infrastructure/Infra_IRATNI_Hocine.png', 'Architecture Réseau d\'Entreprise - INFRA S4P2')}
                          >
                            <Eye className="w-5 h-5 mr-2" />
                            Voir Schéma Complet
                          </Button>
                          <Button 
                            variant="outline"
                            className="flex-1 border-2 border-amber-500 text-amber-600 hover:bg-amber-50 font-bold py-3 px-6 rounded-xl transform hover:scale-105 transition-all duration-200"
                            onClick={() => {
                              const link = document.createElement('a');
                              link.href = '/images/infrastructure/Infra_IRATNI_Hocine.png';
                              link.download = 'Infra_IRATNI_Hocine.png';
                              link.click();
                            }}
                          >
                            <Download className="w-5 h-5 mr-2" />
                            Télécharger Schéma
                          </Button>
                        </div>
                        <Button 
                          className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
                          onClick={() => window.location.href = '/projets/scolaires/infrastructure-s4p2'}
                        >
                          <Server className="w-5 h-5 mr-2" />
                          Voir la Page Infrastructure Complète S4P2
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </ScaleIn>
          
          {/* Separator */}
          <div className="flex items-center justify-center mb-12">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            <div className="px-6">
              <Badge className="bg-gray-100 text-gray-600 px-4 py-2">
                <FileText className="w-4 h-4 mr-2" />
                Procédures Techniques
              </Badge>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          </div>
          
          {/* Regular Projects Grid - Mobile Optimized */}
          <StaggerContainer staggerDelay={0.08} className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.slice(1).map((project, index) => {
              const ProjectIcon = project.icon
              return (
                <StaggerItem key={project.id}>
                  <AnimatedCard 
                    delay={index * 0.05} 
                    hoverScale={1.05} 
                    hoverRotate={1}
                    className="h-full"
                  >
                    <Card className="group mobile-card touch-feedback hover:shadow-2xl transition-all duration-300 transform active:translate-y-0 overflow-hidden border-0 shadow-lg cursor-pointer h-full" onClick={() => handleCardOpen(project)} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleCardOpen(project); } }}>
                  <div className="relative h-40 sm:h-48 bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center overflow-hidden">
                    {project.image ? (
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-6xl text-purple-400 group-hover:text-purple-600 transition-colors duration-300">
                        <ProjectIcon className="w-14 h-14 sm:w-16 sm:h-16" />
                      </div>
                    )}
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                      <Badge className={getStatusColor(project.status)}>
                        {getStatusText(project.status)}
                      </Badge>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg sm:text-xl text-gray-900 group-hover:text-purple-600 transition-colors leading-snug">
                          {project.title}
                        </CardTitle>
                        <CardDescription className="flex items-center text-gray-500 mt-2 text-sm">
                          <Calendar className="w-4 h-4 mr-1 flex-shrink-0" />
                          {project.date}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <p className="text-gray-700 mb-4 text-sm leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
                      {project.technologies.slice(0, 6).map((tech, index) => (
                        <Badge key={index} variant="secondary" className="bg-purple-100 text-purple-800 text-xs hover:bg-purple-200 transition-colors">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 6 && (
                        <Badge variant="secondary" className="bg-gray-100 text-gray-600 text-xs">
                          +{project.technologies.length - 6}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex gap-1 sm:gap-2">
                      {project.type === 'procedure' ? (
                        project.pdfUrl ? (
                          <>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="touch-target flex-1 border-gray-300 text-gray-700 hover:bg-purple-50 hover:text-purple-600 hover:border-purple-300 transition-all duration-200 opacity-100 py-2 text-xs sm:text-sm"
                              onClick={(e) => { e.stopPropagation(); openPDFModal(project.pdfUrl, project.title); }}
                            >
                              <Eye className="w-4 h-4 mr-1 sm:mr-2" />
                              <span className="hidden sm:inline">Voir</span>
                              <span className="sm:hidden">PDF</span>
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="touch-target flex-1 border-gray-300 text-gray-700 hover:bg-purple-50 hover:text-purple-600 hover:border-purple-300 transition-all duration-200 opacity-100 py-2 text-xs sm:text-sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                const link = document.createElement('a');
                                link.href = project.pdfUrl;
                                link.download = project.pdfUrl.split('/').pop();
                                link.click();
                              }}
                            >
                              <Download className="w-4 h-4 mr-1 sm:mr-2" />
                              <span className="hidden sm:inline">Télécharger</span>
                              <span className="sm:hidden">DL</span>
                            </Button>
                          </>
                        ) : (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            disabled
                            className="touch-target flex-1 border-gray-200 text-gray-400 cursor-not-allowed py-2 text-xs sm:text-sm"
                          >
                            En cours — bientôt disponible
                          </Button>
                        )
                      ) : project.schemaUrl ? (
                        // For architecture projects with schema
                        <>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="touch-target flex-1 border-gray-300 text-gray-700 hover:bg-purple-50 hover:text-purple-600 hover:border-purple-300 transition-all duration-200 opacity-100 py-2 text-xs sm:text-sm"
                            onClick={(e) => { e.stopPropagation(); openImageModal(project.schemaUrl, project.title); }}
                          >
                            <Eye className="w-4 h-4 mr-1 sm:mr-2" />
                            <span className="hidden sm:inline">Voir Schéma</span>
                            <span className="sm:hidden">Schema</span>
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1 border-gray-300 text-gray-700 hover:bg-purple-50 hover:text-purple-600 hover:border-purple-300 transition-all duration-200 opacity-100"
                            onClick={(e) => { e.stopPropagation(); openImageModal(project.schemaUrl, project.title); }}
                          >
                            <Network className="w-4 h-4 mr-2" />
                            Architecture
                          </Button>
                        </>
                      ) : (
                        // For regular projects
                        <>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1 border-gray-300 text-gray-700 hover:bg-purple-50 hover:text-purple-600 hover:border-purple-300 transition-all duration-200 opacity-100"
                            onClick={() => window.open(project.github, '_blank')}
                          >
                            <Github className="w-4 h-4 mr-2" />
                            Code
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1 border-gray-300 text-gray-700 hover:bg-purple-50 hover:text-purple-600 hover:border-purple-300 transition-all duration-200 opacity-100"
                            onClick={() => window.open(project.demo, '_blank')}
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Démo
                          </Button>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
                  </AnimatedCard>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <StaggerContainer staggerDelay={0.15} className="grid md:grid-cols-3 gap-8 text-center">
            <StaggerItem>
              <ScaleIn scale={0.7}>
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                    {projects.length}
                  </div>
                  <div className="text-gray-600">Procédures techniques</div>
                </div>
              </ScaleIn>
            </StaggerItem>
            <StaggerItem>
              <ScaleIn scale={0.7}>
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                    {projects.filter(p => p.status === 'completed').length}
                  </div>
                  <div className="text-gray-600">Procédures terminées</div>
                </div>
              </ScaleIn>
            </StaggerItem>
            <StaggerItem>
              <ScaleIn scale={0.7}>
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                    {new Set(projects.flatMap(p => p.technologies)).size}
                  </div>
                  <div className="text-gray-600">Technologies maîtrisées</div>
                </div>
              </ScaleIn>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">
            Intéressé par mes procédures techniques ?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            N'hésitez pas à me contacter pour discuter de vos projets d'infrastructure IT ou pour en savoir plus sur mes compétences techniques.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
              onClick={() => window.location.href = 'mailto:hocineira@gmail.com'}
            >
              Me contacter
              <ExternalLink className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
              onClick={() => window.open('/veilles', '_self')}
            >
              Voir mes veilles
              <Star className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>
      
      {/* Image Modal */}
      <ImageModal 
        isOpen={isModalOpen} 
        onClose={closeImageModal} 
        imageSrc={selectedImage?.src} 
        title={selectedImage?.title} 
      />
      
      {/* PDF Modal */}
      <PDFModalFinal 
        isOpen={isPDFModalOpen} 
        onClose={closePDFModal} 
        pdfUrl={selectedPDF?.url} 
        title={selectedPDF?.title} 
      />
    </div>
  )
}
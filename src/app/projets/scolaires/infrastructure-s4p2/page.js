'use client'

import { useState } from 'react'
import { Badge } from '../../../../components/ui/badge'
import { 
  ArrowLeft, Network, Server, Shield, Cable, 
  HardDrive, ZoomIn, ZoomOut, Download, CheckCircle2, Package, Laptop, ExternalLink, Info, Eye, FileText
} from 'lucide-react'
import Link from 'next/link'
import ImageModal from '../../../../components/ImageModal'
import { FadeIn, ScaleIn, SlideIn, StaggerContainer, StaggerItem, FloatingElement, HoverScale } from '../../../../components/animations'

export default function InfrastructureS4P2() {
  const [zoom, setZoom] = useState(100)
  const [isSchemaModalOpen, setIsSchemaModalOpen] = useState(false)

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 10, 200))
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 10, 50))

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
                href="/projets/scolaires" 
                className="inline-flex items-center text-cyan-300 hover:text-cyan-200 transition-colors duration-200 bg-slate-800/60 backdrop-blur-md px-4 py-2 rounded-full border border-slate-600/50"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour à Projets Scolaires E6
              </Link>
            </div>
          </FadeIn>

          <div className="text-center">
            {/* Badge */}
            <FloatingElement delay={0.2} duration={3}>
              <ScaleIn delay={0.3} scale={0.5}>
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800/60 backdrop-blur-md border border-cyan-500/30 rounded-full mb-8 shadow-lg shadow-cyan-500/10">
                  <Network className="w-5 h-5 text-cyan-400" />
                  <span className="text-sm text-cyan-300 font-semibold">Infrastructure - Plot S4P2</span>
                </div>
              </ScaleIn>
            </FloatingElement>

            {/* Titre principal */}
            <FadeIn delay={0.4} direction="up">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 drop-shadow-2xl">
                <span className="block mb-2 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Infrastructure S4P2
                </span>
                <span className="block text-white text-4xl">
                  IFC Marseille
                </span>
              </h1>
            </FadeIn>

            {/* Description */}
            <SlideIn delay={0.6} direction="up" duration={0.7}>
              <div className="max-w-4xl mx-auto">
                <div className="bg-slate-800/40 backdrop-blur-lg border border-slate-600/40 rounded-3xl p-8 shadow-2xl">
                  <p className="text-slate-300 leading-relaxed text-lg">
                    Découvrez l'infrastructure réseau complète déployée sur mon plot attitré S4P2 au centre de formation IFC Marseille.
                    Cette infrastructure représente un environnement professionnel complet avec l'ensemble des ressources matérielles 
                    et logicielles nécessaires à la réalisation de mes projets sous la supervision de M. Bernard FERNANDEZ.
                  </p>
                </div>
              </div>
            </SlideIn>
          </div>
        </div>
      </div>

      {/* Photo de l'Infrastructure Réelle */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <ScaleIn delay={0.2} duration={0.6}>
          <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-600/40 rounded-3xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-slate-800/60 backdrop-blur-lg border-b border-slate-600/40 p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <FloatingElement duration={2.5}>
                    <Server className="w-6 h-6 text-cyan-400" />
                  </FloatingElement>
                  <span className="text-white font-bold text-lg">Infrastructure Réelle - Plot S4P2</span>
                </div>
              </div>
            </div>

            {/* Photo */}
            <div className="bg-slate-900/30 p-8 backdrop-blur-sm">
              <HoverScale scale={1.02}>
                <div className="mx-auto bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-slate-700/30">
                  <img
                    src="/images/infrastructure-s4p2.jpeg"
                    alt="Photo Infrastructure Réelle S4P2"
                    className="w-full h-auto"
                  />
                </div>
              </HoverScale>
            </div>
          </div>
        </ScaleIn>
      </div>

      {/* Schema Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <FadeIn delay={0.3} direction="up">
          <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-600/40 rounded-3xl shadow-2xl overflow-hidden">
            {/* Controls */}
            <div className="bg-slate-800/60 backdrop-blur-lg border-b border-slate-600/40 p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <FloatingElement duration={2.8}>
                    <Cable className="w-6 h-6 text-cyan-400" />
                  </FloatingElement>
                  <span className="text-white font-bold text-lg">Architecture réseau – Infra S4P2</span>
                  <Badge className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 backdrop-blur-sm px-3 py-1">
                    Version 2.1
                  </Badge>
                  <Badge className="bg-slate-600/40 text-slate-300 border border-slate-500/30 backdrop-blur-sm px-3 py-1">
                    24/10/2025
                  </Badge>
                </div>

                <div className="flex items-center gap-3">
                  {/* Zoom controls */}
                  <div className="flex items-center gap-2 bg-slate-700/50 backdrop-blur-md rounded-xl p-2 border border-slate-600/40">
                    <button
                      onClick={handleZoomOut}
                      className="p-2 text-cyan-300 hover:text-cyan-200 hover:bg-slate-600/50 rounded-lg transition-colors"
                    >
                      <ZoomOut className="w-5 h-5" />
                    </button>
                    <span className="text-sm text-white font-semibold px-3 min-w-[60px] text-center">
                      {zoom}%
                    </span>
                    <button
                      onClick={handleZoomIn}
                      className="p-2 text-cyan-300 hover:text-cyan-200 hover:bg-slate-600/50 rounded-lg transition-colors"
                    >
                      <ZoomIn className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Action buttons */}
                  <button
                    onClick={() => setIsSchemaModalOpen(true)}
                    className="flex items-center gap-2 bg-cyan-500/20 hover:bg-cyan-500/30 backdrop-blur-md text-cyan-300 border border-cyan-500/30 font-semibold px-4 py-2 rounded-xl transition-all"
                  >
                    <Eye className="w-5 h-5" />
                    <span className="hidden sm:inline">Voir en grand</span>
                  </button>

                  <button
                    onClick={() => window.open('/documents/schema-infra-s4p2.pdf', '_blank')}
                    className="flex items-center gap-2 bg-slate-600/40 hover:bg-slate-600/60 backdrop-blur-md text-slate-200 border border-slate-500/30 font-semibold px-4 py-2 rounded-xl transition-all"
                  >
                    <FileText className="w-5 h-5" />
                    <span className="hidden sm:inline">PDF</span>
                  </button>

                  <a
                    href="/images/infrastructure/Infra_IRATNI_Hocine.png"
                    download="Infra_IRATNI_Hocine.png"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-cyan-500/20 hover:bg-cyan-500/30 backdrop-blur-md text-cyan-300 border border-cyan-500/30 font-semibold px-4 py-2 rounded-xl transition-all"
                  >
                    <Download className="w-5 h-5" />
                    <span className="hidden sm:inline">Télécharger</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Schema Viewer with hover effect */}
            <div className="bg-slate-900/30 p-8 backdrop-blur-sm">
              <div 
                className="mx-auto bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-slate-700/30 cursor-pointer group transition-all duration-300 hover:scale-[1.01]"
                style={{ 
                  width: `${zoom}%`,
                  maxWidth: '100%',
                  transition: 'width 0.3s ease, transform 0.3s ease'
                }}
                onClick={() => setIsSchemaModalOpen(true)}
              >
                <div className="relative">
                  <img
                    src="/images/infrastructure/Infra_IRATNI_Hocine.png"
                    alt="Architecture réseau – Infra S4P2 IRATNI Hocine"
                    className="w-full h-auto"
                  />
                  
                  {/* Overlay au survol */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-cyan-500/90 backdrop-blur-sm rounded-full p-4 transform group-hover:scale-110 transition-transform duration-300">
                        <ZoomIn className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Ressources Matérielles Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <SlideIn delay={0.2} direction="left">
          <div className="bg-slate-800/40 backdrop-blur-lg border border-slate-600/40 rounded-3xl p-8 shadow-2xl">
            <div className="flex items-center gap-4 mb-6">
              <FloatingElement duration={2.3}>
                <div className="p-4 bg-cyan-500/10 backdrop-blur-sm rounded-2xl border border-cyan-500/20">
                  <Server className="w-8 h-8 text-cyan-400" />
                </div>
              </FloatingElement>
              <h2 className="text-3xl font-bold text-white">RESSOURCES MATÉRIELLES</h2>
            </div>
            
            <StaggerContainer staggerDelay={0.05} className="space-y-4 text-slate-300 leading-relaxed">
              <StaggerItem>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                  <p>Un PC avec clavier et souris USB, utilisé comme base pour construire et configurer l'infrastructure, et pour l'administration de celle-ci ;</p>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                  <p>Un PC portable utilisé comme PC Client pour simuler des utilisateurs du SI (Système d'Information) de l'organisation ;</p>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                  <p>Un PC avec un disque dur (4To) attribué à un serveur PROXMOX VE (environnement de virtualisation utilisé pour héberger et administrer des serveurs virtualisés) ;</p>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                  <p>Un espace disque de stockage dédié aux serveurs virtuels PROXMOX sur un serveur de sauvegarde PROXMOX BACKUP ;</p>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                  <p>Un PC avec un disque dur attribué à un serveur PFSENSE (routeur/Firewall) possédant 3 cartes réseaux et donc 4 ports Ethernet ;</p>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                  <p>Un PC avec un disque dur attribué à un serveur HYPERV pour la virtualisation qui sera utilisé pour serveurs accessible de l'extérieur du réseau et mise à disposition de réseaux externes (comme un serveur WEB par exemple) ;</p>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                  <p>Trois écrans VGA/HDMI ;</p>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                  <p>Une prise Ethernet murale, reliée au réseau WAN de l'établissement IFC Marseille, jouant le rôle d'arrivée internet de l'infrastructure ;</p>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                  <p>Des câbles Ethernet RJ45 en nombre suffisant ;</p>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                  <p>Un commutateur réseau NETGEAR GS308Ev4 (8 ports, prenant en charge l'étiquetage des trames 802.1Q) ;</p>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                  <p>Une multiprise ;</p>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                  <p>Disque SSD NVMe externe avec 256 GB de stockage.</p>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </SlideIn>
      </div>

      {/* Ressources Logicielles Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-slate-800/40 backdrop-blur-lg border border-slate-600/40 rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 bg-cyan-500/10 backdrop-blur-sm rounded-2xl border border-cyan-500/20">
              <Package className="w-8 h-8 text-cyan-400" />
            </div>
            <h2 className="text-3xl font-bold text-white">RESSOURCES LOGICIELLES</h2>
          </div>
          
          <div className="space-y-4 text-slate-300 leading-relaxed">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <p>Un serveur NAS commun aux BTS SIO de l'établissement auquel nous avons accès via des identifiants personnels contenant des ressources indispensables à notre progression (cours, procédures, travaux d'autres étudiants, logiciels, etc.) ;</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <p>Logiciel NETGEAR SWITCH DISCOVERY TOOL (1.2.103) ;</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <p>Page WEB d'administration NETGEAR GS308Ev4 ;</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <p>Logiciel UNIVERSAL USB INSTALLER (UUI) pour la création de clé USB d'installation d'OS ;</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <p>Solution Routeur-Firewall PFSENSE (2.8.1) – basé sur une distribution BSD OS ;</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <p>Administration WEB PFSENSE ;</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <p>SNORT IDS (Intrusion détection system) sur PfSense ;</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <p>Solution d'environnement de virtualisation PROXMOX VE (9.0) ;</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <p>Page WEB d'administration PROXMOX VE ;</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <p>Solution de sauvegarde des données des machines virtuelles PROXMOX BACKUP SERVER (4.0) ;</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <p>OS Windows Server 2025 ;</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <p>Gestion de ressource réseau Active Directory + Annuaire LDAPS ;</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <p>Solution de messagerie Microsoft EXCHANGE 2019 (CU15) ;</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <p>Distribution LINUX Debian 13 ;</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <p>Gestion de base de données MariaDB ;</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <p>Solution de supervision réseau ZABBIX (7.4) ainsi que la version 7.4 de l'agent d'écoute ZABBIX ;</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <p>Page WEB D'administration ZABBIX ;</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <p>Solution Proxy ARTICA (version communautaire ISO Artica 4.50 sous Debian 13) ;</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <p>Page WEB d'administration ARTICA ;</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <p>Page WEB d'administration Ubiquiti pour borne UniFi u7 lite ;</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <p>Page WEB d'identification du Portail Captif ;</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <p>Distribution LINUX Ubuntu (24.04 LTS) ;</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <p>Solution GLPI 11 ;</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <p>Logiciel client OpenVPN (3.8.0) ;</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <p>RDP Bureau distant pour accès SERVEUR AD1 et serveur HYPER-V ;</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <p>Solution Cloud intranet NEXTCLOUD (sous Ubuntu 24.04 LTS) ;</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <p>Logiciel sauvegarde Cobian Backup Gravity 11 ;</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <p>Logiciel de gestion lecteur réseaux RAIDRIVE.</p>
            </div>
          </div>
        </div>

        {/* Solutions et Sources Officielles Section */}
        <div className="mt-8 bg-slate-800/40 backdrop-blur-lg border border-slate-600/40 rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-4 bg-cyan-500/10 backdrop-blur-sm rounded-2xl border border-cyan-500/20">
              <Info className="w-8 h-8 text-cyan-400" />
            </div>
            <h2 className="text-3xl font-bold text-white">SOLUTIONS ET SOURCES OFFICIELLES</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            
            {/* NETGEAR Switch */}
            <div className="bg-slate-700/30 backdrop-blur-sm border border-slate-600/40 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-cyan-300">NETGEAR GS308Ev4</h3>
                <a 
                  href="https://www.netgear.com/fr/home/wired/switches/gs308e/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-cyan-500/20 hover:bg-cyan-500/30 rounded-lg transition-colors"
                >
                  <ExternalLink className="w-5 h-5 text-cyan-400" />
                </a>
              </div>
              <p className="text-slate-300 leading-relaxed text-sm">
                Commutateur Ethernet non manageable avec 8 ports RJ45 Gigabit. Compact, silencieux (sans ventilateur), 
                et économe en énergie, idéal pour petite infrastructure réseau d'entreprise avec support 802.1Q.
              </p>
            </div>

            {/* pfSense */}
            <div className="bg-slate-700/30 backdrop-blur-sm border border-slate-600/40 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-cyan-300">pfSense</h3>
                <a 
                  href="https://www.pfsense.org/download/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-cyan-500/20 hover:bg-cyan-500/30 rounded-lg transition-colors"
                >
                  <ExternalLink className="w-5 h-5 text-cyan-400" />
                </a>
              </div>
              <p className="text-slate-300 leading-relaxed text-sm">
                Solution pare-feu open source basée sur FreeBSD. Gère le routage, filtrage des paquets, VLANs, VPN. 
                Rôle central dans la sécurisation et le contrôle du trafic réseau.
              </p>
            </div>

            {/* SNORT */}
            <div className="bg-slate-700/30 backdrop-blur-sm border border-slate-600/40 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-cyan-300">SNORT (sur pfSense)</h3>
                <a 
                  href="https://www.snort.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-cyan-500/20 hover:bg-cyan-500/30 rounded-lg transition-colors"
                >
                  <ExternalLink className="w-5 h-5 text-cyan-400" />
                </a>
              </div>
              <p className="text-slate-300 leading-relaxed text-sm">
                Système de détection d'intrusion (IDS) open source intégré à pfSense. Analyse le trafic en temps réel 
                et identifie les activités suspectes (force brute, scans de ports, malwares).
              </p>
            </div>

            {/* Ubiquiti UniFi u7 lite */}
            <div className="bg-slate-700/30 backdrop-blur-sm border border-slate-600/40 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-cyan-300">Ubiquiti UniFi u7 lite</h3>
                <a 
                  href="https://eu.store.ui.com/eu/fr/products/u7-lite"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-cyan-500/20 hover:bg-cyan-500/30 rounded-lg transition-colors"
                >
                  <ExternalLink className="w-5 h-5 text-cyan-400" />
                </a>
              </div>
              <p className="text-slate-300 leading-relaxed text-sm">
                Point d'accès Wi-Fi 7 nouvelle génération. Performances ultra-rapides, gestion centralisée via UniFi Controller, 
                couverture optimisée. Idéal pour infrastructures réseau modernes nécessitant haute densité et hautes performances.
              </p>
            </div>

            {/* Proxmox VE */}
            <div className="bg-slate-700/30 backdrop-blur-sm border border-slate-600/40 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-cyan-300">Proxmox VE</h3>
                <a 
                  href="https://www.proxmox.com/en/proxmox-ve"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-cyan-500/20 hover:bg-cyan-500/30 rounded-lg transition-colors"
                >
                  <ExternalLink className="w-5 h-5 text-cyan-400" />
                </a>
              </div>
              <p className="text-slate-300 leading-relaxed text-sm">
                Plateforme de virtualisation open source pour VMs (KVM) et conteneurs (LXC). Interface web intuitive 
                pour gestion ressources, sauvegardes, clusters. Optimise l'infrastructure matérielle.
              </p>
            </div>

            {/* Proxmox Backup Server */}
            <div className="bg-slate-700/30 backdrop-blur-sm border border-slate-600/40 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-cyan-300">Proxmox Backup Server</h3>
                <a 
                  href="https://www.proxmox.com/en/proxmox-backup-server"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-cyan-500/20 hover:bg-cyan-500/30 rounded-lg transition-colors"
                >
                  <ExternalLink className="w-5 h-5 text-cyan-400" />
                </a>
              </div>
              <p className="text-slate-300 leading-relaxed text-sm">
                Solution de sauvegarde professionnelle pour Proxmox VE. Sauvegardes rapides, dédupliquées et compressées 
                des VMs. Facilite la restauration et garantit la sécurité des données critiques.
              </p>
            </div>

            {/* Windows */}
            <div className="bg-slate-700/30 backdrop-blur-sm border border-slate-600/40 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-cyan-300">Windows 11 & Server 2025</h3>
                <div className="flex gap-2">
                  <a 
                    href="https://www.microsoft.com/fr-fr/software-download/windows11"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-cyan-500/20 hover:bg-cyan-500/30 rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 text-cyan-400" />
                  </a>
                  <a 
                    href="https://www.microsoft.com/en-us/evalcenter/evaluate-windows-server-2025"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-cyan-500/20 hover:bg-cyan-500/30 rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 text-cyan-400" />
                  </a>
                </div>
              </div>
              <p className="text-slate-300 leading-relaxed text-sm">
                Windows 11 pour postes de travail avec interface moderne et sécurité renforcée. 
                Windows Server 2025 pour serveurs avec rôles Active Directory, DNS, DHCP, gestion centralisée.
              </p>
            </div>

            {/* Linux Ubuntu & Debian */}
            <div className="bg-slate-700/30 backdrop-blur-sm border border-slate-600/40 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-cyan-300">Linux (Ubuntu & Debian)</h3>
                <div className="flex gap-2">
                  <a 
                    href="https://ubuntu.com/download"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-cyan-500/20 hover:bg-cyan-500/30 rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 text-cyan-400" />
                  </a>
                  <a 
                    href="https://www.debian.org/distrib/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-cyan-500/20 hover:bg-cyan-500/30 rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 text-cyan-400" />
                  </a>
                </div>
              </div>
              <p className="text-slate-300 leading-relaxed text-sm">
                Debian réputée pour sa stabilité, Ubuntu basée sur Debian orientée ergonomie. 
                Utilisés pour serveurs web, fichiers, sauvegarde, GLPI, Nextcloud.
              </p>
            </div>

            {/* Active Directory */}
            <div className="bg-slate-700/30 backdrop-blur-sm border border-slate-600/40 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-cyan-300">Active Directory</h3>
                <a 
                  href="https://learn.microsoft.com/fr-fr/windows-server/identity/active-directory-domain-services"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-cyan-500/20 hover:bg-cyan-500/30 rounded-lg transition-colors"
                >
                  <ExternalLink className="w-5 h-5 text-cyan-400" />
                </a>
              </div>
              <p className="text-slate-300 leading-relaxed text-sm">
                Service de domaine Microsoft pour gestion centralisée utilisateurs, ordinateurs, ressources réseau. 
                Politique de sécurité, droits d'accès. Pilier fondamental des réseaux d'entreprise.
              </p>
            </div>

            {/* Exchange */}
            <div className="bg-slate-700/30 backdrop-blur-sm border border-slate-600/40 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-cyan-300">Microsoft Exchange</h3>
                <a 
                  href="https://www.microsoft.com/fr-fr/microsoft-365/exchange/email"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-cyan-500/20 hover:bg-cyan-500/30 rounded-lg transition-colors"
                >
                  <ExternalLink className="w-5 h-5 text-cyan-400" />
                </a>
              </div>
              <p className="text-slate-300 leading-relaxed text-sm">
                Solution de messagerie professionnelle. Gestion emails, calendriers partagés, contacts, tâches. 
                Couplée à Active Directory pour contrôle comptes et sécurité communications.
              </p>
            </div>

            {/* GLPI */}
            <div className="bg-slate-700/30 backdrop-blur-sm border border-slate-600/40 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-cyan-300">GLPI</h3>
                <a 
                  href="https://glpi-project.org/fr/telecharger/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-cyan-500/20 hover:bg-cyan-500/30 rounded-lg transition-colors"
                >
                  <ExternalLink className="w-5 h-5 text-cyan-400" />
                </a>
              </div>
              <p className="text-slate-300 leading-relaxed text-sm">
                Logiciel open source de gestion de parc informatique et helpdesk. Inventaire matériels, 
                gestion tickets incidents, utilisateurs, interventions techniques. Suivi rigoureux du SI.
              </p>
            </div>

            {/* Zabbix */}
            <div className="bg-slate-700/30 backdrop-blur-sm border border-slate-600/40 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-cyan-300">Zabbix</h3>
                <a 
                  href="https://www.zabbix.com/fr/download"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-cyan-500/20 hover:bg-cyan-500/30 rounded-lg transition-colors"
                >
                  <ExternalLink className="w-5 h-5 text-cyan-400" />
                </a>
              </div>
              <p className="text-slate-300 leading-relaxed text-sm">
                Solution open source de supervision réseau. Surveille performances équipements (serveurs, routeurs, services), 
                génère alertes et rapports graphiques. Anticipe incidents et garantit haute disponibilité.
              </p>
            </div>

            {/* Artica Proxy */}
            <div className="bg-slate-700/30 backdrop-blur-sm border border-slate-600/40 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-cyan-300">Artica Proxy</h3>
                <a 
                  href="https://artica-proxy.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-cyan-500/20 hover:bg-cyan-500/30 rounded-lg transition-colors"
                >
                  <ExternalLink className="w-5 h-5 text-cyan-400" />
                </a>
              </div>
              <p className="text-slate-300 leading-relaxed text-sm">
                Solution française open source de proxy web basée sur Squid. Filtre contenus, gère accès Internet, 
                sécurise connexions, génère statistiques. Contrôle navigation web en établissements.
              </p>
            </div>

            {/* Nextcloud */}
            <div className="bg-slate-700/30 backdrop-blur-sm border border-slate-600/40 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-cyan-300">Nextcloud</h3>
                <a 
                  href="https://nextcloud.com/install/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-cyan-500/20 hover:bg-cyan-500/30 rounded-lg transition-colors"
                >
                  <ExternalLink className="w-5 h-5 text-cyan-400" />
                </a>
              </div>
              <p className="text-slate-300 leading-relaxed text-sm">
                Alternative libre à Google Drive/Dropbox. Stockage, synchronisation, partage fichiers avec contrôle total 
                des données. Inclut messagerie, calendriers, visioconférence.
              </p>
            </div>

            {/* OpenVPN */}
            <div className="bg-slate-700/30 backdrop-blur-sm border border-slate-600/40 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-cyan-300">OpenVPN</h3>
                <a 
                  href="https://openvpn.net/community-downloads/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-cyan-500/20 hover:bg-cyan-500/30 rounded-lg transition-colors"
                >
                  <ExternalLink className="w-5 h-5 text-cyan-400" />
                </a>
              </div>
              <p className="text-slate-300 leading-relaxed text-sm">
                Solution VPN open source pour connexions sécurisées entre sites distants ou accès distant réseau interne. 
                Chiffre communications pour confidentialité. Compatible multi-OS, simple à déployer.
              </p>
            </div>

            {/* Cobian Backup */}
            <div className="bg-slate-700/30 backdrop-blur-sm border border-slate-600/40 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-cyan-300">Cobian Backup Gravity 11</h3>
                <a 
                  href="https://www.cobiansoft.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-cyan-500/20 hover:bg-cyan-500/30 rounded-lg transition-colors"
                >
                  <ExternalLink className="w-5 h-5 text-cyan-400" />
                </a>
              </div>
              <p className="text-slate-300 leading-relaxed text-sm">
                Logiciel gratuit de sauvegarde pour Windows. Automatise sauvegarde fichiers vers destinations locales, 
                distantes (FTP), disques externes. Support chiffrement, compression, planification. Idéal postes et petits serveurs.
              </p>
            </div>

          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-8 bg-slate-800/40 backdrop-blur-lg border border-slate-600/40 rounded-2xl p-6 shadow-xl">
          <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <Shield className="w-6 h-6 text-cyan-400" />
            Environnement Technologique
          </h3>
          <div className="text-slate-300 leading-relaxed space-y-3">
            <p>
              <strong className="text-cyan-300">Localisation :</strong> Centre de formation IFC Marseille - Salle réseau
            </p>
            <p>
              <strong className="text-cyan-300">Plot attitré :</strong> S4P2 (Salle 4, Poste 2)
            </p>
            <p>
              <strong className="text-cyan-300">Supervision :</strong> M. Bernard FERNANDEZ, Tuteur de formation
            </p>
            <p>
              <strong className="text-cyan-300">Technologies déployées :</strong> Windows Server 2025, Linux Debian 13/Ubuntu, NETGEAR GS308Ev4, 
              pfSense 2.8.1, Proxmox VE 9.0, Proxmox Backup Server 4.0, Active Directory, DHCP/DNS, VLANs, VPN OpenVPN, Exchange 2019, Zabbix 7.4, GLPI, NextCloud, Ubiquiti UniFi u7 lite
            </p>
          </div>
        </div>
      </div>

      {/* Modal pour agrandir le schéma */}
      <ImageModal 
        isOpen={isSchemaModalOpen}
        onClose={() => setIsSchemaModalOpen(false)}
        imageSrc="/images/infrastructure/Infra_IRATNI_Hocine.png"
        title="Architecture réseau – Infra S4P2 IRATNI Hocine"
      />
    </div>
  )
}

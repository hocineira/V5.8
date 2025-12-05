'use client'

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FadeIn, ScaleIn, StaggerContainer, StaggerItem, AnimatedCard, SlideIn } from '../../../components/animations';

export default function VeilleTechnologique() {
  const [updates, setUpdates] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Fetch updates
  useEffect(() => {
    async function fetchUpdates() {
      try {
        setLoading(true);
        const res = await fetch(`/api/windows/updates?limit=50`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setUpdates(data.updates || []);
        setTotal(data.total || 0);
        setError(false);
      } catch (err) {
        console.error('Error fetching updates:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchUpdates();
  }, []);

  const categories = [
    { key: 'all', label: 'Tous', icon: '📊' },
    { key: 'particuliers', label: 'Particuliers', icon: '💻' },
    { key: 'serveur', label: 'Serveur', icon: '🖥️' },
    { key: 'security', label: 'Sécurité', icon: '🔒' },
    { key: 'entreprise', label: 'Entreprise', icon: '🏢' },
    { key: 'iot', label: 'IoT', icon: '🌐' }
  ];

  const filteredUpdates = selectedCategory === 'all' 
    ? updates 
    : updates.filter(u => u.category === selectedCategory);

  const getCategoryCount = (cat) => {
    if (cat === 'all') return updates.length;
    return updates.filter(u => u.category === cat).length;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getSeverityColor = (severity) => {
    const colors = {
      'Critical': 'bg-red-100 text-red-800 border-red-200',
      'Important': 'bg-orange-100 text-orange-800 border-orange-200',
      'Moderate': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Low': 'bg-blue-100 text-blue-800 border-blue-200'
    };
    return colors[severity] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getCategoryIcon = (category) => {
    const categoryMap = {
      'particuliers': '💻',
      'serveur': '🖥️',
      'security': '🔒',
      'entreprise': '🏢',
      'iot': '🌐',
      'feature': '⭐'
    };
    return categoryMap[category] || '📄';
  };

  // Sections de navigation
  const sections = [
    { id: 'introduction', label: 'Introduction', icon: '➡️' },
    { id: 'avantages', label: 'Avantages', icon: '➡️' },
    { id: 'produits', label: 'Produits clés', icon: '➡️' },
    { id: 'versions', label: 'Versions', icon: '➡️' },
    { id: 'actualites-rss', label: 'Actualités RSS', icon: '➡️' },
    { id: 'historique', label: 'Historique', icon: '➡️' },
    { id: 'securite', label: 'Sécurité', icon: '➡️' },
    { id: 'ressources', label: 'Ressources', icon: '➡️' }
  ];

  // Timeline historique Windows Server
  const timeline = [
    {
      year: '1993',
      title: 'Windows NT 3.1',
      description: 'Première version serveur de Microsoft basée sur le noyau NT (New Technology). Introduction des concepts de domaines et de contrôleur de domaine primaire (PDC).'
    },
    {
      year: '2000',
      title: 'Windows 2000 Server',
      description: "Introduction d'Active Directory, révolutionnant la gestion des identités et ressources. Support de DNS intégré, Group Policy Objects (GPO) et amélioration majeure de la stabilité et de la sécurité."
    },
    {
      year: '2003',
      title: 'Windows Server 2003',
      description: "Amélioration significative des performances et de la gestion. Introduction de l'Assistant de configuration de sécurité et amélioration d'Active Directory avec les contrôleurs de domaine en lecture seule (RODC)."
    },
    {
      year: '2008',
      title: 'Windows Server 2008 et 2008 R2',
      description: "Introduction d'Hyper-V (hyperviseur natif pour la virtualisation). PowerShell devient l'outil d'administration standard. Server Core permet une installation minimale sans interface graphique."
    },
    {
      year: '2012',
      title: 'Windows Server 2012 et 2012 R2',
      description: "Refonte complète de l'interface avec Modern UI. Amélioration majeure d'Hyper-V avec réplication, live migration améliorée. Introduction de Storage Spaces et du système de fichiers ReFS. Support des conteneurs Hyper-V."
    },
    {
      year: '2016',
      title: 'Windows Server 2016',
      description: "Introduction de Nano Server et des conteneurs Windows. Storage Spaces Direct pour le stockage défini par logiciel. Amélioration de la sécurité avec Shielded VMs et Credential Guard."
    },
    {
      year: '2019',
      title: 'Windows Server 2019',
      description: "Support amélioré pour Kubernetes et conteneurs. Intégration plus poussée avec Azure Hybrid : Azure Backup, Azure Monitor, Azure Site Recovery. Amélioration des performances réseau avec SDN."
    },
    {
      year: '2022-2025',
      title: 'Windows Server 2022 et 2025',
      description: "Secured-core server pour une sécurité matérielle renforcée. Support TLS 1.3, HTTPS par défaut. Azure Arc pour la gestion hybride. Windows Server 2025 introduit le Hotpatching (mises à jour sans redémarrage) et améliore encore l'intégration cloud."
    }
  ];

  // Événements marquants
  const milestones = [
    {
      year: '2000',
      title: "Lancement d'Active Directory",
      description: "Révolution dans la gestion des identités avec Active Directory Domain Services, devenant le standard de facto pour les infrastructures d'entreprise."
    },
    {
      year: '2008',
      title: 'Hyper-V intégré',
      description: "Microsoft entre dans la virtualisation d'entreprise avec Hyper-V intégré à Windows Server, concurrençant VMware ESXi."
    },
    {
      year: '2016',
      title: 'Conteneurs Windows',
      description: "Support natif des conteneurs Docker sur Windows, permettant la modernisation des applications et le DevOps sur infrastructure Microsoft."
    },
    {
      year: '2019',
      title: 'Azure Arc et cloud hybride',
      description: "Microsoft unifie la gestion des serveurs on-premise et cloud avec Azure Arc, permettant une vraie stratégie hybride."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* ==================== HEADER SECTION ==================== */}
      <section className="relative overflow-hidden py-12 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container mx-auto px-4">
          <FadeIn delay={0.1}>
            <Link href="/veilles" className="inline-block mb-6">
              <button className="flex items-center space-x-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white transition-colors backdrop-blur-sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Retour aux veilles</span>
              </button>
            </Link>
          </FadeIn>

          <div className="text-center text-white">
            <ScaleIn delay={0.2}>
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm text-4xl">
                  🪟
                </div>
              </div>
            </ScaleIn>

            <FadeIn delay={0.3} direction="up">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Veille Technologique Windows
              </h1>
            </FadeIn>
            
            <FadeIn delay={0.4} direction="up">
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                Découvrez l'écosystème Microsoft pour l'infrastructure d'entreprise : Windows Server, Active Directory, Hyper-V et actualités en temps réel
              </p>
            </FadeIn>

            <FadeIn delay={0.5}>
              <div className="flex flex-wrap justify-center items-center gap-4 mb-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 flex items-center space-x-2">
                  <span className="text-2xl font-bold">{total}</span>
                  <span className="text-blue-100">actualités</span>
                </div>
                
                <button 
                  onClick={() => window.location.reload()}
                  className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 flex items-center space-x-2 hover:bg-white/30 transition-colors"
                >
                  <span>Actualiser RSS</span>
                </button>
              </div>
            </FadeIn>

            {error && (
              <div className="bg-red-500/20 backdrop-blur-sm border border-red-300 text-red-100 px-4 py-2 rounded-lg max-w-md mx-auto">
                ⚠️ Erreur HTTP: 502
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ==================== NAVIGATION SECTIONS ==================== */}
      <section className="py-6 bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="flex items-center space-x-1 px-4 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 transition-all duration-200 text-sm font-medium"
              >
                <span>{section.icon}</span>
                <span>{section.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== SECTION INTRODUCTION ==================== */}
      <section id="introduction" className="py-16 scroll-mt-24">
        <div className="container mx-auto px-4">
          <FadeIn delay={0.2}>
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              Introduction à Windows Server et l'infrastructure Microsoft
            </h2>
          </FadeIn>

          <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
            {/* Video placeholder */}
            <FadeIn delay={0.3} direction="left">
              <div className="bg-slate-900 rounded-2xl overflow-hidden aspect-video flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <div className="text-4xl mb-4">▶️</div>
                  <p className="text-slate-400">Vidéo : Windows Server - Introduction et présentation</p>
                </div>
              </div>
            </FadeIn>

            {/* Content */}
            <FadeIn delay={0.4} direction="right">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Qu'est-ce que Windows Server ?</h3>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Windows Server est une gamme de systèmes d'exploitation serveur développée par Microsoft pour l'infrastructure d'entreprise. Il offre une plateforme robuste pour la gestion des réseaux, des applications, du stockage et de la virtualisation avec des outils intégrés comme Active Directory, Hyper-V, DNS, DHCP et PowerShell.
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    Conçu pour les environnements professionnels, Windows Server permet aux administrateurs système (SISR) de déployer et gérer des infrastructures IT complètes, sécurisées et évolutives. Il s'intègre parfaitement avec Azure pour des architectures cloud hybrides.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-3">Pourquoi Windows Server pour l'infrastructure d'entreprise ?</h4>
                  <ul className="space-y-2">
                    {[
                      { title: 'Intégration complète', desc: 'Active Directory, DNS, DHCP, Group Policy Management' },
                      { title: 'Virtualisation native', desc: 'Hyper-V pour créer et gérer des machines virtuelles' },
                      { title: 'Sécurité avancée', desc: 'Windows Defender, BitLocker, pare-feu avancé' },
                      { title: 'Automatisation', desc: "PowerShell pour l'administration et le scripting" },
                      { title: 'Cloud hybride', desc: 'Intégration native avec Microsoft Azure' }
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-green-500 font-bold">✓</span>
                        <span><strong className="text-slate-900">{item.title}</strong> : {item.desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ==================== SECTION AVANTAGES ==================== */}
      <section id="avantages" className="py-16 bg-white scroll-mt-24">
        <div className="container mx-auto px-4">
          <FadeIn delay={0.2}>
            <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
              Les avantages de Windows Server pour l'entreprise
            </h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-12"></div>
          </FadeIn>

          <StaggerContainer staggerDelay={0.1} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: '✓',
                title: 'Fiabilité et stabilité',
                description: "Windows Server offre une disponibilité maximale avec des fonctionnalités de haute disponibilité (failover clustering), de sauvegarde intégrée et de récupération d'urgence. Les mises à jour de sécurité régulières et le support Long-Term Servicing Channel (LTSC) garantissent une infrastructure stable."
              },
              {
                icon: '🔄',
                title: 'Centralisation de la gestion',
                description: "Active Directory permet de gérer centralement tous les utilisateurs, ordinateurs et ressources. Les Group Policy Objects (GPO) facilitent la configuration uniforme de milliers de postes. PowerShell et Windows Admin Center offrent des outils d'administration modernes et puissants."
              },
              {
                icon: '🔒',
                title: 'Sécurité avancée',
                description: "Windows Defender Advanced Threat Protection (ATP), BitLocker pour le chiffrement des données, Windows Firewall avancé, Credential Guard et AppLocker protègent l'infrastructure contre les menaces modernes. Les certificats AD CS sécurisent les communications."
              },
              {
                icon: '📈',
                title: 'Évolutivité et performance',
                description: "Windows Server s'adapte aux besoins croissants de l'entreprise avec des éditions Standard et Datacenter. Hyper-V permet de consolider les serveurs physiques en machines virtuelles. L'intégration Azure permet une extension cloud transparente."
              }
            ].map((item, idx) => (
              <StaggerItem key={idx}>
                <AnimatedCard>
                  <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6 h-full border border-slate-100 hover:shadow-lg transition-shadow">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 text-white text-2xl">
                      {item.icon}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-3">{item.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </AnimatedCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ==================== SECTION PRODUITS CLÉS ==================== */}
      <section id="produits" className="py-16 scroll-mt-24">
        <div className="container mx-auto px-4">
          <FadeIn delay={0.2}>
            <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
              Produits et composants clés de l'infrastructure Windows
            </h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-12"></div>
          </FadeIn>

          {/* Video placeholder */}
          <FadeIn delay={0.3}>
            <div className="max-w-3xl mx-auto mb-12">
              <div className="bg-slate-900 rounded-2xl overflow-hidden aspect-video flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <div className="text-4xl mb-4">▶️</div>
                  <p className="text-slate-400">Vidéo : Active Directory - Comprendre et déployer</p>
                </div>
              </div>
            </div>
          </FadeIn>

          <StaggerContainer staggerDelay={0.1} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
            {[
              {
                icon: '📁',
                title: 'Active Directory',
                description: "Active Directory Domain Services (AD DS) est le cœur de l'infrastructure Windows. Il gère l'authentification, l'autorisation et la gestion centralisée des utilisateurs, groupes et ordinateurs.",
                features: [
                  'AD DS : Gestion des identités et des ressources',
                  'AD CS : Services de certificats pour le chiffrement',
                  "AD FS : Fédération d'identités et SSO",
                  'Group Policy : Configuration centralisée (GPO)'
                ]
              },
              {
                icon: '💿',
                title: 'Hyper-V',
                description: "Hyper-V est l'hyperviseur de type 1 de Microsoft intégré à Windows Server pour la virtualisation des serveurs et postes de travail avec haute disponibilité.",
                features: [
                  'Virtualisation complète (machines virtuelles)',
                  'Réplication et sauvegarde des VM',
                  'Live Migration : déplacement sans interruption',
                  'Intégration avec System Center et Azure'
                ]
              },
              {
                icon: '🌐',
                title: 'DNS et DHCP',
                description: "Les services DNS et DHCP sont essentiels pour la résolution de noms et l'attribution automatique d'adresses IP dans l'infrastructure réseau.",
                features: [
                  'DNS : Résolution de noms et zones intégrées AD',
                  "DHCP : Attribution automatique d'adresses IP",
                  'Haute disponibilité et basculement',
                  'Gestion centralisée avec IPAM'
                ]
              },
              {
                icon: '⚡',
                title: 'PowerShell',
                description: "PowerShell est le langage de scripting et d'automatisation de Microsoft, indispensable pour l'administration moderne des systèmes Windows.",
                features: [
                  'Automatisation des tâches administratives',
                  'Gestion à distance (PowerShell Remoting)',
                  'Modules pour AD, Hyper-V, Azure, etc.',
                  'Scripts réutilisables et DevOps'
                ]
              }
            ].map((item, idx) => (
              <StaggerItem key={idx}>
                <AnimatedCard>
                  <div className="bg-white rounded-2xl p-6 h-full border border-slate-100 shadow-sm hover:shadow-lg transition-all">
                    <div className="text-3xl mb-4">{item.icon}</div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-slate-600 text-sm mb-4">{item.description}</p>
                    <ul className="space-y-1">
                      {item.features.map((feature, fidx) => (
                        <li key={fidx} className="text-sm text-slate-500 flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </AnimatedCard>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Windows Admin Center */}
          <FadeIn delay={0.5}>
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Windows Admin Center</h3>
              <p className="text-blue-100 mb-6">
                Windows Admin Center est une interface web moderne pour administrer Windows Server, Hyper-V, les clusters de basculement et les PC Windows 10/11. Il remplace les outils MMC traditionnels avec une expérience utilisateur modernisée.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { icon: '🖥️', title: 'Gestion unifiée', desc: 'Interface unique pour tous les serveurs' },
                  { icon: '🌐', title: 'Basé sur le web', desc: "Accessible depuis n'importe quel navigateur" },
                  { icon: '🔧', title: 'Outils intégrés', desc: 'Certificats, pare-feu, stockage, réseaux' }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <h4 className="font-semibold mb-1">{item.title}</h4>
                    <p className="text-sm text-blue-100">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ==================== SECTION VERSIONS ==================== */}
      <section id="versions" className="py-16 bg-white scroll-mt-24">
        <div className="container mx-auto px-4">
          <FadeIn delay={0.2}>
            <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
              Versions et éditions de Windows Server
            </h2>
            <p className="text-slate-600 text-center mb-12 max-w-3xl mx-auto">
              Windows Server est disponible en plusieurs éditions adaptées aux besoins de l'entreprise, du serveur de fichiers simple aux datacenters massifs avec virtualisation intensive.
            </p>
          </FadeIn>

          <StaggerContainer staggerDelay={0.1} className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
            {[
              {
                icon: '🆕',
                title: 'Windows Server 2025',
                badge: 'Dernière version',
                description: "Dernière version avec améliorations en sécurité, performances et intégration cloud hybride.",
                features: [
                  'Sécurité renforcée (Hotpatching)',
                  'Performances réseau améliorées',
                  'Storage Spaces Direct optimisé',
                  'Intégration Azure Arc native'
                ]
              },
              {
                icon: '🏢',
                title: 'Windows Server 2022',
                badge: 'Stable',
                description: "Version stable et largement déployée avec support LTSC jusqu'en 2031.",
                features: [
                  'Secured-core server',
                  'Conteneurs Windows améliorés',
                  'HTTPS et TLS 1.3 par défaut',
                  'Storage Migration Service'
                ]
              },
              {
                icon: '⚖️',
                title: 'Standard vs Datacenter',
                badge: 'Comparaison',
                description: "Deux éditions principales selon les besoins de virtualisation :",
                features: [
                  'Standard : 2 VM Hyper-V maximum',
                  'Datacenter : VM illimitées',
                  'Storage Spaces Direct (Datacenter)',
                  'Shielded VMs (Datacenter)'
                ]
              }
            ].map((item, idx) => (
              <StaggerItem key={idx}>
                <AnimatedCard>
                  <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6 h-full border border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl">{item.icon}</span>
                      <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">{item.badge}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-slate-600 text-sm mb-4">{item.description}</p>
                    <ul className="space-y-2">
                      {item.features.map((feature, fidx) => (
                        <li key={fidx} className="text-sm text-slate-700 flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </AnimatedCard>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Comparaison tableau */}
          <FadeIn delay={0.5}>
            <div className="max-w-3xl mx-auto">
              <h3 className="text-xl font-bold text-slate-900 mb-4 text-center">Comparaison des éditions</h3>
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Fonctionnalité</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900">Standard</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900">Datacenter</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { feature: 'Machines virtuelles Hyper-V', standard: '2 VMs', datacenter: 'Illimitées' },
                      { feature: 'Conteneurs Windows', standard: '✓', datacenter: '✓' },
                      { feature: 'Storage Spaces Direct', standard: '✗', datacenter: '✓' },
                      { feature: 'Shielded Virtual Machines', standard: '✗', datacenter: '✓' },
                      { feature: 'Storage Replica', standard: 'Limitée', datacenter: 'Complète' }
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="px-6 py-4 text-sm text-slate-700">{row.feature}</td>
                        <td className="px-6 py-4 text-center text-sm text-slate-600">{row.standard}</td>
                        <td className="px-6 py-4 text-center text-sm text-slate-600">{row.datacenter}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ==================== SECTION ACTUALITÉS RSS ==================== */}
      <section id="actualites-rss" className="py-16 scroll-mt-24">
        <div className="container mx-auto px-4">
          <FadeIn delay={0.2}>
            <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
              Actualités Windows en Temps Réel
            </h2>
            <p className="text-slate-600 text-center mb-8 max-w-3xl mx-auto">
              Suivez les dernières actualités Windows depuis les sources officielles Microsoft et les médias français spécialisés en infrastructure IT
            </p>
          </FadeIn>

          {/* Categories Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
                  selectedCategory === category.key
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-slate-700 hover:bg-blue-50 shadow-sm border border-slate-200'
                }`}
              >
                <span>{category.icon}</span>
                <span className="font-medium">{category.label}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  selectedCategory === category.key ? 'bg-white/20' : 'bg-slate-100'
                }`}>
                  {getCategoryCount(category.key)}
                </span>
              </button>
            ))}
          </div>

          {/* Updates Grid */}
          {loading ? (
            <div className="text-center py-12">
              <div className="loading-spinner mx-auto mb-4"></div>
              <p className="text-slate-600">Chargement des actualités...</p>
            </div>
          ) : filteredUpdates.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-slate-100">
              <div className="text-4xl mb-4">📰</div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Aucune actualité trouvée</h3>
              <p className="text-slate-600">Aucune actualité n'est disponible pour cette catégorie actuellement.</p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredUpdates.slice(0, 9).map((update, idx) => (
                <AnimatedCard key={update.id || idx} delay={idx * 0.05}>
                  <article className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 h-full flex flex-col">
                    <div className="p-6 pb-4 flex-grow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center text-2xl">
                            {getCategoryIcon(update.category)}
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full border border-green-200">
                                ✓ Microsoft
                              </span>
                              {update.severity && (
                                <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getSeverityColor(update.severity)}`}>
                                  {update.severity}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-slate-500 flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {formatDate(update.published_date)}
                            </p>
                          </div>
                        </div>
                      </div>

                      <h3 className="text-lg font-semibold text-slate-900 mb-3 leading-tight hover:text-blue-600 transition-colors line-clamp-2">
                        {update.title}
                      </h3>
                      
                      <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
                        {update.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {update.version && (
                          <span className="bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full border border-blue-200">
                            {update.version}
                          </span>
                        )}
                        {update.kb_number && (
                          <span className="bg-purple-50 text-purple-700 text-xs font-medium px-3 py-1 rounded-full border border-purple-200">
                            {update.kb_number}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="px-6 pb-6 mt-auto">
                      <div className="bg-slate-50 rounded-xl p-4 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-500 font-medium">Source:</span>
                          <span className="font-semibold text-slate-900 text-right">{update.source}</span>
                        </div>
                      </div>
                      
                      {update.link && (
                        <a 
                          href={update.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl py-3 px-4 flex items-center justify-center space-x-2 transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-lg"
                        >
                          <span className="font-medium">Lire l&apos;article complet</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </article>
                </AnimatedCard>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ==================== SECTION HISTORIQUE ==================== */}
      <section id="historique" className="py-16 bg-gradient-to-br from-slate-50 to-blue-50 scroll-mt-24">
        <div className="container mx-auto px-4">
          <FadeIn delay={0.2}>
            <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
              Évolutions historiques de Windows Server et événements marquants
            </h2>
            <p className="text-slate-600 text-center mb-12 max-w-3xl mx-auto">
              L'histoire de Windows Server reflète l'évolution des besoins en infrastructure IT, depuis les premiers serveurs réseau jusqu'aux architectures cloud hybrides modernes. Voici les grandes étapes à connaître :
            </p>
          </FadeIn>

          {/* Timeline */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 to-indigo-600 hidden md:block"></div>
              
              <div className="space-y-8">
                {timeline.map((item, idx) => (
                  <FadeIn key={idx} delay={0.1 * idx} direction="right">
                    <div className="relative flex gap-6 md:gap-8">
                      {/* Year badge */}
                      <div className="flex-shrink-0 w-16 md:w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg z-10">
                        {item.year.includes('-') ? item.year.split('-')[0] : item.year}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                        <h4 className="text-lg font-bold text-slate-900 mb-2">{item.year} : {item.title}</h4>
                        <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>

          {/* Milestones */}
          <FadeIn delay={0.3}>
            <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">
              Événements marquants dans l'infrastructure Windows
            </h3>
          </FadeIn>

          <StaggerContainer staggerDelay={0.1} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {milestones.map((item, idx) => (
              <StaggerItem key={idx}>
                <AnimatedCard>
                  <div className="bg-white rounded-xl p-6 h-full border border-slate-100 hover:shadow-lg transition-all">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-green-500 font-bold text-lg">✓</span>
                      <span className="text-blue-600 font-bold">{item.year}</span>
                    </div>
                    <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
                    <p className="text-slate-600 text-sm">{item.description}</p>
                  </div>
                </AnimatedCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ==================== SECTION SÉCURITÉ ==================== */}
      <section id="securite" className="py-16 bg-white scroll-mt-24">
        <div className="container mx-auto px-4">
          <FadeIn delay={0.2}>
            <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
              Les enjeux de la sécurité dans l'infrastructure Windows
            </h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-8"></div>
          </FadeIn>

          {/* Video placeholder */}
          <FadeIn delay={0.3}>
            <div className="max-w-3xl mx-auto mb-12">
              <div className="bg-slate-900 rounded-2xl overflow-hidden aspect-video flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <div className="text-4xl mb-4">▶️</div>
                  <p className="text-slate-400">Vidéo : Sécurité Windows Server - Bonnes pratiques</p>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <p className="text-slate-600 text-center mb-12 max-w-4xl mx-auto">
              La sécurité est un pilier fondamental de l'infrastructure Windows Server. Avec l'augmentation des cyberattaques ciblant les Active Directory et les serveurs d'entreprise, Microsoft a intégré de nombreuses fonctionnalités de sécurité avancées pour protéger l'infrastructure.
            </p>
          </FadeIn>

          {/* Security Features */}
          <StaggerContainer staggerDelay={0.1} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
            {[
              {
                icon: '🛡️',
                title: 'Windows Defender et Antivirus',
                description: "Windows Defender ATP (Advanced Threat Protection) offre une protection en temps réel contre les malwares, ransomwares et menaces zero-day. Il inclut la détection comportementale, l'isolation des processus suspects et l'intégration avec Microsoft Sentinel pour le SIEM."
              },
              {
                icon: '🔐',
                title: 'BitLocker et chiffrement',
                description: "BitLocker chiffre les disques durs pour protéger les données au repos. Il utilise le TPM (Trusted Platform Module) pour garantir l'intégrité du système au démarrage. Combiné avec EFS (Encrypting File System), il offre une protection multicouche des données sensibles."
              },
              {
                icon: '📋',
                title: 'Group Policy et AppLocker',
                description: "Les Group Policy Objects (GPO) permettent d'appliquer des politiques de sécurité uniformes sur tous les postes et serveurs. AppLocker contrôle quelles applications peuvent s'exécuter, empêchant l'exécution de logiciels non autorisés ou malveillants."
              },
              {
                icon: '🔑',
                title: 'Credential Guard et LAPS',
                description: "Credential Guard utilise la virtualisation pour isoler les secrets d'authentification. LAPS (Local Administrator Password Solution) gère automatiquement les mots de passe des comptes administrateurs locaux, réduisant les risques de mouvement latéral lors d'attaques."
              }
            ].map((item, idx) => (
              <StaggerItem key={idx}>
                <AnimatedCard>
                  <div className="bg-gradient-to-br from-slate-50 to-red-50 rounded-xl p-6 h-full border border-slate-200">
                    <div className="text-3xl mb-4">{item.icon}</div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </AnimatedCard>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Threats and Best Practices */}
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <FadeIn delay={0.5} direction="left">
              <div className="bg-red-50 rounded-2xl p-6 border border-red-100">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Menaces spécifiques à l'infrastructure Windows</h3>
                <ul className="space-y-3">
                  {[
                    { title: 'Pass-the-Hash et Pass-the-Ticket', desc: 'Attaques ciblant les credentials Kerberos et NTLM stockés en mémoire.' },
                    { title: 'Attaques sur Active Directory', desc: 'Élévation de privilèges, Golden Ticket, DCSync pour compromettre le contrôleur de domaine.' },
                    { title: 'Ransomwares ciblés', desc: "Chiffrement des partages réseau SMB et des sauvegardes pour paralyser l'entreprise." },
                    { title: 'Exploitation de vulnérabilités', desc: "CVE non patchées (PrintNightmare, EternalBlue, Zerologon) permettant l'accès aux serveurs." }
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      <div>
                        <strong className="text-slate-900">{item.title}</strong> : <span className="text-slate-600">{item.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={0.5} direction="right">
              <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Bonnes pratiques de sécurité</h3>
                <ul className="space-y-2">
                  {[
                    'Appliquer les mises à jour de sécurité mensuelles (Patch Tuesday)',
                    'Implémenter le principe du moindre privilège (Least Privilege)',
                    'Activer l\'authentification multifacteur (MFA) pour les comptes privilégiés',
                    'Segmenter le réseau avec des VLANs et des pare-feu internes',
                    'Auditer régulièrement les logs Active Directory et Windows Event Logs',
                    'Sauvegarder régulièrement avec des sauvegardes hors ligne (air-gapped)',
                    'Former les administrateurs aux techniques d\'attaque modernes'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start text-sm">
                      <span className="text-green-500 mr-2 font-bold">✓</span>
                      <span className="text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ==================== SECTION RESSOURCES ==================== */}
      <section id="ressources" className="py-16 scroll-mt-24">
        <div className="container mx-auto px-4">
          <FadeIn delay={0.2}>
            <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
              Pour aller plus loin
            </h2>
            <p className="text-slate-600 text-center mb-12 max-w-3xl mx-auto">
              Approfondir Windows Server et l'infrastructure Microsoft implique de maîtriser les produits, les outils d'administration, la sécurité et de se certifier pour valider ses compétences.
            </p>
          </FadeIn>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
            {/* Documentation */}
            <FadeIn delay={0.3}>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 h-full">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  📚 Documentation officielle
                </h3>
                <ul className="space-y-3">
                  {[
                    { label: 'Microsoft Learn - Windows Server', url: 'https://learn.microsoft.com/windows-server/' },
                    { label: 'PowerShell Documentation', url: 'https://learn.microsoft.com/powershell/' },
                    { label: 'Azure Arc pour serveurs hybrides', url: 'https://learn.microsoft.com/azure/azure-arc/' },
                    { label: 'Microsoft Tech Community', url: 'https://techcommunity.microsoft.com/' }
                  ].map((item, idx) => (
                    <li key={idx}>
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-2">
                        <span>•</span>
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            {/* Certifications */}
            <FadeIn delay={0.4}>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 h-full">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  🎓 Certifications recommandées
                </h3>
                <ul className="space-y-3">
                  {[
                    { code: 'AZ-800', name: 'Administering Windows Server Hybrid Core Infrastructure' },
                    { code: 'AZ-801', name: 'Configuring Windows Server Hybrid Advanced Services' },
                    { code: 'SC-300', name: 'Microsoft Identity and Access Administrator' },
                    { code: 'AZ-104', name: 'Microsoft Azure Administrator' }
                  ].map((cert, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-blue-500">•</span>
                      <div>
                        <strong className="text-blue-700">{cert.code}</strong> : {cert.name}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            {/* Communautés */}
            <FadeIn delay={0.5}>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 h-full">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Communautés francophones</h3>
                <div className="space-y-4">
                  {[
                    { name: 'IT-Connect', desc: 'Tutoriels et actualités Windows Server' },
                    { name: 'Microsoft France', desc: 'Blog officiel et webinaires' },
                    { name: 'Reddit r/sysadmin', desc: "Communauté internationale d'admins sys" }
                  ].map((community, idx) => (
                    <div key={idx} className="bg-slate-50 rounded-xl p-4">
                      <h4 className="font-semibold text-slate-900">{community.name}</h4>
                      <p className="text-sm text-slate-600">{community.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ==================== CTA SECTION ==================== */}
      <section className="py-16 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <FadeIn delay={0.2}>
            <h2 className="text-3xl font-bold mb-4 text-white">
              Passionné par l'infrastructure Windows ?
            </h2>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              Discutons des technologies Microsoft, de l'infrastructure d'entreprise et des architectures SISR. Windows Server est au cœur de l'IT moderne !
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.location.href = 'mailto:hocineira@gmail.com'}
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
              >
                <span>Me contacter</span>
              </button>
              <Link href="/veilles">
                <button className="border border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2">
                  <span>Retour aux veilles</span>
                </button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

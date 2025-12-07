'use client'

import { 
  Building, 
  Calendar,
  MapPin,
  Clock,
  Users,
  Network,
  Server,
  Settings,
  Monitor,
  Smartphone,
  Wrench,
  ArrowLeft,
  CheckCircle,
  Eye,
  Download,
  X,
  Camera,
  Cpu
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'

export default function StagesPage() {
  const [selectedImage, setSelectedImage] = useState(null)
  
  const stageInfo = {
    entreprise: 'Sauvegarde13',
    periode: 'Mars 2025 - Mai 2025',
    duree: '1 mois',
    lieu: 'Marseille, France',
    type: 'Stage d\'observation et pratique',
    secteur: 'Association d\'aide sociale',
    description: 'Association implantée dans les Bouches-du-Rhône depuis 1935, spécialisée dans l\'accompagnement de personnes en situation de handicap, la protection de l\'enfant et l\'accueil de la petite enfance.'
  }

  const missions = [
    {
      title: 'Infrastructure réseau et télécommunications',
      description: 'Installation de prises RJ45 murales et intervention sur équipements PON Nokia avec solution de secours 5G Zyxel',
      icon: Network,
      category: 'Infrastructure'
    },
    {
      title: 'Support mobile et téléphonie d\'entreprise',
      description: 'Réparation/diagnostic téléphones et flash ROM avec sécurité KNOX Samsung pour enrollment professionnel',
      icon: Smartphone,
      category: 'Mobile'
    },
    {
      title: 'Maintenance informatique avancée',
      description: 'Diagnostic et réparation ordinateurs, optimisation avec ajout SSD NVMe pour performances optimales',
      icon: Wrench,
      category: 'Maintenance'
    },
    {
      title: 'Environnement technique et atelier',
      description: 'Organisation et gestion de l\'espace de travail technique pour interventions et diagnostics',
      icon: Settings,
      category: 'Atelier'
    }
  ]

  // Organisation des images par catégories pour une meilleure présentation
  const imagesOrganisees = {
    infrastructure: [
      { id: 1, src: '/images/stages/raccordement_rj45_murale.jpg', alt: 'Raccordement RJ45 murale', title: 'Installation prise RJ45 murale', category: 'Infrastructure' },
      { id: 9, src: '/images/stages/intervention_pon_nokia_zyxel.jpg', alt: 'Intervention PON Nokia défectueux', title: 'Remplacement PON Nokia + antenne 5G Zyxel secours', category: 'Infrastructure' },
    ],
    mobile: [
      { id: 2, src: '/images/stages/reparation_diagnostic_telephone.jpg', alt: 'Réparation téléphone entreprise', title: 'Diagnostic et réparation téléphone professionnel', category: 'Mobile' },
      { id: 3, src: '/images/stages/flash_rom_knox_samsung_1.jpg', alt: 'Flash ROM KNOX Samsung', title: 'Flash ROM sécurité KNOX Samsung (enrollment)', category: 'Mobile' },
      { id: 4, src: '/images/stages/flash_rom_knox_samsung_2.jpg', alt: 'Flash ROM KNOX avec logiciel adapté', title: 'Flash ROM KNOX Samsung avec logiciel professionnel', category: 'Mobile' },
    ],
    maintenance: [
      { id: 7, src: '/images/stages/reparation_diagnostic_ordinateur.jpg', alt: 'Réparation ordinateur', title: 'Diagnostic et réparation ordinateur', category: 'Maintenance' },
      { id: 8, src: '/images/stages/ajout_ssd_nvme.jpg', alt: 'Installation SSD NVMe', title: 'Ajout SSD NVMe pour rapidité et fiabilité optimale', category: 'Maintenance' },
    ],
    atelier: [
      { id: 5, src: '/images/stages/atelier_travail_1.jpg', alt: 'Atelier technique principal', title: 'Environnement de travail - Atelier principal', category: 'Atelier' },
      { id: 6, src: '/images/stages/atelier_travail_2.jpg', alt: 'Atelier technique secondaire', title: 'Environnement de travail - Atelier secondaire', category: 'Atelier' },
    ]
  }

  // Toutes les images dans un seul tableau pour la modal
  const images = [
    ...imagesOrganisees.infrastructure,
    ...imagesOrganisees.mobile,
    ...imagesOrganisees.maintenance,
    ...imagesOrganisees.atelier
  ]

  // État pour le filtre des catégories
  const [filtreActif, setFiltreActif] = useState('tous')

  const competences = [
    { nom: 'Installation réseau et télécoms', niveau: '90%' },
    { nom: 'Flash ROM et sécurité mobile', niveau: '85%' },
    { nom: 'Diagnostic et réparation PC', niveau: '90%' },
    { nom: 'Optimisation hardware (SSD)', niveau: '85%' },
    { nom: 'Intervention technique terrain', niveau: '95%' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/10">
      {/* Navigation Spacing */}
      <div className="h-16 md:h-20"></div>

      {/* Back Button */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link 
          href="/a-propos" 
          className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour à À propos</span>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6 shadow-lg">
            <Building className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Mes Stages
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Découvrez mon expérience professionnelle en entreprise
          </p>
        </div>
      </section>

      {/* Stage Info Cards */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl mb-12">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl md:text-4xl flex items-center justify-center gap-3">
                <Building className="w-8 h-8 text-blue-600" />
                Stage chez {stageInfo.entreprise}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg">
                  <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">Période</h3>
                  <p className="text-gray-600 dark:text-gray-300">{stageInfo.periode}</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg">
                  <Clock className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">Durée</h3>
                  <p className="text-gray-600 dark:text-gray-300">{stageInfo.duree}</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg">
                  <MapPin className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">Lieu</h3>
                  <p className="text-gray-600 dark:text-gray-300">{stageInfo.lieu}</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg">
                  <Settings className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">Type</h3>
                  <p className="text-gray-600 dark:text-gray-300">{stageInfo.type}</p>
                </div>
              </div>

              <div className="text-center">
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-4xl mx-auto mb-6">
                  Durant ce stage de 1 mois chez <strong>Sauvegarde13</strong>, j'ai eu l'opportunité de mettre en pratique 
                  mes connaissances théoriques acquises en BTS SIO SISR. Cette expérience m'a permis de découvrir 
                  le monde professionnel de l'informatique et de développer mes compétences techniques dans un environnement réel.
                </p>
                <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
                  {stageInfo.description}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* À propos de Sauvegarde13 */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Image
                  src="/images/stages/sauvegarde13_logo.png"
                  alt="Logo Sauvegarde13"
                  width={200}
                  height={80}
                  className="h-16 w-auto"
                />
              </div>
              <CardTitle className="text-2xl md:text-3xl flex items-center justify-center gap-3">
                <Building className="w-8 h-8 text-blue-600" />
                À propos de Sauvegarde13
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Une association historique
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    <strong>Sauvegarde13</strong> est une association implantée dans les Bouches-du-Rhône depuis <strong>1935</strong>. 
                    Elle s'est développée au fil du temps dans l'objectif de renforcer le lien social et les solidarités.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Au quotidien, elle mène des missions diversifiées et participe à la mise en œuvre des politiques publiques 
                    en accueillant et en accompagnant des <strong>personnes en situation de handicap</strong>, des <strong>enfants et jeunes majeurs à protéger</strong>, 
                    ainsi que des <strong>jeunes enfants et leurs familles</strong>.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-lg border-l-4 border-blue-600">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Protection de l'enfant</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Accompagnement, prévention, médiation et soutien à la parentalité</p>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-lg border-l-4 border-green-600">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Handicap</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Accueil, éducation, soin et accompagnement des personnes en situation de handicap</p>
                  </div>
                  <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-lg border-l-4 border-purple-600">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Petite enfance</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Accueil collectif et contribution à l'insertion sociale d'enfants en difficulté</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Environnement de Travail - Design Moderne */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50/70 to-indigo-50/80 dark:from-slate-900/70 dark:via-blue-900/30 dark:to-indigo-900/40 relative overflow-hidden">
        {/* Éléments décoratifs de fond */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-cyan-400/5 to-blue-400/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* En-tête de section moderne */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-6 shadow-2xl">
              <Settings className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Environnement de Travail
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Découvrez l'atelier technique professionnel de Sauvegarde13, conçu pour l'excellence en maintenance IT
            </p>
          </div>

          {/* Grille principale avec design cards modernes */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-12">
            
            {/* Galerie Photos - Plus large */}
            <div className="xl:col-span-2">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/20 overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-gray-700/50">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                    <Camera className="w-6 h-6 mr-3 text-blue-600" />
                    Galerie de l'Atelier
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">Espaces de travail optimisés pour la maintenance IT</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                  {/* Atelier Principal */}
                  <div 
                    className="group relative overflow-hidden cursor-pointer min-h-[300px] hover:z-10 transition-all duration-500"
                    onClick={() => setSelectedImage(imagesOrganisees.atelier[0])}
                  >
                    <Image
                      src="/images/stages/atelier_travail_1.jpg"
                      alt="Atelier technique principal"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-600/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500">
                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-md rounded-2xl p-4">
                          <h4 className="text-white font-bold text-lg mb-2 flex items-center">
                            <Monitor className="w-5 h-5 mr-2" />
                            Atelier Principal
                          </h4>
                          <p className="text-white/90 text-sm">Zone principale de diagnostic et réparation</p>
                        </div>
                      </div>
                      <div className="absolute top-4 left-4">
                        <span className="px-4 py-2 bg-blue-600/90 text-white rounded-full text-sm font-medium backdrop-blur-sm">
                          Zone Principale
                        </span>
                      </div>
                    </div>
                    
                    {/* Icône d'agrandissement */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/30 backdrop-blur-md rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                        <Eye className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Atelier Secondaire */}
                  <div 
                    className="group relative overflow-hidden cursor-pointer min-h-[300px] hover:z-10 transition-all duration-500"
                    onClick={() => setSelectedImage(imagesOrganisees.atelier[1])}
                  >
                    <Image
                      src="/images/stages/atelier_travail_2.jpg"
                      alt="Atelier technique secondaire"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/90 via-indigo-600/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500">
                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-md rounded-2xl p-4">
                          <h4 className="text-white font-bold text-lg mb-2 flex items-center">
                            <Wrench className="w-5 h-5 mr-2" />
                            Atelier Spécialisé
                          </h4>
                          <p className="text-white/90 text-sm">Zone dédiée aux interventions complexes</p>
                        </div>
                      </div>
                      <div className="absolute top-4 right-4">
                        <span className="px-4 py-2 bg-indigo-600/90 text-white rounded-full text-sm font-medium backdrop-blur-sm">
                          Zone Spécialisée
                        </span>
                      </div>
                    </div>
                    
                    {/* Icône d'agrandissement */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/30 backdrop-blur-md rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                        <Eye className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Panneau d'informations - Plus compact */}
            <div className="space-y-6">

              {/* Équipements */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/20 p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <Cpu className="w-5 h-5 mr-3 text-orange-600" />
                  Équipements Disponibles
                </h3>
                
                <div className="space-y-3">
                  {[
                    { icon: Monitor, name: "Stations de diagnostic", color: "blue" },
                    { icon: Wrench, name: "Outils spécialisés IT", color: "green" },
                    { icon: Cpu, name: "Bancs de test", color: "purple" },
                    { icon: Building, name: "Zones sécurisées", color: "orange" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center p-3 rounded-xl bg-gray-50/80 dark:bg-gray-700/30 hover:bg-gray-100/80 dark:hover:bg-gray-700/50 transition-colors duration-200 group">
                      <div className={`w-10 h-10 bg-gradient-to-br from-${item.color}-500 to-${item.color}-600 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200`}>
                        <item.icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section Activités - Design horizontal */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/20 overflow-hidden">
            <div className="p-8">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center mr-4">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Activités Réalisées dans l'Atelier</h3>
                  <p className="text-gray-600 dark:text-gray-300">Interventions techniques spécialisées</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    icon: Monitor,
                    title: "Diagnostic & Réparation",
                    desc: "Diagnostic et réparation d'ordinateurs professionnels",
                    color: "blue"
                  },
                  {
                    icon: Cpu,
                    title: "Installation Composants", 
                    desc: "Installation et configuration SSD NVMe",
                    color: "green"
                  },
                  {
                    icon: Smartphone,
                    title: "Sécurisation Mobile",
                    desc: "Flash ROM et sécurisation KNOX Samsung",
                    color: "purple"
                  },
                  {
                    icon: CheckCircle,
                    title: "Tests & Validation",
                    desc: "Tests et validation du matériel configuré",
                    color: "orange"
                  },
                  {
                    icon: Settings,
                    title: "Préparation Équipements",
                    desc: "Préparation pour nouveaux employés",
                    color: "cyan"
                  },
                  {
                    icon: Wrench,
                    title: "Maintenance Préventive",
                    desc: "Entretien et optimisation système",
                    color: "pink"
                  }
                ].map((activite, index) => (
                  <div key={index} className="group bg-gradient-to-br from-gray-50/80 to-white/80 dark:from-gray-700/30 dark:to-gray-800/30 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100/50 dark:border-gray-600/20">
                    <div className={`w-12 h-12 bg-gradient-to-br from-${activite.color}-500 to-${activite.color}-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <activite.icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {activite.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      {activite.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer avec badges */}
            <div className="bg-gradient-to-r from-gray-50/80 to-blue-50/80 dark:from-gray-800/50 dark:to-blue-900/20 px-8 py-6 border-t border-gray-100/50 dark:border-gray-700/30">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center">
                    <Building className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Environnement Professionnel</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Espace Optimisé</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                    ⚡ Haute Performance
                  </span>
                  <span className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
                    ✅ Certifié Qualité
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Missions Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-gray-800/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Mes Missions
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Les différentes tâches et responsabilités qui m'ont été confiées
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {missions.map((mission, index) => {
              const Icon = mission.icon
              return (
                <Card key={index} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {mission.title}
                          </h3>
                          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">
                            {mission.category}
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300">
                          {mission.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Photos Section - Galerie Organisée par Catégories */}
      <section id="galerie-missions" className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Galerie de mes Missions
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Aperçu visuel de mon travail quotidien organisé par domaines de compétences
            </p>
            
            {/* Filtres de catégories */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <button
                onClick={() => setFiltreActif('tous')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  filtreActif === 'tous' 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                Toutes les missions (9)
              </button>
              <button
                onClick={() => setFiltreActif('infrastructure')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  filtreActif === 'infrastructure' 
                    ? 'bg-purple-600 text-white shadow-lg' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                Infrastructure (2)
              </button>
              <button
                onClick={() => setFiltreActif('mobile')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  filtreActif === 'mobile' 
                    ? 'bg-green-600 text-white shadow-lg' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                Mobile & Téléphonie (3)
              </button>
              <button
                onClick={() => setFiltreActif('maintenance')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  filtreActif === 'maintenance' 
                    ? 'bg-orange-600 text-white shadow-lg' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                Maintenance (2)
              </button>
              <button
                onClick={() => setFiltreActif('atelier')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  filtreActif === 'atelier' 
                    ? 'bg-indigo-600 text-white shadow-lg' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                Atelier (2)
              </button>
            </div>
          </div>

          {/* Galerie par catégories */}
          {filtreActif === 'tous' && (
            <div className="space-y-12">
              {/* Section Infrastructure */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <div className="w-3 h-8 bg-gradient-to-b from-purple-500 to-purple-600 rounded-full mr-3"></div>
                  Infrastructure & Télécommunications
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {imagesOrganisees.infrastructure.map((image) => (
                    <div
                      key={image.id}
                      className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2"
                      onClick={() => setSelectedImage(image)}
                    >
                      <div className="relative overflow-hidden h-48 md:h-56">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 transform scale-0 group-hover:scale-100 transition-transform duration-300">
                              <Eye className="w-8 h-8 text-white" />
                            </div>
                          </div>
                        </div>
                        <div className="absolute top-3 left-3">
                          <span className="px-3 py-1 text-xs font-medium bg-purple-600/90 text-white rounded-full backdrop-blur-sm">
                            {image.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                          {image.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                          {image.alt}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section Mobile & Téléphonie */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <div className="w-3 h-8 bg-gradient-to-b from-green-500 to-green-600 rounded-full mr-3"></div>
                  Support Mobile & Téléphonie
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {imagesOrganisees.mobile.map((image) => (
                    <div
                      key={image.id}
                      className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2"
                      onClick={() => setSelectedImage(image)}
                    >
                      <div className="relative overflow-hidden h-48 md:h-56">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          sizes="(max-width: 1024px) 100vw, 33vw"
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 transform scale-0 group-hover:scale-100 transition-transform duration-300">
                              <Eye className="w-8 h-8 text-white" />
                            </div>
                          </div>
                        </div>
                        <div className="absolute top-3 left-3">
                          <span className="px-3 py-1 text-xs font-medium bg-green-600/90 text-white rounded-full backdrop-blur-sm">
                            {image.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">
                          {image.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                          {image.alt}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section Maintenance */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <div className="w-3 h-8 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full mr-3"></div>
                  Maintenance Informatique
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {imagesOrganisees.maintenance.map((image) => (
                    <div
                      key={image.id}
                      className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2"
                      onClick={() => setSelectedImage(image)}
                    >
                      <div className="relative overflow-hidden h-48 md:h-56">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 transform scale-0 group-hover:scale-100 transition-transform duration-300">
                              <Eye className="w-8 h-8 text-white" />
                            </div>
                          </div>
                        </div>
                        <div className="absolute top-3 left-3">
                          <span className="px-3 py-1 text-xs font-medium bg-orange-600/90 text-white rounded-full backdrop-blur-sm">
                            {image.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300">
                          {image.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                          {image.alt}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section Atelier */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <div className="w-3 h-8 bg-gradient-to-b from-indigo-500 to-indigo-600 rounded-full mr-3"></div>
                  Environnement de Travail
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {imagesOrganisees.atelier.map((image) => (
                    <div
                      key={image.id}
                      className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2"
                      onClick={() => setSelectedImage(image)}
                    >
                      <div className="relative overflow-hidden h-48 md:h-56">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 transform scale-0 group-hover:scale-100 transition-transform duration-300">
                              <Eye className="w-8 h-8 text-white" />
                            </div>
                          </div>
                        </div>
                        <div className="absolute top-3 left-3">
                          <span className="px-3 py-1 text-xs font-medium bg-indigo-600/90 text-white rounded-full backdrop-blur-sm">
                            {image.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                          {image.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                          {image.alt}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Galerie filtrée par catégorie */}
          {filtreActif !== 'tous' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {imagesOrganisees[filtreActif].map((image) => (
                <div
                  key={image.id}
                  className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2"
                  onClick={() => setSelectedImage(image)}
                >
                  <div className="relative overflow-hidden h-48 md:h-56">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 transform scale-0 group-hover:scale-100 transition-transform duration-300">
                          <Eye className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-3 left-3">
                      <span className={`px-3 py-1 text-xs font-medium text-white rounded-full backdrop-blur-sm ${
                        filtreActif === 'infrastructure' ? 'bg-purple-600/90' :
                        filtreActif === 'mobile' ? 'bg-green-600/90' :
                        filtreActif === 'maintenance' ? 'bg-orange-600/90' :
                        'bg-indigo-600/90'
                      }`}>
                        {image.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className={`font-semibold text-lg text-gray-900 dark:text-white mb-2 transition-colors duration-300 ${
                      filtreActif === 'infrastructure' ? 'group-hover:text-purple-600 dark:group-hover:text-purple-400' :
                      filtreActif === 'mobile' ? 'group-hover:text-green-600 dark:group-hover:text-green-400' :
                      filtreActif === 'maintenance' ? 'group-hover:text-orange-600 dark:group-hover:text-orange-400' :
                      'group-hover:text-indigo-600 dark:group-hover:text-indigo-400'
                    }`}>
                      {image.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {image.alt}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Statistics */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">9</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Photos de missions</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">4</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Types de missions</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">1</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Mois d'expérience</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">100%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Missions réussies</div>
            </div>
          </div>
        </div>
      </section>

      {/* Compétences développées */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-gray-800/20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Compétences Développées
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Les compétences techniques acquises durant ce stage
            </p>
          </div>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-8">
              <div className="space-y-6">
                {competences.map((competence, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-medium text-gray-900 dark:text-white">
                        {competence.nom}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {competence.niveau}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: competence.niveau }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Modal pour les images */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md" onClick={() => setSelectedImage(null)}>
          <div className="max-w-5xl max-h-[90vh] m-4 relative">
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10 bg-black/20 backdrop-blur-sm rounded-full p-2"
            >
              <X className="w-8 h-8" />
            </button>
            
            {/* Navigation Buttons */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                const currentIndex = images.findIndex(img => img.id === selectedImage.id)
                const prevIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1
                setSelectedImage(images[prevIndex])
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 bg-black/20 backdrop-blur-sm rounded-full p-3"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation()
                const currentIndex = images.findIndex(img => img.id === selectedImage.id)
                const nextIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0
                setSelectedImage(images[nextIndex])
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 bg-black/20 backdrop-blur-sm rounded-full p-3"
            >
              <ArrowLeft className="w-6 h-6 rotate-180" />
            </button>
            
            {/* Image */}
            <div className="relative">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                width={1200}
                height={800}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              />
            </div>
            
            {/* Image Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-6 rounded-b-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-1">{selectedImage.title}</h3>
                  <p className="text-gray-300">{selectedImage.alt}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400">Mission {selectedImage.id}/9</div>
                  <div className="text-xs text-gray-500">Stage Sauvegarde13</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Spacing */}
      <div className="h-20 md:h-8"></div>
    </div>
  )
}
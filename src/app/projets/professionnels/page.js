'use client'

import { Badge } from '../../../components/ui/badge'
import { Button } from '../../../components/ui/button'
import { 
  Clock, ArrowLeft, Building, Calendar, 
  Construction, Wrench, Users
} from 'lucide-react'
import Link from 'next/link'

export default function ProjetsE5() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          {/* Navigation breadcrumb */}
          <div className="mb-8">
            <Link 
              href="/projets" 
              className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour aux Projets
            </Link>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg mb-6">
              <Building className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Projets Professionnels{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                E5
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto px-4">
              Cette section sera bientôt disponible avec tous mes projets professionnels réalisés dans le cadre de l'épreuve E5 du BTS SIO SISR.
            </p>
          </div>
        </div>
      </div>

      {/* Coming Soon Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border-0">
          <div className="p-8 sm:p-12 text-center">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full shadow-lg mb-8">
              <Construction className="w-12 h-12 text-white" />
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              À Venir
            </h2>

            {/* Description */}
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Je travaille actuellement sur la documentation et la présentation de mes projets professionnels E5. 
              Cette section contiendra bientôt mes réalisations en entreprise avec des études de cas détaillées.
            </p>

            {/* Features Coming */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              <div className="flex items-center space-x-3 text-left">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Building className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Projets Entreprise</h3>
                  <p className="text-sm text-gray-600">Expériences professionnelles</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 text-left">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Wrench className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Solutions Techniques</h3>
                  <p className="text-sm text-gray-600">Architectures déployées</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 text-left">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Cas d'Usage</h3>
                  <p className="text-sm text-gray-600">Retours d'expérience</p>
                </div>
              </div>
            </div>

            {/* Status Badge */}
            <div className="flex justify-center mb-8">
              <Badge className="bg-orange-100 text-orange-800 px-6 py-3 text-base">
                <Clock className="w-4 h-4 mr-2" />
                En cours de préparation
              </Badge>
            </div>

            {/* Call to Action */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
                asChild
              >
                <Link href="/projets">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Voir toutes les procédures
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-bold py-3 px-8 rounded-xl transform hover:scale-105 transition-all duration-200"
                asChild
              >
                <Link href="/projets/scolaires">
                  <Building className="w-5 h-5 mr-2" />
                  Projets Scolaires E6
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Timeline hint */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 text-gray-500">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">Mise à jour prévue : Bientôt</span>
          </div>
        </div>
      </div>
    </div>
  )
}
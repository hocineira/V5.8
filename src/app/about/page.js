'use client'

import { 
  User, 
  GraduationCap, 
  MapPin, 
  Calendar,
  Heart
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
      {/* Navigation Spacing */}
      <div className="h-16 md:h-20"></div>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6 shadow-lg">
            <User className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            A propos de moi
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Decouvrez mon parcours, mes competences et ma passion pour l'informatique
          </p>

          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-2 bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-sm">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-gray-700">Marseille, France</span>
            </div>
            <div className="flex items-center justify-center space-x-2 bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-sm">
              <Calendar className="w-4 h-4 text-green-600" />
              <span className="text-sm text-gray-700">20 ans</span>
            </div>
            <div className="flex items-center justify-center space-x-2 bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-sm">
              <GraduationCap className="w-4 h-4 text-purple-600" />
              <span className="text-sm text-gray-700">BTS SIO SISR</span>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Presentation */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl md:text-3xl flex items-center justify-center gap-3">
                <Heart className="w-8 h-8 text-red-500" />
                Ma presentation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-lg text-gray-700 leading-relaxed">
                <p className="mb-4">
                  Je suis <strong>passionne par tout ce qui touche a l'informatique et aux nouvelles technologies</strong>. 
                  Apprenant et travaillant en equipe et cherchant a trouver des solutions aux problemes, 
                  je suis desireux de contribuer positivement a tout projet qui me sera confie.
                </p>
                <p>
                  Actuellement etudiant en <strong>deuxieme annee de BTS Services Informatiques aux Organisations (option SISR)</strong>, 
                  je suis a la recherche d'une alternance dans le domaine de l'administration des systemes et reseaux.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Bottom Spacing */}
      <div className="h-20 md:h-8"></div>
    </div>
  )
}
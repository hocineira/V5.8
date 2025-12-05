'use client';

import { useState, useEffect } from 'react';

export default function VeilleStarlink() {
  const [updates, setUpdates] = useState([]);
  const [stats, setStats] = useState({ total: 0 });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Données de fallback en cas d'erreur
  const fallbackUpdates = [
    {
      id: '1',
      title: 'SpaceX Lance 23 Satellites Starlink avec Succès',
      description: 'SpaceX a lancé avec succès 23 satellites Starlink supplémentaires en orbite basse terrestre, étendant la constellation internet globale pour améliorer la couverture mondiale.',
      link: 'https://spacenews.com/spacex-starlink-launch',
      published_date: '2024-12-15T10:30:00.000Z',
      category: 'spacex',
      mission: 'Starlink 6-77',
      satellite_count: 23,
      source: 'SpaceNews - SpaceX',
      tags: ['starlink', 'launch', 'satellite']
    },
    {
      id: '2',
      title: 'Starlink Atteint 5000 Satellites en Orbite',
      description: 'La constellation Starlink franchit une nouvelle étape importante avec plus de 5000 satellites opérationnels, offrant un service internet haut débit à des millions d\'utilisateurs dans le monde.',
      link: 'https://teslarati.com/starlink-5000-satellites',
      published_date: '2024-12-10T14:15:00.000Z',
      category: 'spacex',
      mission: null,
      satellite_count: 5000,
      source: 'Teslarati - SpaceX',
      tags: ['starlink', 'milestone', 'constellation']
    }
  ];

  const categories = [
    { key: 'all', label: 'Toutes', icon: '🛰️' },
    { key: 'spacex', label: 'SpaceX', icon: '🚀' },
    { key: 'space', label: 'Espace', icon: '🌌' },
    { key: 'launch', label: 'Lancements', icon: '🔥' },
    { key: 'satellite', label: 'Satellites', icon: '📡' }
  ];

  useEffect(() => {
    fetchUpdates();
  }, []);

  const fetchUpdates = async () => {
    try {
      setError(null);
      const response = await fetch('/api/starlink/updates?limit=20');
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.updates && data.updates.length > 0) {
        setUpdates(data.updates);
        setStats({ total: data.total });
      } else {
        // Utiliser les données de fallback si aucune donnée n'est disponible
        setUpdates(fallbackUpdates);
        setStats({ total: fallbackUpdates.length });
      }
    } catch (error) {
      console.error('Erreur lors du chargement des données Starlink:', error);
      setError(error.message);
      // Utiliser les données de fallback en cas d'erreur
      setUpdates(fallbackUpdates);
      setStats({ total: fallbackUpdates.length });
    } finally {
      setLoading(false);
    }
  };

  const refreshRSS = async () => {
    try {
      setRefreshing(true);
      const response = await fetch('/api/starlink/updates/refresh', {
        method: 'POST'
      });
      
      if (response.ok) {
        await fetchUpdates();
      } else {
        throw new Error('Erreur lors du refresh RSS Starlink');
      }
    } catch (error) {
      console.error('Erreur refresh RSS Starlink:', error);
      setError('Erreur lors du rafraîchissement des données RSS Starlink');
    } finally {
      setRefreshing(false);
    }
  };

  const filteredUpdates = selectedCategory === 'all' 
    ? updates 
    : updates.filter(update => update.category === selectedCategory);

  const getCategoryIcon = (category) => {
    const categoryMap = {
      'spacex': '🚀',
      'space': '🌌',
      'launch': '🔥',
      'satellite': '📡',
      'starlink': '🛰️'
    };
    return categoryMap[category] || '📄';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-slate-300">Chargement de la veille Starlink...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-black text-white">
      {/* Header Section avec thème Starlink */}
      <section className="relative overflow-hidden py-12 bg-gradient-to-r from-slate-900 via-blue-800 to-black">
        <div className="absolute inset-0">
          {/* Étoiles animées */}
          <div className="absolute top-10 left-10 w-1 h-1 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-20 right-20 w-1 h-1 bg-blue-300 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-40 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse delay-500"></div>
          <div className="absolute bottom-20 right-1/3 w-1 h-1 bg-blue-400 rounded-full animate-pulse delay-2000"></div>
          <div className="absolute bottom-40 left-1/2 w-1 h-1 bg-white rounded-full animate-pulse delay-1500"></div>
        </div>
        
        <div className="relative container mx-auto px-4">
          <a href="/veilles" className="inline-block mb-6">
            <button className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors backdrop-blur-sm border border-white/20">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Retour aux veilles</span>
            </button>
          </a>

          <div className="text-center text-white">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                <div className="text-3xl">🛰️</div>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent">
              Veille Starlink & SpaceX
            </h1>
            <p className="text-xl text-blue-200 mb-8 max-w-3xl mx-auto leading-relaxed">
              Surveillance en temps réel de l'écosystème Starlink : lancements, constellation satellitaire, innovations spatiales et exploration
            </p>

            <div className="flex flex-wrap justify-center items-center gap-4 mb-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 flex items-center space-x-2 border border-white/20">
                <span className="text-2xl font-bold text-blue-300">{stats.total}</span>
                <span className="text-blue-200">actualités</span>
              </div>
              
              <button
                onClick={refreshRSS}
                disabled={refreshing}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-500/50 text-white rounded-full px-6 py-3 flex items-center space-x-2 transition-colors border border-blue-500"
              >
                <svg className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>{refreshing ? 'Actualisation...' : 'Actualiser RSS'}</span>
              </button>
            </div>

            {error && (
              <div className="bg-red-500/20 backdrop-blur-sm border border-red-300/50 text-red-200 px-4 py-2 rounded-lg max-w-md mx-auto">
                ⚠️ {error}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Categories Filter avec thème spatial */}
      <section className="py-8 bg-slate-800/50 backdrop-blur-sm border-b border-slate-700">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-200 border ${
                  selectedCategory === category.key
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 transform scale-105 border-blue-500'
                    : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700/80 shadow-sm hover:shadow-md border-slate-600 hover:border-slate-500'
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                <span className="font-medium">{category.label}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  selectedCategory === category.key 
                    ? 'bg-white/20 text-white' 
                    : 'bg-slate-700 text-slate-400'
                }`}>
                  {category.key === 'all' ? stats.total : updates.filter(u => u.category === category.key).length}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Section avec design spatial */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredUpdates.map((update, index) => (
              <article
                key={update.id}
                className="bg-slate-800/60 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-slate-700/50 hover:border-blue-500/50"
              >
                {/* Card Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600/20 to-slate-600/20 rounded-xl flex items-center justify-center text-2xl border border-slate-600">
                        {getCategoryIcon(update.category)}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="bg-blue-600/20 text-blue-300 text-xs font-semibold px-3 py-1 rounded-full border border-blue-500/30">
                            ✓ Officiel
                          </span>
                          {update.satellite_count && (
                            <span className="bg-green-600/20 text-green-300 text-xs font-semibold px-3 py-1 rounded-full border border-green-500/30">
                              {update.satellite_count} sats
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-slate-400 flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {formatDate(update.published_date)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-3 leading-tight hover:text-blue-400 transition-colors line-clamp-2">
                    {update.title}
                  </h3>
                  
                  <p className="text-slate-300 text-sm leading-relaxed mb-4 line-clamp-3">
                    {update.description}
                  </p>

                  {/* Mission et Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {update.mission && (
                      <span className="bg-purple-600/20 text-purple-300 text-xs font-medium px-3 py-1 rounded-full border border-purple-500/30">
                        {update.mission}
                      </span>
                    )}
                    {update.tags && update.tags.slice(0, 2).map((tag, tagIndex) => (
                      <span key={tagIndex} className="bg-slate-700/60 text-slate-300 text-xs font-medium px-3 py-1 rounded-full border border-slate-600 capitalize">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-6 pb-6">
                  <div className="bg-slate-900/60 rounded-xl p-4 mb-4 border border-slate-700/50">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400 font-medium">Source:</span>
                      <span className="font-semibold text-slate-200 text-right">{update.source}</span>
                    </div>
                  </div>
                  
                  {update.link && (
                    <a 
                      href={update.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl py-3 px-4 flex items-center justify-center space-x-2 transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-lg hover:shadow-blue-500/30 border border-blue-500"
                    >
                      <span className="font-medium">Lire l'article complet</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>

          {filteredUpdates.length === 0 && !loading && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Aucune actualité trouvée</h3>
              <p className="text-slate-400">Aucune actualité n'est disponible pour cette catégorie actuellement.</p>
            </div>
          )}
        </div>
      </section>

      {/* Info Section avec thème spatial */}
      <section className="py-16 bg-gradient-to-br from-slate-800/50 to-blue-900/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Système de Veille Starlink Automatisée</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto mb-4"></div>
            <p className="text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Surveillance continue de l'écosystème SpaceX/Starlink avec récupération automatique depuis 
              les flux RSS officiels, traduction intelligente et suivi des missions spatiales.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="bg-slate-800/40 rounded-2xl shadow-sm hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 p-6 text-center border border-slate-700/50">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 11-2 0 1 1 0 012 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-white mb-2">Flux RSS Spatiaux</h3>
              <p className="text-sm text-slate-400">
                Récupération depuis 4+ sources officielles SpaceX/Espace
              </p>
            </div>

            <div className="bg-slate-800/40 rounded-2xl shadow-sm hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 p-6 text-center border border-slate-700/50">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
              </div>
              <h3 className="font-bold text-white mb-2">Traduction Spatiale</h3>
              <p className="text-sm text-slate-400">
                Traduction contextuelle des contenus SpaceX/Starlink
              </p>
            </div>

            <div className="bg-slate-800/40 rounded-2xl shadow-sm hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 p-6 text-center border border-slate-700/50">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-white mb-2">Temps Réel</h3>
              <p className="text-sm text-slate-400">
                Mise à jour continue des lancements et innovations
              </p>
            </div>

            <div className="bg-slate-800/40 rounded-2xl shadow-sm hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 p-6 text-center border border-slate-700/50">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <div className="text-2xl">🛰️</div>
              </div>
              <h3 className="font-bold text-white mb-2">Focus Starlink</h3>
              <p className="text-sm text-slate-400">
                Contenu spécialisé constellation et exploration
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section avec thème spatial */}
      <section className="py-16 bg-gradient-to-r from-slate-900 via-blue-800 to-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Passionné d'exploration spatiale ?</h2>
          <p className="text-lg text-blue-200 mb-8 max-w-2xl mx-auto">
            Discutons des innovations Starlink, des technologies spatiales et des projets d'infrastructure. 
            L'espace n'attend que nous !
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-blue-500/30 flex items-center justify-center space-x-2 border border-blue-500">
              <span>Me contacter</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>
            <a href="/veilles">
              <button className="border border-blue-400 text-blue-300 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-blue-500/20 flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Retour aux veilles</span>
              </button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
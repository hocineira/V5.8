'use client';

import { useState, useEffect } from 'react';

export default function VeilleCloud() {
  const [updates, setUpdates] = useState([]);
  const [stats, setStats] = useState({ total: 0 });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filterType, setFilterType] = useState('category'); // 'category' or 'service'

  // Categories pour filtrage par thème
  const themeCategories = [
    { key: 'all', label: 'Toutes', icon: '☁️' },
    { key: 'cloud', label: 'Cloud', icon: '🌐' },
    { key: 'securite', label: 'Sécurité', icon: '🔒' },
    { key: 'infrastructure', label: 'Infrastructure', icon: '🏗️' },
    { key: 'devops', label: 'DevOps', icon: '⚙️' }
  ];

  // Categories pour filtrage par service
  const serviceCategories = [
    { key: 'all', label: 'Tous', icon: '☁️' },
    { key: 'SaaS', label: 'SaaS', icon: '💼' },
    { key: 'PaaS', label: 'PaaS', icon: '🛠️' },
    { key: 'IaaS', label: 'IaaS', icon: '🏢' },
    { key: 'FaaS', label: 'FaaS', icon: '⚡' }
  ];

  useEffect(() => {
    fetchUpdates();
  }, []);

  const fetchUpdates = async () => {
    try {
      setError(null);
      const response = await fetch('/api/cloud/updates?limit=30');
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.updates && data.updates.length > 0) {
        setUpdates(data.updates);
        setStats({ total: data.total });
      }
    } catch (error) {
      console.error('Erreur lors du chargement des données Cloud:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const refreshRSS = async () => {
    try {
      setRefreshing(true);
      const response = await fetch('/api/cloud/updates/refresh', {
        method: 'POST'
      });
      
      if (response.ok) {
        await fetchUpdates();
      } else {
        throw new Error('Erreur lors du refresh RSS Cloud');
      }
    } catch (error) {
      console.error('Erreur refresh RSS Cloud:', error);
      setError('Erreur lors du rafraîchissement des données RSS Cloud');
    } finally {
      setRefreshing(false);
    }
  };

  const filteredUpdates = selectedCategory === 'all' 
    ? updates 
    : updates.filter(update => {
        if (filterType === 'service') {
          return update.service_type === selectedCategory;
        } else {
          return update.category === selectedCategory;
        }
      });

  const getCategoryIcon = (category) => {
    const categoryMap = {
      'cloud': '🌐',
      'securite': '🔒',
      'infrastructure': '🏗️',
      'devops': '⚙️',
      'SaaS': '💼',
      'PaaS': '🛠️',
      'IaaS': '🏢',
      'FaaS': '⚡'
    };
    return categoryMap[category] || '☁️';
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement de la veille Cloud...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400">
        <div className="absolute inset-0">
          {/* Cloud animations */}
          <div className="absolute top-10 left-10 w-32 h-20 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute top-20 right-20 w-40 h-24 bg-white/10 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-36 h-22 bg-white/10 rounded-full animate-pulse delay-500"></div>
        </div>
        
        <div className="relative container mx-auto px-4">
          <a href="/veilles" className="inline-block mb-6">
            <button className="flex items-center space-x-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white transition-colors backdrop-blur-sm border border-white/30">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Retour aux veilles</span>
            </button>
          </a>

          <div className="text-center text-white">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm border border-white/30 shadow-2xl">
                <div className="text-5xl">☁️</div>
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Cloud Computing et Cybersécurité
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Découvrez le monde du Cloud Computing : concepts fondamentaux, évolutions historiques, 
              et enjeux de sécurité avec actualités en temps réel
            </p>

            <div className="flex flex-wrap justify-center items-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 flex items-center space-x-2 border border-white/30">
                <span className="text-2xl font-bold">{stats.total}</span>
                <span>actualités</span>
              </div>
              
              <button
                onClick={refreshRSS}
                disabled={refreshing}
                className="bg-white text-blue-600 hover:bg-blue-50 disabled:bg-white/50 rounded-full px-6 py-3 flex items-center space-x-2 transition-colors border border-white/30 font-semibold"
              >
                <svg className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>{refreshing ? 'Actualisation...' : 'Actualiser RSS'}</span>
              </button>
            </div>

            {error && (
              <div className="bg-red-500/20 backdrop-blur-sm border border-red-300/50 text-white px-4 py-2 rounded-lg max-w-md mx-auto mt-4">
                ⚠️ {error}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Table des matières */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#introduction" className="text-blue-600 hover:text-blue-800 font-medium">➡️ Introduction</a>
            <a href="#avantages" className="text-blue-600 hover:text-blue-800 font-medium">➡️ Avantages</a>
            <a href="#types-services" className="text-blue-600 hover:text-blue-800 font-medium">➡️ Types de services</a>
            <a href="#types-deploiement" className="text-blue-600 hover:text-blue-800 font-medium">➡️ Types de déploiement</a>
            <a href="#actualites-rss" className="text-blue-600 hover:text-blue-800 font-medium">➡️ Actualités RSS</a>
            <a href="#historique" className="text-blue-600 hover:text-blue-800 font-medium">➡️ Historique</a>
            <a href="#cybersecurite" className="text-blue-600 hover:text-blue-800 font-medium">➡️ Cybersécurité</a>
            <a href="#ressources" className="text-blue-600 hover:text-blue-800 font-medium">➡️ Ressources</a>
          </div>
        </div>
      </section>

      {/* Introduction au Cloud Computing */}
      <section id="introduction" className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Introduction au Cloud Computing</h2>
          
          {/* Vidéo IT-Connect */}
          <div className="mb-12">
            <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/Cd82kSqYzH4"
                title="Le Cloud Computing pour les débutants"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            <p className="text-center text-gray-600 mt-4 italic">Vidéo : Le Cloud Computing pour les débutants - IT-Connect</p>
          </div>

          <div className="prose prose-lg max-w-none">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Qu'est-ce que la technologie CLOUD ?</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Le Cloud Computing fournit des services tels que le stockage de données, la sécurité, la mise en réseau, 
              les applications logicielles et la Business Intelligence via Internet moyennant un abonnement.
            </p>

            <div className="my-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
              <img 
                src="https://www.sap.com/dam/application/shared/graphics/what-is-cloud-computing.svg" 
                alt="Qu'est-ce que le Cloud Computing ?" 
                className="w-full max-w-2xl mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Avantages du Cloud */}
      <section id="avantages" className="py-16 bg-gradient-to-br from-blue-50 to-sky-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Les avantages du CLOUD computing</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Fiabilité */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">✓</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Fiabilité</h3>
              <p className="text-gray-700 leading-relaxed">
                Sécurité, sûreté et disponibilité. Bénéficiez d'un accès au système cloud 24 heures sur 24, 7 jours sur 7, 
                depuis n'importe où, avec un excellent temps de réponse. Fonctionne sur des serveurs sécurisés avec une 
                équipe d'experts en sécurité à plein temps. Ayez la certitude que vos données sont dupliquées et sauvegardées à distance.
              </p>
            </div>

            {/* Flexibilité */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">🔄</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Flexibilité</h3>
              <p className="text-gray-700 leading-relaxed">
                Obtenez la puissance de calcul dont vous avez besoin, au moment où vous en avez besoin. Ajustez les serveurs, 
                la mise en réseau ou le stockage. Intégrez instantanément de nouveaux utilisateurs. Élargissez votre entreprise 
                à de nouvelles régions. Tout cela de façon rapide et facile.
              </p>
            </div>

            {/* Finance */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">💰</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Finance</h3>
              <p className="text-gray-700 leading-relaxed">
                Ne payez que ce que vous utilisez. Pas de dépenses financières initiales pour le matériel ou les installations. 
                Réduisez le temps consacré par le personnel informatique à la maintenance et à la mise à niveau des systèmes. 
                Au lieu de cela, investissez vos fonds et vos collaborateurs dans des projets générateurs de revenus.
              </p>
            </div>

            {/* Mise à jour */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">🚀</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Mise à jour</h3>
              <p className="text-gray-700 leading-relaxed">
                Disposez toujours de la dernière version de la plateforme, de la base de données et des applications logicielles. 
                De plus, profitez des technologies émergentes telles que le Machine Learning (ML), l'intelligence artificielle (IA), 
                l'Internet des Objets (IoT), etc. Restez toujours au courant des dernières innovations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Types de services Cloud */}
      <section id="types-services" className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Les types de services de CLOUD computing</h2>
          
          {/* Vidéo Cookie connecté */}
          <div className="mb-12">
            <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/Al-E4C69UmQ"
                title="Comprendre les modèles de Cloud (IaaS, PaaS, SaaS, CaaS, FaaS)"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            <p className="text-center text-gray-600 mt-4 italic">Vidéo : Comprendre les modèles de Cloud - Cookie connecté</p>
          </div>

          <p className="text-gray-700 text-lg mb-8 text-center max-w-3xl mx-auto">
            Le Cloud Computing se divise en trois grandes catégories de services : SaaS, PaaS et IaaS. 
            Certains prestataires combinent ces services et d'autres les proposent indépendamment les uns des autres.
          </p>

          <div className="my-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
            <img 
              src="https://www.sap.com/dam/application/shared/graphics/what-is-cloud-computing-types-services.svg" 
              alt="Types de services de Cloud Computing" 
              className="w-full max-w-2xl mx-auto"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {/* SaaS */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl p-8 text-white">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-4xl">💼</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">SaaS</h3>
              <h4 className="text-lg font-semibold mb-3 text-blue-100">Software as a Service</h4>
              <p className="text-white/90 leading-relaxed">
                Le logiciel est hébergé sur un serveur distant et les clients peuvent y accéder à tout moment et en tout lieu, 
                à partir d'un navigateur web. Le fournisseur SaaS se charge des sauvegardes, de la maintenance et des mises à jour. 
                Les solutions SaaS comprennent le progiciel de gestion intégré (ERP), la gestion de la relation client (CRM), 
                la gestion de projet, etc.
              </p>
            </div>

            {/* PaaS */}
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-4xl">🛠️</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">PaaS</h3>
              <h4 className="text-lg font-semibold mb-3 text-purple-100">Platform as a Service</h4>
              <p className="text-white/90 leading-relaxed">
                La plateforme en tant que service est un environnement de développement d'applications basé sur le cloud 
                qui fournit aux développeurs tout ce dont ils ont besoin pour créer et déployer des applications. 
                Avec le PaaS, les développeurs peuvent choisir les fonctionnalités et les services cloud qu'ils souhaitent 
                moyennant un abonnement ou selon une base de tarification à l'usage.
              </p>
            </div>

            {/* IaaS */}
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-xl p-8 text-white">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-4xl">🏢</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">IaaS</h3>
              <h4 className="text-lg font-semibold mb-3 text-green-100">Infrastructure as a Service</h4>
              <p className="text-white/90 leading-relaxed">
                Les infrastructures en tant que service permettent aux entreprises de « louer » des ressources informatiques 
                (serveurs, réseaux, stockage et systèmes d'exploitation, par exemple) selon une base de tarification à l'usage. 
                L'infrastructure est évolutive et les clients n'ont pas à investir dans le matériel.
              </p>
            </div>
          </div>

          {/* Comparaison IaaS, PaaS, SaaS */}
          <div className="mt-12 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">IaaS, PaaS, ou SaaS : Que choisir ?</h3>
            <p className="text-gray-700 mb-6 text-center max-w-3xl mx-auto">
              Comparez les modèles SaaS, PaaS et IaaS et découvrez ce que vous pouvez attendre de chaque modèle « en tant que service ». 
              La plupart des entreprises utilisent aujourd'hui un mélange des trois, et la frontière entre les trois peut parfois être floue.
            </p>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <img 
                src="https://moktarflorianbtssio2025.wordpress.com/wp-content/uploads/2024/06/image-38.png?w=1024" 
                alt="Comparaison IaaS PaaS SaaS" 
                className="w-full rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Types de déploiement Cloud */}
      <section id="types-deploiement" className="py-16 bg-gradient-to-br from-sky-50 to-blue-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Les types de déploiements CLOUD</h2>
          
          <p className="text-gray-700 text-lg mb-12 text-center max-w-3xl mx-auto">
            Il existe trois types de déploiement cloud : public, privé et hybride. De nombreuses entreprises 
            choisissent plusieurs approches et mettent en place un environnement multi-cloud.
          </p>

          <div className="my-8 p-6 bg-white rounded-xl border border-blue-200 shadow-lg">
            <img 
              src="https://www.sap.com/dam/application/shared/graphics/what-is-cloud-computing-types-deployment.svg" 
              alt="Types de déploiement du Cloud Computing" 
              className="w-full max-w-2xl mx-auto"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {/* Cloud Public */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-sky-500 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">🌐</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Cloud Public</h3>
              <p className="text-gray-700 leading-relaxed">
                Avec un cloud public, les services sont fournis aux clients sur un réseau ouvert à une utilisation 
                par les clients du fournisseur. Les clouds publics, efficaces et économiques, sont souvent partagés 
                par plusieurs locataires, ce qui signifie que le fournisseur exécute votre service dans un environnement partagé.
              </p>
            </div>

            {/* Cloud Privé */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">🔒</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Cloud Privé</h3>
              <p className="text-gray-700 leading-relaxed">
                Avec un cloud privé, les services sont gérés sur un réseau privé protégé par un pare-feu. 
                Vous pouvez créer un cloud privé dans votre propre centre de données ou vous abonner à un cloud 
                hébergé par un fournisseur. Les clouds privés offrent un niveau maximal de sécurité et de contrôle.
              </p>
            </div>

            {/* Cloud Hybride */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">🔄</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Cloud Hybride</h3>
              <p className="text-gray-700 leading-relaxed">
                Un cloud hybride est une combinaison de cloud public, de cloud privé et d'infrastructure sur site. 
                Les clouds hybrides vous permettent de conserver des informations sensibles dans un centre de données 
                traditionnel ou un cloud privé tout en profitant des ressources du cloud public.
              </p>
            </div>
          </div>

          {/* Comparaison Cloud Public, Privé, Hybride */}
          <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Cloud public, privé ou hybride ?</h3>
            <p className="text-gray-700 mb-6 text-center max-w-3xl mx-auto">
              Comparez les trois types de déploiements cloud pour déterminer celui qui conviendrait le mieux à votre entreprise.
            </p>
            <div className="bg-gray-50 rounded-xl p-6">
              <img 
                src="https://moktarflorianbtssio2025.wordpress.com/wp-content/uploads/2024/06/image-39.png?w=1024" 
                alt="Comparaison Cloud Public Privé Hybride" 
                className="w-full rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Actualités RSS Section */}
      <section id="actualites-rss" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Actualités Cloud en Temps Réel</h2>
          <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
            Suivez les dernières actualités du Cloud Computing depuis les sources officielles (AWS, Azure, Google Cloud) 
            et les médias français spécialisés
          </p>

          {/* Filter Toggle */}
          <div className="flex justify-center mb-6">
            <div className="bg-gray-100 rounded-full p-1 flex space-x-2">
              <button
                onClick={() => {
                  setFilterType('category');
                  setSelectedCategory('all');
                }}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  filterType === 'category'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Par Thème
              </button>
              <button
                onClick={() => {
                  setFilterType('service');
                  setSelectedCategory('all');
                }}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  filterType === 'service'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Par Service
              </button>
            </div>
          </div>

          {/* Categories Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {(filterType === 'category' ? themeCategories : serviceCategories).map((category) => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-200 border font-medium ${
                  selectedCategory === category.key
                    ? 'bg-blue-600 text-white shadow-lg transform scale-105 border-blue-600'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm hover:shadow-md border-gray-300'
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                <span>{category.label}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  selectedCategory === category.key 
                    ? 'bg-white/20 text-white' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {category.key === 'all' ? stats.total : 
                    updates.filter(u => filterType === 'service' ? u.service_type === category.key : u.category === category.key).length}
                </span>
              </button>
            ))}
          </div>

          {/* Updates Grid */}
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredUpdates.map((update) => (
              <article
                key={update.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-200"
              >
                {/* Card Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-sky-500 rounded-xl flex items-center justify-center text-2xl text-white">
                        {getCategoryIcon(update.category)}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 flex-wrap">
                          <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                            {update.category}
                          </span>
                          {update.cloud_provider && (
                            <span className="bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full">
                              {update.cloud_provider}
                            </span>
                          )}
                          {update.service_type && (
                            <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                              {update.service_type}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {formatDate(update.published_date)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3 leading-tight hover:text-blue-600 transition-colors line-clamp-2">
                    {update.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {update.description}
                  </p>

                  {/* Tags */}
                  {update.tags && update.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {update.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span key={tagIndex} className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full capitalize">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Footer */}
                <div className="px-6 pb-6">
                  <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500 font-medium">Source:</span>
                      <span className="font-semibold text-gray-900 text-right">{update.source}</span>
                    </div>
                  </div>
                  
                  {update.link && (
                    <a 
                      href={update.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white rounded-xl py-3 px-4 flex items-center justify-center space-x-2 transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-lg font-medium"
                    >
                      <span>Lire l'article complet</span>
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
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucune actualité trouvée</h3>
              <p className="text-gray-600">Aucune actualité n'est disponible pour cette catégorie actuellement.</p>
            </div>
          )}
        </div>
      </section>

      {/* Historique et évolutions */}
      <section id="historique" className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            Évolutions historiques de la technologie Cloud et événements marquants
          </h2>
          
          <div className="prose prose-lg max-w-none bg-white rounded-2xl shadow-lg p-8">
            <p className="text-gray-700 leading-relaxed mb-6">
              L'évolution du cloud computing est intimement liée à l'histoire de l'informatique, des réseaux, 
              et plus récemment de la virtualisation et de la cybersécurité. Voici les grandes étapes à connaître :
            </p>

            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-6">
                <h4 className="text-xl font-bold text-gray-900 mb-2">Années 1960</h4>
                <p className="text-gray-700">
                  L'idée d'une informatique partagée est déjà envisagée par des pionniers comme John McCarthy. 
                  Les systèmes de time-sharing sur les mainframes permettent à plusieurs utilisateurs d'accéder à 
                  une même machine centrale. Ce principe pose les bases conceptuelles du cloud.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 pl-6">
                <h4 className="text-xl font-bold text-gray-900 mb-2">Années 1990</h4>
                <p className="text-gray-700">
                  Avec l'explosion d'Internet, les premières formes de services à distance apparaissent, comme les 
                  hébergements web et les services ASP (Application Service Provider), bien que limités.
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-6">
                <h4 className="text-xl font-bold text-gray-900 mb-2">2000-2006</h4>
                <p className="text-gray-700">
                  Émergence des technologies de virtualisation (notamment avec VMware), qui permettent d'abstraire le 
                  matériel physique. En 2006, <strong>Amazon lance AWS</strong>, qui devient rapidement le premier fournisseur 
                  de services cloud à grande échelle avec EC2 (compute) et S3 (stockage). C'est le début de la commercialisation 
                  grand public du cloud.
                </p>
              </div>

              <div className="border-l-4 border-orange-500 pl-6">
                <h4 className="text-xl font-bold text-gray-900 mb-2">2010-2015</h4>
                <p className="text-gray-700">
                  Les géants comme Microsoft (Azure), Google (GCP), IBM ou Oracle se lancent à leur tour. Le cloud devient 
                  un standard dans les startups, les services en ligne, puis dans les grandes entreprises. En parallèle, 
                  des outils de gestion d'infrastructure comme Docker et Kubernetes révolutionnent le déploiement applicatif.
                </p>
              </div>

              <div className="border-l-4 border-red-500 pl-6">
                <h4 className="text-xl font-bold text-gray-900 mb-2">2017-2020</h4>
                <p className="text-gray-700">
                  L'automatisation, les pipelines CI/CD et le DevOps deviennent la norme. Le cloud s'impose dans les services 
                  publics, l'éducation, la santé, parfois sous contrainte réglementaire. La pandémie de COVID-19 accélère 
                  l'adoption du cloud à grande échelle, notamment pour les outils collaboratifs, le télétravail et les services numériques.
                </p>
              </div>

              <div className="border-l-4 border-teal-500 pl-6">
                <h4 className="text-xl font-bold text-gray-900 mb-2">Depuis 2021</h4>
                <p className="text-gray-700">
                  Montée en puissance des <strong>stratégies multi-cloud</strong>, de l'<strong>edge computing</strong>, 
                  et des <strong>clouds souverains</strong>. La question de la localisation des données, de leur protection 
                  juridique et de la résilience des services devient centrale.
                </p>
              </div>
            </div>

            <div className="mt-12 bg-red-50 rounded-xl p-6 border border-red-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Événements marquants / incidents majeurs liés au cloud</h3>
              
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-bold text-red-700 mb-2">🔴 Incident AWS (mars 2017)</h4>
                  <p className="text-gray-700 text-sm">
                    Une mauvaise manipulation dans la console de commande a provoqué une interruption de S3 dans la région 
                    US-EAST-1, paralysant des milliers de sites et services pendant plusieurs heures. Cela a montré la 
                    dépendance critique au cloud public.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-bold text-red-700 mb-2">🔴 Capital One (2019)</h4>
                  <p className="text-gray-700 text-sm">
                    Une faille de configuration dans AWS (via une mauvaise gestion des droits IAM) a permis à une ancienne 
                    employée d'extraire les données de plus de 100 millions de clients. L'incident a mis en lumière les 
                    risques liés aux erreurs humaines dans des environnements complexes.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-bold text-red-700 mb-2">🔴 OVHcloud (mars 2021)</h4>
                  <p className="text-gray-700 text-sm">
                    Un incendie détruit un datacenter à Strasbourg, entraînant la perte de nombreuses données chez des clients 
                    qui n'avaient pas mis en place de redondance ou de sauvegarde externe. Cela a rappelé que même dans le cloud, 
                    la sauvegarde reste une responsabilité partagée.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-bold text-red-700 mb-2">🔴 Microsoft Exchange Online (2023)</h4>
                  <p className="text-gray-700 text-sm">
                    Plusieurs pannes successives ont affecté les services de messagerie cloud de Microsoft, soulevant des 
                    inquiétudes sur la centralisation des services critiques chez quelques fournisseurs majeurs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cybersécurité dans le Cloud */}
      <section id="cybersecurite" className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            Les enjeux de la cybersécurité dans le Cloud Computing
          </h2>

          {/* Vidéo Extia */}
          <div className="mb-12">
            <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/atums5KofO8"
                title="SSI : La sécurité dans le Cloud"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            <p className="text-center text-gray-600 mt-4 italic">Vidéo : SSI - La sécurité dans le Cloud - Extia</p>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              La cybersécurité est un pilier essentiel dans l'architecture cloud. Le modèle de mutualisation, 
              l'exposition sur Internet et l'automatisation massive rendent ces environnements particulièrement sensibles 
              aux erreurs de configuration, aux attaques ciblées et aux dérives internes.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-lg p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                  <span className="text-3xl">🤝</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Partage des responsabilités</h3>
                <p className="text-gray-700 leading-relaxed">
                  Contrairement aux infrastructures traditionnelles, la sécurité dans le cloud est partagée. 
                  Le <strong>fournisseur</strong> est responsable de la sécurité <strong>de</strong> l'infrastructure 
                  (datacenters, réseaux, hyperviseurs), tandis que le <strong>client</strong> est responsable de la sécurité 
                  <strong> dans</strong> le cloud : données, utilisateurs, configurations, chiffrement, etc.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl shadow-lg p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                  <span className="text-3xl">🔐</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Gestion des identités et des accès (IAM)</h3>
                <p className="text-gray-700 leading-relaxed">
                  Dans un environnement cloud, chaque ressource est potentiellement accessible à distance. Une politique de 
                  gestion des identités robuste est donc indispensable : authentification forte (MFA), rôles minimaux, 
                  journalisation, rotation des clés, etc.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl shadow-lg p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6">
                  <span className="text-3xl">🔒</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Chiffrement et protection des données</h3>
                <p className="text-gray-700 leading-relaxed">
                  Les données doivent être chiffrées en transit et au repos. Les principaux fournisseurs offrent des mécanismes 
                  intégrés pour gérer les clés (KMS), mais c'est au client de définir des règles strictes, surtout si des 
                  données sensibles sont en jeu (santé, finance, données personnelles).
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-white rounded-2xl shadow-lg p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6">
                  <span className="text-3xl">✓</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Conformité, souveraineté, résilience</h3>
                <p className="text-gray-700 leading-relaxed">
                  Les entreprises doivent s'assurer que leurs fournisseurs cloud respectent les normes de sécurité 
                  (ISO 27001, HDS, SecNumCloud, etc.). Dans certains secteurs (public, santé, défense), l'hébergement doit 
                  être fait sur le sol européen ou chez un fournisseur certifié.
                </p>
              </div>
            </div>

            <div className="mt-12 bg-red-50 rounded-xl p-6 border border-red-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Menaces spécifiques</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-red-600 font-bold mr-2">•</span>
                  <span className="text-gray-700"><strong>Shadow IT</strong> : employés qui utilisent des services cloud 
                  non autorisés (Dropbox, WeTransfer…).</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 font-bold mr-2">•</span>
                  <span className="text-gray-700"><strong>Exploitation d'APIs vulnérables</strong> : les API mal protégées 
                  permettent parfois à des attaquants de contourner les protections.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 font-bold mr-2">•</span>
                  <span className="text-gray-700"><strong>Attaques par supply chain</strong> : un service cloud compromis 
                  peut servir de vecteur pour infecter les clients finaux.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pour aller plus loin */}
      <section id="ressources" className="py-16 bg-gradient-to-br from-blue-600 via-sky-500 to-cyan-400">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-bold text-white mb-6 text-center">Pour aller plus loin</h2>
          <p className="text-white/90 text-lg mb-8 text-center max-w-3xl mx-auto leading-relaxed">
            Approfondir le cloud computing et la cybersécurité implique de maîtriser les technologies sous-jacentes, 
            les outils de supervision, les mécanismes de défense, mais aussi d'anticiper les évolutions futures du secteur.
          </p>

          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Cours CERTFR : Approfondissement Cloud Computing
            </h3>
            <p className="text-gray-700 mb-6 text-center">
              Voici un cours CERTFR pour approfondir sa compréhension et sa connaissance sur le Cloud Computing :
            </p>

            <div className="flex justify-center">
              <a 
                href="https://customer-assets.emergentagent.com/job_tech-cloud-profile/artifacts/h6ky7vv6_certfr-2025-cti-001.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white rounded-xl px-8 py-4 font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Télécharger CERTFR-2025-CTI-001</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 via-blue-800 to-sky-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Passionné par le Cloud Computing ?</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Discutons des technologies Cloud, de la cybersécurité et des architectures modernes. 
            Le futur de l'IT est dans le cloud !
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2">
              <span>Me contacter</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>
            <a href="/veilles">
              <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2">
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

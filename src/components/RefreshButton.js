'use client';

import { useState } from 'react';

export default function RefreshButton() {
  const [refreshing, setRefreshing] = useState(false);
  const [message, setMessage] = useState(null);

  const refreshRSS = async () => {
    try {
      setRefreshing(true);
      setMessage(null);
      const response = await fetch('/api/windows/updates/refresh', {
        method: 'POST'
      });
      
      if (response.ok) {
        setMessage('Actualisation réussie !');
        // Recharger la page pour voir les nouvelles données
        window.location.reload();
      } else {
        setMessage('Erreur lors de l\'actualisation');
      }
    } catch (error) {
      console.error('Erreur refresh RSS:', error);
      setMessage('Erreur de connexion');
    } finally {
      setRefreshing(false);
      // Effacer le message après 3 secondes
      setTimeout(() => setMessage(null), 3000);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={refreshRSS}
        disabled={refreshing}
        className="bg-green-500 hover:bg-green-600 disabled:bg-green-400 text-white rounded-full px-6 py-3 flex items-center space-x-2 transition-colors shadow-md"
      >
        <svg className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        <span>{refreshing ? 'Actualisation...' : 'Actualiser RSS'}</span>
      </button>
      {message && (
        <span className={`mt-2 text-sm font-medium ${message.includes('Erreur') ? 'text-red-600' : 'text-green-600'}`}>
          {message}
        </span>
      )}
    </div>
  );
}

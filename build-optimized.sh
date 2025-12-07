#!/bin/bash

# Script de build optimisé pour VPS 1GB RAM
# Ce script aide à builder Next.js avec très peu de mémoire

echo "🚀 Build optimisé pour VPS 1GB RAM"
echo "=================================="

# 1. Nettoyer le cache Next.js
echo "📦 Nettoyage du cache..."
rm -rf .next
rm -rf node_modules/.cache

# 2. Libérer la mémoire système
echo "🧹 Libération de la mémoire..."
sync
echo 3 > /proc/sys/vm/drop_caches 2>/dev/null || echo "  (nécessite sudo pour drop_caches)"

# 3. Afficher la mémoire disponible
echo "💾 Mémoire disponible:"
free -h | grep Mem

# 4. Build avec limite mémoire stricte + optimisations
echo ""
echo "🔨 Démarrage du build (cela peut prendre 1-2 minutes)..."
echo "   Limite mémoire: 384MB (ultra-conservateur)"
echo ""

# Utiliser 384MB au lieu de 512MB pour plus de sécurité
NODE_OPTIONS="--max-old-space-size=384 --max-semi-space-size=2" yarn build

BUILD_EXIT_CODE=$?

if [ $BUILD_EXIT_CODE -eq 0 ]; then
    echo ""
    echo "✅ Build réussi !"
    echo ""
    echo "📊 Taille du build:"
    du -sh .next 2>/dev/null || echo "  .next non trouvé"
    echo ""
    echo "🚀 Pour démarrer: yarn start"
else
    echo ""
    echo "❌ Build échoué avec code: $BUILD_EXIT_CODE"
    
    if [ $BUILD_EXIT_CODE -eq 137 ]; then
        echo ""
        echo "⚠️  Code 137 = SIGKILL (manque de mémoire)"
        echo ""
        echo "Solutions possibles:"
        echo "1. Ajouter un swap file (recommandé):"
        echo "   sudo dd if=/dev/zero of=/swapfile bs=1M count=1024"
        echo "   sudo chmod 600 /swapfile"
        echo "   sudo mkswap /swapfile"
        echo "   sudo swapon /swapfile"
        echo ""
        echo "2. Fermer d'autres services temporairement:"
        echo "   sudo service apache2 stop"
        echo "   sudo service mysql stop"
        echo ""
        echo "3. Builder sur une autre machine et copier .next/"
    fi
    
    exit $BUILD_EXIT_CODE
fi

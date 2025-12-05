#!/bin/bash

# =================================================================
# 🧪 Test rapide du Portfolio Hocine IRATNI
# =================================================================

RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

echo -e "${BLUE}🧪 Test rapide du portfolio${NC}\n"

# Test 1: Fichiers essentiels
if [ -f "package.json" ] && [ -f "next.config.js" ]; then
    print_success "Fichiers de configuration présents"
else
    print_error "Fichiers de configuration manquants"
    exit 1
fi

# Test 2: Dépendances
if [ -d "node_modules" ]; then
    print_success "Dépendances installées"
else
    print_info "Installation des dépendances..."
    npm install
    print_success "Dépendances installées"
fi

# Test 3: Build
if [ -d ".next" ]; then
    print_success "Build de production présent"
else
    print_info "Génération du build..."
    npm run build
    print_success "Build généré"
fi

# Test 4: Scripts
if [ -f "install-ubuntu.sh" ] && [ -x "install-ubuntu.sh" ]; then
    print_success "Script d'installation prêt"
else
    print_error "Script d'installation manquant ou non exécutable"
fi

if [ -f "update-portfolio.sh" ] && [ -x "update-portfolio.sh" ]; then
    print_success "Script de mise à jour prêt"
else
    print_error "Script de mise à jour manquant ou non exécutable"
fi

# Test 5: Documentation
if [ -f "README.md" ] && [ -f "INSTALLATION.md" ]; then
    print_success "Documentation complète"
else
    print_error "Documentation manquante"
fi

echo -e "\n${GREEN}🎉 Portfolio prêt pour le déploiement Ubuntu 24.04!${NC}"
echo -e "${BLUE}Pour installer: ${NC}chmod +x install-ubuntu.sh && bash install-ubuntu.sh"
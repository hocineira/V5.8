#!/bin/bash

# =================================================================
# 🔄 Script de mise à jour - Portfolio Hocine IRATNI
# =================================================================
# Mise à jour automatique du portfolio sans interruption
# =================================================================

set -e

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

PORTFOLIO_DIR="/var/www/portfolio"
SERVICE_NAME="portfolio"
BACKUP_DIR="/var/backups/portfolio"

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Création d'une sauvegarde
create_backup() {
    print_info "Création d'une sauvegarde..."
    
    local backup_name="portfolio-backup-$(date +%Y%m%d_%H%M%S)"
    local backup_path="$BACKUP_DIR/$backup_name"
    
    sudo mkdir -p "$BACKUP_DIR"
    sudo cp -r "$PORTFOLIO_DIR" "$backup_path"
    
    print_success "Sauvegarde créée: $backup_path"
}

# Mise à jour du code
update_code() {
    print_info "Mise à jour du code source..."
    
    cd "$PORTFOLIO_DIR"
    
    # Sauvegarde des modifications locales s'il y en a
    if ! git diff-index --quiet HEAD --; then
        git stash push -m "Auto-stash before update $(date)"
        print_warning "Modifications locales sauvegardées"
    fi
    
    # Récupération des dernières modifications
    git pull origin main
    
    print_success "Code source mis à jour"
}

# Mise à jour des dépendances
update_dependencies() {
    print_info "Mise à jour des dépendances..."
    
    cd "$PORTFOLIO_DIR"
    
    # Nettoyage du cache npm
    npm cache clean --force
    
    # Mise à jour des dépendances
    npm install
    
    # Audit de sécurité et correction automatique
    npm audit fix --force || true
    
    print_success "Dépendances mises à jour"
}

# Reconstruction
rebuild_project() {
    print_info "Reconstruction du projet..."
    
    cd "$PORTFOLIO_DIR"
    
    # Nettoyage des anciens builds
    rm -rf .next
    
    # Nouveau build
    npm run build
    
    print_success "Projet reconstruit"
}

# Redémarrage des services
restart_services() {
    print_info "Redémarrage des services..."
    
    # Redémarrage PM2
    pm2 restart "$SERVICE_NAME"
    
    # Rechargement Nginx
    sudo nginx -t && sudo systemctl reload nginx
    
    print_success "Services redémarrés"
}

# Test de fonctionnement
test_deployment() {
    print_info "Test de fonctionnement..."
    
    sleep 5  # Attendre le redémarrage
    
    if curl -s -o /dev/null -w "%{http_code}" http://localhost | grep -q "200"; then
        print_success "Portfolio fonctionne correctement"
    else
        print_error "Problème détecté après la mise à jour"
        print_warning "Consultez les logs: pm2 logs $SERVICE_NAME"
        return 1
    fi
}

# Fonction principale
main() {
    echo -e "${BLUE}🔄 Mise à jour du Portfolio${NC}\n"
    
    # Vérifications préliminaires
    if [ ! -d "$PORTFOLIO_DIR" ]; then
        print_error "Portfolio non trouvé dans $PORTFOLIO_DIR"
        exit 1
    fi
    
    if ! command -v pm2 &> /dev/null; then
        print_error "PM2 non installé"
        exit 1
    fi
    
    # Processus de mise à jour
    create_backup
    update_code
    update_dependencies
    rebuild_project
    restart_services
    
    # Test final
    if test_deployment; then
        print_success "Mise à jour terminée avec succès! 🎉"
    else
        print_error "Échec de la mise à jour"
        exit 1
    fi
}

main "$@"
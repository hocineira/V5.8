#!/bin/bash

# =================================================================
# 🚀 Script d'installation simplifié - Portfolio Hocine IRATNI v2.0
# =================================================================
# Système cible: Ubuntu 24.04 LTS
# Architecture: Next.js Full-Stack Unifié avec RSS intégré
# Version: 2.0 - Architecture simplifiée sans backend séparé
# =================================================================

set -e  # Arrête le script en cas d'erreur

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Configuration
PORTFOLIO_DIR="/var/www/portfolio"
NGINX_CONFIG="/etc/nginx/sites-available/portfolio"
SERVICE_NAME="portfolio"
NODE_VERSION="20"  # Version LTS recommandée
DOMAIN="localhost"  # Domaine par défaut
PORTFOLIO_USER=""  # Sera défini dans check_root()

# =================================================================
# FONCTIONS UTILITAIRES
# =================================================================

print_header() {
    echo -e "\n${PURPLE}=====================================${NC}"
    echo -e "${PURPLE} $1 ${NC}"
    echo -e "${PURPLE}=====================================${NC}\n"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

check_root() {
    if [[ $EUID -eq 0 ]]; then
        print_warning "Exécution en tant que root détectée"
        print_info "Le script va créer un utilisateur dédié pour le portfolio"
        
        # Créer un utilisateur portfolio s'il n'existe pas
        if ! id "portfolio" &>/dev/null; then
            print_info "Création de l'utilisateur 'portfolio'..."
            useradd -m -s /bin/bash portfolio
            usermod -aG sudo portfolio
            print_success "Utilisateur 'portfolio' créé"
        fi
        
        PORTFOLIO_USER="portfolio"
        print_info "Les fichiers du portfolio appartiendront à l'utilisateur 'portfolio'"
    else
        # Utilisateur normal avec sudo
        PORTFOLIO_USER=$USER
        print_info "Installation en tant qu'utilisateur: $PORTFOLIO_USER"
        
        # Vérifier les droits sudo
        if ! sudo -n true 2>/dev/null; then
            print_error "Droits sudo requis pour l'installation"
            print_info "Exécutez: sudo bash install-ubuntu-simple.sh"
            exit 1
        fi
    fi
}

check_ubuntu() {
    if ! grep -q "Ubuntu" /etc/os-release; then
        print_error "Ce script est conçu pour Ubuntu 24.04 LTS"
        print_info "Système détecté: $(lsb_release -d | cut -f2)"
        exit 1
    fi
    
    local version=$(lsb_release -r | cut -f2)
    if [[ ! "$version" =~ ^24\. ]]; then
        print_warning "Version Ubuntu: $version (recommandé: 24.04)"
        read -p "Continuer quand même? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    fi
}

# =================================================================
# ÉTAPE 1: PRÉPARATION DU SYSTÈME SIMPLIFIÉ
# =================================================================

install_system_dependencies() {
    print_header "Étape 1: Préparation du système Ubuntu 24.04"
    
    print_info "Mise à jour des paquets système..."
    sudo apt update && sudo apt upgrade -y
    
    print_info "Installation des dépendances de base..."
    sudo apt install -y curl wget gnupg2 software-properties-common apt-transport-https ca-certificates lsb-release
    
    print_success "Système mis à jour avec succès"
}

install_nodejs() {
    print_header "Installation de Node.js $NODE_VERSION LTS"
    
    # Suppression d'anciennes installations
    if command -v node &> /dev/null; then
        print_info "Suppression de l'ancienne version de Node.js..."
        sudo apt remove -y nodejs npm
        sudo apt autoremove -y
    fi
    
    # Installation de Node.js via NodeSource
    print_info "Ajout du dépôt NodeSource..."
    curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | sudo -E bash -
    
    print_info "Installation de Node.js et npm..."
    sudo apt install -y nodejs
    
    # Vérification de l'installation
    local node_version=$(node --version)
    local npm_version=$(npm --version)
    
    print_success "Node.js installé: $node_version"
    print_success "npm installé: $npm_version"
    
    # Configuration des permissions npm globales
    mkdir -p ~/.npm-global
    npm config set prefix '~/.npm-global'
    
    # Ajout au PATH si pas déjà présent
    if ! grep -q "npm-global" ~/.bashrc; then
        echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
    fi
}

install_nginx() {
    print_header "Installation et configuration de Nginx"
    
    sudo apt install -y nginx
    
    # Démarrage et activation de Nginx
    sudo systemctl start nginx
    sudo systemctl enable nginx
    
    print_success "Nginx installé et démarré"
}

# =================================================================
# ÉTAPE 2: INSTALLATION DU PORTFOLIO FULL-STACK UNIFIÉ
# =================================================================

setup_portfolio() {
    print_header "Étape 2: Installation du Portfolio Full-Stack Unifié"
    
    # Suppression du répertoire existant s'il existe
    if [ -d "$PORTFOLIO_DIR" ]; then
        print_info "Suppression de l'ancienne installation..."
        sudo rm -rf "$PORTFOLIO_DIR"
    fi
    
    # Création du répertoire et modification des permissions
    print_info "Création du répertoire du portfolio..."
    sudo mkdir -p "$PORTFOLIO_DIR"
    sudo chown -R $PORTFOLIO_USER:$PORTFOLIO_USER "$PORTFOLIO_DIR"
    
    # Copie des fichiers du portfolio
    print_info "Copie des fichiers du portfolio..."
    cp -r /app/* "$PORTFOLIO_DIR/"
    
    # Navigation vers le répertoire
    cd "$PORTFOLIO_DIR"
    
    # Création du répertoire de données RSS
    print_info "Configuration du stockage RSS..."
    if [[ $EUID -eq 0 ]]; then
        sudo -u $PORTFOLIO_USER mkdir -p "$PORTFOLIO_DIR/data"
        sudo -u $PORTFOLIO_USER chmod 755 "$PORTFOLIO_DIR/data"
    else
        mkdir -p data
        chmod 755 data
    fi
    
    # Installation des dépendances (simplifiées !)
    print_info "Installation des dépendances npm (architecture simplifiée)..."
    if [[ $EUID -eq 0 ]]; then
        sudo -u $PORTFOLIO_USER npm install
    else
        npm install
    fi
    
    # Build de production
    print_info "Génération du build de production..."
    if [[ $EUID -eq 0 ]]; then
        sudo -u $PORTFOLIO_USER npm run build
    else
        npm run build
    fi
    
    print_success "Portfolio Full-Stack installé et compilé avec succès"
}

# =================================================================
# ÉTAPE 3: CONFIGURATION DU SERVICE UNIFIÉ
# =================================================================

install_pm2() {
    print_header "Installation de PM2 pour la gestion des processus"
    
    # Installation globale de PM2
    if [[ $EUID -eq 0 ]]; then
        sudo -u $PORTFOLIO_USER npm install -g pm2
    else
        npm install -g pm2
    fi
    
    print_success "PM2 installé avec succès"
}

setup_pm2_service() {
    print_header "Configuration du service PM2 unifié"
    
    cd "$PORTFOLIO_DIR"
    
    if [[ $EUID -eq 0 ]]; then
        # En tant que root, exécuter les commandes PM2 pour l'utilisateur portfolio
        sudo -u $PORTFOLIO_USER pm2 delete "$SERVICE_NAME" 2>/dev/null || true
        
        # Configuration PM2 pour l'architecture unifiée
        sudo -u $PORTFOLIO_USER cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: '$SERVICE_NAME',
    script: 'npm',
    args: 'start',
    cwd: '$PORTFOLIO_DIR',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};
EOF
        
        # Démarrage du service unifié avec PM2
        sudo -u $PORTFOLIO_USER pm2 start ecosystem.config.js
        
        # Configuration du démarrage automatique
        sudo -u $PORTFOLIO_USER pm2 startup
        sudo -u $PORTFOLIO_USER pm2 save
    else
        # Utilisateur normal
        pm2 delete "$SERVICE_NAME" 2>/dev/null || true
        
        # Configuration PM2
        cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: '$SERVICE_NAME',
    script: 'npm',
    args: 'start',
    cwd: '$PORTFOLIO_DIR',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};
EOF
        
        # Démarrage du service avec PM2
        pm2 start ecosystem.config.js
        pm2 startup
        pm2 save
    fi
    
    print_success "Service PM2 unifié configuré et démarré"
}

configure_nginx() {
    print_header "Configuration du reverse proxy Nginx simplifié"
    
    # Suppression de la configuration par défaut
    sudo rm -f /etc/nginx/sites-enabled/default
    
    # Création de la configuration simplifiée du portfolio
    sudo tee "$NGINX_CONFIG" > /dev/null << EOF
# Configuration Nginx pour Portfolio Hocine IRATNI v2.0
# Architecture Next.js Full-Stack Unifiée avec API RSS intégrée

server {
    listen 80;
    listen [::]:80;
    server_name $DOMAIN www.$DOMAIN;
    
    # Logs
    access_log /var/log/nginx/portfolio_access.log;
    error_log /var/log/nginx/portfolio_error.log;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json;
    
    # API Routes RSS (Nouvelles routes intégrées)
    location /api/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        
        # Timeouts pour les API
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
    
    # Main location block (Frontend)
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
    
    # Static files caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Health check
    location /health {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }
}
EOF
    
    # Activation du site
    sudo ln -sf "$NGINX_CONFIG" /etc/nginx/sites-enabled/
    
    # Test de la configuration
    if sudo nginx -t; then
        sudo systemctl reload nginx
        print_success "Configuration Nginx appliquée avec succès"
    else
        print_error "Erreur dans la configuration Nginx"
        exit 1
    fi
}

# =================================================================
# VÉRIFICATIONS ET TESTS
# =================================================================

run_tests() {
    print_header "Vérification de l'installation Full-Stack"
    
    # Test PM2
    print_info "Vérification du service PM2..."
    if [[ $EUID -eq 0 ]]; then
        if sudo -u $PORTFOLIO_USER pm2 list | grep -q "$SERVICE_NAME.*online"; then
            print_success "Service PM2 en cours d'exécution"
        else
            print_error "Problème avec le service PM2"
            sudo -u $PORTFOLIO_USER pm2 logs "$SERVICE_NAME" --lines 10
            exit 1
        fi
    else
        if pm2 list | grep -q "$SERVICE_NAME.*online"; then
            print_success "Service PM2 en cours d'exécution"
        else
            print_error "Problème avec le service PM2"
            pm2 logs "$SERVICE_NAME" --lines 10
            exit 1
        fi
    fi
    
    # Test Nginx
    print_info "Vérification du service Nginx..."
    if systemctl is-active --quiet nginx; then
        print_success "Nginx en cours d'exécution"
    else
        print_error "Problème avec Nginx"
        sudo systemctl status nginx
        exit 1
    fi
    
    # Test de connectivité principale
    print_info "Test de connectivité HTTP..."
    sleep 3  # Attendre que les services se stabilisent
    
    if curl -s -o /dev/null -w "%{http_code}" http://localhost | grep -q "200"; then
        print_success "Portfolio accessible sur http://localhost"
    else
        print_warning "Le portfolio pourrait mettre quelques secondes à démarrer..."
        print_info "Vérifiez les logs avec: pm2 logs $SERVICE_NAME"
    fi
    
    # Test de l'API intégrée
    print_info "Test de l'API RSS intégrée..."
    sleep 2
    
    if curl -s http://localhost/api/test | grep -q "Next.js"; then
        print_success "API Next.js fonctionnelle"
    else
        print_warning "L'API pourrait mettre quelques secondes à se stabiliser..."
    fi
    
    # Test des endpoints RSS
    print_info "Test des endpoints RSS..."
    sleep 2
    
    if curl -s http://localhost/api/windows/updates/categories | grep -q "categories"; then
        print_success "Endpoints RSS fonctionnels"
    else
        print_info "Les endpoints RSS seront disponibles après le démarrage complet"
    fi
}

# =================================================================
# INITIALISATION DES DONNÉES RSS
# =================================================================

initialize_rss_data() {
    print_header "Initialisation des données RSS"
    
    print_info "Attente du démarrage complet des services..."
    sleep 10
    
    # Tentative d'initialisation des flux RSS
    print_info "Lancement de la première récupération RSS..."
    if curl -s -X POST http://localhost/api/windows/updates/refresh | grep -q "stored"; then
        print_success "Données RSS initialisées avec succès"
    else
        print_info "Les données RSS seront initialisées au premier accès à la page"
    fi
}

# =================================================================
# NETTOYAGE ET OPTIMISATION
# =================================================================

cleanup_system() {
    print_header "Nettoyage et optimisation"
    
    # Nettoyage des paquets
    sudo apt autoremove -y
    sudo apt autoclean
    
    # Nettoyage npm cache
    npm cache clean --force
    
    print_success "Nettoyage terminé"
}

# =================================================================
# INFORMATIONS FINALES
# =================================================================

display_final_info() {
    print_header "🎉 Installation Full-Stack terminée avec succès!"
    
    echo -e "${GREEN}Portfolio Hocine IRATNI v2.0 installé et configuré!${NC}\n"
    
    echo -e "${BLUE}📍 Informations d'accès:${NC}"
    echo -e "   • URL principale: ${GREEN}http://localhost${NC}"
    echo -e "   • Veille technologique: ${GREEN}http://localhost/veilles/technologique${NC}"
    echo -e "   • API RSS: ${GREEN}http://localhost/api/windows/updates${NC}"
    echo -e "   • Répertoire: ${GREEN}$PORTFOLIO_DIR${NC}"
    echo -e "   • Service: ${GREEN}$SERVICE_NAME${NC}\n"
    
    echo -e "${BLUE}🔧 Commandes utiles:${NC}"
    echo -e "   • Statut des services: ${GREEN}pm2 status${NC}"
    echo -e "   • Logs en temps réel: ${GREEN}pm2 logs $SERVICE_NAME${NC}"
    echo -e "   • Redémarrer: ${GREEN}pm2 restart $SERVICE_NAME${NC}"
    echo -e "   • Arrêter: ${GREEN}pm2 stop $SERVICE_NAME${NC}\n"
    
    echo -e "${BLUE}🔌 Commandes RSS:${NC}"
    echo -e "   • Test API: ${GREEN}curl http://localhost/api/test${NC}"
    echo -e "   • Actualiser RSS: ${GREEN}curl -X POST http://localhost/api/windows/updates/refresh${NC}"
    echo -e "   • Voir stats: ${GREEN}curl http://localhost/api/windows/updates/stats${NC}"
    echo -e "   • Dernières màj: ${GREEN}curl http://localhost/api/windows/updates/latest${NC}\n"
    
    echo -e "${BLUE}📊 Système configuré:${NC}"
    echo -e "   • OS: ${GREEN}Ubuntu $(lsb_release -r | cut -f2)${NC}"
    echo -e "   • Architecture: ${GREEN}Next.js Full-Stack Unifié${NC}"
    echo -e "   • Node.js: ${GREEN}$(node --version)${NC}"
    echo -e "   • PM2: ${GREEN}$(pm2 --version)${NC}"
    echo -e "   • Nginx: ${GREEN}$(nginx -v 2>&1 | cut -d' ' -f3)${NC}"
    echo -e "   • Stockage RSS: ${GREEN}JSON Local${NC}\n"
    
    echo -e "${YELLOW}🔒 Recommandations de sécurité:${NC}"
    echo -e "   • Configurez un domaine personnalisé"
    echo -e "   • Activez SSL/TLS avec Let's Encrypt"
    echo -e "   • Configurez le firewall UFW"
    echo -e "   • Sauvegardez régulièrement le répertoire data/\n"
    
    echo -e "${PURPLE}🚀 Le portfolio Full-Stack avec RSS est maintenant opérationnel!${NC}"
    echo -e "${PURPLE}✨ Architecture simplifiée - Fonctionnalités complètes!${NC}"
}

# =================================================================
# FONCTION PRINCIPALE
# =================================================================

main() {
    print_header "🚀 Installation Portfolio Full-Stack v2.0 - Ubuntu 24.04"
    
    echo -e "${BLUE}Portfolio de: ${GREEN}Hocine IRATNI${NC}"
    echo -e "${BLUE}Architecture: ${GREEN}Next.js Full-Stack Unifié avec RSS${NC}"
    echo -e "${BLUE}Technologies: ${GREEN}Next.js 15 + API Routes + Stockage JSON${NC}"
    echo -e "${BLUE}Système cible: ${GREEN}Ubuntu 24.04 LTS${NC}\n"
    
    # Vérifications préliminaires
    check_root
    check_ubuntu
    
    # Installation étape par étape (simplifiée)
    install_system_dependencies
    install_nodejs
    install_nginx
    setup_portfolio
    install_pm2
    setup_pm2_service
    configure_nginx
    
    # Vérifications et initialisation
    run_tests
    initialize_rss_data
    cleanup_system
    display_final_info
    
    print_success "Installation Full-Stack complète réussie! 🎉"
}

# =================================================================
# GESTION DES ERREURS
# =================================================================

error_handler() {
    local exit_code=$?
    print_error "Erreur détectée (code: $exit_code)"
    print_info "Consultez les logs pour plus de détails"
    print_info "Logs PM2: pm2 logs portfolio"
    print_info "Logs Nginx: sudo tail /var/log/nginx/portfolio_error.log"
    exit $exit_code
}

trap error_handler ERR

# =================================================================
# EXÉCUTION
# =================================================================

# Vérification des arguments
if [[ "$1" == "--help" ]] || [[ "$1" == "-h" ]]; then
    echo "Usage: bash install-ubuntu-simple.sh [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  --help, -h    Afficher cette aide"
    echo "  --domain      Définir un domaine personnalisé"
    echo ""
    echo "Exemple:"
    echo "  bash install-ubuntu-simple.sh --domain mon-portfolio.com"
    echo ""
    echo "Architecture v2.0:"
    echo "  • Next.js Full-Stack Unifié"
    echo "  • API RSS intégrée" 
    echo "  • Stockage JSON local"
    echo "  • Installation simplifiée"
    exit 0
fi

# Traitement des arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --domain)
            DOMAIN="$2"
            shift 2
            ;;
        *)
            print_error "Argument inconnu: $1"
            exit 1
            ;;
    esac
done

# Exécution du script principal
main "$@"
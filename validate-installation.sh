#!/bin/bash

# =================================================================
# 🧪 Script de validation - Portfolio Hocine IRATNI
# =================================================================
# Teste l'installation et les fonctionnalités du portfolio
# =================================================================

set -e

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
PURPLE='\033[0;35m'
NC='\033[0m'

PORTFOLIO_DIR="/var/www/portfolio"
TEST_URL="http://localhost"
SERVICE_NAME="portfolio"

print_header() {
    echo -e "\n${PURPLE}=====================================${NC}"
    echo -e "${PURPLE} $1 ${NC}"
    echo -e "${PURPLE}=====================================${NC}\n"
}

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

# Tests des prérequis système
test_system_requirements() {
    print_header "Tests des prérequis système"
    
    # Test Ubuntu version
    if grep -q "Ubuntu" /etc/os-release; then
        local version=$(lsb_release -r | cut -f2)
        print_success "Ubuntu $version détecté"
    else
        print_error "Système non Ubuntu détecté"
        return 1
    fi
    
    # Test Node.js
    if command -v node &> /dev/null; then
        local node_version=$(node --version)
        print_success "Node.js installé: $node_version"
    else
        print_error "Node.js non installé"
        return 1
    fi
    
    # Test npm
    if command -v npm &> /dev/null; then
        local npm_version=$(npm --version)
        print_success "npm installé: $npm_version"
    else
        print_error "npm non installé"
        return 1
    fi
    
    # Test PM2
    if command -v pm2 &> /dev/null; then
        local pm2_version=$(pm2 --version)
        print_success "PM2 installé: $pm2_version"
    else
        print_error "PM2 non installé"
        return 1
    fi
    
    # Test Nginx
    if command -v nginx &> /dev/null; then
        local nginx_version=$(nginx -v 2>&1 | cut -d' ' -f3)
        print_success "Nginx installé: $nginx_version"
    else
        print_error "Nginx non installé"
        return 1
    fi
}

# Tests des fichiers du portfolio
test_portfolio_files() {
    print_header "Tests des fichiers du portfolio"
    
    # Répertoire principal
    if [ -d "$PORTFOLIO_DIR" ]; then
        print_success "Répertoire portfolio trouvé: $PORTFOLIO_DIR"
    else
        print_error "Répertoire portfolio non trouvé"
        return 1
    fi
    
    # package.json
    if [ -f "$PORTFOLIO_DIR/package.json" ]; then
        print_success "package.json présent"
    else
        print_error "package.json manquant"
        return 1
    fi
    
    # next.config.js
    if [ -f "$PORTFOLIO_DIR/next.config.js" ]; then
        print_success "next.config.js présent"
    else
        print_error "next.config.js manquant"
        return 1
    fi
    
    # Dossier .next (build)
    if [ -d "$PORTFOLIO_DIR/.next" ]; then
        print_success "Build Next.js présent (.next/)"
    else
        print_error "Build Next.js manquant"
        return 1
    fi
    
    # node_modules
    if [ -d "$PORTFOLIO_DIR/node_modules" ]; then
        print_success "Dépendances installées (node_modules/)"
    else
        print_error "Dépendances manquantes"
        return 1
    fi
}

# Tests des services
test_services() {
    print_header "Tests des services"
    
    # Test PM2
    if pm2 list | grep -q "$SERVICE_NAME.*online"; then
        print_success "Service PM2 '$SERVICE_NAME' en cours d'exécution"
    else
        print_error "Service PM2 '$SERVICE_NAME' non actif"
        print_info "Statut PM2:"
        pm2 list
        return 1
    fi
    
    # Test Nginx
    if systemctl is-active --quiet nginx; then
        print_success "Service Nginx actif"
    else
        print_error "Service Nginx inactif"
        systemctl status nginx --no-pager
        return 1
    fi
    
    # Test port 3000
    if ss -tulpn | grep -q ":3000.*LISTEN"; then
        print_success "Port 3000 en écoute (Next.js)"
    else
        print_error "Port 3000 non disponible"
        return 1
    fi
    
    # Test port 80
    if ss -tulpn | grep -q ":80.*LISTEN"; then
        print_success "Port 80 en écoute (Nginx)"
    else
        print_error "Port 80 non disponible"
        return 1
    fi
}

# Tests HTTP
test_http_responses() {
    print_header "Tests de connectivité HTTP"
    
    # Test de la page d'accueil
    local http_code=$(curl -s -o /dev/null -w "%{http_code}" "$TEST_URL" || echo "000")
    if [[ "$http_code" == "200" ]]; then
        print_success "Page d'accueil accessible (HTTP $http_code)"
    else
        print_error "Page d'accueil inaccessible (HTTP $http_code)"
        return 1
    fi
    
    # Test des pages principales
    local pages=("/accueil" "/tcs" "/bts-sio" "/projets" "/veilles" "/a-propos")
    for page in "${pages[@]}"; do
        local code=$(curl -s -o /dev/null -w "%{http_code}" "$TEST_URL$page" || echo "000")
        if [[ "$code" == "200" ]]; then
            print_success "Page $page accessible (HTTP $code)"
        else
            print_warning "Page $page inaccessible (HTTP $code)"
        fi
    done
    
    # Test API PDF
    local pdf_code=$(curl -s -o /dev/null -w "%{http_code}" "$TEST_URL/api/pdf/test" || echo "000")
    if [[ "$pdf_code" =~ ^(404|200)$ ]]; then
        print_success "API PDF fonctionnelle (HTTP $pdf_code)"
    else
        print_warning "API PDF problématique (HTTP $pdf_code)"
    fi
}

# Tests de performance
test_performance() {
    print_header "Tests de performance"
    
    # Temps de réponse
    local response_time=$(curl -o /dev/null -s -w "%{time_total}" "$TEST_URL")
    if (( $(echo "$response_time < 2.0" | bc -l) )); then
        print_success "Temps de réponse acceptable: ${response_time}s"
    else
        print_warning "Temps de réponse élevé: ${response_time}s"
    fi
    
    # Taille de la réponse
    local response_size=$(curl -s "$TEST_URL" | wc -c)
    if [[ $response_size -gt 1000 ]]; then
        print_success "Contenu de la page correct: $response_size bytes"
    else
        print_warning "Contenu de la page suspect: $response_size bytes"
    fi
    
    # Mémoire utilisée par PM2
    local memory=$(pm2 show "$SERVICE_NAME" | grep "memory usage" | awk '{print $4}' || echo "N/A")
    print_info "Utilisation mémoire PM2: $memory"
}

# Tests de contenu
test_content() {
    print_header "Tests du contenu du portfolio"
    
    # Test contenu page d'accueil
    local content=$(curl -s "$TEST_URL/accueil")
    if echo "$content" | grep -q "Hocine IRATNI"; then
        print_success "Nom trouvé sur la page d'accueil"
    else
        print_warning "Nom non trouvé sur la page d'accueil"
    fi
    
    # Test présence des sections principales
    if echo "$content" | grep -q -i "portfolio\|accueil"; then
        print_success "Contenu portfolio détecté"
    else
        print_warning "Contenu portfolio non détecté"
    fi
    
    # Test des assets statiques
    if curl -s "$TEST_URL/favicon.ico" | file - | grep -q "image\|data"; then
        print_success "Favicon accessible"
    else
        print_warning "Favicon non accessible"
    fi
}

# Tests de sécurité de base
test_security() {
    print_header "Tests de sécurité de base"
    
    # Headers de sécurité
    local headers=$(curl -s -I "$TEST_URL")
    
    if echo "$headers" | grep -q -i "x-content-type-options"; then
        print_success "Header X-Content-Type-Options présent"
    else
        print_warning "Header X-Content-Type-Options manquant"
    fi
    
    if echo "$headers" | grep -q -i "x-frame-options"; then
        print_success "Header X-Frame-Options présent"
    else
        print_warning "Header X-Frame-Options manquant"
    fi
    
    # Test permissions fichiers
    if [[ $(stat -c "%a" "$PORTFOLIO_DIR") == "755" ]]; then
        print_success "Permissions du répertoire correctes"
    else
        print_info "Permissions du répertoire: $(stat -c "%a" "$PORTFOLIO_DIR")"
    fi
}

# Rapport final
generate_report() {
    print_header "🎯 Rapport de validation"
    
    echo -e "${BLUE}📊 Résumé de l'installation:${NC}"
    echo -e "   • Système: ${GREEN}Ubuntu $(lsb_release -r | cut -f2)${NC}"
    echo -e "   • Node.js: ${GREEN}$(node --version)${NC}"
    echo -e "   • PM2: ${GREEN}$(pm2 --version)${NC}"
    echo -e "   • Nginx: ${GREEN}$(nginx -v 2>&1 | cut -d' ' -f3)${NC}"
    echo ""
    
    echo -e "${BLUE}🌐 Accès au portfolio:${NC}"
    echo -e "   • URL locale: ${GREEN}$TEST_URL${NC}"
    echo -e "   • Répertoire: ${GREEN}$PORTFOLIO_DIR${NC}"
    echo -e "   • Service PM2: ${GREEN}$SERVICE_NAME${NC}"
    echo ""
    
    echo -e "${BLUE}📈 Performance:${NC}"
    local response_time=$(curl -o /dev/null -s -w "%{time_total}" "$TEST_URL")
    local memory=$(pm2 show "$SERVICE_NAME" 2>/dev/null | grep "memory usage" | awk '{print $4}' || echo "N/A")
    echo -e "   • Temps de réponse: ${GREEN}${response_time}s${NC}"
    echo -e "   • Utilisation mémoire: ${GREEN}$memory${NC}"
    echo ""
    
    print_success "Validation terminée! Portfolio opérationnel 🚀"
}

# Fonction principale
main() {
    print_header "🧪 Validation de l'installation Portfolio"
    
    echo -e "${BLUE}Portfolio: ${GREEN}Hocine IRATNI${NC}"
    echo -e "${BLUE}URL de test: ${GREEN}$TEST_URL${NC}\n"
    
    local failed_tests=0
    
    # Exécution des tests
    test_system_requirements || ((failed_tests++))
    test_portfolio_files || ((failed_tests++))
    test_services || ((failed_tests++))
    test_http_responses || ((failed_tests++))
    test_performance || ((failed_tests++))
    test_content || ((failed_tests++))
    test_security || ((failed_tests++))
    
    # Rapport final
    generate_report
    
    # Résultat
    if [[ $failed_tests -eq 0 ]]; then
        print_success "Tous les tests sont passés! Installation parfaite ✅"
        exit 0
    else
        print_warning "$failed_tests test(s) échoué(s). Vérifiez les logs ci-dessus."
        exit 1
    fi
}

# Gestion des arguments
if [[ "$1" == "--help" ]] || [[ "$1" == "-h" ]]; then
    echo "Usage: bash validate-installation.sh [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  --help, -h    Afficher cette aide"
    echo "  --url URL     Tester une URL personnalisée (défaut: http://localhost)"
    echo ""
    echo "Exemple:"
    echo "  bash validate-installation.sh --url http://mon-domaine.com"
    exit 0
fi

while [[ $# -gt 0 ]]; do
    case $1 in
        --url)
            TEST_URL="$2"
            shift 2
            ;;
        *)
            print_error "Argument inconnu: $1"
            exit 1
            ;;
    esac
done

# Exécution
main "$@"
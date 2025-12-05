# 👨‍💻 Portfolio - Hocine IRATNI

> Portfolio professionnel moderne développé avec Next.js 15 et React 19

## 🚀 Déploiement rapide sur Ubuntu 24.04

```bash
chmod +x install-ubuntu.sh && bash install-ubuntu.sh
```

**Une seule commande pour installer complètement le portfolio !**

## 📋 Qu'est-ce qui est inclus ?

- ✅ **Installation automatique** de Node.js 20 LTS
- ✅ **Configuration Nginx** avec reverse proxy
- ✅ **Gestion des processus** avec PM2
- ✅ **Build optimisé** pour la production
- ✅ **Tests automatiques** de fonctionnement
- ✅ **Scripts de maintenance** inclus

## 🔧 Technologies

- **Frontend** : Next.js 15, React 19, Tailwind CSS
- **Icons** : Lucide React
- **Server** : Node.js 20 LTS, PM2, Nginx
- **OS** : Ubuntu 24.04 LTS

## 📖 Documentation

- [**Guide d'installation complet**](INSTALLATION.md)
- [**Procédure Ubuntu 24.04**](INSTALLATION-UBUNTU-24.04.md)

## 🎯 Fonctionnalités du Portfolio

### Pages disponibles
- **Accueil** - Présentation personnelle avec animations
- **TCS** - Compétences Technicien Cybersécurité
- **BTS SIO** - Formation et spécialisations
- **Projets** - Procédures techniques avec aperçu PDF
- **Veilles** - Veilles technologiques et juridiques
- **À Propos** - Informations détaillées et stages

### Caractéristiques techniques
- 🌙 **Mode sombre/clair** avec persistance
- 📱 **Responsive design** (mobile-first)
- ⚡ **Animations CSS** optimisées
- 🔍 **Système de recherche** et filtres
- 📄 **Visualisation PDF** intégrée
- 🎨 **Glassmorphism UI** moderne

## 🔧 Gestion du portfolio

### Commandes essentielles
```bash
# Statut des services
pm2 status

# Logs en temps réel
pm2 logs portfolio

# Redémarrer le service
pm2 restart portfolio

# Mise à jour complète
bash update-portfolio.sh
```

### Structure des fichiers
```
/var/www/portfolio/     # Installation de production
├── src/app/           # Pages Next.js (App Router)
├── src/components/    # Composants React
├── src/contexts/      # Contextes (thème, etc.)
├── public/           # Assets statiques
└── package.json      # Configuration et dépendances
```

## 🌐 Accès

- **Local** : http://localhost
- **Production** : http://votre-domaine.com

---

**⚡ Installation ultra-rapide en une commande - Testé sur Ubuntu 24.04 LTS**
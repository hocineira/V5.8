# 🚀 Installation Portfolio - Ubuntu 24.04 LTS (Version Simplifiée)

> **Portfolio professionnel de Hocine IRATNI**  
> **Architecture Full-Stack Simplifiée :** Next.js 15 + API Routes + Flux RSS Intégré  
> **Nouvelle version 2.0** - Architecture unifiée sans backend séparé

## ⚡ Installation automatique (Recommandée)

### Une seule commande suffit :

```bash
chmod +x install-ubuntu-simple.sh && bash install-ubuntu-simple.sh
```

**Installation complète en moins de 5 minutes !**

---

## 🏗️ **Architecture Simplifiée**

### ✅ **AVANT (Complexe) :**
- ❌ Frontend Next.js (port 3000)
- ❌ Backend FastAPI Python (port 8001) 
- ❌ MongoDB (base de données)
- ❌ Supervisor + PM2 + Nginx
- ❌ 15+ dépendances à gérer

### ✅ **APRÈS (Simple) :**
- ✅ **Next.js UNIQUEMENT** 
- ✅ **API Routes intégrées** (remplace FastAPI)
- ✅ **Stockage JSON local** (remplace MongoDB)
- ✅ **Système RSS intégré** automatique
- ✅ **PM2 + Nginx** seulement

---

## 📋 Prérequis

- Ubuntu 24.04 LTS (Server ou Desktop)
- Accès sudo
- Connexion Internet
- **1 GB RAM minimum** (avec swap file)
- 3 GB espace disque (réduit de 5GB à 3GB)

> ⚠️ **Important pour VPS 1GB RAM** : Un swap file est nécessaire pour le build Next.js

---

## 🔧 Installation manuelle (Alternative)

### Étape 1 : Préparation du système

```bash
# Mise à jour et installation Node.js 20 LTS
sudo apt update && sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs nginx git

# Vérification
node --version  # Doit afficher v20.x.x ou plus
npm --version
```

### Étape 1.5 : ⚠️ Configuration Swap (OBLIGATOIRE pour VPS 1GB RAM)

**Si votre serveur a seulement 1GB de RAM, cette étape est CRITIQUE !**

```bash
# Créer un fichier swap de 1GB (mémoire virtuelle)
sudo dd if=/dev/zero of=/swapfile bs=1M count=1024

# Sécuriser les permissions
sudo chmod 600 /swapfile

# Formater en swap
sudo mkswap /swapfile

# Activer le swap
sudo swapon /swapfile

# Vérifier que le swap est actif
free -h
# Vous devez voir "Swap: 1.0Gi" au lieu de "0B"

# Rendre le swap permanent (survit aux redémarrages)
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

# Vérifier la configuration
cat /etc/fstab | grep swap
```

**Pourquoi le swap ?**
- Next.js build nécessite ~600-800 MB de RAM
- Avec 1GB RAM seulement, le build sera tué (SIGKILL - exit code 137)
- Le swap ajoute 1GB de mémoire virtuelle = 2GB total = Build réussi ✅

**Si vous avez 2GB+ de RAM, vous pouvez sauter cette étape.**

### Étape 2 : Installation du Portfolio Full-Stack

```bash
# Clonage et installation
git clone https://github.com/votre-repo/portfolio-simple.git /var/www/portfolio
cd /var/www/portfolio

# Installation des dépendances (Plus légères !)
npm install

# Création du répertoire de données RSS
mkdir -p data
chmod 755 data

# Build de production
npm run build

# Si le build échoue avec "Killed" (exit code 137)
# C'est que vous manquez de RAM - retournez à l'Étape 1.5 pour ajouter le swap !
```

### Étape 3 : Démarrage et configuration des services

```bash
# Installation de PM2 pour la gestion des processus
sudo npm install -g pm2

# Configuration PM2 pour le portfolio unifié
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'portfolio',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/portfolio',
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

# Configuration Nginx (Simplifiée)
sudo tee /etc/nginx/sites-available/portfolio > /dev/null << 'EOF'
server {
    listen 80;
    server_name your-domain.com;  # Remplacez par votre domaine
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # API Routes (RSS et autres)
    location /api/ {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF

# Activation du site
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl restart nginx
```

---

## 🎉 C'est terminé !

**Votre portfolio Full-Stack est accessible sur :**
- **Local** : http://localhost:3000
- **Domaine** : http://your-domain.com
- **API RSS** : http://localhost:3000/api/windows/updates
- **Veille technologique** : http://localhost:3000/veilles/technologique

---

## 🔧 Commandes de gestion

### Gestion PM2
```bash
# Voir le statut
pm2 status

# Redémarrer
pm2 restart portfolio

# Voir les logs
pm2 logs portfolio

# Arrêter
pm2 stop portfolio
```

### Gestion du système RSS
```bash
# Test de l'API
curl http://localhost:3000/api/test

# Actualisation manuelle des flux RSS
curl -X POST http://localhost:3000/api/windows/updates/refresh

# Vérifier les statistiques RSS
curl http://localhost:3000/api/windows/updates/stats

# Voir les dernières mises à jour
curl http://localhost:3000/api/windows/updates/latest?limit=5
```

### Mise à jour du portfolio
```bash
cd /var/www/portfolio
git pull
npm install
npm run build
pm2 restart portfolio
```

---

## 🆚 Comparaison avec l'ancienne installation

| Aspect | Ancienne version | **Nouvelle version** |
|--------|------------------|----------------------|
| **Architecture** | 🔴 3 services (Next.js + FastAPI + MongoDB) | 🟢 **1 service (Next.js)** |
| **Étapes** | 🔴 20+ étapes | 🟢 **5 étapes** |
| **Temps** | 🔴 45+ minutes | 🟢 **5 minutes** |
| **Dépendances** | 🔴 Node.js + Python + MongoDB | 🟢 **Node.js uniquement** |
| **Complexité** | 🔴 Très élevée | 🟢 **Très simple** |
| **Maintenance** | 🔴 3 services à gérer | 🟢 **1 service à gérer** |
| **Erreurs** | 🔴 Nombreuses | 🟢 **Rares** |
| **Fonctionnalités RSS** | ✅ **Identiques** | ✅ **Identiques + Améliorées** |

---

## 🔥 **Nouveautés de la Version 2.0**

### ✅ **Système RSS Intégré**
- **Flux RSS automatiques** depuis 4 sources Microsoft officielles
- **Planificateur intégré** : mise à jour quotidienne à 8h + vérification sécurité toutes les 6h
- **API REST complète** : `/api/windows/updates/*`
- **Stockage JSON local** performant et fiable
- **Traduction automatique** français/anglais
- **Catégorisation intelligente** (sécurité, fonctionnalités, serveur)

### ✅ **Interface Moderne**
- **Page veille technologique** : http://localhost:3000/veilles/technologique
- **Statistiques en temps réel**
- **Filtres par catégorie et version**
- **Actualisation en un clic**
- **Design responsive** optimisé mobile/desktop

### ✅ **Sources RSS Officielles**
- **Microsoft France** : Actualités en français
- **Microsoft Security** : Mises à jour de sécurité critiques  
- **Windows Blog** : Nouvelles fonctionnalités
- **Windows Server** : Évolutions serveur et entreprise

---

## 💰 Configuration pour VPS Économiques (1GB RAM)

**Bonne nouvelle** : Ce portfolio fonctionne parfaitement sur des VPS économiques !

### Optimisations appliquées

#### 1. Swap File (OBLIGATOIRE)
```bash
# Créer 1GB de swap
sudo dd if=/dev/zero of=/swapfile bs=1M count=1024
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

#### 2. Configuration mémoire optimisée
Le fichier `.env.local` est pré-configuré avec :
```bash
NODE_OPTIONS=--max-old-space-size=512
```

#### 3. Mode Production (économise RAM)
```bash
# En production, Next.js utilise seulement ~100MB de RAM !
pm2 start ecosystem.config.js  # npm start
```

### Consommation RAM Réelle

| Mode | RAM Utilisée | VPS 1GB |
|------|-------------|---------|
| **Build** (avec swap) | 600-800 MB | ✅ Fonctionne |
| **Production** (npm start) | **~100 MB** | ✅ Parfait ! |
| Dev (npm run dev) | 500-800 MB | ❌ Éviter |

**Conclusion** : Avec swap + mode production, un VPS 1GB suffit largement ! 🎉

---

## 🛡️ Sécurité (Optionnel)

### SSL avec Let's Encrypt
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

### Firewall
```bash
sudo ufw allow 'Nginx Full'
sudo ufw allow ssh
sudo ufw enable
```

---

## 🚨 Dépannage

### Build échoue avec "Killed" (Exit code 137)

**Problème** : Pas assez de mémoire RAM

**Solution** :
```bash
# 1. Vérifier la RAM disponible
free -h

# 2. Si Swap = 0B, ajouter un swap file (voir Étape 1.5)
sudo dd if=/dev/zero of=/swapfile bs=1M count=1024
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

# 3. Vérifier que le swap est actif
free -h  # Doit montrer "Swap: 1.0Gi"

# 4. Réessayer le build
cd /var/www/portfolio
npm run build
```

### Portfolio ne démarre pas
```bash
# Vérifier les logs
pm2 logs portfolio

# Redémarrer
pm2 restart portfolio

# Vérifier l'état des services
pm2 status
```

### API RSS ne fonctionne pas
```bash
# Test de l'API de base
curl http://localhost:3000/api/test

# Actualisation manuelle
curl -X POST http://localhost:3000/api/windows/updates/refresh

# Vérifier les données
ls -la /var/www/portfolio/data/
```

### Erreur 502 Bad Gateway
```bash
# Vérifier que le portfolio tourne
pm2 status

# Vérifier Nginx
sudo nginx -t
sudo systemctl restart nginx
```

### Port 3000 occupé
```bash
# Trouver le processus
sudo lsof -i :3000

# Tuer le processus
sudo kill -9 <PID>

# Redémarrer le service
pm2 restart portfolio
```

---

## 📊 Avantages de cette nouvelle architecture

### ✅ **Simplicité Maximale**
- **1 seul service** au lieu de 3 services différents
- **5 commandes** d'installation au lieu de 20+ étapes
- **Installation en 5 minutes** au lieu de 45+ minutes
- **Node.js uniquement** au lieu de Node.js + Python + MongoDB

> ⚠️ **Note VPS 1GB RAM** : Avec swap file configuré, le système fonctionne parfaitement même sur VPS économiques

### ✅ **Stabilité Renforcée**
- **Moins de dépendances** = beaucoup moins de problèmes
- **Architecture unifiée** = moins de points de défaillance
- **Pas de serveur DB externe** = élimination des problèmes de connexion
- **Stockage local** = pas de perte de données

### ✅ **Performance Optimale**
- **API Routes Next.js** = réponse ultra-rapide
- **Stockage JSON** = accès instantané aux données
- **Cache intégré** = optimisation automatique
- **Moins de latence** = pas de communication inter-services

### ✅ **Fonctionnalités RSS Identiques**
- **Toutes les fonctionnalités** de l'ancien système préservées
- **Planificateur automatique** intégré
- **4 sources Microsoft** officielles
- **Traduction automatique** français/anglais
- **Interface moderne** et responsive

### ✅ **Maintenance Ultra-Simplifiée**
- **Une seule commande** pour les mises à jour (`pm2 restart portfolio`)
- **Logs centralisés** avec PM2
- **Monitoring intégré** = surveillance facile
- **Sauvegarde simple** = un seul répertoire à sauvegarder

---

## 🎯 Recommandations

### **Architecture recommandée**
Cette **nouvelle architecture unifiée** est désormais la référence pour :
- ✅ **Simplicité d'installation et de maintenance**
- ✅ **Stabilité et fiabilité maximales**  
- ✅ **Performance optimale**
- ✅ **Fonctionnalités complètes préservées**

### **Conseils de production**
- Utilisez un **domaine personnalisé**
- Activez **SSL/TLS** avec Let's Encrypt
- Configurez **un firewall** (UFW)
- Planifiez des **sauvegardes** du répertoire `/var/www/portfolio/data/`

---

## 🎊 Conclusion

Cette refonte architecture transforme complètement l'expérience d'installation et de maintenance :

### **Avant (Architecture complexe) :**
- ❌ 20+ étapes, 45+ minutes, erreurs fréquentes
- ❌ 3 services différents à gérer (Node.js + Python + MongoDB)
- ❌ Configuration complexe et maintenance difficile

### **Maintenant (Architecture simplifiée) :**
- ✅ **5 étapes, 5 minutes, installation fiable**
- ✅ **1 seul service Next.js unifié**
- ✅ **Fonctionnalités RSS complètes préservées**
- ✅ **Maintenance ultra-simple**

**Le portfolio est maintenant simple, rapide, stable et garde toutes ses fonctionnalités !**

---

## 🔧 **API Endpoints Disponibles**

### Endpoints RSS Intégrés
```bash
# Test de l'API
GET /api/test

# Toutes les mises à jour
GET /api/windows/updates?category=security&limit=20

# Dernières mises à jour  
GET /api/windows/updates/latest?limit=10

# Statistiques
GET /api/windows/updates/stats

# Catégories disponibles
GET /api/windows/updates/categories

# Actualisation manuelle
POST /api/windows/updates/refresh
```

### Exemples d'utilisation
```bash
# Récupérer les 5 dernières mises à jour de sécurité
curl "http://localhost:3000/api/windows/updates?category=security&limit=5"

# Actualiser les flux RSS manuellement  
curl -X POST http://localhost:3000/api/windows/updates/refresh

# Voir les statistiques
curl http://localhost:3000/api/windows/updates/stats
```

---

*Guide créé pour Hocine IRATNI - Portfolio Next.js Full-Stack Simplifié*  
*Refonte complète v2.0 : Architecture unifiée avec fonctionnalités RSS intégrées*
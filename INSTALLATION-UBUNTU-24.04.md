# 🚀 Installation Portfolio - Ubuntu 24.04 LTS

> **Portfolio professionnel de Hocine IRATNI**  
> Next.js 15 + React 19 + Tailwind CSS

## ⚡ Installation automatique (Recommandée)

### Une seule commande suffit :

```bash
chmod +x install-ubuntu.sh && bash install-ubuntu.sh
```

**Installation complète en moins de 5 minutes !**

---

## 📋 Prérequis

- Ubuntu 24.04 LTS (Server ou Desktop)
- Accès sudo
- Connexion Internet
- 2 GB RAM minimum
- 5 GB espace disque

---

## 🔧 Installation manuelle (Alternative)

### Étape 1 : Préparation du système

```bash
# Mise à jour et installation Node.js 18+
sudo apt update && sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs nginx git

# Vérification
node --version  # Doit afficher v18.x.x ou plus
npm --version
```

### Étape 2 : Installation du Portfolio

```bash
# Clonage et installation
git clone https://github.com/votre-repo/portfolio-simple.git /var/www/portfolio
cd /var/www/portfolio

# Installation des dépendances
npm install

# Build de production
npm run build
```

### Étape 3 : Démarrage et configuration

```bash
# Installation de PM2 pour la gestion des processus
sudo npm install -g pm2

# Démarrage du portfolio
pm2 start npm --name "portfolio" -- start
pm2 startup
pm2 save

# Configuration Nginx
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
}
EOF

# Activation du site
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl restart nginx
```

---

## 🎉 C'est terminé !

**Votre portfolio est accessible sur :**
- **Local** : http://localhost:3000
- **Domaine** : http://your-domain.com

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

### Mise à jour
```bash
cd /var/www/portfolio
git pull
npm install
npm run build
pm2 restart portfolio
```

---

## 🆚 Comparaison avec l'ancienne installation

| Aspect | Ancienne version | Nouvelle version |
|--------|------------------|------------------|
| **Étapes** | 🔴 15+ étapes | 🟢 3 étapes |
| **Temps** | 🔴 30+ minutes | 🟢 5 minutes |
| **Services** | 🔴 MariaDB + FastAPI + React | 🟢 Next.js uniquement |
| **Complexité** | 🔴 Très élevée | 🟢 Très simple |
| **Erreurs** | 🔴 Nombreuses | 🟢 Rares |

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

### Portfolio ne démarre pas
```bash
# Vérifier les logs
pm2 logs portfolio

# Redémarrer
pm2 restart portfolio
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
```

---

## 📊 Avantages de cette nouvelle approche

### ✅ **Simplicité extrême**
- **3 commandes** au lieu de 15+ étapes
- **Installation en 5 minutes** au lieu de 30+ minutes
- **Une seule stack** au lieu de 3 technologies différentes

### ✅ **Stabilité maximale**
- **Moins de dépendances** = moins de problèmes
- **Framework mature** (Next.js) = moins de bugs
- **Pas de serveur DB** = un point de défaillance en moins

### ✅ **Performance optimale**
- **SSR/SSG** = chargement ultra-rapide
- **Optimisations automatiques** = pas de configuration manuelle
- **CDN ready** = déploiement global facile

### ✅ **Maintenance simplifiée**
- **Une seule commande** pour les mises à jour
- **Logs centralisés** avec PM2
- **Monitoring intégré** = surveillance facile

---

## 🎯 Recommandations

### **Ubuntu Server 24.04** vs Debian 12
**Ubuntu 24.04 est recommandé** pour ce projet car :
- ✅ **Node.js plus récent** dans les dépôts
- ✅ **Meilleures performances** avec Next.js
- ✅ **Support LTS** jusqu'en 2029
- ✅ **Communauté plus active** pour le support

### **Conseils de production**
- Utilisez un **domaine personnalisé**
- Activez **SSL/TLS** avec Let's Encrypt
- Configurez **un firewall** (UFW)
- Planifiez des **sauvegardes** régulières

---

## 🎊 Conclusion

Cette nouvelle approche transforme complètement l'expérience d'installation :

- **Avant** : 15+ étapes, 30+ minutes, erreurs fréquentes
- **Maintenant** : 3 étapes, 5 minutes, installation fiable

**Le portfolio est maintenant simple, rapide et stable !**

---

*Guide créé pour Hocine IRATNI - Portfolio Next.js Simple*  
*Refonte complète axée sur la simplicité d'installation*
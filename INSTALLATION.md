# 🚀 Installation Portfolio - Ubuntu 24.04

> **Portfolio de Hocine IRATNI**  
> Technologies: Next.js 15 + React 19 + Tailwind CSS + PM2 + Nginx

## ⚡ Installation automatique (Recommandée)

### Une seule commande suffit :

```bash
chmod +x install-ubuntu.sh && bash install-ubuntu.sh
```

**C'est tout !** Le script automatique s'occupe de :
- ✅ Installation de Node.js 20 LTS
- ✅ Installation et configuration de Nginx
- ✅ Installation des dépendances du portfolio
- ✅ Configuration de PM2 pour la gestion des processus
- ✅ Build de production optimisé
- ✅ Configuration du reverse proxy
- ✅ Tests de fonctionnement

---

## 🔧 Installation manuelle (Alternative)

### Prérequis
- Ubuntu 24.04 LTS
- Accès sudo
- Connexion Internet

### Étape 1 : Préparation système
```bash
sudo apt update && sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs nginx git
```

### Étape 2 : Installation portfolio
```bash
sudo mkdir -p /var/www/portfolio
sudo chown -R $USER:$USER /var/www/portfolio
cp -r /app/* /var/www/portfolio/
cd /var/www/portfolio
npm install
npm run build
```

### Étape 3 : Services
```bash
npm install -g pm2
pm2 start npm --name "portfolio" -- start
pm2 startup && pm2 save
```

### Étape 4 : Nginx
```bash
sudo tee /etc/nginx/sites-available/portfolio > /dev/null << 'EOF'
server {
    listen 80;
    server_name localhost;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl restart nginx
```

---

## 🎯 Accès et gestion

### Accès au portfolio
- **URL locale** : http://localhost
- **Répertoire** : /var/www/portfolio

### Commandes de gestion
```bash
# Statut des services
pm2 status

# Logs en temps réel
pm2 logs portfolio

# Redémarrer
pm2 restart portfolio

# Mise à jour complète
bash update-portfolio.sh
```

---

## 🔒 Sécurisation (Optionnel)

### SSL avec Let's Encrypt
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d votre-domaine.com
```

### Firewall
```bash
sudo ufw allow 'Nginx Full'
sudo ufw allow ssh
sudo ufw enable
```

---

## 🛠️ Dépannage

### Portfolio ne démarre pas
```bash
pm2 logs portfolio    # Voir les erreurs
pm2 restart portfolio # Redémarrer
```

### Erreur 502 Bad Gateway
```bash
pm2 status                    # Vérifier PM2
sudo nginx -t                 # Tester config Nginx
sudo systemctl restart nginx  # Redémarrer Nginx
```

### Port 3000 occupé
```bash
sudo lsof -i :3000      # Trouver le processus
sudo kill -9 <PID>      # Tuer le processus
```

---

## 📊 Architecture

```
Internet → Nginx (Port 80) → Portfolio Next.js (Port 3000)
                 ↓
              PM2 (Gestionnaire de processus)
```

### Avantages de cette architecture :
- ⚡ **Performance** : SSR/SSG avec Next.js
- 🔒 **Sécurité** : Nginx comme reverse proxy
- 🚀 **Fiabilité** : PM2 pour la gestion des processus
- 📈 **Évolutivité** : Architecture prête pour la production

---

## 📝 Support

### Structure du projet
```
portfolio/
├── src/
│   ├── app/           # Pages Next.js 15 (App Router)
│   ├── components/    # Composants React réutilisables
│   └── contexts/      # Contextes React (thème, etc.)
├── public/            # Assets statiques
├── package.json       # Dépendances et scripts
└── next.config.js     # Configuration Next.js
```

### Technologies utilisées
- **Frontend** : Next.js 15, React 19, Tailwind CSS
- **Icons** : Lucide React
- **Server** : Node.js 20 LTS
- **Process Manager** : PM2
- **Web Server** : Nginx
- **OS** : Ubuntu 24.04 LTS

---

**💡 Conseil** : Utilisez toujours le script automatique `install-ubuntu.sh` pour une installation sans erreur !
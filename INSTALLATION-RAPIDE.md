# ⚡ Installation Ultra-Rapide - Portfolio Hocine IRATNI

## 🎯 Une seule commande pour tout installer

```bash
chmod +x install-ubuntu.sh && bash install-ubuntu.sh
```

**C'est tout ! 5 minutes et c'est prêt !** 🚀

---

## 📋 Ce qui sera installé automatiquement

✅ **Node.js 20 LTS** - Runtime JavaScript  
✅ **Nginx** - Serveur web et reverse proxy  
✅ **PM2** - Gestionnaire de processus  
✅ **Portfolio** - Application Next.js complète  
✅ **Configuration** - Tous les services configurés  

---

## 🔧 Après l'installation

### Accès au portfolio
- **URL** : http://localhost
- **Répertoire** : /var/www/portfolio

### Commandes utiles
```bash
# Voir le statut
pm2 status

# Redémarrer
pm2 restart portfolio

# Voir les logs
pm2 logs portfolio

# Mise à jour
bash update-portfolio.sh
```

---

## 🛠️ Scripts inclus

| Script | Description |
|--------|-------------|
| `install-ubuntu.sh` | Installation complète automatique |
| `update-portfolio.sh` | Mise à jour du portfolio |
| `validate-installation.sh` | Tests et validation |
| `test-portfolio.sh` | Test rapide local |

---

## 📖 Documentation complète

- [**Installation détaillée**](INSTALLATION.md)
- [**Guide Ubuntu 24.04**](INSTALLATION-UBUNTU-24.04.md)
- [**README principal**](README.md)

---

**💡 Recommandé : Ubuntu 24.04 LTS pour une stabilité optimale**
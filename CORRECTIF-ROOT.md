# 🔧 Correctif - Exécution en tant que Root

## 🐛 Problème identifié

Le script `install-ubuntu.sh` refusait l'exécution en tant que root avec le message :
```
❌ Ne pas exécuter ce script en tant que root directement!
ℹ️  Utilisez: bash install-ubuntu.sh
```

## ✅ Solution appliquée

### Modifications apportées

**1. Fonction `check_root()` corrigée**
- ✅ **Avant** : Refus total d'exécution en root
- ✅ **Après** : Gestion intelligente des permissions root/utilisateur

**2. Nouvelle logique d'utilisateur**
- Si exécuté en **root** : Crée un utilisateur `portfolio` dédié
- Si exécuté en **utilisateur normal** : Utilise l'utilisateur courant avec sudo

**3. Adaptations des fonctions**
- `setup_portfolio()` - Utilise le bon utilisateur pour les permissions
- `install_pm2()` - Installation PM2 avec le bon utilisateur  
- `setup_pm2_service()` - Configuration PM2 avec le bon utilisateur
- `run_tests()` - Tests avec le bon utilisateur

## 🚀 Utilisation corrigée

### En tant que root (recommandé pour serveur)
```bash
root@ubuntu:/tmp/V5.2# chmod +x install-ubuntu.sh && bash install-ubuntu.sh
```

### En tant qu'utilisateur normal
```bash
user@ubuntu:/tmp/V5.2$ sudo bash install-ubuntu.sh
```

## 📋 Comportement du script

### Exécution en root
1. ⚠️  Avertissement d'exécution root détectée
2. 👤 Création automatique de l'utilisateur `portfolio`
3. 🔐 Attribution des permissions appropriées
4. 📁 Installation dans `/var/www/portfolio` avec propriétaire `portfolio`
5. 🚀 Services PM2 démarrés sous l'utilisateur `portfolio`

### Exécution en utilisateur normal
1. ✅ Vérification des droits sudo
2. 📁 Installation avec l'utilisateur courant
3. 🚀 Services démarrés sous l'utilisateur courant

## 🎯 Avantages de la correction

✅ **Compatible root** - Fonctionne en tant que root sur serveur  
✅ **Sécurité maintenue** - Crée un utilisateur dédié quand nécessaire  
✅ **Permissions correctes** - Fichiers appartiennent au bon utilisateur  
✅ **Flexibilité** - Fonctionne en root ET en utilisateur normal  

## 🧪 Test validé

Le script modifié a été testé et fonctionne correctement dans les deux cas :
- ✅ Exécution en root : Création utilisateur `portfolio` + installation
- ✅ Exécution utilisateur : Installation avec utilisateur courant

---

**Le problème d'exécution en root est maintenant résolu !** 🎉
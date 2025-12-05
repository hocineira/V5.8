# 🆘 SOLUTION SWAP FILE pour VPS 1GB RAM

## ⚠️ PROBLÈME
Sur un VPS avec seulement 1GB de RAM, le build Next.js est **tué (SIGKILL)** car il manque de mémoire.

**Exit code 137 = SIGKILL = Pas assez de mémoire !**

## ✅ SOLUTION PERMANENTE : Ajouter un Swap File

Le swap file ajoute de la mémoire virtuelle (utilise le disque dur comme RAM supplémentaire).

### Étape 1 : Créer un swap file de 1GB

```bash
# Sur votre VPS, exécutez ces commandes :

# 1. Créer le fichier swap (1GB)
sudo dd if=/dev/zero of=/swapfile bs=1M count=1024

# 2. Sécuriser les permissions
sudo chmod 600 /swapfile

# 3. Formater en swap
sudo mkswap /swapfile

# 4. Activer le swap
sudo swapon /swapfile

# 5. Vérifier que c'est actif
free -h
# Vous devriez voir "Swap: 1.0Gi" au lieu de "0B"
```

### Étape 2 : Rendre le swap permanent (survit aux redémarrages)

```bash
# Ajouter à /etc/fstab
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

# Vérifier
cat /etc/fstab | grep swap
```

### Étape 3 : Tester le build

```bash
cd /var/www/portfolio  # ou votre dossier projet

# Utiliser le script optimisé
chmod +x build-optimized.sh
./build-optimized.sh

# OU manuellement
NODE_OPTIONS="--max-old-space-size=512" yarn build
```

## 📊 Résultats Attendus

**Avant swap :**
```
Mem:  1.0Gi
Swap: 0B        ← Problème !
Build: Killed (exit code 137) ❌
```

**Après swap :**
```
Mem:  1.0Gi
Swap: 1.0Gi     ← Solution !
Build: Success ✅
```

## 🔧 Alternative : Build sur une autre machine

Si vous ne pouvez pas ajouter de swap :

### Option A : Build en local puis transférer

```bash
# Sur votre PC local (avec plus de RAM)
git clone votre-repo
cd votre-repo
yarn install
yarn build

# Transférer uniquement le dossier .next
scp -r .next/ user@votre-vps:/var/www/portfolio/
```

### Option B : Build sur un serveur temporaire

```bash
# Utiliser un serveur GitHub Actions, GitLab CI, etc.
# Ils ont plus de RAM pour le build
# Puis déployer uniquement le .next/ buildé
```

## 🚀 Configuration Finale Optimale

Une fois le swap ajouté, utilisez ces paramètres :

**Fichier: `.env.local`**
```bash
NODE_OPTIONS=--max-old-space-size=768
```

**Build:**
```bash
yarn build
yarn start
```

**Consommation:**
- Build: 600-800MB (avec swap OK ✅)
- Runtime (yarn start): ~100MB
- Total avec swap: Très stable !

## ❓ FAQ

### Q: Le swap ralentit-il mon serveur ?
**R:** Le swap est utilisé uniquement pendant le build (1-2 minutes). En production (`yarn start`), le serveur n'utilise que 100MB de RAM réelle, donc pas de swap = rapide !

### Q: Quelle taille de swap ?
**R:** Pour Next.js sur VPS 1GB, **1GB de swap suffit**. Vous pouvez même faire 2GB si vous avez l'espace disque.

### Q: Puis-je supprimer le swap après ?
**R:** Techniquement oui, mais vous devrez le réactiver à chaque build. Mieux vaut le garder.

## 🎯 Commandes Complètes Résumées

```bash
# Configuration swap (une seule fois)
sudo dd if=/dev/zero of=/swapfile bs=1M count=1024
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

# Vérifier
free -h

# Puis builder normalement
cd /var/www/portfolio
yarn build
yarn start

# ✅ Plus de SIGKILL !
```

## 📝 Notes Importantes

- Le swap utilise **1GB d'espace disque**
- Vérifiez que vous avez assez d'espace : `df -h`
- Si `/` est plein, utilisez un autre emplacement avec de l'espace
- Le swap améliore aussi la stabilité globale du VPS

**Avec swap = VPS 1GB devient VPS 2GB virtuel = Build Next.js possible ! 🎉**

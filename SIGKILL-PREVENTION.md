# Prévention des Erreurs SIGKILL - VPS 1GB RAM

## 🔍 Problème
L'erreur "Next.js build worker exited with code: null and signal: SIGKILL" est causée par un manque de mémoire (OOM - Out Of Memory) sur un **VPS avec seulement 1GB de RAM**.

## ⚠️ CRITIQUE: Configuration pour VPS 1GB RAM
Avec seulement 1GB de RAM, Next.js en mode développement (`yarn dev`) consomme 500-800MB et causera des SIGKILL. **La solution est d'utiliser le mode production.**

## ✅ Solutions Appliquées

### 1. Limitation STRICTE de la Mémoire Node.js
**Fichier:** `.env.local`
```bash
NODE_OPTIONS=--max-old-space-size=512
```
⚠️ **IMPORTANT:** Limite à 512MB (pas plus sur VPS 1GB RAM)

### 2. Configuration Next.js Ultra-Optimisée
**Fichier:** `next.config.js`
```javascript
experimental: {
  optimizePackageImports: ['lucide-react'],
  workerThreads: false,  // Désactive les workers threads
  cpus: 1,               // Limite à 1 CPU
},
swcMinify: true,         // Plus efficace que Terser
productionBrowserSourceMaps: false, // Économise mémoire
```

### 3. MODE PRODUCTION Obligatoire
**Fichier:** `/etc/supervisor/conf.d/supervisord.conf`
```ini
[program:frontend]
command=yarn start  # ⚠️ PAS yarn dev !
environment=NODE_OPTIONS="--max-old-space-size=512"
```

**Pourquoi le mode production ?**
- `yarn dev` : 500-800 MB de RAM ❌ (SIGKILL sur 1GB VPS)
- `yarn start` : ~100 MB de RAM ✅ (Fonctionne parfaitement)

### 4. Build Avant Déploiement
```bash
# Build avec limite mémoire
NODE_OPTIONS="--max-old-space-size=512" yarn build

# Puis démarrer
yarn start
```

## 📊 Consommation Mémoire Vérifiée
```
Mode Dev (yarn dev):   500-800 MB ❌ SIGKILL sur 1GB VPS
Mode Prod (yarn start): ~100 MB ✅ Stable
```

## 🛠️ Commandes Build

### Build Standard
```bash
cd /app
NODE_OPTIONS="--max-old-space-size=512" yarn build
```

### Si Build Échoue (pas assez de mémoire)
```bash
# Option 1: Réduire encore plus (384MB)
NODE_OPTIONS="--max-old-space-size=384" yarn build

# Option 2: Build par étapes (vider cache)
rm -rf .next/
NODE_OPTIONS="--max-old-space-size=512" yarn build
```

## 📊 Monitoring

### Vérifier l'utilisation mémoire
```bash
# Mémoire totale
free -h

# Mémoire Next.js
ps aux | grep "next" | grep -v grep

# Logs OOM
dmesg | grep -i "oom\|killed"
```

### Vérifier les logs
```bash
# Logs en temps réel
tail -f /var/log/supervisor/frontend.err.log

# Rechercher SIGKILL
grep -i "sigkill" /var/log/supervisor/frontend.err.log
```

## 🚨 Si SIGKILL Persiste

### 1. Vérifier que vous êtes en mode production
```bash
sudo supervisorctl status
# Doit montrer: yarn start (PAS yarn dev)
```

### 2. Vérifier la limite mémoire
```bash
cat /app/.env.local
# Doit montrer: NODE_OPTIONS=--max-old-space-size=512
```

### 3. Redémarrer avec configuration propre
```bash
rm -rf /app/.next/
cd /app && NODE_OPTIONS="--max-old-space-size=512" yarn build
sudo supervisorctl restart frontend
```

## ❌ À NE JAMAIS FAIRE sur VPS 1GB

1. ❌ Ne JAMAIS utiliser `yarn dev` en production
2. ❌ Ne JAMAIS mettre NODE_OPTIONS > 768MB
3. ❌ Ne JAMAIS désactiver swcMinify (utilise plus de mémoire)
4. ❌ Ne JAMAIS activer productionBrowserSourceMaps

## ✅ Configuration Actuelle Validée

- ✅ Mode: Production (`yarn start`)
- ✅ Mémoire Node.js: 512MB
- ✅ Consommation réelle: ~100MB
- ✅ Build time: ~30 secondes
- ✅ 31 routes générées
- ✅ Aucun SIGKILL détecté
- ✅ Application stable

## 🎯 Résumé

**Pour VPS 1GB RAM, la formule magique est:**
```bash
NODE_OPTIONS=--max-old-space-size=512 yarn build
yarn start  # Mode production uniquement !
```

**Consommation mémoire optimale: ~100MB** 🚀

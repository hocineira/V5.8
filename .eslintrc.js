module.exports = {
  extends: ['next/core-web-vitals'],
  rules: {
    // Désactiver les règles trop strictes pour l'environnement de développement
    '@next/next/no-img-element': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    'no-unused-vars': 'warn'
  }
}
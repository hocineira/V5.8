// Système de logging intelligent pour production
const isDevelopment = process.env.NODE_ENV !== 'production';
const isDebugEnabled = process.env.NEXT_PUBLIC_DEBUG_MODE === 'true';

export const logger = {
  debug: (...args) => {
    if (isDevelopment || isDebugEnabled) {
      console.log('[DEBUG]', ...args);
    }
  },
  
  info: (...args) => {
    if (isDevelopment || isDebugEnabled) {
      console.info('[INFO]', ...args);
    }
  },
  
  warn: (...args) => {
    if (isDevelopment || isDebugEnabled) {
      console.warn('[WARN]', ...args);
    }
  },
  
  error: (...args) => {
    // Les erreurs sont toujours loggées
    console.error('[ERROR]', ...args);
  },
  
  rss: (...args) => {
    if (isDevelopment || isDebugEnabled) {
      console.log('[RSS]', ...args);
    }
  }
};

export default logger;
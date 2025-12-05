// Planificateur RSS intégré pour Next.js
import { rssFetcher } from './rss-fetcher.js';
import { storage } from './storage.js';

class RSSScheduler {
  constructor() {
    this.running = false;
    this.intervals = [];
  }

  async setupSchedule() {
    console.log("📅 Configuration du planificateur RSS...");
    
    // Clear any existing intervals
    this.clearSchedule();
    
    if (typeof window !== 'undefined') {
      // Client-side - don't run scheduler
      return;
    }
    
    // Daily update at 8:00 AM (8 * 60 * 60 * 1000 = 28800000 ms from midnight)
    const now = new Date();
    const eightAM = new Date();
    eightAM.setHours(8, 0, 0, 0);
    
    // If it's already past 8 AM today, schedule for tomorrow
    if (now > eightAM) {
      eightAM.setDate(eightAM.getDate() + 1);
    }
    
    const msUntilEightAM = eightAM.getTime() - now.getTime();
    
    // Schedule daily update
    const dailyTimeout = setTimeout(() => {
      this.dailyUpdateJob();
      
      // Set up recurring daily updates
      const dailyInterval = setInterval(() => {
        this.dailyUpdateJob();
      }, 24 * 60 * 60 * 1000); // Every 24 hours
      
      this.intervals.push(dailyInterval);
    }, msUntilEightAM);
    
    // Schedule hourly security checks every 6 hours
    const securityInterval = setInterval(() => {
      this.hourlySecurityCheck();
    }, 6 * 60 * 60 * 1000); // Every 6 hours
    
    this.intervals.push(securityInterval);
    
    console.log("✅ Planificateur configuré:");
    console.log(`   - Prochaine mise à jour complète: ${eightAM.toLocaleString()}`);
    console.log("   - Vérifications sécurité: toutes les 6 heures");
    
    this.running = true;
  }

  async dailyUpdateJob() {
    try {
      console.log(`🌅 [${new Date().toLocaleTimeString()}] Mise à jour quotidienne démarrée...`);
      
      // Fetch all RSS feeds
      const allUpdates = await rssFetcher.fetchAllFeeds();
      
      // Store in database
      let storedCount = 0;
      for (const updateData of allUpdates) {
        try {
          await storage.saveWindowsUpdate(updateData);
          storedCount++;
        } catch (error) {
          console.error('Erreur stockage update:', error);
          continue;
        }
      }
      
      console.log(`✅ Mise à jour quotidienne terminée: ${storedCount} éléments traités`);
      
    } catch (error) {
      console.error('❌ Erreur mise à jour quotidienne:', error);
    }
  }

  async hourlySecurityCheck() {
    try {
      console.log(`🔍 [${new Date().toLocaleTimeString()}] Vérification sécurité...`);
      
      // Fetch only security updates
      const securityUpdates = await rssFetcher.fetchFeed("microsoft_security");
      
      let criticalCount = 0;
      for (const updateData of securityUpdates) {
        // Only process critical security updates
        if (updateData.severity === "Critical") {
          try {
            await storage.saveWindowsUpdate(updateData);
            criticalCount++;
          } catch (error) {
            continue;
          }
        }
      }
      
      if (criticalCount > 0) {
        console.log(`🚨 ${criticalCount} mises à jour critiques détectées`);
      } else {
        console.log("✅ Aucune nouvelle mise à jour critique");
      }
      
    } catch (error) {
      console.error('❌ Erreur vérification sécurité:', error);
    }
  }

  async manualUpdate() {
    console.log("🔄 Mise à jour manuelle démarrée...");
    await this.dailyUpdateJob();
  }

  clearSchedule() {
    this.intervals.forEach(interval => clearInterval(interval));
    this.intervals = [];
    this.running = false;
  }

  start() {
    if (!this.running) {
      this.setupSchedule();
    }
  }

  stop() {
    this.clearSchedule();
    console.log("🛑 Planificateur RSS arrêté");
  }
}

export const scheduler = new RSSScheduler();

// Auto-start scheduler in server environment
if (typeof window === 'undefined') {
  scheduler.start();
}
// Service de stockage JSON local pour remplacer MongoDB
import fs from 'fs';
import path from 'path';

class JSONStorage {
  constructor() {
    this.dataDir = path.join(process.cwd(), 'data');
    this.dataFile = path.join(this.dataDir, 'rss-cache.json');
    this.ensureDataDir();
  }

  ensureDataDir() {
    try {
      if (!fs.existsSync(this.dataDir)) {
        fs.mkdirSync(this.dataDir, { recursive: true });
      }
    } catch (error) {
      console.error('Erreur création répertoire data:', error);
    }
  }

  async loadData() {
    try {
      if (fs.existsSync(this.dataFile)) {
        const data = fs.readFileSync(this.dataFile, 'utf-8');
        const parsed = JSON.parse(data);
        
        // Convert date strings back to Date objects for consistency
        if (parsed.updates) {
          parsed.updates = parsed.updates.map(update => ({
            ...update,
            published_date: new Date(update.published_date),
            created_at: new Date(update.created_at),
            updated_at: new Date(update.updated_at)
          }));
        }
        
        return parsed;
      }
    } catch (error) {
      console.error('Erreur chargement données:', error);
    }
    
    return {
      updates: [],
      lastUpdated: new Date(),
      version: '1.0'
    };
  }

  async saveData(data) {
    try {
      // Prepare data for JSON serialization
      const dataToSave = {
        ...data,
        updates: data.updates.map(update => ({
          ...update,
          published_date: update.published_date instanceof Date ? update.published_date.toISOString() : update.published_date,
          created_at: update.created_at instanceof Date ? update.created_at.toISOString() : update.created_at,
          updated_at: update.updated_at instanceof Date ? update.updated_at.toISOString() : update.updated_at
        })),
        lastUpdated: new Date().toISOString()
      };

      fs.writeFileSync(this.dataFile, JSON.stringify(dataToSave, null, 2), 'utf-8');
      return true;
    } catch (error) {
      console.error('Erreur sauvegarde données:', error);
      return false;
    }
  }

  async saveWindowsUpdate(updateData) {
    // Wrapper for bulk update to maintain backward compatibility if needed, 
    // but ideally should not be used in loops.
    return this.saveWindowsUpdatesBulk([updateData]);
  }

  async saveWindowsUpdatesBulk(newUpdates) {
    try {
      const data = await this.loadData();
      let addedCount = 0;
      let updatedCount = 0;
      
      for (const updateData of newUpdates) {
         // Convert dates to Date objects if they're strings
        if (typeof updateData.published_date === 'string') {
            updateData.published_date = new Date(updateData.published_date);
        }

        // Check if update already exists
        const existingIndex = data.updates.findIndex(existing => 
            existing.title === updateData.title || existing.link === updateData.link
        );

        if (existingIndex !== -1) {
            // Update existing
            updateData.updated_at = new Date();
            // Preserve original created_at
            if (data.updates[existingIndex].created_at) {
                updateData.created_at = data.updates[existingIndex].created_at;
            }
            data.updates[existingIndex] = { ...data.updates[existingIndex], ...updateData };
            updatedCount++;
        } else {
            // Add new
            updateData.id = updateData.id || this.generateId();
            updateData.created_at = new Date();
            updateData.updated_at = new Date();
            data.updates.push(updateData);
            addedCount++;
        }
      }
      
      // OPTIMIZATION: Limit total stored updates to prevent file from growing indefinitely
      // Keep last 1000 updates (generous buffer)
      if (data.updates.length > 1000) {
          // Sort by date desc before slicing to keep newest
          data.updates.sort((a, b) => new Date(b.published_date) - new Date(a.published_date));
          data.updates = data.updates.slice(0, 1000);
      }

      await this.saveData(data);
      return { added: addedCount, updated: updatedCount };
    } catch (error) {
      console.error('Erreur sauvegarde updates groupés:', error);
      return null;
    }
  }

  async getWindowsUpdates(category = null, limit = 50, sortBy = 'published_date') {
    try {
      const data = await this.loadData();
      let updates = [...data.updates];

      // Filter by category
      if (category) {
        updates = updates.filter(update => update.category === category);
      }

      // Sort by specified field
      if (sortBy === 'published_date') {
        updates.sort((a, b) => new Date(b.published_date) - new Date(a.published_date));
      }

      // Limit results
      return updates.slice(0, limit);
    } catch (error) {
      console.error('Erreur récupération updates:', error);
      return [];
    }
  }

  async getLatestUpdates(limit = 10) {
    return this.getWindowsUpdates(null, limit, 'published_date');
  }

  async getUpdateStats() {
    try {
      const data = await this.loadData();
      const stats = {};

      // Count by category
      data.updates.forEach(update => {
        const category = update.category || 'unknown';
        stats[category] = (stats[category] || 0) + 1;
      });

      return {
        total: data.updates.length,
        by_category: stats,
        last_updated: new Date()
      };
    } catch (error) {
      console.error('Erreur calcul stats:', error);
      return {
        total: 0,
        by_category: {},
        last_updated: new Date()
      };
    }
  }

  generateId() {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  async clearData() {
    try {
      const emptyData = {
        updates: [],
        lastUpdated: new Date(),
        version: '1.0'
      };
      
      await this.saveData(emptyData);
      return true;
    } catch (error) {
      console.error('Erreur suppression données:', error);
      return false;
    }
  }
}

export const storage = new JSONStorage();

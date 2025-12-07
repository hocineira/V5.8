import { promises as fs } from 'fs';
import path from 'path';
import { logger } from './logger.js';

class StarlinkStorage {
  constructor() {
    this.dataDir = path.join(process.cwd(), 'data');
    this.starlinkCacheFile = path.join(this.dataDir, 'starlink-cache.json');
  }

  async ensureDataDir() {
    try {
      await fs.access(this.dataDir);
    } catch {
      await fs.mkdir(this.dataDir, { recursive: true });
    }
  }

  async saveStarlinkUpdates(updates) {
    try {
      await this.ensureDataDir();
      
      const data = {
        updates,
        lastUpdated: new Date().toISOString(),
        total: updates.length
      };
      
      await fs.writeFile(this.starlinkCacheFile, JSON.stringify(data, null, 2));
      console.log(`✅ ${updates.length} actualités Starlink sauvegardées`);
      
      return data;
    } catch (error) {
      console.error('❌ Erreur sauvegarde Starlink:', error);
      throw error;
    }
  }

  async loadStarlinkUpdates() {
    try {
      await this.ensureDataDir();
      
      const fileContent = await fs.readFile(this.starlinkCacheFile, 'utf-8');
      const data = JSON.parse(fileContent);
      
      console.log(`📖 ${data.total || 0} actualités Starlink chargées du cache`);
      
      return {
        updates: data.updates || [],
        total: data.total || 0,
        lastUpdated: data.lastUpdated
      };
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.log('📝 Aucun cache Starlink trouvé, retour données vides');
        return { updates: [], total: 0, lastUpdated: null };
      }
      
      console.error('❌ Erreur chargement cache Starlink:', error);
      throw error;
    }
  }

  async getStarlinkStats() {
    const data = await this.loadStarlinkUpdates();
    
    const stats = {
      total: data.total || 0,
      lastUpdated: data.lastUpdated,
      categories: {}
    };

    // Count by categories
    if (data.updates) {
      data.updates.forEach(update => {
        const category = update.category || 'unknown';
        stats.categories[category] = (stats.categories[category] || 0) + 1;
      });
    }

    return stats;
  }

  async getStarlinkCategories() {
    const data = await this.loadStarlinkUpdates();
    const categories = new Set();
    
    if (data.updates) {
      data.updates.forEach(update => {
        if (update.category) {
          categories.add(update.category);
        }
      });
    }
    
    return Array.from(categories);
  }

  async getLatestStarlinkUpdates(limit = 10) {
    const data = await this.loadStarlinkUpdates();
    
    if (!data.updates || data.updates.length === 0) {
      return [];
    }
    
    // Sort by publication date (newest first) and limit
    const sortedUpdates = data.updates
      .sort((a, b) => new Date(b.published_date) - new Date(a.published_date))
      .slice(0, limit);
    
    return sortedUpdates;
  }

  async getStarlinkUpdatesByCategory(category, limit = 20) {
    const data = await this.loadStarlinkUpdates();
    
    if (!data.updates || data.updates.length === 0) {
      return [];
    }
    
    const filtered = data.updates.filter(update => 
      category === 'all' || update.category === category
    );
    
    // Sort by publication date (newest first) and limit
    const sortedUpdates = filtered
      .sort((a, b) => new Date(b.published_date) - new Date(a.published_date))
      .slice(0, limit);
    
    return sortedUpdates;
  }

  async getAllStarlinkUpdates() {
    const data = await this.loadStarlinkUpdates();
    return data.updates || [];
  }

  async saveStarlinkUpdate(updateData) {
    try {
      // Load existing updates
      const existingData = await this.loadStarlinkUpdates();
      let updates = existingData.updates || [];

      // Check if update already exists (by ID or title+link)
      const exists = updates.some(update => 
        update.id === updateData.id || 
        (update.title === updateData.title && update.link === updateData.link)
      );

      if (!exists) {
        updates.push(updateData);
        console.log(`➕ Nouvelle actualité Starlink ajoutée: ${updateData.title}`);
      } else {
        console.log(`⚠️ Actualité Starlink existe déjà: ${updateData.title}`);
      }

      // Save back
      await this.saveStarlinkUpdates(updates);
      
      return updateData;
    } catch (error) {
      console.error('❌ Erreur sauvegarde update Starlink:', error);
      throw error;
    }
  }
}

export const starlinkStorage = new StarlinkStorage();
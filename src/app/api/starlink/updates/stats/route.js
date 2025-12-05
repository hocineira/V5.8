import { NextResponse } from 'next/server';
import { starlinkStorage } from '../../../../../lib/starlink-storage.js';
import { logger } from '../../../../../lib/logger.js';

export async function GET(request) {
  try {
    const updates = await starlinkStorage.getAllStarlinkUpdates();
    
    // Count by category
    const categoryStats = {};
    updates.forEach(update => {
      const category = update.category || 'uncategorized';
      categoryStats[category] = (categoryStats[category] || 0) + 1;
    });
    
    logger.debug(`📊 Stats Starlink: ${updates.length} total`);
    
    return NextResponse.json({
      total: updates.length,
      categories: categoryStats,
      last_updated: new Date().toISOString()
    });

  } catch (error) {
    logger.error('Erreur récupération stats Starlink:', error);
    return NextResponse.json(
      { 
        error: 'Erreur lors de la récupération des statistiques Starlink',
        message: error.message 
      },
      { status: 500 }
    );
  }
}
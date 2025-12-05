import { NextResponse } from 'next/server';
import { starlinkStorage } from '../../../../lib/starlink-storage.js';
import { logger } from '../../../../lib/logger.js';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit')) || 10;
    const category = searchParams.get('category');
    
    let updates = await starlinkStorage.getAllStarlinkUpdates();
    
    // Filter by category if specified
    if (category && category !== 'all') {
      updates = updates.filter(update => update.category === category);
    }
    
    // Apply limit
    updates = updates.slice(0, limit);
    
    logger.debug(`📡 Récupération ${updates.length} actualités Starlink (filtre: ${category || 'all'})`);
    
    return NextResponse.json({
      updates: updates,
      total: updates.length,
      category: category,
      limit: limit
    });

  } catch (error) {
    logger.error('Erreur récupération actualités Starlink:', error);
    return NextResponse.json(
      { 
        error: 'Erreur lors de la récupération des actualités Starlink',
        message: error.message 
      },
      { status: 500 }
    );
  }
}
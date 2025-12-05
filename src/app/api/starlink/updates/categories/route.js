import { NextResponse } from 'next/server';
import { starlinkStorage } from '../../../../../lib/starlink-storage.js';
import { logger } from '../../../../../lib/logger.js';

export async function GET(request) {
  try {
    const updates = await starlinkStorage.getAllStarlinkUpdates();
    
    // Get unique categories
    const categories = [...new Set(
      updates
        .map(update => update.category)
        .filter(category => category)
    )];
    
    logger.debug(`📋 Catégories Starlink disponibles: ${categories.length}`);
    
    return NextResponse.json({
      categories: categories,
      total_categories: categories.length
    });

  } catch (error) {
    logger.error('Erreur récupération catégories Starlink:', error);
    return NextResponse.json(
      { 
        error: 'Erreur lors de la récupération des catégories Starlink',
        message: error.message 
      },
      { status: 500 }
    );
  }
}
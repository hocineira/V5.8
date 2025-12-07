import { NextResponse } from 'next/server';
import { starlinkStorage } from '../../../../../lib/starlink-storage.js';
import { logger } from '../../../../../lib/logger.js';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit')) || 5;
    
    const updates = await starlinkStorage.getLatestStarlinkUpdates(limit);
    
    logger.debug(`📡 Récupération ${updates.length} dernières actualités Starlink`);
    
    return NextResponse.json({
      updates: updates,
      total: updates.length,
      limit: limit
    });

  } catch (error) {
    logger.error('Erreur récupération latest Starlink:', error);
    return NextResponse.json(
      { 
        error: 'Erreur lors de la récupération des dernières actualités Starlink',
        message: error.message 
      },
      { status: 500 }
    );
  }
}
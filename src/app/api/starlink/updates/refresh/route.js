import { NextResponse } from 'next/server';
import { starlinkRssFetcher } from '../../../../../lib/starlink-rss-fetcher.js';
import { starlinkStorage } from '../../../../../lib/starlink-storage.js';
import { logger } from '../../../../../lib/logger.js';

export async function POST(request) {
  try {
    logger.info('🚀 Démarrage refresh RSS Starlink...');
    
    // Fetch all Starlink RSS feeds
    const allUpdates = await starlinkRssFetcher.fetchAllFeeds();
    
    // Store updates
    let storedCount = 0;
    for (const updateData of allUpdates) {
      try {
        await starlinkStorage.saveStarlinkUpdate(updateData);
        storedCount++;
      } catch (error) {
        logger.error('Erreur stockage update Starlink:', error);
        continue;
      }
    }
    
    logger.info(`✅ ${storedCount} actualités Starlink stockées sur ${allUpdates.length} récupérées`);
    
    return NextResponse.json({
      message: `${storedCount} actualités Starlink récupérées et sauvegardées`,
      stored: storedCount,
      total: allUpdates.length,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    logger.error('Erreur refresh RSS Starlink:', error);
    return NextResponse.json(
      { 
        error: 'Erreur lors du refresh RSS Starlink',
        message: error.message 
      },
      { status: 500 }
    );
  }
}
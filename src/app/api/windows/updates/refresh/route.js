import { NextResponse } from 'next/server';
import { rssFetcher } from '../../../../../lib/rss-fetcher.js';
import { storage } from '../../../../../lib/storage.js';
import { logger } from '../../../../../lib/logger.js';

export async function POST() {
  try {
    logger.info('🚀 Démarrage mise à jour RSS manuelle...');
    
    // Fetch all RSS feeds
    const allUpdates = await rssFetcher.fetchAllFeeds();
    
    // Store updates in database
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
    
    console.log(`✅ ${storedCount} mises à jour stockées sur ${allUpdates.length} récupérées`);
    
    return NextResponse.json({
      message: 'Mise à jour des flux RSS terminée',
      stored: storedCount,
      total: allUpdates.length,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Erreur refresh RSS:', error);
    return NextResponse.json(
      { 
        error: 'Erreur lors de la mise à jour des flux RSS',
        details: error.message
      },
      { status: 500 }
    );
  }
}
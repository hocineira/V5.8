import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import CloudRSSFetcher from '@/lib/cloud-rss-fetcher';

const CLOUD_CACHE_FILE = path.join(process.cwd(), 'data', 'cloud-cache.json');

// Ensure data directory exists
function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// Write cloud updates to cache
function writeCloudCache(updates) {
  try {
    ensureDataDir();
    fs.writeFileSync(CLOUD_CACHE_FILE, JSON.stringify(updates, null, 2));
    console.log(`✅ ${updates.length} actualités Cloud sauvegardées dans le cache`);
  } catch (error) {
    console.error('Erreur écriture cache cloud:', error);
  }
}

export async function POST() {
  try {
    console.log('🔄 Début du refresh RSS Cloud...');

    const fetcher = new CloudRSSFetcher();
    const updates = await fetcher.fetchAllFeeds();

    // Save to cache
    writeCloudCache(updates);

    console.log(`✅ Refresh RSS Cloud terminé : ${updates.length} actualités`);

    return NextResponse.json({
      success: true,
      message: `${updates.length} actualités Cloud récupérées et sauvegardées`,
      count: updates.length
    });

  } catch (error) {
    console.error('❌ Erreur refresh RSS Cloud:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Erreur lors du rafraîchissement des flux RSS Cloud',
        details: error.message 
      },
      { status: 500 }
    );
  }
}
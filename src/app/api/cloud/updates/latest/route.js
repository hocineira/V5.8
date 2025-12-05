import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const CLOUD_CACHE_FILE = path.join(process.cwd(), 'data', 'cloud-cache.json');

function readCloudCache() {
  try {
    if (fs.existsSync(CLOUD_CACHE_FILE)) {
      const data = fs.readFileSync(CLOUD_CACHE_FILE, 'utf8');
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error('Erreur lecture cache cloud:', error);
    return [];
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit')) || 5;

    // Read all cloud updates from cache
    let updates = readCloudCache();

    // Sort by publication date (most recent first)
    updates.sort((a, b) => new Date(b.published_date) - new Date(a.published_date));

    // Get latest updates
    const latestUpdates = updates.slice(0, limit);

    return NextResponse.json({
      updates: latestUpdates,
      count: latestUpdates.length,
      total: updates.length
    });

  } catch (error) {
    console.error('Erreur API Cloud latest:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des dernières actualités Cloud' },
      { status: 500 }
    );
  }
}
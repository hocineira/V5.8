import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const CLOUD_CACHE_FILE = path.join(process.cwd(), 'data', 'cloud-cache.json');

// Ensure data directory exists
function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// Read cloud updates from cache
function readCloudCache() {
  try {
    ensureDataDir();
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
    const limit = parseInt(searchParams.get('limit')) || 50;
    const category = searchParams.get('category');
    const provider = searchParams.get('provider');
    const serviceType = searchParams.get('service_type');

    // Read all cloud updates from cache
    let updates = readCloudCache();

    // Filter by category if specified
    if (category && category !== 'all') {
      updates = updates.filter(update => update.category === category);
    }

    // Filter by provider if specified
    if (provider && provider !== 'all') {
      updates = updates.filter(update => update.cloud_provider === provider);
    }

    // Filter by service type if specified
    if (serviceType && serviceType !== 'all') {
      updates = updates.filter(update => update.service_type === serviceType);
    }

    // Sort by publication date (most recent first)
    updates.sort((a, b) => new Date(b.published_date) - new Date(a.published_date));

    // Limit results
    const limitedUpdates = updates.slice(0, limit);

    return NextResponse.json({
      updates: limitedUpdates,
      total: updates.length,
      limit: limit,
      filters: {
        category: category || 'all',
        provider: provider || 'all',
        service_type: serviceType || 'all'
      }
    });

  } catch (error) {
    console.error('Erreur API Cloud updates:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des actualités Cloud' },
      { status: 500 }
    );
  }
}

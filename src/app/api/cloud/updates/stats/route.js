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

export async function GET() {
  try {
    const updates = readCloudCache();

    // Calculate statistics
    const stats = {
      total: updates.length,
      by_category: {},
      by_provider: {},
      by_service_type: {},
      recent_7_days: 0,
      recent_30_days: 0
    };

    // Date calculations
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    updates.forEach(update => {
      // Count by category
      const category = update.category || 'unknown';
      stats.by_category[category] = (stats.by_category[category] || 0) + 1;

      // Count by provider
      const provider = update.cloud_provider || 'unknown';
      stats.by_provider[provider] = (stats.by_provider[provider] || 0) + 1;

      // Count by service type
      const serviceType = update.service_type || 'unknown';
      stats.by_service_type[serviceType] = (stats.by_service_type[serviceType] || 0) + 1;

      // Count recent updates
      const publishedDate = new Date(update.published_date);
      if (publishedDate > sevenDaysAgo) {
        stats.recent_7_days++;
      }
      if (publishedDate > thirtyDaysAgo) {
        stats.recent_30_days++;
      }
    });

    return NextResponse.json(stats);

  } catch (error) {
    console.error('Erreur API Cloud stats:', error);
    return NextResponse.json(
      { error: 'Erreur lors du calcul des statistiques Cloud' },
      { status: 500 }
    );
  }
}
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

    // Extract unique categories
    const categoriesSet = new Set();
    const providersSet = new Set();
    const serviceTypesSet = new Set();

    updates.forEach(update => {
      if (update.category) categoriesSet.add(update.category);
      if (update.cloud_provider) providersSet.add(update.cloud_provider);
      if (update.service_type) serviceTypesSet.add(update.service_type);
    });

    return NextResponse.json({
      categories: Array.from(categoriesSet).sort(),
      providers: Array.from(providersSet).sort(),
      service_types: Array.from(serviceTypesSet).sort()
    });

  } catch (error) {
    console.error('Erreur API Cloud categories:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des catégories Cloud' },
      { status: 500 }
    );
  }
}
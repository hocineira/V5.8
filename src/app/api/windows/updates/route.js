import { NextResponse } from 'next/server';
import { storage } from '../../../../lib/storage.js';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '50');
    const version = searchParams.get('version');

    // Get updates from storage
    let updates = await storage.getWindowsUpdates(category, limit);

    // Filter by version if specified
    if (version) {
      updates = updates.filter(update => 
        update.version && version.toLowerCase().includes(update.version.toLowerCase())
      );
    }

    // Convert dates to strings for JSON response
    const formattedUpdates = updates.map(update => ({
      ...update,
      published_date: update.published_date.toISOString(),
      created_at: update.created_at.toISOString(),
      updated_at: update.updated_at.toISOString()
    }));

    return NextResponse.json({
      total: formattedUpdates.length,
      updates: formattedUpdates,
      last_updated: new Date().toISOString()
    });

  } catch (error) {
    console.error('Erreur récupération updates:', error);
    return NextResponse.json(
      { error: 'Erreur récupération des mises à jour' },
      { status: 500 }
    );
  }
}
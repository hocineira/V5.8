import { NextResponse } from 'next/server';
import { storage } from '../../../../../lib/storage.js';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');

    const updates = await storage.getLatestUpdates(limit);

    // Convert dates to strings for JSON response
    const formattedUpdates = updates.map(update => ({
      ...update,
      published_date: update.published_date.toISOString(),
      created_at: update.created_at.toISOString(),
      updated_at: update.updated_at.toISOString()
    }));

    return NextResponse.json({
      updates: formattedUpdates,
      count: formattedUpdates.length,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Erreur récupération latest updates:', error);
    return NextResponse.json(
      { error: 'Erreur récupération des dernières mises à jour' },
      { status: 500 }
    );
  }
}
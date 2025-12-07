import { NextResponse } from 'next/server';
import { storage } from '../../../../../lib/storage.js';

export async function GET() {
  try {
    const stats = await storage.getUpdateStats();

    return NextResponse.json({
      total: stats.total,
      by_category: stats.by_category,
      last_updated: new Date().toISOString()
    });

  } catch (error) {
    console.error('Erreur récupération stats:', error);
    return NextResponse.json(
      { error: 'Erreur récupération des statistiques' },
      { status: 500 }
    );
  }
}
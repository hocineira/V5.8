import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: "API Next.js fonctionnelle",
    status: "running", 
    timestamp: new Date().toISOString(),
    services: {
      frontend: "Next.js",
      api: "Next.js API Routes",
      storage: "JSON Local",
      rss: "Intégré"
    }
  });
}
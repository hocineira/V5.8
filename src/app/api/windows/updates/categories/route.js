import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const categories = [
      {
        key: "particuliers",
        name: "Particuliers",
        description: "Windows pour particuliers et postes de travail"
      },
      {
        key: "serveur", 
        name: "Serveur",
        description: "Windows Server et infrastructure datacenter"
      },
      {
        key: "security",
        name: "Sécurité",
        description: "Mises à jour de sécurité et cybersécurité"
      },
      {
        key: "entreprise",
        name: "Entreprise",
        description: "Solutions professionnelles et PME"
      },
      {
        key: "iot",
        name: "IoT",
        description: "Internet des objets et objets connectés"
      }
    ];

    return NextResponse.json({
      categories
    });

  } catch (error) {
    console.error('Erreur récupération catégories:', error);
    return NextResponse.json(
      { error: 'Erreur récupération des catégories' },
      { status: 500 }
    );
  }
}
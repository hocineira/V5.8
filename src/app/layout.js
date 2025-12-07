import "./globals.css";
import Navigation from "../components/Navigation";
import BottomNavigation from "../components/BottomNavigation";
import PageWrapper from "../components/PageWrapper";

export const metadata = {
  title: "Portfolio - Hocine IRATNI",
  description: "Portfolio professionnel - BTS SIO SISR",
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.png',
    shortcut: '/favicon.ico',
  },
  manifest: '/manifest.json',
  other: {
    // Préchargement des ressources critiques pour performance
    'dns-prefetch': 'https://fonts.googleapis.com',
    'preconnect': 'https://fonts.gstatic.com',
  }
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="antialiased bg-white text-gray-900">
        <Navigation />
        <main className="pt-0 md:pt-16 pb-20 md:pb-0 bg-white min-h-screen relative overflow-x-hidden">
          <PageWrapper>
            {children}
          </PageWrapper>
        </main>
        <BottomNavigation />
      </body>
    </html>
  );
}
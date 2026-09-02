import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/lib/context/AuthContext';
import { FavoritesProvider } from '@/lib/context/FavoritesContext';
import { CompareProvider } from '@/lib/context/CompareContext';
import { CarsProvider } from '@/lib/context/CarsContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CompareBar from '@/components/compare/CompareBar';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AutoLink Uganda | Premium Verified New & Used Car Marketplace',
  description:
    'Browse thousands of verified brand new, foreign used, and pre-owned luxury vehicles in Kampala and Uganda with direct WhatsApp dealer chat and 200-point mechanical inspection.',
  keywords: [
    'cars for sale in Uganda',
    'Kampala car bonds',
    'Toyota Prado Kampala',
    'Mercedes Benz Uganda',
    'buy car Kampala',
    'AutoLink',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable} dark`}>
      <body className="min-h-screen flex flex-col bg-background text-slate-100 font-sans selection:bg-gold-500/30 selection:text-gold-200">
        <AuthProvider>
          <CarsProvider>
            <FavoritesProvider>
              <CompareProvider>
                <Header />
                <main className="flex-1">{children}</main>
                <CompareBar />
                <Footer />
              </CompareProvider>
            </FavoritesProvider>
          </CarsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

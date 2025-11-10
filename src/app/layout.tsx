import './globals.css';
import localFont from 'next/font/local';
import Image from 'next/image';
import { SpeedInsights } from '@vercel/speed-insights/next';
import BackgroundImage from '../assets/spiral.webp';
import { ReactNode } from 'react';
import { Metadata } from 'next';
import { baseUrl } from '@/utils/url';
import Footer from '@/components/Footer';

const itcWillowFont = localFont({
  src: '../assets/ITC-Willow.woff2',
  variable: '--font-itc-willow',
  display: 'swap',
  preload: true,
  fallback: [
    'Brush Script MT',
    'Apple Chancery',
    'Lucida Handwriting',
    'cursive',
  ],
});

const title = 'Tohuwabohu';
const description = 'Safe*r space thanks to our awareness team';

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'vienna',
    'wien',
    'rave',
    'events',
    'awareness team',
    'safer space',
    'visuals',
    'colorful',
    'decoration',
    'lightmapping',
    'techno',
    'psytrance',
  ],
  category: 'Collective',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  metadataBase: new URL(baseUrl),
  openGraph: {
    title,
    description,
    url: '/',
    siteName: title,
    images: [
      {
        url: '/images/logo-open-graph.png',
        width: 1080,
        height: 1080,
        type: 'image/png',
      },
    ],
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${itcWillowFont.variable} font-sans`}>
      <body className="relative flex flex-col bg-black text-stone-50 selection:bg-slate-950">
        <div className="pointer-events-none fixed inset-0 z-[-99] opacity-75 blur-sm brightness-50 select-none sm:blur-md md:blur-lg">
          <Image
            src={BackgroundImage}
            className="pointer-events-none object-cover object-center"
            alt="Spiral"
            fill
            placeholder="blur"
            draggable={false}
          />
        </div>
        <main className="flex flex-1 flex-row justify-center">
          <div className="flex max-w-[800px] flex-1 flex-col p-4 md:p-8">
            {children}
          </div>
        </main>
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}

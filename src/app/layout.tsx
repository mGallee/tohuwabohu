import './globals.css';
import localFont from 'next/font/local';
import Image from 'next/image';
import BackgroundImage from '../assets/monstera-leaves.webp';
import { ReactNode } from 'react';
import { Metadata } from 'next';
import { baseUrl } from '@/utils/url';
import Footer from '@/components/Footer';

const itcWillowFont = localFont({
  src: '../assets/ITC-Willow.ttf',
  variable: '--font-itc-willow',
});

const title = 'Tohuwabohu';
const description = 'We offer safe and colorful rave experiences in Vienna';

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'rave',
    'events',
    'awareness',
    'safe space',
    'light mapping',
    'visuals',
    'art',
    'colorful',
    'vienna',
    'wien',
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
        url: '/images/monstera-open-graph.jpg',
        width: 1200,
        height: 675,
        type: 'image/jpg',
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${itcWillowFont.variable} font-sans`}>
      <body className="relative flex flex-col bg-slate-950 text-slate-50">
        <div className="fixed bottom-0 left-0 right-0 top-0 blur-sm">
          <Image
            src={BackgroundImage}
            className="object-cover object-center"
            alt="Neon monstera leaves"
            fill
            placeholder="blur"
            draggable={false}
          />
        </div>
        <main className="relative flex max-w-[1200px] flex-1 flex-col self-center p-4 md:p-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

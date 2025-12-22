import './globals.css';
import localFont from 'next/font/local';
import { Roboto } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import { ReactNode } from 'react';
import { Metadata, Viewport } from 'next';
import { baseUrl } from '@/utils/url';
import Footer from '@/components/Footer';
import SpinningBackdrop from '@/components/SpinningBackdrop';
import Navigation from '@/components/Navigation';

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

const robotoFont = Roboto({
  variable: '--font-roboto',
  display: 'swap',
  preload: true,
  subsets: ['latin'],
});

const title = 'Tohuwabohu | Kultur- und Musikverein';
const description =
  'Tohuwabohu is a collective in Vienna that loves music, art, and bringing people together. We throw events that focus on good sound, nice visuals, and an open, respectful atmosphere where everyone should feel welcome.';

export const metadata: Metadata = {
  title: {
    template: `%s - ${title}`,
    default: title,
  },
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
    title: {
      template: `%s - ${title}`,
      default: title,
    },
    description,
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

export const viewport: Viewport = {
  themeColor: 'black',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${itcWillowFont.variable} ${robotoFont.variable}`}>
      <body className="relative flex flex-col bg-black text-stone-50 selection:bg-black/80">
        <SpinningBackdrop
          className="fixed inset-0 z-[-99]"
          preload={true}
          loading="eager"
          quality={25}
        />
        <Navigation />
        <main className="flex flex-1 flex-row justify-center">
          <div className="flex max-w-200 flex-1 flex-col px-4 py-16 md:px-8 md:py-32">
            {children}
          </div>
        </main>
        <Footer />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}

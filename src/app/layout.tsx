import './globals.css';
import localFont from 'next/font/local';
import Image from 'next/image';
import BackgroundImage from '../assets/monstera-leafs.webp';
import { ReactNode } from 'react';
import { Metadata } from 'next';
import { baseUrl } from '@/utils/url';
import Footer from '@/components/Footer';

const itcWillowFont = localFont({
  src: '../assets/ITC-Willow.ttf',
  variable: '--font-itc-willow',
});

export const metadata: Metadata = {
  title: 'Tohuwabohu',
  description: '🌈 Colorful rave experiences in Vienna 🌈',
  category: 'Collective',
  openGraph: {
    title: 'Tohuwabohu',
    description: '🌈 Colorful rave experiences in Vienna 🌈',
    url: baseUrl,
    siteName: 'Tohuwabohu',
    images: [
      {
        url: `${baseUrl}/images/monstera-open-graph.jpg`,
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
      <body className="relative flex flex-col bg-slate-950 text-center text-slate-50">
        <div className="fixed bottom-0 left-0 right-0 top-0 blur-sm">
          <Image
            src={BackgroundImage}
            className="object-cover object-center"
            alt="Monstera background image"
            fill
            placeholder="blur"
            draggable={false}
          />
        </div>
        <main className="relative flex flex-1 flex-col p-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

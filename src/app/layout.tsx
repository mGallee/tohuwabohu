import './globals.css';
import localFont from 'next/font/local';
import Image from 'next/image';
import BackgroundImage from '../assets/monstera-leafs.webp';
import { ReactNode } from 'react';

const itcWillowFont = localFont({
  src: '../../public/fonts/ITC-Willow.ttf',
  variable: '--font-itc-willow',
});

export const metadata = {
  title: 'Tohuwabohu',
  description: '🌈 Colorful rave experiences in Vienna 🌈',
  category: 'Collective',
  openGraph: {
    title: 'Tohuwabohu',
    description: '🌈 Colorful rave experiences in Vienna 🌈',
    url: 'https://tohuwabohu.wien',
    siteName: 'Tohuwabohu',
    images: [
      {
        url: 'https://tohuwabohu.wien/images/monstera-open-graph.jpg',
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
        <footer className="relative flex flex-row flex-wrap items-center justify-center gap-6 p-8 text-2xl">
          <a
            className="select-none outline-0 hover:animate-glow active:animate-glow"
            href="https://www.instagram.com/tohuwabohu.vienna"
            target="_blank">
            Instagram
          </a>
          <a
            className="select-none hover:animate-glow active:animate-glow"
            href="https://www.facebook.com/tohuwabohu.vienna"
            target="_blank">
            Facebook
          </a>
          <a
            className="select-none hover:animate-glow active:animate-glow"
            href="https://t.me/TohuwabohuVienna"
            target="_blank">
            Telegram
          </a>
        </footer>
      </body>
    </html>
  );
}

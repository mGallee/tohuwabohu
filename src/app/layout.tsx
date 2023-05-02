import './globals.css';
import localFont from 'next/font/local';

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
        url: 'https://tohuwabohu.wien/monstera-open-graph.png',
        width: 1200,
        height: 675,
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${itcWillowFont.variable} font-sans`}>
      <body className="flex flex-col min-h-screen bg-slate-950 bg-monstera-leafs bg-center bg-cover bg-no-repeat text-slate-50 text-center">
        <main className="flex flex-1 flex-col p-8">{children}</main>
        <footer className="flex flex-row flex-wrap justify-center items-center gap-4 text-2xl p-8">
          <a
            className="hover:animate-glow active:animate-glow select-none"
            href="https://www.instagram.com/tohuwabohu.vienna/"
            target="_blank">
            Instagram
          </a>
          <a
            className="hover:animate-glow active:animate-glow select-none"
            href="https://www.facebook.com/tohuwabohu.vienna"
            target="_blank">
            Facebook
          </a>
          <a
            className="hover:animate-glow active:animate-glow select-none"
            href="https://t.me/TohuwabohuVienna"
            target="_blank">
            Telegram
          </a>
        </footer>
      </body>
    </html>
  );
}

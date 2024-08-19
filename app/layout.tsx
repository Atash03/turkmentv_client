import localFont from 'next/font/local';
import Script from 'next/script';

import { Roboto } from 'next/font/google';
import { Merriweather } from 'next/font/google';
import { Merriweather_Sans } from 'next/font/google';
import { Alexandria } from 'next/font/google';

import 'swiper/swiper-bundle.css';
import './globals.css';
import QueryProvider from '@/providers/QueryProvider';
// FONTS
const aeroport = localFont({
  src: '../fonts/Aeroport.otf',
  variable: '--font-aeroport',
});
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-roboto',
});
const mw = Merriweather({
  subsets: ['cyrillic', 'cyrillic-ext', 'latin', 'latin-ext'],
  weight: '700',
  variable: '--font-mw',
});
const mw_sans = Merriweather_Sans({
  subsets: ['cyrillic-ext', 'latin', 'latin-ext'],
  weight: ['300', '400', '700'],
  variable: '--font-mwsans',
});
const alexandria = Alexandria({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-alexandria',
});

export const metadata = {
  title: 'Turkmen TV',
};

interface IProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: IProps) {
  return (
    <html
      lang="tm"
      className={`${aeroport.variable} ${mw.variable} ${roboto.variable} ${mw_sans.variable} ${alexandria.variable}`}>
      <head>
        <link rel="icon" href="/logo.png" sizes="any" />
      </head>
      <body className="-z-0 relative">
        <QueryProvider>{children}</QueryProvider>
      </body>

      <Script
        id="ganalytics-import"
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-F2267QXY9T"></Script>
      <Script id="ganalytics-body">
        {` 
  window.dataLayer = window.dataLayer || []; 
  function gtag(){dataLayer.push(arguments);} 
  gtag('js', new Date()); 
 
  gtag('config', 'G-F2267QXY9T');`}
      </Script>
    </html>
  );
}

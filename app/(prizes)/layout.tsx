'use client';
import Footer from '@/components/Footer';
import MobileMenu from '@/components/MobileMenu';
import Nav from '@/components/Nav';
import MainProvider from '@/providers/MainProvider';
import { Roboto } from 'next/font/google';
import React, { PropsWithChildren } from 'react';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-roboto',
});

const layout = ({ children }: PropsWithChildren) => {
  return (
    <MainProvider>
      <div className={`dark:bg-black transition-all h-full ${roboto.className}`}>
        <h1 className="hidden">Turkmen TV</h1>
        <Nav />
        <main className="mt-[32px] md:mt-[64px] mb-[64px] md:mb-[128px] w-full">
          <div className="container">{children}</div>
        </main>
        <Footer />
        <MobileMenu />
      </div>
    </MainProvider>
  );
};

export default layout;

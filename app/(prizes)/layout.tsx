'use client';
import Footer from '@/components/Footer';
import MobileMenu from '@/components/MobileMenu';
import Nav from '@/components/Nav';
import MainProvider from '@/providers/MainProvider';
import React, { PropsWithChildren } from 'react';

const layout = ({ children }: PropsWithChildren) => {
  return (
    <MainProvider>
      <div className="dark:bg-black transition-all h-full">
        <h1 className="hidden">Turkmen TV</h1>
        <Nav />
        <main>{children}</main>
        <Footer />
        <MobileMenu />
      </div>
    </MainProvider>
  );
};

export default layout;

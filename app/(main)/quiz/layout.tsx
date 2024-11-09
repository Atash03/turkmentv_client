'use client';
import ScrollToTop from '@/components/global/ScrollToTop';
import useScrollToTop from '@/lib/hooks/useScrollToTop';
import { cn } from '@/lib/utils';
import { ChevronUp } from 'lucide-react';
import React, { PropsWithChildren, useEffect, useState } from 'react';

const layout = ({ children }: PropsWithChildren) => {
  const [clicked, setClicked] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log('first');
  }, [clicked]);

  const [scrollY, setScrollY] = useState(false);

  const handleScroll = () => {
    setScrollY(window.scrollY > 500 ? true : false);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="relative overflow-x-hidden">
      <div
        className={cn(
          'fixed md:bottom-10 md:right-10 bottom-4 right-4 p-3 shadow-md bg-fillBGBlockbg rounded-full cursor-pointer z-20 transition-all duration-300 ease-in-out',
          {
            'opacity-100 pointer-events-auto': scrollY,
            'opacity-0 pointer-events-none': !scrollY,
          },
        )}
        onClick={() => setClicked((prev) => prev + 1)}>
        <ChevronUp />
      </div>

      {children}
    </div>
  );
};

export default layout;

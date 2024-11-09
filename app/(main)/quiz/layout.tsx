'use client';
import ScrollToTop from '@/components/global/ScrollToTop';
import useScrollToTop from '@/lib/hooks/useScrollToTop';
import { ChevronUp } from 'lucide-react';
import React, { PropsWithChildren, useEffect, useState } from 'react';

const layout = ({ children }: PropsWithChildren) => {
  const [clicked, setClicked] = useState(0);

  useEffect(() => {
    window.scrollTo(0, -100);
  }, [clicked]);

  return (
    <div className="w-full">
      <div onClick={() => setClicked((prev) => prev + 1)}>
        <ScrollToTop />
      </div>
      {children}
    </div>
  );
};

export default layout;

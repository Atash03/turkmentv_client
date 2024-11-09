import ScrollToTop from '@/components/global/ScrollToTop';
import useScrollToTop from '@/lib/hooks/useScrollToTop';
import { cn } from '@/lib/utils';
import { ChevronUp } from 'lucide-react';
import React, { PropsWithChildren } from 'react';

const layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="">
      <ScrollToTop />

      {children}
    </div>
  );
};

export default layout;

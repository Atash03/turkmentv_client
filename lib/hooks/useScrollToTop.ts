'use client';
import { useEffect } from 'react';

const useScrollToTop = (dependecies?: any) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    console.log('first');
  }, [dependecies]);
};

export default useScrollToTop;

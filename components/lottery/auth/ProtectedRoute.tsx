'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLotteryAuth } from '@/store/useLotteryAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const router = useRouter();
  const { isAuthenticated } = useLotteryAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/lottery/auth');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

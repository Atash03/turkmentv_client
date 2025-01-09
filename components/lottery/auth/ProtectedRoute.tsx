'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLotteryAuth } from '@/store/useLotteryAuth';
import { Queries } from '@/api/queries';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { isAuthenticated, phone, code, setAuth } = useLotteryAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      // First, check if we have credentials in localStorage
      if (phone && code) {
        try {
          // Try to authenticate with stored credentials
          const response = await Queries.authenticateLottery(phone, code);

          if (response.errorMessage) {
            router.replace('/lottery/auth');
          } else {
            setAuth(response, phone, code);
            setIsLoading(false);
          }
          return; // Exit early if authentication successful
        } catch (err) {
          console.error('Authentication failed:', err);
          // Only redirect if API request fails
          router.replace('/lottery/auth');
        }
      } else {
        // Only redirect if no credentials found
        router.replace('/lottery/auth');
      }
    };

    checkAuth();
  }, []);

  // Show nothing while checking auth
  if (isLoading) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

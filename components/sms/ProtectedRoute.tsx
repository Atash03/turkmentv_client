'use client';
// src/components/ProtectedRoute.tsx
import { ReactNode, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const authContext = useContext(AuthContext);
  const router = useRouter();

  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthProvider');
  }

  const { user } = authContext;

  useEffect(() => {
    if (!user) {
      router.push('/sms/sign_up');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

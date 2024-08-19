'use client';
// src/app/layout.tsx
import { AuthProvider } from '@/context/AuthContext';
import { SmsContext, SmsProvider } from '@/context/SmsContext';
import { PropsWithChildren, useState } from 'react';

export default function SmsLayout({ children }: PropsWithChildren) {
  return (
    <main className="min-h-screen">
      <div className="container">
        <AuthProvider>{children}</AuthProvider>
      </div>
    </main>
  );
}

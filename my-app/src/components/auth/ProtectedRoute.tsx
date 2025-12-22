'use client';
import { useAuthContext } from '../auth/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    // If not loading and not authenticated, send to login
    if (!isLoading && !isAuthenticated) {
      router.push('/login'); 
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated) {
    return <div>Loading...</div>; // Or a spinner
  }

  return <>{children}</>;
}
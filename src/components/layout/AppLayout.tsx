'use client';

import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Navbar from '../Navbar';
import { useAuth } from '@/features/auth/hooks/useAuth';
import Spinner from '@/components/common/Spinner';

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  const noNavbarRoutes = ['/login', '/register'];
  const showNavbar = !noNavbarRoutes.includes(pathname);

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated && pathname !== '/login' && pathname !== '/register') {
        router.push('/login');
      } else if (isAuthenticated && (pathname === '/login' || pathname === '/register' || pathname === '/')) {
        router.push('/users');
      }
    }
  }, [isAuthenticated, loading, router, pathname]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      {showNavbar && <Navbar />}
      <main>{children}</main>
    </>
  );
};

export default AppLayout;
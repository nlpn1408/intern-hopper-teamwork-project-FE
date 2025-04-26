"use client";

// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { AuthProvider, useAuth } from "@/features/auth/hooks/useAuth";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import Spinner from "@/components/common/Spinner"; // Import the Spinner component

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function AuthRedirect({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

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

  return <>{children}</>;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  toastr.options = {
    closeButton: true,
    progressBar: true,
    positionClass: 'toast-top-right',
    timeOut: 5000,
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <AuthRedirect>{children}</AuthRedirect>
        </AuthProvider>
      </body>
    </html>
  );
}

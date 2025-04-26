// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
<<<<<<< HEAD
import toastr from 'toastr';
import 'toastr/build/toastr.min.css'; 
=======
import Navbar from '../app/components/Navbar'

>>>>>>> cf434d1 (navbar)

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'My App',
  description: 'Ứng dụng quản lý thực tập sinh',
}

<<<<<<< HEAD
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

=======
export default function RootLayout({ children }: { children: React.ReactNode }) {
>>>>>>> cf434d1 (navbar)
  return (
    <html lang="vi">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  )
}

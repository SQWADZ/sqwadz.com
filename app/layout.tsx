import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';
import React from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sqwadz',
  description: 'Find groups for games easily',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn(inter.className, `bg-background`)}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <div className="flex h-full flex-1 flex-col">
            <Header />
            {children}
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

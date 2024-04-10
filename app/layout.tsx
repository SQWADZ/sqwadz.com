import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';
import React from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { cn } from '@/lib/utils';
import ModalsProvider from '@/components/modals-provider';
import { Provider } from 'jotai';
import { TooltipProvider } from '@/components/ui/tooltip';
import { SocketProvider } from '@/components/providers/socket-provider';
import { Toaster } from '@/components/ui/sonner';
import { worker } from '@/lib/bullmq';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sqwadz',
  description: 'Find groups for games easily',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn(inter.className, `bg-background`)}>
        <Provider>
          <SocketProvider>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
              <TooltipProvider disableHoverableContent delayDuration={0}>
                <ModalsProvider>
                  <div className="flex flex-col">
                    <Header />
                    {children}
                    <Footer />
                  </div>
                </ModalsProvider>
              </TooltipProvider>
            </ThemeProvider>
          </SocketProvider>
        </Provider>
        <Toaster />
      </body>
      <Script defer src={process.env.ANALYTICS_SRC} data-website-id={process.env.ANALYTICS_WEBSITE_ID} />
    </html>
  );
}

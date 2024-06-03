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
import Script from 'next/script';
import { worker } from '@/lib/bullmq';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://sqwadz.com'),
  title: 'SQWADZ | Finding Groups Made Easy',
  description: 'Browse games, select a room, and join the group effortlessly. Finding groups has never been easier.',
  openGraph: {
    title: 'SQWADZ | Finding Groups Made Easy',
    description: 'Browse games, select a room, and join the group effortlessly. Finding groups has never been easier.',
    images: [
      {
        url: '/images/brand/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Finding Groups Made Easy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SQWADZ | Finding Groups Made Easy',
    description: 'Browse games, select a room, and join the group effortlessly. Finding groups has never been easier.',
    images: [
      {
        url: '/images/brand/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Finding Groups Made Easy',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    'application/ld+json': JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Finding Groups Made Easy',
      description:
        'Browse games, select a room, and join the group effortlessly. Finding groups has never been easier.',
      url: 'https://sqwadz.com/',
    }),
  },
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
                  <Header />
                  {children}
                  <Footer />
                </ModalsProvider>
              </TooltipProvider>
            </ThemeProvider>
          </SocketProvider>
        </Provider>
        <Toaster expand={true} />
      </body>
      <Script defer src={process.env.ANALYTICS_SRC} data-website-id={process.env.ANALYTICS_WEBSITE_ID} />
    </html>
  );
}

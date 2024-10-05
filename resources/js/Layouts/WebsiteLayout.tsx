import ThemeToggle from '@/Components/ThemeToggle';
import { Link, usePage } from '@inertiajs/react';
import React from 'react';
import { PageProps, User } from '@/types';
import { Button } from '@/Components/ui/button';

const WebsiteLayout: React.FC<PageProps<{ children: React.ReactNode }>> = ({ children }) => {
  const page = usePage();
  const { auth } = page.props as { auth?: { user: User } };

  return (
    <div>
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between bg-background p-4">
        <div className="flex items-center gap-4 md:gap-6">
          <Link href={route('/')}>
            <p className="logo text-2xl">SQWADZ</p>
          </Link>
          <Link href={route('games')}>
            <p className="">GAMES</p>
          </Link>
          <Link href={route('faq')}>
            <p className="">FAQ</p>
          </Link>
        </div>
        <div className="hidden gap-4 sm:flex">
          <ThemeToggle />
          {auth && auth.user ? (
            <Button asChild>
              <Link href={route('logout')}>Logout</Link>
            </Button>
          ) : (
            <Button asChild>
              <Link href={route('sign-in')}>Sign-in</Link>
            </Button>
          )}
          {/*TODO: session avatar, feedback*/}
        </div>
        <div className="flex items-center justify-center sm:hidden">{/*<MobileNavMenu session={session} />*/}</div>
      </div>
      {children}
      <footer className="flex w-full flex-col items-center justify-between border-t bg-background p-4 text-center text-muted-foreground">
        <div className="flex w-full max-w-7xl flex-col">
          <div className="flex w-full max-w-7xl flex-col items-start justify-between gap-10 px-4 py-10 md:flex-row">
            <Link href={route('/')} className="self-center">
              <p className="logo text-4xl text-foreground">SQWADZ</p>
            </Link>
            <div className="flex flex-col items-baseline justify-start gap-4">
              <p className="text-sm">Terms & Privacy</p>
              <Link href={route('privacy-policy')} className="hover:text-foreground">
                Privacy Policy
              </Link>
              <Link href={route('terms-of-service')} className="hover:text-foreground">
                Terms of Service
              </Link>
            </div>
            <div className="flex flex-col items-baseline gap-4">
              <p className="text-sm">Socials</p>
              <Link
                href="https://twitter.com/sqwadzplatform"
                target="_blank"
                className="flex items-center gap-2 hover:text-foreground"
              >
                [ICON]
                <p>Twitter</p>
              </Link>
              <Link
                href="https://discord.sqwadz.com"
                target="_blank"
                className="flex items-center gap-2 hover:text-foreground"
              >
                [ICON]
                <p>Discord</p>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WebsiteLayout;

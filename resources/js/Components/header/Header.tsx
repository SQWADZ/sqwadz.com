import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import ThemeToggle from '@/Components/ThemeToggle';
import { Button } from '@/Components/ui/button';
import HeaderLink from './HeaderLink';
import { User } from '@/types';
import { Coffee } from 'lucide-react';

const Header: React.FC = () => {
  const page = usePage();
  const { auth } = page.props as { auth?: { user: User } };

  return (
    <div className="mx-auto flex w-full max-w-7xl items-center justify-between bg-background p-4">
      <div className="flex items-center gap-4 md:gap-6">
        <Link href={route('/')}>
          <p className="logo text-2xl" style={{ fontFamily: 'Inter' }}>
            SQWADZ
          </p>
        </Link>
        <HeaderLink label="Games" path="games" isActive={page.url === '/games'} />
        <HeaderLink label="FAQ" path="faq" isActive={page.url === '/faq'} />
        <Button asChild variant="destructive">
          <a href="https://ko-fi.com/sqwadz" target="_blank" className="flex items-center gap-2">
            <Coffee size={18} />
            Buy us a coffee
          </a>
        </Button>
      </div>
      <div className="hidden gap-4 sm:flex">
        <ThemeToggle />
        {auth && auth.user ? (
          <Button asChild>
            <Link href={route('logout')}>Logout</Link>
          </Button>
        ) : (
          <Button asChild>
            <Link href={route('sign-in')}>Sign in</Link>
          </Button>
        )}
        {/*TODO: session avatar, feedback*/}
      </div>
      <div className="flex items-center justify-center sm:hidden">{/*<MobileNavMenu session={session} />*/}</div>
    </div>
  );
};

export default Header;

import React from 'react';
import ThemeToggle from './theme-toggle';
import UserAvatarButton from './user-avatar-button';
import Link from 'next/link';
import { getServerAuthSession } from '@/server/auth';
import HeaderLink from './header-link';

const Header: React.FC = async () => {
  const session = await getServerAuthSession();

  return (
    <div className="mx-auto flex w-full max-w-7xl items-center justify-between bg-background p-4">
      <div className="flex items-center gap-4 md:gap-6">
        <Link href="/">
          <p className="logo text-2xl">SQWADZ</p>
        </Link>
        <HeaderLink path="/games" label="Games" />
        <HeaderLink path="/support-us" label="Support us" />
      </div>
      <div className="flex gap-2">
        <ThemeToggle />
        <UserAvatarButton session={session} />
      </div>
    </div>
  );
};

export default Header;

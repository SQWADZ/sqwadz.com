import React from 'react';
import ThemeToggle from './theme-toggle';
import SignIn from './sign-in';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/authOptions';
import Link from 'next/link';

const Header: React.FC = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="mx-auto flex w-full max-w-7xl items-center justify-between bg-background p-4">
      <Link href="/">
        <p className="logo text-2xl">SQWADZ</p>
      </Link>
      <div className="flex gap-2">
        <ThemeToggle />
        <SignIn session={session} />
      </div>
    </div>
  );
};

export default Header;

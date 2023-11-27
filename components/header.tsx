import React from 'react';
import ThemeToggle from './theme-toggle';
import SignIn from './sign-in';
import { getServerSession, Session } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const Header: React.FC = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="mx-auto flex w-full max-w-7xl items-center justify-between bg-background p-4">
      <p className="logo text-2xl">SQWADZ</p>
      <div className="flex gap-4">
        <ThemeToggle />
        <SignIn session={session} />
      </div>
    </div>
  );
};

export default Header;

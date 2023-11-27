import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import ThemeToggle from './theme-toggle';
import SignIn from './sign-in';

const Header: React.FC = () => {
  return (
    <div className="mx-auto flex w-full max-w-7xl items-center justify-between bg-background p-4">
      <p className="text-2xl">SQWADZ</p>
      <div className="flex gap-4">
        <ThemeToggle />
        <SignIn/>
        <Avatar>
          <AvatarFallback>FL</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default Header;

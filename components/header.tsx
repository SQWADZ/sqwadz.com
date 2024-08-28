import React from 'react';
import ThemeToggle from './theme-toggle';
import UserAvatarButton from './user-avatar-button';
import Link from 'next/link';
import { getServerAuthSession } from '@/server/auth';
import HeaderLink from './header-link';
import MobileNavMenu from '@/components/mobile-nav-menu';
import HeaderFeedbackButton from '@/components/header-feedback-button';
import { Button } from './ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMugHot } from '@fortawesome/free-solid-svg-icons';
import KofiLink from '@/components/kofi-link';

const Header: React.FC = async () => {
  const session = await getServerAuthSession();

  return (
    <div className="mx-auto flex w-full max-w-7xl items-center justify-between bg-background p-4">
      <div className="flex items-center gap-4 md:gap-6">
        <Link href="/">
          <p className="logo text-2xl">SQWADZ</p>
        </Link>
        <HeaderLink path="/games" label="GAMES" />
        <HeaderLink path="/faq" label="FAQ" />
        <KofiLink className="hidden sm:block" />
      </div>
      <div className="hidden gap-4 sm:flex">
        <ThemeToggle />
        {session && <HeaderFeedbackButton />}
        <UserAvatarButton session={session} />
      </div>
      <div className="flex items-center justify-center sm:hidden">
        <MobileNavMenu session={session} />
      </div>
    </div>
  );
};

export default Header;

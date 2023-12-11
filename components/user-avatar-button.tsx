'use client';

import React from 'react';
import { Button } from './ui/button';
import { signOut } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Session } from 'next-auth';
import Link from 'next/link';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faGear, faUser } from '@fortawesome/free-solid-svg-icons';

const UserAvatarButton: React.FC<{ session: Session | null }> = ({ session }) => {
  if (!session)
    return (
      <Link href="/sign-in">
        <Button>Sign in</Button>
      </Link>
    );

  return (
    <div className="flex gap-4">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={session.user?.image || undefined} />
            <AvatarFallback>{session.user.name?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className="flex items-center gap-2">
            <FontAwesomeIcon icon={faUser} fixedWidth />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2">
            <FontAwesomeIcon icon={faGear} fixedWidth />
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2" onClick={() => signOut({ callbackUrl: '/' })}>
            <FontAwesomeIcon icon={faArrowRightFromBracket} fixedWidth />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserAvatarButton;

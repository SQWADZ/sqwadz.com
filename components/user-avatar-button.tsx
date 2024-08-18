'use client';

import React from 'react';
import { Button } from './ui/button';
import { signOut } from 'next-auth/react';
import type { Session } from 'next-auth';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faGear } from '@fortawesome/free-solid-svg-icons';
import UserAvatar from '@/components/user-avatar';

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
          <UserAvatar image={session.user.image} name={session.user.name} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="text-muted-foreground">{session.user.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex items-center gap-2" asChild>
            <Link href="/settings">
              <FontAwesomeIcon icon={faGear} fixedWidth />
              Settings
            </Link>
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

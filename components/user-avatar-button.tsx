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
import { faArrowRightFromBracket, faComment, faGear, faUser } from '@fortawesome/free-solid-svg-icons';
import UserAvatar from '@/components/user-avatar';
import { useModal } from '@/components/modals-provider';
import FeedbackModal from '@/components/feedback-modal';

const UserAvatarButton: React.FC<{ session: Session | null }> = ({ session }) => {
  const modal = useModal();

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
          <DropdownMenuItem
            className="flex items-center gap-2"
            asChild
            onClick={() => modal.open({ title: 'Give feedback', children: <FeedbackModal /> })}
          >
            <div>
              <FontAwesomeIcon icon={faComment} fixedWidth />
              Give feedback
            </div>
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

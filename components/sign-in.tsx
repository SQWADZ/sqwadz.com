'use client';

import React from 'react';
import { Button } from './ui/button';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Session } from 'next-auth';
import Link from 'next/link';

const SignIn: React.FC<{ session: Session | null }> = ({ session }) => {
  console.log(session);

  if (!session)
    return (
      <Link href="/sign-in">
        <Button>Sign in</Button>
      </Link>
    );

  return (
    <div className="flex gap-4">
      <Button onClick={() => signOut()}>Sign out</Button>
      <Avatar>
        <AvatarImage src={session.user?.image || undefined} />
        <AvatarFallback>FL</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default SignIn;

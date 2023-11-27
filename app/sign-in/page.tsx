'use client';

import { Button } from '@/components/ui/button';
import React from 'react';
import { signIn } from 'next-auth/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faTwitch } from '@fortawesome/free-brands-svg-icons';

const SignInPage: React.FC = () => {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="flex w-full max-w-sm flex-1 flex-col gap-4 rounded-lg border-[1px] border-border p-4 shadow md:max-w-md">
        <div>
          <p className="text-xl">Sign in</p>
          <p className="text-sm text-muted-foreground">Create an account or use an existing one</p>
        </div>

        <div className="flex flex-col gap-2">
          <Button className="flex items-center justify-start gap-2" onClick={() => signIn('discord')} variant="outline">
            <div className="w-[20px]">
              <FontAwesomeIcon icon={faDiscord} size="lg" fixedWidth />
            </div>
            Discord
          </Button>
          <Button className="flex items-center justify-start gap-2" onClick={() => signIn('twitch')} variant="outline">
            <div className="w-[20px]">
              <FontAwesomeIcon icon={faTwitch} size="lg" fixedWidth />
            </div>
            Twitch
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;

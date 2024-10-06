import Container from '@/Components/Container';
import { Button } from '@/Components/ui/button';
import React from 'react';
import LogoSvg from '@/Components/LogoSvg';
import Discord from '@/Components/icons/Discord';
import Battlenet from '@/Components/icons/Battlenet';
import Twitch from '@/Components/icons/Twitch';
import EpicGames from '@/Components/icons/EpicGames';
import Steam from '@/Components/icons/Steam';

const SignIn: React.FC = () => {
  return (
    <Container className="flex flex-col items-center justify-center">
      <LogoSvg width={150} height={150} />
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-lg border-[1px] border-border p-4 shadow md:max-w-md">
        <div>
          <p className="text-xl">Sign in</p>
          <p className="text-sm text-muted-foreground">Sign in using your existing social media accounts</p>
        </div>

        <div className="flex flex-col gap-2">
          <Button className="flex items-center justify-start gap-2" variant="outline" asChild>
            <a href={route('auth.redirect', 'discord')} className="fill-secondary-foreground">
              <Discord />
              Discord
            </a>
          </Button>
          <Button className="flex items-center justify-start gap-2" variant="outline" asChild>
            <a href={route('auth.redirect', 'discord')} className="fill-secondary-foreground">
              <Battlenet />
              Battle.net
            </a>
          </Button>
          <Button className="flex items-center justify-start gap-2" variant="outline" asChild>
            <a href={route('auth.redirect', 'discord')} className="fill-secondary-foreground">
              <Twitch />
              Twitch
            </a>
          </Button>
          <Button className="flex items-center justify-start gap-2" variant="outline" asChild>
            <a href={route('auth.redirect', 'discord')} className="fill-secondary-foreground">
              <EpicGames />
              Epic Games
            </a>
          </Button>
          <Button className="flex items-center justify-start gap-2" variant="outline" asChild>
            <a href={route('auth.redirect', 'discord')} className="fill-secondary-foreground">
              <Steam />
              Steam
            </a>
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default SignIn;

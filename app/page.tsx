import React from 'react';
import Container from '@/components/container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faS } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getServerAuthSession } from '@/server/auth';

const HeroPage: React.FC = async () => {
  const session = await getServerAuthSession();

  return (
    <Container className="flex flex-1 flex-col-reverse items-center justify-center gap-12 md:flex-row">
      <div className="flex flex-[0.5] flex-col items-center gap-8 md:items-start">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <p className="text-center text-4xl md:text-left">
            Finding groups has <span className="font-bold text-primary">never</span> been easier
          </p>
          <p className="text-sm text-muted-foreground">Browse games, select a room, join the group.</p>
        </div>
        <div className="flex gap-4">
          <Link href="/games">
            <Button variant="secondary">Browse games</Button>
          </Link>
          <Link href={session?.user ? '/games' : '/sign-in'}>
            <Button>Sign in</Button>
          </Link>
        </div>
      </div>
      <div className="flex flex-[0.5] items-center md:justify-end">
        {/*SQWADZ logo here*/}
        <FontAwesomeIcon icon={faS} size="10x" fixedWidth />
      </div>
    </Container>
  );
};

export default HeroPage;

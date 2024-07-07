import Container from '@/components/container';
import GameCard from '@/components/game-card';
import { getServerAuthSession } from '@/server/auth';
import GameRequestButton from '@/components/game-request-button';
import { Metadata } from 'next';
import prisma from '@/lib/prisma';
import GamesSort from '@/app/games/_components/games-sort';
import { Suspense } from 'react';
import GamesGrid from '@/app/games/_components/games-grid';
import SkeletonGameCards from '@/app/games/_components/skeleton-game-cards';

export const metadata: Metadata = {
  title: 'SQWADZ | Games',
  description: 'Browse games and find groups to join on Sqwadz.',
  openGraph: {
    title: 'SQWADZ | Games',
    description: 'Browse games and find groups to join on Sqwadz.',
  },
  alternates: {
    canonical: '/games',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function Home({ searchParams }: { searchParams?: { sort?: string } }) {
  const session = await getServerAuthSession();

  return (
    <Container className="flex max-w-7xl flex-col gap-8">
      <div className="flex flex-col gap-0">
        <p className="text-xl">Games</p>
        <p className="sm text-muted-foreground">
          Select a game to find a group in
          {session && (
            <span>
              {". Don't see your game? "}
              <GameRequestButton />
            </span>
          )}
        </p>
      </div>

      <div className="flex flex-col">
        <GamesSort />
      </div>

      <div className="grid grid-cols-1 place-items-center gap-8 md:grid-cols-3">
        <Suspense key={searchParams?.sort} fallback={<SkeletonGameCards />}>
          <GamesGrid searchParams={searchParams} />
        </Suspense>
      </div>
    </Container>
  );
}

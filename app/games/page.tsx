import Container from '@/components/container';
import GameCard from '@/components/game-card';
import games from '@/data/games.json';
import { getServerAuthSession } from '@/server/auth';
import GameRequestButton from '@/components/game-request-button';
import { Metadata } from 'next';

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

export default async function Home() {
  const session = await getServerAuthSession();

  const enabledGames = games.filter((game) => game.status === 'enabled');

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

      <div className="grid grid-cols-1 place-items-center gap-8 md:grid-cols-3">
        {enabledGames.map((game) => (
          <GameCard key={game.name} name={game.name} image={game.image} path={game.path} color={game.color} />
        ))}
      </div>
    </Container>
  );
}

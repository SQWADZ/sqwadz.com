import React from 'react';
import Container from '@/Components/Container';
import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { useModal } from '@/Components/ModalsProvider';

type Game = {
  path: string;
  image: string;
  color: string;
  status: 'enabled' | 'disabled';
  name: string;
};

const Games: React.FC<PageProps<{ games: Game[] }>> = ({ auth, games }) => {
  const modal = useModal();

  return (
    <Container className="flex max-w-7xl flex-col gap-8">
      <Head title="Games" />

      <div className="flex flex-col gap-0">
        <p className="text-xl">Games</p>
        <p className="sm text-muted-foreground">
          Select a game to find a group in
          {auth?.user && (
            <span>
              {". Don't see your game? "}
              <span
                className="text-primary hover:cursor-pointer hover:underline"
                onClick={() =>
                  modal.open({
                    title: 'Give feedback',
                    children: <></>,
                    // children: <FeedbackModal type="game-request" />,
                  })
                }
              >
                Request it
              </span>
            </span>
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 place-items-center gap-8 md:grid-cols-3">
        {games.map((game) => (
          <Link key={game.path} href={route('game', game.path)}>
            <div className="group flex cursor-pointer items-center justify-start gap-8">
              <div className="relative flex flex-col items-start justify-center gap-2">
                <div
                  className="relative z-10 origin-bottom-left bg-transparent transition-all duration-150"
                  style={{ backgroundColor: game.color }}
                >
                  <div
                    style={{ backgroundColor: game.color }}
                    className="absolute left-0 top-0 h-[8px] w-[8px] origin-top-left -rotate-45 scale-0 transition-all duration-100 group-hover:scale-100"
                  />
                  <img
                    src={game.image}
                    width={400}
                    height={150}
                    alt={game.name}
                    style={{ backgroundColor: game.color }}
                    className="relative z-10 h-[150px] duration-150 group-hover:-translate-y-[6px] group-hover:translate-x-[6px] group-hover:transition-all"
                  />
                  <div
                    style={{ backgroundColor: game.color }}
                    className="absolute bottom-0 right-0 h-[8px] w-[8px] origin-bottom-right rotate-45 scale-0 transition-all duration-100 group-hover:z-0 group-hover:scale-100"
                  />
                </div>
                <div>
                  <p className="line-clamp-1">{game.name}</p>
                  <p className="text-sm text-muted-foreground">{0} rooms</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
};

export default Games;

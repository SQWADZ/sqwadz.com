import React from 'react';
import GameCard from '@/components/game-card';
import prisma from '@/lib/prisma';

const GamesGrid: React.FC<{ searchParams?: { sort?: string } }> = async ({ searchParams }) => {
  const games = await prisma.game.findMany({
    where: {
      status: 'enabled',
    },
    select: {
      name: true,
      image: true,
      path: true,
      color: true,
      _count: {
        select: {
          rooms: true,
        },
      },
    },
    orderBy: [
      {
        name: !searchParams?.sort || searchParams?.sort === 'alphabet' ? 'asc' : undefined,
        rooms: searchParams?.sort === 'rooms' ? { _count: 'desc' } : undefined,
      },
    ],
  });

  return (
    <>
      {games.map((game) => (
        <GameCard
          key={game.name}
          name={game.name}
          image={game.image}
          path={game.path}
          color={game.color}
          roomsCount={game._count.rooms}
        />
      ))}
    </>
  );
};

export default GamesGrid;

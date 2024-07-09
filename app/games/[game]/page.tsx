import React from 'react';
import Container from '@/components/container';
import CreateRoom from './_components/create-room';
import { getServerAuthSession } from '@/server/auth';
import RoomSearch from '@/app/games/[game]/_components/room-search';
import Rooms from '@/app/games/[game]/_components/rooms';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';

const GamePage: React.FC<{ params: { game: string }; searchParams: { query?: string } }> = async ({
  params,
  searchParams,
}) => {
  const session = await getServerAuthSession();

  const gameDetails = await prisma.game.findFirst({
    where: {
      path: params.game,
    },
    select: {
      name: true,
      path: true,
    },
  });

  if (!gameDetails) {
    redirect('/games');
  }

  return (
    <Container className="flex flex-col gap-10">
      <div className="flex items-center justify-between">
        <p className="text-xl">{gameDetails.name} Rooms</p>
        <CreateRoom session={session} game={gameDetails.path} />
      </div>
      <div className="flex flex-col gap-4">
        <RoomSearch />
        <Rooms game={gameDetails.path} session={session} query={searchParams.query} />
      </div>
    </Container>
  );
};

export default GamePage;

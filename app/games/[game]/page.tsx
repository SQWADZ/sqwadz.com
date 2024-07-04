import React from 'react';
import Container from '@/components/container';
import CreateRoom from './_components/create-room';
import { getServerAuthSession } from '@/server/auth';
import RoomSearch from '@/app/games/[game]/_components/room-search';
import Rooms from '@/app/games/[game]/_components/rooms';
import games from '@/data/games.json';
import { redirect } from 'next/navigation';

const GamePage: React.FC<{ params: { game: string }; searchParams: { query?: string } }> = async ({
  params,
  searchParams,
}) => {
  const session = await getServerAuthSession();

  const gameDetails = games.find((game) => game.path === params.game);

  if (!gameDetails) {
    redirect('/games');
  }

  return (
    <Container className="flex flex-col gap-10">
      <div className="flex items-center justify-between">
        <p className="text-xl">{gameDetails.name} Rooms</p>
        <CreateRoom session={session} game={params.game} />
      </div>
      <div className="flex flex-col gap-4">
        <RoomSearch />
        <Rooms game={params.game} session={session} query={searchParams.query} />
      </div>
    </Container>
  );
};

export default GamePage;

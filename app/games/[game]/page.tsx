import React from 'react';
import Container from '@/components/container';
import CreateRoom from './_components/create-room';
import { getServerAuthSession } from '@/server/auth';
import RoomSearch from '@/app/games/[game]/_components/room-search';
import Rooms from '@/app/games/[game]/_components/table/rooms';
import games from '@/data/games.json';
import { redirect } from 'next/navigation';

const GamePage: React.FC<{ params: { game: string }; searchParams: { query?: string; page?: string } }> = async ({
  params,
  searchParams,
}) => {
  const session = await getServerAuthSession();
  const _page = searchParams.page ? +searchParams.page : undefined;

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
      <RoomSearch />
      <Rooms game={params.game} session={session} query={searchParams.query} page={_page} />
    </Container>
  );
};

export default GamePage;

import React from 'react';
import Container from '@/components/container';
import games from '@/data/games.json';
import CreateRoom from './_components/create-room';
import { getServerAuthSession } from '@/server/auth';
import prisma from '@/lib/prisma';
import RoomsTable from '@/app/games/[game]/_components/rooms-table';
import RoomSearch from '@/app/games/[game]/_components/room-search';

const GamePage: React.FC<{ params: { game: string }; searchParams: { query?: string } }> = async ({
  params,
  searchParams,
}) => {
  const game = games.find((jsonGame) => jsonGame.path === params.game)!;
  const session = await getServerAuthSession();

  console.log(searchParams);

  const rooms = await prisma.room.findMany({
    where: {
      game: params.game,
      activity: {
        contains: searchParams.query,
      },
    },
    select: {
      id: true,
      activity: true,
      slots: true,
      createdAt: true,
    },
  });

  return (
    <Container className="flex flex-col gap-10">
      <div className="flex items-center justify-between">
        <p className="text-xl">Rooms</p>
        <CreateRoom session={session} game={params.game} />
      </div>
      <RoomSearch />
      {rooms.length > 0 ? <RoomsTable rooms={rooms} game={params.game} session={session} /> : <p>No rooms found</p>}
    </Container>
  );
};

export default GamePage;

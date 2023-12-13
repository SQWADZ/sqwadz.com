import React from 'react';
import Container from '@/components/container';
import games from '@/data/games.json';
import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Input } from '@/components/ui/input';
import CreateRoom from './_components/create-room';
import { getServerAuthSession } from '@/server/auth';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import RoomsTable from '@/app/games/[game]/_components/rooms-table';

const GamePage: React.FC<{ params: { game: string } }> = async ({ params }) => {
  const game = games.find((jsonGame) => jsonGame.path === params.game)!;
  const session = await getServerAuthSession();

  const rooms = await prisma.room.findMany({
    where: {
      game: params.game,
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
      <Input placeholder="Search..." />
      {rooms.length > 0 ? <RoomsTable rooms={rooms} game={params.game} session={session} /> : <p>No rooms found</p>}
    </Container>
  );
};

export default GamePage;

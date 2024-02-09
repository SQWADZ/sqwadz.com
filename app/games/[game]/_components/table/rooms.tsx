import React from 'react';
import RoomsTable from './rooms-table';
import { Session } from 'next-auth';
import prisma from '@/lib/prisma';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';

const Rooms: React.FC<{ game: string; session: Session | null; query?: string; page?: number }> = async ({
  game,
  session,
  query,
  page,
}) => {
  const _rooms = await prisma.room.findMany({
    where: {
      game,
      activity: {
        contains: query,
      },
    },
    include: {
      _count: {
        select: {
          roomMembers: true,
        },
      },
    },
    take: 8,
    skip: (page ? (page >= 0 ? page : 0) : 0) * 8,
  });

  const rooms = _rooms.map((room) => ({ ...room, password: !!room.password }));

  const roomsCount = await prisma.room.count({
    where: {
      game,
      activity: {
        contains: query,
      },
    },
  });

  return rooms.length > 0 ? (
    <RoomsTable rooms={rooms} roomsCount={roomsCount} game={game} session={session} />
  ) : (
    <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
      <FontAwesomeIcon icon={faBan} size="2x" fixedWidth />
      <p>No rooms found</p>
    </div>
  );
};

export default Rooms;

import React from 'react';
import RoomsTable from '../_components/rooms-table';
import { Session } from 'next-auth';
import prisma from '@/lib/prisma';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';

const Rooms: React.FC<{ game: string; session: Session | null; query?: string }> = async ({ game, session, query }) => {
  const rooms = await prisma.room.findMany({
    where: {
      game,
      activity: {
        contains: query,
      },
    },
    select: {
      id: true,
      activity: true,
      slots: true,
      createdAt: true,
    },
  });

  return rooms.length > 0 ? (
    <RoomsTable rooms={rooms} game={game} session={session} />
  ) : (
    <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
      <FontAwesomeIcon icon={faBan} size="2x" fixedWidth />
      <p>No rooms found</p>
    </div>
  );
};

export default Rooms;

'use client';

import React, { useEffect } from 'react';
import RoomsTable from './rooms-table';
import { Session } from 'next-auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import Spinner from '@/components/spinner';

const Rooms: React.FC<{ game: string; session: Session | null; query?: string; page?: number }> = ({
  game,
  session,
  query,
  page,
}) => {
  const [roomsData, setRoomsData] = React.useState({ rooms: [], roomsCount: 0 });
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch('/api/rooms/fetch-rooms', {
      method: 'POST',
      body: JSON.stringify({ game, query, page }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(async (resp) => {
      setIsLoading(false);
      if (resp.status !== 200) return;

      setRoomsData(await resp.json());
    });
  }, [setRoomsData, game, page, query]);

  if (isLoading)
    return (
      <div className="w-100 flex items-center justify-center">
        <Spinner />
      </div>
    );

  return roomsData.rooms.length > 0 ? (
    <RoomsTable rooms={roomsData.rooms} roomsCount={roomsData.roomsCount} game={game} session={session} />
  ) : (
    <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
      <FontAwesomeIcon icon={faBan} size="2x" fixedWidth />
      <p>No rooms found</p>
    </div>
  );
};

export default Rooms;

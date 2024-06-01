'use client';

import React, { useEffect } from 'react';
import RoomCard from '../room-card';
import { Session } from 'next-auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import Spinner from '@/components/spinner';
import TablePagination from './table-pagination';
import { Room } from './rooms-table';

const PAGE_SIZE = 8;

interface RoomsData {
  rooms: Room[];
  roomsCount: number;
}

const Rooms: React.FC<{ game: string; session: Session | null; query?: string; page?: number }> = ({
  game,
  session,
  query,
  page,
}) => {
  const [roomsData, setRoomsData] = React.useState<RoomsData>({ rooms: [], roomsCount: 0 });
  const [isLoading, setIsLoading] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(page || 0);

  useEffect(() => {
    setIsLoading(true);
    fetch('/api/rooms/fetch-rooms', {
      method: 'POST',
      body: JSON.stringify({ game, query, page: currentPage }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(async (resp) => {
      setIsLoading(false);
      if (resp.status !== 200) return;

      const data: RoomsData = await resp.json();
      setRoomsData(data);
    });
  }, [setRoomsData, game, currentPage, query]);

  if (isLoading)
    return (
      <div className="w-full flex items-center justify-center">
        <Spinner />
      </div>
    );

  const totalPages = Math.ceil(roomsData.roomsCount / PAGE_SIZE);

  return roomsData.rooms.length > 0 ? (
    <div className="flex flex-col gap-4 w-full">
      {roomsData.rooms.map((room) => (
        <RoomCard key={room.id} room={room} game={game} session={session} />
      ))}
      <TablePagination page={currentPage} setPage={setCurrentPage} rooms={roomsData.rooms} totalPages={totalPages} />
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground w-full">
      <FontAwesomeIcon icon={faBan} size="2x" fixedWidth />
      <p>No rooms found</p>
    </div>
  );
};

export default Rooms;

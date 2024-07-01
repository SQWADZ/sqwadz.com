'use client';

import React, { useEffect, useRef } from 'react';
import { Session } from 'next-auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faBan, faLock } from '@fortawesome/free-solid-svg-icons';
import Spinner from '@/components/spinner';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useInfiniteScroll } from '@/client/hooks/useInfiniteScroll';
import { RoomListing } from '@/types';
import RoomCard from '@/app/games/[game]/_components/room-card';
import { useSocket } from '@/components/providers/socket-provider';

dayjs.extend(relativeTime);

const Rooms: React.FC<{ game: string; session: Session | null; query?: string; page?: number }> = ({
  game,
  session,
  query,
}) => {
  const [roomsData, setRoomsData] = React.useState<{
    rooms: Array<RoomListing>;
    hasMore: boolean;
  }>({
    rooms: [],
    hasMore: false,
  });

  const [isLoading, setIsLoading] = React.useState(true);

  const { socket, isConnected } = useSocket();

  const pageRef = useRef(0);

  const { ref } = useInfiniteScroll(async () => {
    setIsLoading(true);
    const resp = await fetch('/api/rooms/fetch-rooms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ game, query, page: ++pageRef.current }),
    });

    const data = await resp.json();

    setRoomsData((prev) => {
      return {
        ...prev,
        rooms: [...prev.rooms, ...data.rooms],
        hasMore: data.hasMore,
      };
    });
    setIsLoading(false);
  }, 0.5);

  useEffect(() => {
    setIsLoading(true);
    pageRef.current = 0;
    fetch('/api/rooms/fetch-rooms', {
      method: 'POST',
      body: JSON.stringify({ game, query, page: 0 }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(async (resp) => {
      setIsLoading(false);
      if (resp.status !== 200) return;

      const roomsData = await resp.json();
      setRoomsData(roomsData);
    });
  }, [setRoomsData, game, query]);

  React.useEffect(() => {
    if (!socket || !isConnected) return;

    function handleRoomCreated(newRoom: RoomListing) {
      setRoomsData((prev) => ({ ...prev, rooms: [newRoom, ...prev.rooms] }));
    }

    function handleRoomMembersUpdated(data: { roomId: number; newMemberCount: number }) {
      setRoomsData((prev) => {
        const roomIndex = prev.rooms.findIndex((item) => item.id === data.roomId);

        if (roomIndex === -1) return prev;

        const updatedRooms = prev.rooms.map((room, index) => {
          if (index === roomIndex) {
            return {
              ...room,
              _count: { ...room._count, roomMembers: data.newMemberCount },
            };
          }
          return room;
        });

        return {
          ...prev,
          rooms: updatedRooms,
        };
      });
    }

    socket.on(`${game}:room-created`, handleRoomCreated);
    socket.on(`${game}:members-updated`, handleRoomMembersUpdated);

    return () => {
      socket.off(`${game}:room-created`, handleRoomCreated);
      socket.off(`${game}:members-updated`, handleRoomMembersUpdated);
    };
  }, [game, socket, isConnected]);

  return (
    <div className="grid grid-cols-1 gap-4">
      {roomsData.rooms.map((room, index) => (
        <RoomCard
          key={room.id}
          room={room}
          session={session}
          ref={roomsData.hasMore && index === roomsData.rooms.length - 1 ? ref : null}
        />
      ))}

      {isLoading && (
        <div className="w-100 flex items-center justify-center">
          <Spinner />
        </div>
      )}

      {roomsData.rooms.length === 0 && !isLoading && (
        <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
          <FontAwesomeIcon icon={faBan} size="2x" fixedWidth />
          <p>No rooms found</p>
        </div>
      )}
    </div>
  );
};

export default Rooms;

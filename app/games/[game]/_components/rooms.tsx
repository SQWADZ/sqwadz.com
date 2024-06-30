'use client';

import React, { useEffect, useRef } from 'react';
import { Session } from 'next-auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faBan, faLock } from '@fortawesome/free-solid-svg-icons';
import Spinner from '@/components/spinner';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import JoinRoomButton from '@/app/games/[game]/_components/join-room-button';
import { useIntersection } from '@/client/hooks/useIntersection';
import { useInfiniteScroll } from '@/client/hooks/useInfiniteScroll';

type Room = {
  id: number;
  creatorId: number;
  activity: string;
  slots: number;
  password?: string;
  game: string;
  createdAt: Date;
};

const Rooms: React.FC<{ game: string; session: Session | null; query?: string; page?: number }> = ({
  game,
  session,
  query,
}) => {
  const [roomsData, setRoomsData] = React.useState<{
    rooms: Array<Room & { creator: { name: string }; _count: { roomMembers: number } }>;
    hasMore: boolean;
  }>({
    rooms: [],
    hasMore: false,
  });

  const pageRef = useRef(0);

  const [isLoading, setIsLoading] = React.useState(true);
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

    setRoomsData((prev) => ({ ...prev, rooms: [...prev.rooms, ...data.rooms], hasMore: data.hasMore }));
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

  dayjs.extend(relativeTime);

  return (
    <div className="grid grid-cols-1 gap-4">
      {roomsData.rooms.map((room, index) => (
        <Card
          key={room.id}
          className="flex flex-col justify-between"
          ref={roomsData.hasMore && index === roomsData.rooms.length - 1 ? ref : null}
        >
          <CardHeader className="p-4">
            <CardTitle className="text-lg">{room.activity}</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">Host: {room.creator.name}</CardDescription>
          </CardHeader>
          <CardContent className="p-0 px-4 text-sm">Created {dayjs(room.createdAt as Date).fromNow()}</CardContent>
          <CardFooter className="flex flex-col items-start gap-4 p-4">
            <div className="flex w-full items-center justify-between">
              <Badge variant="secondary" className="h-fit">
                {room._count.roomMembers}/{room.slots}
              </Badge>
              <div className="flex items-center gap-4">
                {room.password && <FontAwesomeIcon icon={faLock} />}
                <JoinRoomButton game={room.game} roomId={room.id} session={session} />
              </div>
            </div>
          </CardFooter>
        </Card>
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

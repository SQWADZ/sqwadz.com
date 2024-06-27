'use client';

import React, { useEffect } from 'react';
import { Session } from 'next-auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faBan, faLock } from '@fortawesome/free-solid-svg-icons';
import Spinner from '@/components/spinner';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Room } from '.prisma/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import JoinRoomButton from '@/app/games/[game]/_components/join-room-button';

const Rooms: React.FC<{ game: string; session: Session | null; query?: string; page?: number }> = ({
  game,
  session,
  query,
  page,
}) => {
  const [roomsData, setRoomsData] = React.useState<{
    rooms: Array<Room & { creator: { name: string }; _count: { roomMembers: number } }>;
    roomsCount: number;
  }>({
    rooms: [],
    roomsCount: 0,
  });
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

  console.log(roomsData);

  if (isLoading)
    return (
      <div className="w-100 flex items-center justify-center">
        <Spinner />
      </div>
    );

  dayjs.extend(relativeTime);

  return roomsData.rooms.length > 0 ? (
    <div className="grid grid-cols-1 gap-4">
      {roomsData.rooms.map((room) => (
        <Card key={room.id} className="flex flex-col justify-between">
          <CardHeader className="p-4">
            <CardTitle className="text-lg">{room.activity}</CardTitle>
            <CardDescription>
              <p className="text-sm text-muted-foreground">Host: {room.creator.name}</p>
            </CardDescription>
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
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
      <FontAwesomeIcon icon={faBan} size="2x" fixedWidth />
      <p>No rooms found</p>
    </div>
  );
};

export default Rooms;

import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import dayjs from 'dayjs';
import { Badge } from '@/components/ui/badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import JoinRoomButton from '@/app/games/[game]/_components/join-room-button';
import { RoomListing } from '@/types';
import { Session } from 'next-auth';

interface Props {
  room: RoomListing;
  session: Session | null;
}

const RoomCard: React.ForwardRefRenderFunction<HTMLDivElement | null, Props> = ({ room, session }, ref) => {
  return (
    <Card key={room.id} className="flex flex-col justify-between" ref={ref}>
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
  );
};

export default React.memo(React.forwardRef(RoomCard));

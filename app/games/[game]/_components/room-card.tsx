import React from 'react';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Room } from './table/rooms-table';
import JoinRoomButton from './table/join-room-button';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

interface Props {
  room: Room;
  game: string;
  session: any;
}

const RoomCard: React.FC<Props> = ({ room, game, session }) => {
  return (
    <Card className="w-full bg-[#0c0c0c]">
      <CardContent className="flex w-full items-center justify-between py-4">
        <div className="flex flex-col justify-center">
          <CardTitle className="text-white">{room.activity}</CardTitle>
          <CardDescription className="text-gray-400">Created by {room.creatorUsername}</CardDescription>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-gray-400">{dayjs(room.createdAt).fromNow()}</div>
          <Badge variant="secondary" className="bg-[#333] text-white">
            {room._count.roomMembers}/{room.slots}
          </Badge>
          <JoinRoomButton roomId={room.id} game={game} session={session} />
        </div>
      </CardContent>
    </Card>
  );
};

export default RoomCard;

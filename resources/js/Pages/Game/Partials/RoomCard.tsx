import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card';
import dayjs from 'dayjs';
import { Badge } from '@/Components/ui/badge';
import VerifiedCreatorBadge from '@/Components/VerifiedCreatorBadge';
import { ArrowRight, Lock } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Room } from '@/types';
import { Link } from '@inertiajs/react';

interface Props {
  room: Room;
}

const RoomCard: React.ForwardRefRenderFunction<HTMLDivElement | null, Props> = ({ room }, ref) => {
  return (
    <Card key={room.id} className="flex flex-col justify-between" ref={ref}>
      <CardHeader className="p-4">
        <CardTitle className="text-lg">{room.activity}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Host: {room.creatorName} {room.creatorVerified && <VerifiedCreatorBadge />}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 px-4 text-sm">Created {dayjs(new Date(room.createdAt * 1000)).fromNow()}</CardContent>
      <CardFooter className="flex flex-col items-start gap-4 p-4">
        <div className="flex w-full items-center justify-between">
          <Badge variant="secondary" className="h-fit">
            {room.membersCount}/{room.slots}
          </Badge>
          <div className="flex items-center gap-4">
            {room.password && <Lock size={18} />}
            <Button className="flex items-center gap-2" asChild>
              <Link href={route('room', { gamePath: 'd4', roomId: room.id })}>
                Join room
                <ArrowRight size={18} />
              </Link>
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default React.memo(React.forwardRef(RoomCard));

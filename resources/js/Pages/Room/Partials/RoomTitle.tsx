import React from 'react';
import { useModal } from '@/Components/ModalsProvider';
import { Link, usePage } from '@inertiajs/react';
import { PageProps, Room } from '@/types';
import { Button } from '@/Components/ui/button';
import { ArrowLeft, Trash } from 'lucide-react';

interface Props extends PageProps {
  room: Room;
  gamePath: string;
  isRoomCreator: boolean;
}

const RoomTitle: React.FC<Props> = ({ auth, room, gamePath, isRoomCreator }) => {
  const modal = useModal();

  const time = 0;

  return (
    <div className="flex flex-col gap-0">
      <div className="flex flex-wrap items-center justify-between">
        <p className="text-2xl font-bold">{room.activity}</p>
        <div className="flex items-center gap-2">
          {isRoomCreator && (
            <>
              {/*<EditButton disabled={!isRoomCreator} roomId={roomId} activity={title} slots={slots} />*/}
              <Button
                size="icon"
                variant="destructive"
                disabled={!isRoomCreator}
                onClick={() =>
                  modal.open({
                    title: 'Delete room',
                    // children: <DeleteRoomModal roomId={roomId} />,
                    children: '',
                  })
                }
              >
                <Trash size={18} />
              </Button>
            </>
          )}
          <Button asChild variant="destructive" className="flex items-center gap-2">
            <Link href={route(`game`, gamePath)}>
              <ArrowLeft size={18} />
              Leave room
            </Link>
          </Button>
        </div>
      </div>
      <p className="text-sm text-destructive">Room closing in: {time}</p>
    </div>
  );
};

export default RoomTitle;

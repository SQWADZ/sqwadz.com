import React from 'react';
import { useModal } from '@/Components/ModalsProvider';
import { Link } from '@inertiajs/react';
import { PageProps, Room } from '@/types';
import { Button } from '@/Components/ui/button';
import { ArrowLeft, Trash } from 'lucide-react';
import dayjs from 'dayjs';

interface Props extends PageProps {
  room: Room;
  gamePath: string;
  isRoomCreator: boolean;
}

function getRemainingMinutes(expiresAt: number) {
  const minutes = dayjs(+expiresAt + 60 * 60 * 1000).diff(dayjs(), 'minute');
  return minutes <= 1 ? 'Pending deletion...' : `${minutes} minutes`;
}

const RoomTitle: React.FC<Props> = ({ room, gamePath, isRoomCreator }) => {
  const modal = useModal();
  const [time, setTime] = React.useState(getRemainingMinutes(room.createdAt * 1000));

  React.useEffect(() => {
    const intervalId = setInterval(() => setTime(getRemainingMinutes(room.createdAt * 1000)), 60000);

    return () => clearInterval(intervalId);
  }, [room.createdAt]);

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

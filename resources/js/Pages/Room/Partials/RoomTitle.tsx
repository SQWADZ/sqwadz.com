import React from 'react';
import { useModal } from '@/Components/ModalsProvider';
import { Link } from '@inertiajs/react';
import { PageProps, Room } from '@/types';
import { Button } from '@/Components/ui/button';
import { ArrowLeft, Trash } from 'lucide-react';
import dayjs from 'dayjs';
import DeleteRoomModal from '@/Pages/Room/Partials/modals/DeleteRoomModal';

interface Props extends PageProps {
  room: Room;
  gamePath: string;
  isRoomCreator: boolean;
}

function getRemainingMinutes(expiresAt: number) {
  const minutes = dayjs(+expiresAt * 1000).diff(dayjs(), 'minute');
  return minutes <= 1 ? 'Pending deletion...' : `${minutes} minutes`;
}

const RoomTitle: React.FC<Props> = ({ room, gamePath, isRoomCreator }) => {
  const modal = useModal();
  const [time, setTime] = React.useState(getRemainingMinutes(room.expiresAt));

  React.useEffect(() => {
    const intervalId = setInterval(() => setTime(getRemainingMinutes(room.expiresAt)), 60000);

    return () => clearInterval(intervalId);
  }, [room.createdAt]);

  return (
    <div className="flex flex-col gap-0">
      <div className="flex flex-wrap items-center justify-between">
        <p className="text-2xl font-bold">{room.activity}</p>
        <div className="flex items-center gap-2">
          <Button asChild variant="secondary" className="flex items-center gap-2">
            <Link href={route(`game`, gamePath)}>
              <ArrowLeft size={18} />
              Leave room
            </Link>
          </Button>
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
                    children: <DeleteRoomModal gamePath={gamePath} roomId={room.id} />,
                  })
                }
              >
                <Trash size={18} />
              </Button>
            </>
          )}
        </div>
      </div>
      <p className="text-sm text-destructive">Room closing in: {time}</p>
    </div>
  );
};

export default RoomTitle;

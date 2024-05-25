'use client';

import React from 'react';
import EditButton from '@/app/games/[game]/[roomId]/_components/edit-button';
import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useSocket } from '@/components/providers/socket-provider';
import { useModal } from '@/components/modals-provider';
import DeleteRoomModal from '../_components/delete-room-modal';
import dayjs from 'dayjs';
import Link from 'next/link';

interface Props {
  activity: string;
  slots: number;
  roomId: number;
  userId: string;
  creatorId: string;
  createdAt: Date;
  game: string;
}

const RoomTitle: React.FC<Props> = ({ activity, slots, roomId, userId, creatorId, createdAt, game }) => {
  const [title, setTitle] = React.useState(activity);
  const [time, setTime] = React.useState(() => {
    const minutes = dayjs(+createdAt + 60 * 60 * 1000).diff(dayjs(), 'minute');

    return minutes <= 1 ? 'Pending deletion...' : `${minutes} minutes`;
  });
  const { socket } = useSocket();
  const modal = useModal();

  const isCreator = React.useMemo(() => creatorId === userId, [creatorId, userId]);

  const handleUpdateRoom = React.useCallback(
    (data: { activity: string; slots: number }) => {
      setTitle(data.activity);
    },
    [roomId]
  );

  React.useEffect(() => {
    if (!socket) return;

    socket.on(`${roomId}:update_room`, handleUpdateRoom);

    return () => {
      socket.off(`${roomId}:update_room`, handleUpdateRoom);
    };
  }, [socket]);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      const minutes = dayjs(+createdAt + 60 * 60 * 1000).diff(dayjs(), 'minute');
      const time = minutes <= 1 ? 'Pending deletion...' : `${minutes} minutes`;

      setTime(time);
    }, 60000);

    return () => clearInterval(intervalId);
  }, [createdAt]);

  return (
    <div className="flex flex-col gap-0">
      <div className="flex flex-wrap items-center justify-between">
        <p className="text-2xl font-bold">{title}</p>
        <div className="flex items-center gap-2">
          {isCreator && (
            <>
              <EditButton disabled={!isCreator} roomId={roomId} activity={title} slots={slots} />
              <Button
                size="icon"
                variant="destructive"
                disabled={!isCreator}
                onClick={() => modal.open({ title: 'Delete room', children: <DeleteRoomModal roomId={roomId} /> })}
              >
                <FontAwesomeIcon icon={faTrash} fixedWidth size="lg" />
              </Button>
            </>
          )}
          <Link href={`/games/${game}`}>
            <Button variant="destructive">
              <FontAwesomeIcon icon={faArrowLeft} fixedWidth size="lg" />
              Leave room
            </Button>
          </Link>
        </div>
      </div>
      <p className="text-sm text-destructive">Room closing in: {time}</p>
    </div>
  );
};

export default RoomTitle;

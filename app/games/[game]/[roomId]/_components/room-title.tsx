'use client';

import React from 'react';
import EditButton from '@/app/games/[game]/[roomId]/_components/edit-button';
import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useSocket } from '@/components/providers/socket-provider';
import { useModal } from '@/components/modals-provider';
import DeleteRoomModal from '../_components/delete-room-modal';
import dayjs from 'dayjs';

interface Props {
  activity: string;
  slots: number;
  roomId: number;
  userId: string;
  creatorId: string;
  createdAt: Date;
}

const RoomTitle: React.FC<Props> = ({ activity, slots, roomId, userId, creatorId, createdAt }) => {
  const [title, setTitle] = React.useState(activity);
  const [time, setTime] = React.useState(() => {
    const minutes = dayjs(+createdAt + 60 * 60 * 1000).diff(dayjs(), 'minute');

    return minutes <= 1 ? 'Pending deletion...' : `${minutes} minutes`;
  });
  const { socket } = useSocket();
  const modal = useModal();

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
      <div className="flex items-center justify-between">
        <p className="text-2xl font-bold">{title}</p>
        <div className="flex items-center gap-2">
          <EditButton disabled={creatorId !== userId} roomId={roomId} activity={title} slots={slots} />
          <Button
            size="icon"
            variant="destructive"
            disabled={creatorId !== userId}
            onClick={() => modal.open({ title: 'Delete room', children: <DeleteRoomModal roomId={roomId} /> })}
          >
            <FontAwesomeIcon icon={faTrash} fixedWidth size="lg" />
          </Button>
        </div>
      </div>
      <p className="text-sm text-destructive">Room closing in: {time}</p>
    </div>
  );
};

export default RoomTitle;

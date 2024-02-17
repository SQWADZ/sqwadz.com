'use client';

import React from 'react';
import EditButton from '@/app/games/[game]/[roomId]/_components/edit-button';
import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { socket } from '@/client/socket';

interface Props {
  activity: string;
  slots: number;
  roomId: number;
  userId: string;
  creatorId: string;
}

const RoomTitle: React.FC<Props> = ({ activity, slots, roomId, userId, creatorId }) => {
  const [title, setTitle] = React.useState(activity);

  const handleUpdateRoom = React.useCallback(
    (data: { activity: string; slots: number }) => {
      console.log('handleUpdateRoom');
      setTitle(data.activity);
    },
    [roomId]
  );

  React.useEffect(() => {
    socket.on(`${roomId}:update_room`, handleUpdateRoom);

    return () => {
      socket.off(`${roomId}:update_room`, handleUpdateRoom);
    };
  }, []);

  return (
    <div className="flex flex-col gap-0">
      <div className="flex items-center justify-between">
        <p className="text-2xl font-bold">{title}</p>
        <div className="flex items-center gap-2">
          <EditButton disabled={creatorId !== userId} roomId={roomId} activity={title} slots={slots} />
          <Button size="icon" variant="destructive">
            <FontAwesomeIcon icon={faTrash} fixedWidth size="lg" />
          </Button>
        </div>
      </div>
      <p className="text-sm text-destructive">Room closing in: 59m 59s</p>
    </div>
  );
};

export default RoomTitle;

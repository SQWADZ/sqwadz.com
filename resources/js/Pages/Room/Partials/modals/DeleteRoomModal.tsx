import React from 'react';
import { Button } from '@/Components/ui/button';
import { router } from '@inertiajs/react';
import { useModal } from '@/Components/ModalsProvider';

const DeleteRoomModal: React.FC<{ gamePath: string; roomId: string }> = ({ gamePath, roomId }) => {
  const modal = useModal();

  async function deleteRoom() {
    router.delete(`/rooms/${gamePath}/${roomId}`, {
      onSuccess: () => {
        modal.close();
      },
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground">
        Are you sure you want to delete the room and kick everyone out of it?
      </p>
      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={() => modal.close()}>
          Cancel
        </Button>
        <Button variant="destructive" onClick={deleteRoom}>
          Delete room
        </Button>
      </div>
    </div>
  );
};

export default DeleteRoomModal;

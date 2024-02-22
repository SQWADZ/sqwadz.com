import React from 'react';
import { Button } from '@/components/ui/button';
import { useModal } from '@/components/modals-provider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

const DeleteRoomModal: React.FC<{ roomId: number }> = ({ roomId }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const modal = useModal();

  async function deleteRoom() {
    setIsLoading(true);

    const resp = await fetch('/api/rooms/delete-room', {
      body: JSON.stringify({ roomId }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    setIsLoading(false);

    if (!resp) return;

    modal.close();
  }

  return (
    <div className="flex flex-col gap-4">
      <p>Are you sure you want to delete the room and kick everyone out of it?</p>
      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={() => modal.close()}>
          Cancel
        </Button>
        <Button variant="destructive" onClick={deleteRoom}>
          {isLoading ? (
            <FontAwesomeIcon icon={faCircleNotch} fixedWidth className="animate-spin" size="lg" />
          ) : (
            'Delete room'
          )}
        </Button>
      </div>
    </div>
  );
};

export default DeleteRoomModal;

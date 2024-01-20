'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { useModal } from '@/components/modals-provider';
import RoomSettingsModal from '@/app/games/[game]/[roomId]/_components/room-settings-modal';

interface Props {
  activity: string;
  slots: number;
  roomId: number;
  disabled?: boolean;
}

const EditButton: React.FC<Props> = ({ activity, slots, roomId, disabled }) => {
  const modal = useModal();

  return (
    <Button
      size="icon"
      variant="secondary"
      disabled={disabled}
      onClick={() =>
        modal.open({
          title: 'Settings',
          children: <RoomSettingsModal roomId={roomId} activity={activity} slots={slots} />,
        })
      }
    >
      <FontAwesomeIcon icon={faGear} fixedWidth size="lg" />
    </Button>
  );
};

export default EditButton;

'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Session } from 'next-auth';
import * as z from 'zod';
import { useModal } from '@/components/modals-provider';
import CreateRoomModal from '../_components/create-room-modal';

const formSchema = z.object({
  activity: z.string().max(50),
  slots: z.number(),
  password: z.string().optional(),
});

const CreateRoom: React.FC<{ session: Session | null; game: string }> = ({ session, game }) => {
  const modal = useModal();

  return (
    <Button
      variant="secondary"
      disabled={!session?.user}
      leftIcon={faPlus}
      onClick={() =>
        modal.open({
          title: 'Create a room',
          children: <CreateRoomModal game={game} />,
        })
      }
    >
      Create a room
    </Button>
  );
};

export default CreateRoom;

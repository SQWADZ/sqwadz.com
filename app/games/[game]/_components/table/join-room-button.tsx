'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { faArrowRight, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { Session } from 'next-auth';
import { useRouter } from 'next/navigation';
import { useModal } from '@/components/modals-provider';
import RoomPasswordModal from '@/app/games/[game]/_components/room-password-modal';
import { useSocket } from '@/components/providers/socket-provider';

interface Props {
  game: string;
  roomId: number;
  session?: Session | null;
}

const JoinRoomButton: React.FC<Props> = ({ game, roomId, session }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { socket } = useSocket();
  const router = useRouter();
  const modal = useModal();

  return (
    <div className="flex items-center justify-center">
      <Button
        disabled={!session?.user}
        loading={isLoading}
        rightIcon={faArrowRight}
        onClick={async () => {
          setIsLoading(true);
          const resp = await fetch('/api/rooms/check-for-password', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(roomId),
          });

          const data = await resp.json();

          if (!data.hasPassword) {
            setIsLoading(false);
            return router.push(`/games/${game}/${roomId}`);
          }

          setIsLoading(false);
          modal.open({
            title: 'Enter password',
            description: "The room you're trying to join requires a password.",
            children: <RoomPasswordModal roomId={roomId} />,
          });
        }}
      >
        <>
          <p className="hidden md:block">Join room</p>
        </>
      </Button>
    </div>
  );
};

export default JoinRoomButton;

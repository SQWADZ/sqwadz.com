import React from 'react';
import { getServerAuthSession } from '@/server/auth';
import Container from '@/components/container';
import prisma from '@/lib/prisma';
import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faGear, faTrash, faUsers } from '@fortawesome/free-solid-svg-icons';
import RoomChat from './_components/room-chat';
import EditButton from './_components/edit-button';

const RoomPage: React.FC<{ params: { roomId: number } }> = async ({ params }) => {
  const session = await getServerAuthSession();

  if (!session) return <Container>401 - Unauthorized</Container>;

  // TODO: some kind of check to see if user has previously entered the password

  const room = await prisma.room.findFirst({
    where: {
      id: +params.roomId,
    },
  })!;

  if (!room) return null;

  return (
    <Container className="flex-1">
      <div className="flex h-full flex-col gap-8">
        <div className="flex flex-col gap-0">
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold">{room.activity}</p>
            <div className="flex items-center gap-2">
              <EditButton
                disabled={room.creatorId !== session.user.id}
                roomId={params.roomId}
                activity={room.activity}
                slots={room.slots}
              />
              <Button size="icon" variant="destructive">
                <FontAwesomeIcon icon={faTrash} fixedWidth size="lg" />
              </Button>
            </div>
          </div>
          <p className="text-sm text-destructive">Room closing in: 59m 59s</p>
        </div>
        <RoomChat session={session} roomId={params.roomId} />
      </div>
    </Container>
  );
};

export default RoomPage;

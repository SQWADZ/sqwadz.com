import React from 'react';
import { getServerAuthSession } from '@/server/auth';
import Container from '@/components/container';
import prisma from '@/lib/prisma';
import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faGear, faTrash, faUsers } from '@fortawesome/free-solid-svg-icons';
import RoomChat from './_components/room-chat';
import EditButton from './_components/edit-button';
import RoomTitle from '@/app/games/[game]/[roomId]/_components/room-title';
import { redirect } from 'next/navigation';

const RoomPage: React.FC<{ params: { roomId: number; game: string } }> = async ({ params }) => {
  const session = await getServerAuthSession();

  if (!session) return redirect('/sign-in');

  // TODO: some kind of check to see if user has previously entered the password

  const room = await prisma.room.findFirst({
    where: {
      id: +params.roomId,
    },
  })!;

  if (!room) return redirect(`/games/${params.game}`);

  return (
    <Container className="flex-1">
      <div className="flex h-full flex-col gap-8">
        <RoomTitle
          activity={room.activity}
          slots={room.slots}
          roomId={room.id}
          userId={session.user.id}
          creatorId={room.creatorId}
        />
        <RoomChat session={session} roomId={params.roomId} roomCreatorId={room.creatorId} game={room.game} />
      </div>
    </Container>
  );
};

export default RoomPage;

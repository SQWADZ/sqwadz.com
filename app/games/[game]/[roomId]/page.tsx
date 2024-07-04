import React from 'react';
import { getServerAuthSession } from '@/server/auth';
import Container from '@/components/container';
import prisma from '@/lib/prisma';
import RoomChat from './_components/room-chat';
import RoomTitle from '@/app/games/[game]/[roomId]/_components/room-title';
import { redirect } from 'next/navigation';

const RoomPage: React.FC<{ params: { roomId: number; game: string } }> = async ({ params }) => {
  const session = await getServerAuthSession();

  if (!session) return redirect('/sign-in');

  const room = await prisma.room.findFirst({
    where: {
      id: +params.roomId,
    },
  })!;

  if (!room) return redirect(`/games/${params.game}`);

  return (
    <Container className="flex flex-col">
      <div className="flex h-full flex-1 flex-col gap-8">
        <RoomTitle
          activity={room.activity}
          slots={room.slots}
          game={room.game}
          roomId={room.id}
          userId={session.user.id}
          creatorId={room.creatorId}
          createdAt={room.createdAt}
          expiresAt={room.expiresAt}
        />
        <RoomChat session={session} roomId={params.roomId} roomCreatorId={room.creatorId} game={room.game} />
      </div>
    </Container>
  );
};

export default RoomPage;

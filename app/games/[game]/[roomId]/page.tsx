import React from 'react';
import { getServerAuthSession } from '@/server/auth';
import Container from '@/components/container';
import prisma from '@/lib/prisma';
import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faGear, faTrash, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Input } from '@/components/ui/input';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import UserItem from '@/app/games/[game]/[roomId]/_components/user-item';

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
              <Button size="icon" variant="secondary">
                <FontAwesomeIcon icon={faGear} fixedWidth size="lg" />
              </Button>
              <Button size="icon" variant="destructive">
                <FontAwesomeIcon icon={faTrash} fixedWidth size="lg" />
              </Button>
            </div>
          </div>
          <p className="text-sm text-destructive">Room closing in: 59m 59s</p>
        </div>
        <div className="flex flex-1 rounded-lg border border-border">
          <div className="flex flex-[0.7] flex-col justify-between border-r border-border p-4">
            <div className="flex items-center justify-between text-muted-foreground">
              <p className="text-xl">Chat</p>
              <div>
                <FontAwesomeIcon icon={faComment} fixedWidth size="lg" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Input placeholder="Message..." />
              <Button size="icon">
                <FontAwesomeIcon icon={faPaperPlane} fixedWidth />
              </Button>
            </div>
          </div>
          <div className="flex flex-[0.3] flex-col gap-4 overflow-y-auto p-4">
            <div className="flex items-center justify-between text-muted-foreground">
              <p className="text-xl">Members</p>
              <div>
                <FontAwesomeIcon icon={faUsers} fixedWidth size="lg" />
              </div>
            </div>
            <div className="flex h-full flex-col gap-4 overflow-y-auto">
              <UserItem session={session} />
              <UserItem session={session} />
              <UserItem session={session} />
              <UserItem session={session} />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default RoomPage;

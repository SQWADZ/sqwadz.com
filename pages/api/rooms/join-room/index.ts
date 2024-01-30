import { NextApiRequest } from 'next';
import { getPagesServerAuthSession } from '@/server/auth';
import { RoomMember } from '@/types';
import { NextApiResponseServerIo } from '@/pages/api/socket/io';
import prisma from '@/lib/prisma';

type Member = RoomMember & { socketId: string };

const roomMembers: Record<string, RoomMember[]> = {};

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIo) {
  const session = await getPagesServerAuthSession(req, res);

  if (!session) return res.status(401).json({ error: 'Unauthorized' });

  const { user, roomId: id } = req.body as { user: RoomMember; roomId: number };
  const roomId = +id;

  if (session.user.id !== user.id || !roomId) return res.status(400);

  const room = await prisma.room.findUnique({
    where: {
      id: roomId,
    },
    include: {
      roomMembers: {
        include: {
          user: true,
        },
      },
    },
  });

  if (!room) return res.status(400);

  if (!room.roomMembers.find((member) => member.userId === user.id)) {
    try {
      await prisma.roomMember.create({
        data: {
          roomId,
          userId: user.id,
        },
      });
    } catch (e) {
      console.log(`failed to insert room member ${user.id} into room ${roomId}`, e);
    }
  }

  const roomMembers: RoomMember[] = room.roomMembers.map((member) => ({
    id: member.user.id,
    name: member.user.name,
    image: member.user.image,
  }));

  res.socket.server.io.emit(`${roomId}:join-room`, roomMembers);

  return res.status(200).json({ members: roomMembers });
}

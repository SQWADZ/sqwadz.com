import { NextApiResponseServerIo } from '@/pages/api/socket/io';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { getPagesServerAuthSession } from '@/server/auth';
import { RoomMember } from '@/types';

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIo) {
  const session = await getPagesServerAuthSession(req, res);

  if (!session) return res.status(401).json({ error: '401 - Unauthorized' });

  const { roomId: id } = req.body;
  const roomId = +id;

  await prisma.roomMember.deleteMany({
    where: {
      userId: session.user.id,
      roomId: roomId,
    },
  });

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

  if (!room) return res.status(400).json('No room with such id found');

  const roomMembers: RoomMember[] = room.roomMembers.map((member) => ({
    id: member.user.id,
    name: member.user.name,
    image: member.user.image,
  }));

  res.socket.server.io.emit(`${id}:members-changed`, {
    members: roomMembers,
    message: `${session.user.name} has left the room.`,
  });

  return res.status(200).json({ members: roomMembers });
}

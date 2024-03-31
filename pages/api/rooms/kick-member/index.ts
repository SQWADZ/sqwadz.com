import { NextApiRequest } from 'next';
import { NextApiResponseServerIo } from '@/pages/api/socket/io';
import { getPagesServerAuthSession } from '@/server/auth';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIo) {
  const session = await getPagesServerAuthSession(req, res);

  if (!session) return res.status(401).json('Unauthorized');

  const data: { roomId: number; targetId: string; reason: string } = req.body;

  const room = await prisma.room.findFirst({
    where: {
      id: data.roomId,
    },
  });

  if (!room) return res.status(500).json('No such room');

  if (session.user.id !== room.creatorId) return res.status(401).json('Unauthorized');

  await prisma.roomMember.deleteMany({
    where: {
      roomId: data.roomId,
      userId: data.targetId,
    },
  });

  res.socket.server.io.emit(`${data.roomId}:kick-member`, { targetId: data.targetId, reason: data.reason });

  return res.status(200).json('success');
}

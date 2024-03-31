import { NextApiRequest } from 'next';
import { NextApiResponseServerIo } from '@/pages/api/socket/io';
import { getPagesServerAuthSession } from '@/server/auth';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIo) {
  const session = await getPagesServerAuthSession(req, res);

  if (!session) return res.status(401).json('Unauthorized');

  const data: { targetId: string; reason: string; roomId: number } = req.body;

  const room = await prisma.room.findFirst({
    where: {
      id: +data.roomId,
    },
  });

  if (!room) return res.status(500).json('No room found');

  if (session.user.id !== room.creatorId) return res.status(401).json('Unauthorized');

  try {
    await prisma.roomBan.create({
      data: {
        roomId: +data.roomId,
        userId: data.targetId,
      },
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }

  res.socket.server.io.emit(`${data.roomId}:remove-member`, {
    targetId: data.targetId,
    reason: data.reason,
    type: 'ban',
  });

  return res.status(200).json('success');
}

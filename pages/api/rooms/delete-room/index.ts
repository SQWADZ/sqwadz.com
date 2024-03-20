import { NextApiRequest } from 'next';
import { NextApiResponseServerIo } from '@/pages/api/socket/io';
import { getPagesServerAuthSession } from '@/server/auth';
import prisma from '@/lib/prisma';
import { roomRemovalQueue } from '@/lib/bullmq';

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIo) {
  const session = await getPagesServerAuthSession(req, res);

  if (!session) return res.status(401).json('Unauthorized');

  const { roomId } = req.body;

  const isOwner = await prisma.room.findFirst({
    where: {
      creatorId: session.user.id,
      id: roomId,
    },
    select: {
      _count: true,
    },
  });

  if (!isOwner?._count) return res.status(401).json('Unauthorized');

  try {
    await prisma.room.delete({
      where: {
        id: roomId,
      },
    });
  } catch (e) {
    console.log(e);
  }

  await roomRemovalQueue.remove(roomId.toString());
  res.socket.server.io.emit(`${roomId}:room-delete`);

  return res.status(200).json({ ok: true });
}

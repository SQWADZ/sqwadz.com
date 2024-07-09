import { NextApiRequest } from 'next';
import { NextApiResponseServerIo } from '@/pages/api/socket/io';
import { getPagesServerAuthSession } from '@/server/auth';
import prisma from '@/lib/prisma';
import { roomRemovalQueue } from '@/lib/bullmq';

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIo) {
  const session = await getPagesServerAuthSession(req, res);

  if (!session) return res.status(401).json('Unauthorized');

  const { roomId } = req.body;

  const room = await prisma.room.findFirst({
    where: {
      id: roomId,
    },
  });

  if (!room) return res.status(500).json('Error');

  if (room.creatorId !== session.user.id) return res.status(401).json('Unauthorized');

  try {
    await prisma.room.deleteMany({
      where: {
        id: roomId,
      },
    });
  } catch (e) {
    console.log(e);
  }

  await roomRemovalQueue.remove(roomId.toString());
  res.socket.server.io.emit(`${roomId}:room-delete`);
  res.socket.server.io.emit(`${room.gamePath}:room-removed`, room.id);

  return res.status(200).json({ ok: true });
}

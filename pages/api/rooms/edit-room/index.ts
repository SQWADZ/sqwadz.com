import { getPagesServerAuthSession, getServerAuthSession } from '@/server/auth';
import prisma from '@/lib/prisma';
import { NextApiRequest } from 'next';
import { NextApiResponseServerIo } from '@/pages/api/socket/io';

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIo) {
  const session = await getPagesServerAuthSession(req, res);

  if (!session) return res.status(401).send({ error: 'Unauthorized' });

  const data: { activity: string; slots: number; roomId: number } = req.body;

  const room = await prisma.room.findFirst({
    where: {
      id: data.roomId,
    },
    select: {
      creatorId: true,
      id: true,
      gamePath: true,
    },
  });

  if (room?.creatorId !== session.user.id) return res.status(401).json({ error: 'Unauthorized' });

  await prisma.room.update({
    where: {
      id: data.roomId,
    },
    data: {
      activity: data.activity,
      slots: data.slots,
    },
  });

  res.socket.server.io.emit(`${room.id}:update_room`, data);
  res.socket.server.io.emit(`${room.gamePath}:room-updated`, data);

  return res.status(200).json({ ok: true });
}

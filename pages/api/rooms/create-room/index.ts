import { NextApiRequest } from 'next';
import { NextApiResponseServerIo } from '@/pages/api/socket/io';
import { getPagesServerAuthSession, getServerAuthSession } from '@/server/auth';
import prisma from '@/lib/prisma';
import { roomRemovalQueue } from '@/lib/bullmq';
import Filter from 'bad-words';

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIo) {
  const session = await getPagesServerAuthSession(req, res);

  if (!session?.user) return res.status(401).json({ error: 'Unauthorized' });

  const data: { activity: string; password?: string; slots: number; game: string } = req.body;

  if (data.activity.length > 50) return res.status(401).json({ error: 'Activity name too long' });

  const filter = new Filter();
  if (filter.isProfane(data.activity)) {
    return res.status(400).json({ error: 'Activity name contains inappropriate language' });
  }

  const { id } = await prisma.room.create({
    data: {
      activity: data.activity,
      password: data.password === '' ? undefined : data.password,
      slots: data.slots,
      creatorId: session.user.id,
      game: data.game,
    },
  });

  await roomRemovalQueue.add(
    id.toString(),
    { roomId: id, game: data.game },
    { delay: 5000, removeOnComplete: true, removeOnFail: 100 }
  );

  const createdRoom = await prisma.room.findFirst({
    where: {
      id,
    },
    include: {
      creator: {
        select: {
          name: true,
        },
      },
      _count: {
        select: {
          roomMembers: true,
        },
      },
    },
  });

  if (createdRoom) {
    res.socket.server.io.emit(`${data.game}:room-created`, { ...createdRoom, password: !!createdRoom.password });
  }

  return res.status(200).json({ id });
}

import { NextApiRequest } from 'next';
import { NextApiResponseServerIo } from '@/pages/api/socket/io';
import { getPagesServerAuthSession, getServerAuthSession } from '@/server/auth';
import prisma from '@/lib/prisma';
import { roomRemovalQueue } from '@/lib/bullmq';

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIo) {
  const session = await getPagesServerAuthSession(req, res);

  if (!session?.user) return res.status(401).json({ error: 'Unauthorized' });

  const data: { activity: string; password?: string; slots: number; game: string } = req.body;

  if (data.activity.length > 50) return res.status(401).json({ error: 'Activity name too long' });

  const { id } = await prisma.room.create({
    data: {
      activity: data.activity,
      password: data.password === '' ? undefined : data.password,
      slots: data.slots,
      creatorId: session.user.id,
      game: data.game,
    },
  });

  await roomRemovalQueue.add(id.toString(), { roomId: id }, { delay: 1 * 60 * 1000 });

  return res.status(200).json({ id });
}

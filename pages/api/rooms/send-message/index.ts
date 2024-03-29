import { NextApiRequest } from 'next';
import { NextApiResponseServerIo } from '@/pages/api/socket/io';
import { Message } from '@/types';
import prisma from '@/lib/prisma';
import { getPagesServerAuthSession } from '@/server/auth';
import redis from '@/lib/redis';

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIo) {
  const { message, roomId: id } = req.body as { message: Message; roomId: string };
  const roomId = +id;

  if (message.contents === '') return res.status(400);

  const session = await getPagesServerAuthSession(req, res);

  if (!session) return res.status(401).json({ error: '401 - Unauthorized' });

  if (session.user.id !== message.id) return res.status(401);

  message.createdAt = Date.now();

  await redis.zadd(`roomId:${roomId}:messages`, message.createdAt, JSON.stringify(message));

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

  if (!room) return res.status(400).json({ error: 'Room not found' });

  if (!room.roomMembers.find((member) => member.user.id === session.user.id)) return res.status(400);

  res.socket.server.io.emit(`${roomId}:receive-message`, message);

  return res.status(200).json({ message });
}

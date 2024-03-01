import { NextApiRequest } from 'next';
import { getPagesServerAuthSession } from '@/server/auth';
import { Message, RoomMember } from '@/types';
import { NextApiResponseServerIo } from '@/pages/api/socket/io';
import prisma from '@/lib/prisma';
import redis from '@/lib/redis';

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIo) {
  const session = await getPagesServerAuthSession(req, res);

  if (!session) return res.status(401).json({ error: 'Unauthorized' });

  const { roomId: id } = req.body as { roomId: number };
  const roomId = +id;

  if (!roomId) return res.status(400);

  const room = await prisma.room.findUnique({
    where: {
      id: roomId,
    },
    include: {
      _count: {
        select: {
          roomMembers: true,
        },
      },
      roomMembers: {
        include: {
          user: true,
        },
      },
    },
  });

  if (!room) return res.status(400);

  // todo: check if room includes you to stop being kicked out on page refresh
  if (room._count.roomMembers >= room.slots) {
    return res.status(307).json({ error: 'room_full' });
  }

  const members: Record<RoomMember['id'], RoomMember> = {};

  room.roomMembers.forEach((member) => (members[member.user.id] = member.user));

  try {
    await prisma.roomMember.create({
      data: {
        roomId,
        userId: session.user.id,
      },
    });
  } catch (e) {
    console.log(`failed to insert room member ${session.user.id} into room ${roomId}`);
  }

  const user: RoomMember = {
    id: session.user.id,
    name: session.user.name,
    image: session.user.image,
  };

  members[user.id] = user;

  res.socket.server.io.emit(`${roomId}:members-changed`, {
    members: Object.values(members),
    message: `${user.name} has joined the room.`,
    isJoin: true,
  });

  const rawMessages = await redis.zrange(`roomId:${roomId}`, 0, 50);
  const parsedMessages: Message[] = rawMessages.map((rawMessage) => JSON.parse(rawMessage));

  return res.status(200).json({ messages: parsedMessages });
}

import { NextApiRequest } from 'next';
import { getPagesServerAuthSession } from '@/server/auth';
import { Message, RoomMember, MessageData } from '@/types';
import { NextApiResponseServerIo } from '@/pages/api/socket/io';
import prisma from '@/lib/prisma';
import redis from '@/lib/redis';

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIo) {
  const session = await getPagesServerAuthSession(req, res);

  if (!session) return res.status(401).json({ error: 'Unauthorized' });

  const { roomId: id } = req.body as { roomId: number };
  const roomId = +id;
  const password = req.cookies[`${roomId}:password`];

  if (!roomId) return res.status(400).json({ error: 'Unauthorized' });

  // check if member is banned
  const isBanned = await prisma.roomBan.findFirst({
    where: {
      roomId: roomId,
      userId: session.user.id,
    },
  });

  if (isBanned) return res.status(401).json({ error: 'banned' });

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

  if (room.password && room.password !== password) {
    return res.status(401).json({ error: 'incorrect_password' });
  }

  const userExists = !!room.roomMembers.find((roomMember) => roomMember.user.id === session.user.id);
  //bypass room full check for creator
  if (room._count.roomMembers >= room.slots && !userExists && room.creatorId !== session.user.id) {
    return res.status(307).json({ error: 'room_full' });
  }

  if (!userExists) {
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
  }

  const members: RoomMember[] = room.roomMembers.map((member) => ({
    id: member.user.id,
    name: member.user.name,
    image: member.user.image,
  }));

  const user: RoomMember = {
    id: session.user.id,
    name: session.user.name,
    image: session.user.image,
  };

  if (!members.find((member) => member.id === user.id)) {
    members.push(user);
  }

  res.socket.server.io.emit(`${roomId}:members-changed`, {
    members,
    message: `${user.name} has joined the room.`,
    isJoin: true,
  });

  const rawMessages = await redis.zrevrange(`roomId:${roomId}:messages`, 0, 25 - 1);
  const parsedMessages: Message[] = rawMessages.map((rawMessage) => JSON.parse(rawMessage));

  const messagesData: MessageData[] = [
    {
      messages: parsedMessages || [],
      hasMore: (await redis.zrevrange(`roomId:${roomId}:messages`, 25 - 1, 25)).length > 0,
    },
  ];

  return res.status(200).json({ messagesData });
}

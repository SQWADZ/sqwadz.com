import { NextApiRequest } from 'next';
import { getPagesServerAuthSession } from '@/server/auth';
import { RoomMember } from '@/types';
import { NextApiResponseServerIo } from '@/pages/api/socket/io';
import prisma from '@/lib/prisma';

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

  if (room._count.roomMembers >= room.slots) {
    return res.status(307).json({ error: 'room_full' });
  }

  // TODO: fix user being inserted into the db twice (react strict mode - unique constraint?)
  const roomMembers: RoomMember[] = room.roomMembers.map((member) => ({
    id: member.user.id,
    name: member.user.name,
    image: member.user.image,
  }));

  if (roomMembers.find((member) => member.id === session.user.id)) {
    res.socket.server.io.emit(`${roomId}:join-room`, roomMembers);

    return res.status(200).json({ members: roomMembers });
  }

  try {
    await prisma.roomMember.create({
      data: {
        roomId,
        userId: session.user.id,
      },
    });

    const user: RoomMember = {
      id: session.user.id,
      name: session.user.name,
      image: session.user.image,
    };

    roomMembers.push(user);
  } catch (e) {
    console.log(`failed to insert room member ${session.user.id} into room ${roomId}`, e);
  }

  res.socket.server.io.emit(`${roomId}:members-changed`, roomMembers);

  return res.status(200).json({ members: roomMembers });
}

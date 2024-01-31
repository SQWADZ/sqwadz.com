import { NextApiRequest } from 'next';
import { getPagesServerAuthSession } from '@/server/auth';
import { RoomMember } from '@/types';
import { NextApiResponseServerIo } from '@/pages/api/socket/io';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIo) {
  const session = await getPagesServerAuthSession(req, res);

  if (!session) return res.status(401).json({ error: 'Unauthorized' });

  const { user, roomId: id } = req.body as { user: RoomMember; roomId: number };
  const roomId = +id;

  if (session.user.id !== user.id || !roomId) return res.status(400);

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

  if (!room) return res.status(400);

  // TODO: fix user being inserted into the db twice (react strict mode - unique constraint?)
  const roomMembers: RoomMember[] = room.roomMembers.map((member) => ({
    id: member.user.id,
    name: member.user.name,
    image: member.user.image,
  }));

  if (roomMembers.find((member) => member.id === user.id)) {
    res.socket.server.io.emit(`${roomId}:join-room`, roomMembers);

    return res.status(200).json({ members: roomMembers });
  }

  try {
    await prisma.roomMember.create({
      data: {
        roomId,
        userId: user.id,
      },
    });

    roomMembers.push(user);
  } catch (e) {
    console.log(`failed to insert room member ${user.id} into room ${roomId}`, e);
  }

  res.socket.server.io.emit(`${roomId}:members-changed`, roomMembers);

  return res.status(200).json({ members: roomMembers });
}

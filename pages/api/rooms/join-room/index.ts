import { NextApiRequest } from 'next';
import { getPagesServerAuthSession } from '@/server/auth';
import { RoomMember } from '@/types';
import { NextApiResponseServerIo } from '@/pages/api/socket/io';

type Member = RoomMember & { socketId: string };

const roomMembers: Record<string, RoomMember[]> = {};

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIo) {
  const session = await getPagesServerAuthSession(req, res);

  if (!session) return res.status(401).json({ error: 'Unauthorized' });

  const { user, roomId } = req.body as { user: RoomMember; roomId: number };

  if (session.user.id !== user.id || !roomId) return res.status(400);

  if (!roomMembers[roomId]) roomMembers[roomId] = [];
  if (!roomMembers[roomId].find((member) => member.id === user.id)) roomMembers[roomId].push(user);

  res?.socket?.server?.io.emit(`${roomId}:join-room`, roomMembers[roomId]);

  return res.status(200).json({ members: roomMembers[roomId] });
}

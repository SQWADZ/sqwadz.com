import { getServerAuthSession } from '@/server/auth';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  const session = await getServerAuthSession();

  if (!session) return Response.json({ status: 401 });

  const data: { activity: string; slots: number; roomId: number } = await request.json();

  const room = await prisma.room.findFirst({
    where: {
      id: data.roomId,
    },
    select: {
      creatorId: true,
    },
  });

  if (room?.creatorId !== session.user.id) return Response.json({ status: 401 });

  await prisma.room.update({
    where: {
      id: data.roomId,
    },
    data: {
      activity: data.activity,
      slots: data.slots,
    },
  });

  return Response.json({ status: 200 });
}

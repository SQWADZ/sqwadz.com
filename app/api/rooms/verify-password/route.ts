import { getServerAuthSession } from '@/server/auth';
import prisma from '@/lib/prisma';

async function handler(request: Request) {
  const session = await getServerAuthSession();

  if (!session?.user) return Response.json({ status: 401 });

  const data: { roomId: number; password: string } = await request.json();

  if (!data.roomId || !data.password) return Response.json({ status: 401 });

  const room = await prisma.room.count({
    where: {
      id: data.roomId,
      password: data.password,
    },
  });

  console.log(data.roomId, data.password, room);

  if (!room) return Response.json({ isCorrect: false });

  return Response.json({ isCorrect: true });
}

export { handler as POST, handler as GET };

import { getServerAuthSession } from '@/server/auth';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

async function handler(request: Request) {
  const session = await getServerAuthSession();

  if (!session?.user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const data: { roomId: number; password: string } = await request.json();

  if (!data.roomId || !data.password) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const room = await prisma.room.count({
    where: {
      id: data.roomId,
      password: data.password,
    },
  });

  if (!room) return Response.json({ isCorrect: false }, { status: 200 });

  cookies().set(`${data.roomId}:password`, data.password, {
    secure: true,
    httpOnly: true,
  });

  return Response.json({ isCorrect: true }, { status: 200 });
}

export { handler as POST, handler as GET };

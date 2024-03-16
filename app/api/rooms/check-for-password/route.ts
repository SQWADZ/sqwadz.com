import { getServerAuthSession } from '@/server/auth';
import prisma from '@/lib/prisma';

async function handler(request: Request) {
  const session = await getServerAuthSession();

  if (!session?.user) {
    return Response.json({ error: 'Unauthorized' }, { status: 400 });
  }

  const roomId: number = await request.json();

  const room = await prisma.room.findUnique({
    where: {
      id: roomId,
    },
    select: {
      password: true,
    },
  });

  if (!room || !room.password) {
    return Response.json({ hasPassword: false }, { status: 200 });
  }

  return Response.json({ hasPassword: true }, { status: 200 });
}

export { handler as POST, handler as GET };

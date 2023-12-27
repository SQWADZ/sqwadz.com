import { getServerAuthSession } from '@/server/auth';
import prisma from '@/lib/prisma';

async function handler(request: Request) {
  const session = await getServerAuthSession();

  if (!session?.user) {
    return Response.json({ status: 401 });
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
    return Response.json({ hasPassword: false });
  }

  return Response.json({ hasPassword: true });
}

export { handler as POST, handler as GET };

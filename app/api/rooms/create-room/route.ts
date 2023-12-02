import { getServerAuthSession } from '@/server/auth';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  const session = await getServerAuthSession();

  if (!session?.user) return Response.json({ status: 401 });

  const data: { activity: string; password?: string; slots: number } = await request.json();

  await prisma.room.create({
    data: {
      activity: data.activity,
      password: data.password === '' ? undefined : data.password,
      slots: data.slots,
      creatorId: session.user.id,
    },
  });

  return Response.json({ status: 200 });
}

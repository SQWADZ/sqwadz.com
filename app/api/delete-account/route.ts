import { getServerAuthSession } from '@/server/auth';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

async function handler(req: Request) {
  const session = await getServerAuthSession();

  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const success = await prisma.user.delete({
      where: {
        id: session.user.id,
      },
    });

    if (!success) return NextResponse.json({ error: 'No account deleted' }, { status: 500 });
  } catch (e) {
    return NextResponse.json({ error: 'No account deleted' }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}

export { handler as POST, handler as GET };

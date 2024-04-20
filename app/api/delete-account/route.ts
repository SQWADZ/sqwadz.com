import { getServerAuthSession } from '@/server/auth';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

async function handler(req: Request) {
  const session = await getServerAuthSession();

  console.log(1);

  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  console.log(2);
  try {
    console.log(3);
    const success = await prisma.user.delete({
      where: {
        id: session.user.id,
      },
    });

    console.log(4);
    if (!success) return NextResponse.json({ error: 'No account deleted' }, { status: 500 });
    console.log(5);
  } catch (e) {
    console.log(6);
    return NextResponse.json({ error: 'No account deleted' }, { status: 500 });
  }

  console.log(7);
  return NextResponse.json({ ok: true }, { status: 200 });
}

export { handler as POST, handler as GET };

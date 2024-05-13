import redis from '@/lib/redis';
import { NextResponse } from 'next/server';
import { Message } from '@/types';

async function handler(req: Request) {
  const data: { page: number; roomId: number } = await req.json();

  // TODO: maybe a check for authorization, but perhaps not necessary?

  const rawMessages = await redis.zrevrange(`roomId:${data.roomId}:messages`, 25 * data.page, 25 * data.page + 25);
  const messages: Message[] = rawMessages.map((message) => JSON.parse(message));
  const hasMore =
    (await redis.zrevrange(`roomId:${data.roomId}:messages`, 25 * data.page + 25, 25 * data.page + 25 + 1)).length > 0;
  console.log(hasMore);

  return NextResponse.json(
    {
      messages,
      hasMore,
    },
    { status: 200 }
  );
}

export { handler as POST };

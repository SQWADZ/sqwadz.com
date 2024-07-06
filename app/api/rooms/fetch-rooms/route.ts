import prisma from '@/lib/prisma';

async function handler(request: Request) {
  const { game, query, page } = (await request.json()) as { game: string; query: string; page: number };

  const _rooms = await prisma.room.findMany({
    where: {
      game: {
        path: game,
      },
      activity: {
        contains: query,
      },
    },
    include: {
      creator: {
        select: {
          name: true,
          isVerified: true,
        },
      },
      _count: {
        select: {
          roomMembers: true,
        },
      },
    },
    orderBy: [
      {
        createdAt: 'desc',
      },
    ],
    take: 10,
    skip: (page ? (page >= 0 ? page : 0) : 0) * 10,
  });

  const rooms = _rooms.map((room) => ({
    ...room,
    password: !!room.password,
    creatorUsername: room.creator.name,
  }));

  const hasMore =
    (await prisma.room.findFirst({
      where: {
        game: {
          path: game,
        },
        activity: {
          contains: query,
        },
      },
      select: {
        id: true,
      },
      take: 1,
      skip: (page + 1) * 10,
    })) !== null;

  return new Response(
    JSON.stringify({
      rooms,
      hasMore,
    }),
    { status: 200 }
  );
}

export { handler as POST };

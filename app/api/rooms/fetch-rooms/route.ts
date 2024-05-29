import prisma from '@/lib/prisma';

async function handler(request: Request) {
  const { game, query, page } = (await request.json()) as { game: string; query: string; page: number };

  const _rooms = await prisma.room.findMany({
    where: {
      game,
      activity: {
        contains: query,
      },
    },
    include: {
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
    take: 8,
    skip: (page ? (page >= 0 ? page : 0) : 0) * 8,
  });

  const rooms = _rooms.map((room) => ({ ...room, password: !!room.password }));

  const roomsCount = await prisma.room.count({
    where: {
      game,
      activity: {
        contains: query,
      },
    },
  });

  return Response.json(
    {
      rooms,
      roomsCount,
    },
    { status: 200 }
  );
}

export { handler as POST };

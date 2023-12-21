import React from 'react';
import Container from '@/components/container';
import CreateRoom from './_components/create-room';
import { getServerAuthSession } from '@/server/auth';
import RoomSearch from '@/app/games/[game]/_components/room-search';
import Rooms from '@/app/games/[game]/_components/table/rooms';
import TableLoadingSkeleton from '@/app/games/[game]/_components/table/table-loading-skeleton';

const GamePage: React.FC<{ params: { game: string }; searchParams: { query?: string; page?: string } }> = async ({
  params,
  searchParams,
}) => {
  const session = await getServerAuthSession();
  const _page = searchParams.page ? +searchParams.page : undefined;

  return (
    <Container className="flex flex-col gap-10">
      <div className="flex items-center justify-between">
        <p className="text-xl">Rooms</p>
        <CreateRoom session={session} game={params.game} />
      </div>
      <RoomSearch />
      <React.Suspense key={`${searchParams.query}0`} fallback={<TableLoadingSkeleton />}>
        <Rooms game={params.game} session={session} query={searchParams.query} page={_page} />
      </React.Suspense>
    </Container>
  );
};

export default GamePage;

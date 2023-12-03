import React from 'react';
import Container from '@/components/container';
import games from '@/data/games.json';
import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Input } from '@/components/ui/input';
import CreateRoom from './_components/create-room';
import { getServerAuthSession } from '@/server/auth';
import prisma from '@/lib/prisma';

const GamePage: React.FC<{ params: { game: string } }> = async ({ params }) => {
  const game = games.find((jsonGame) => jsonGame.path === params.game)!;
  const session = await getServerAuthSession();

  const rooms = await prisma.room.findMany();

  return (
    <Container className="flex flex-col gap-10">
      <div className="flex items-center justify-between">
        <p className="text-xl">Rooms</p>
        <CreateRoom session={session} />
      </div>
      <Input placeholder="Search..." />
      {rooms.length > 0 ? (
        <table className="border">
          <thead className="border-b">
            <tr>
              <th>Activity</th>
              <th>Created at</th>
              <th>Group size</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {rooms.map((room) => (
              <tr key={room.id}>
                <td>{room.activity}</td>
                <td>2 minutes ago</td>
                <td>0/{room.slots}</td>
                <td className="flex items-center justify-center p-2">
                  <Button className="flex items-center gap-2" disabled={!session?.user}>
                    Join room
                    <FontAwesomeIcon icon={faArrowRight} fixedWidth />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No rooms found</p>
      )}
    </Container>
  );
};

export default GamePage;

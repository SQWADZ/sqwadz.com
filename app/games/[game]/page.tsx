import React from 'react';
import Container from '@/components/container';
import games from '@/data/games.json';
import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Input } from '@/components/ui/input';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/authOptions';
import CreateRoom from './_components/create-room';

const GamePage: React.FC<{ params: { game: string } }> = async ({ params }) => {
  const game = games.find((jsonGame) => jsonGame.path === params.game)!;
  const session = await getServerSession(authOptions);

  return (
    <Container className="flex flex-col gap-10">
      <div className="flex items-center justify-between">
        <p className="text-xl">Rooms</p>
        <CreateRoom session={session} />
      </div>
      <Input placeholder="Search..." />
      {/* Placeholder table */}
      <table className="border">
        <thead className="border-b">
          <tr>
            <th>Activity</th>
            <th>Created at</th>
            <th>Group size</th>
          </tr>
        </thead>
        <tbody className="text-center">
          <tr>
            <td>Funky stuff</td>
            <td>2 minutes ago</td>
            <td>0/4</td>
            <td className="flex items-center justify-center p-2">
              <Button className="flex items-center gap-2" disabled={!session?.user}>
                Join room
                <FontAwesomeIcon icon={faArrowRight} fixedWidth />
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </Container>
  );
};

export default GamePage;

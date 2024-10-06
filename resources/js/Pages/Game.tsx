import React from 'react';
import { PageProps } from '@/types';
import Container from '@/Components/Container';
import { Button } from '@/Components/ui/button';
import { useModal } from '@/Components/ModalsProvider';
import { Plus } from 'lucide-react';
import { Head } from '@inertiajs/react';

interface Props {
  game: {
    name: string;
    path: string;
  };
  rooms: unknown[];
}

const Game: React.FC<PageProps & Props> = ({ auth, game, rooms }) => {
  const modal = useModal();

  return (
    <Container className="flex flex-col gap-10">
      <Head title={game.name} />
      <div className="flex items-center justify-between">
        <p className="text-xl">{game.name} Rooms</p>
        <Button
          disabled={!auth?.user}
          variant="secondary"
          className="flex items-center gap-2"
          onClick={() => modal.open({ title: 'Create a room', children: <p>Hello there</p> })}
        >
          <Plus size={18} />
          Create a room
        </Button>
        {/*<CreateRoom session={session} game={gameDetails.path} />*/}
      </div>
      <div className="flex flex-col gap-4"></div>
    </Container>
  );
};

export default Game;

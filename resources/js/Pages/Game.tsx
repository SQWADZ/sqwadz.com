import React from 'react';
import { PageProps } from '@/types';
import Container from '@/Components/Container';

interface Props {
  game: {
    name: string;
    path: string;
  };
  rooms: unknown[];
}

const Game: React.FC<PageProps & Props> = ({ game, rooms }) => {
  return (
    <Container className="flex flex-col gap-10">
      <div className="flex items-center justify-between">
        <p className="text-xl">{game.name} Rooms</p>
        {/*<CreateRoom session={session} game={gameDetails.path} />*/}
      </div>
      <div className="flex flex-col gap-4"></div>
    </Container>
  );
};

export default Game;

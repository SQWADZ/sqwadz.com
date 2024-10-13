import React from 'react';
import { PageProps, Room } from '@/types';
import Container from '@/Components/Container';
import { Button } from '@/Components/ui/button';
import { useModal } from '@/Components/ModalsProvider';
import { Plus } from 'lucide-react';
import { Head } from '@inertiajs/react';
import CreateRoomModal from '@/Pages/Game/Partials/modals/CreateRoomModal';
import RoomCard from './Partials/RoomCard';

interface Props {
  game: {
    name: string;
    path: string;
  };
  rooms: Room[];
}

const Game: React.FC<PageProps & Props> = ({ auth, game, rooms }) => {
  const modal = useModal();
  const [shownRooms, setShownRooms] = React.useState(rooms);

  React.useEffect(() => {
    window.Echo.channel(`rooms.${game.path}`)
      .listen('.room.created', (room: Room) => {
        setShownRooms((prev) => [room, ...prev]);
      })
      .listen('.room.removed', (data: { roomId: string }) =>
        setShownRooms((prev) => prev.filter((room) => room.id !== data.roomId))
      );

    return () => window.Echo.leave(`rooms.${game.path}`);
  }, []);

  return (
    <Container className="flex flex-col gap-10">
      <Head title={game.name} />
      <div className="flex items-center justify-between">
        <p className="text-xl">{game.name} Rooms</p>
        <Button
          disabled={!auth?.user}
          variant="secondary"
          className="flex items-center gap-2"
          onClick={() =>
            modal.open({ title: 'Create a room', children: <CreateRoomModal game={game.path} user={auth?.user} /> })
          }
        >
          <Plus size={18} />
          Create a room
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        {shownRooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </Container>
  );
};

export default Game;

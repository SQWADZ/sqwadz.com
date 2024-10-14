import React from 'react';
import Container from '@/Components/Container';
import RoomTitle from '@/Pages/Room/Partials/RoomTitle';
import { PageProps, User, type Room } from '@/types';
import RoomChat from '@/Pages/Room/Partials/RoomChat';
import { router } from '@inertiajs/react';

interface Props extends PageProps {
  room: Room;
  gamePath: string;
}

const Room: React.FC<Props> = ({ auth, room, gamePath }) => {
  const [members, setMemebers] = React.useState<User[]>([]);

  React.useEffect(() => {
    window.Echo.join(`room.${gamePath}.${room.id}`)
      .here((users: User[]) => {
        setMemebers(users);
      })
      .joining((user: User) => {
        console.log('joining', user);
        setMemebers((prev) => [...prev, user]);
      })
      .leaving((user: User) => {
        console.log('leaving', user);
        setMemebers((prev) => prev.filter((prevUser) => prevUser.provider_id !== user.provider_id));
      })
      .error(() => {
        router.visit(`/games/${gamePath}`);
        // TODO: notification?
      });

    return () => {
      window.Echo.leave(`room.${gamePath}.${room.id}`);
    };
  }, []);

  return (
    <Container className="flex flex-col">
      <div className="flex h-full flex-1 flex-col gap-8">
        <RoomTitle
          room={room}
          gamePath={gamePath}
          isRoomCreator={!!(auth?.user && auth.user.provider_id === room.creatorId)}
        />
        <RoomChat members={members} />
      </div>
    </Container>
  );
};

export default Room;

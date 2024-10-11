import React from 'react';
import Container from '@/Components/Container';
import RoomTitle from '@/Pages/Room/Partials/RoomTitle';
import { PageProps, type Room } from '@/types';
import RoomChat from '@/Pages/Room/Partials/RoomChat';

interface Props extends PageProps {
  room: Room;
  gamePath: string;
}

const Room: React.FC<Props> = ({ auth, room, gamePath }) => {
  return (
    <Container className="flex flex-col">
      <div className="flex h-full flex-1 flex-col gap-8">
        <RoomTitle
          room={room}
          gamePath={gamePath}
          isRoomCreator={!!(auth?.user && auth.user.provider_id === room.creatorId)}
        />
        <RoomChat />
      </div>
    </Container>
  );
};

export default Room;

import React from 'react';
import Container from '@/Components/Container';
import RoomTitle from '@/Pages/Room/Partials/RoomTitle';
import { PageProps, User, type Room, Message } from '@/types';
import RoomChat from '@/Pages/Room/Partials/RoomChat';
import { Head, router } from '@inertiajs/react';
import { useSetMembers, useSetMessages } from '@/state/room';

interface Props extends PageProps {
  room: Room;
  gamePath: string;
  messages: string[];
}

const Room: React.FC<Props> = ({ auth, room, gamePath, messages }) => {
  const setMembers = useSetMembers();
  const setMessages = useSetMessages();

  React.useEffect(() => {
    window.Echo.join(`room.${gamePath}.${room.id}`)
      .here((users: User[]) => {
        setMembers(users);
        setMessages(messages.map((message) => JSON.parse(message)));
      })
      .joining((user: User) => {
        setMembers((prev) => [...prev, user]);
      })
      .leaving((user: User) => {
        setMembers((prev) => prev.filter((prevUser) => prevUser.provider_id !== user.provider_id));
      })
      .error(() => {
        router.visit(`/games/${gamePath}`);
        // TODO: notification?
      })
      .listen('.room.message', (data: { message: Message }) => {
        setMessages((prev) => [...prev, data.message]);
      });

    return () => {
      window.Echo.leave(`room.${gamePath}.${room.id}`);
    };
  }, []);

  return (
    <Container className="flex flex-col">
      <Head title={room.activity} />

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

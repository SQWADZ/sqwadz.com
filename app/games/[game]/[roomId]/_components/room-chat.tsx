'use client';

import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import UserItem from '@/app/games/[game]/[roomId]/_components/user-item';
import { Session } from 'next-auth';
import { socket } from '@/client/socket';
import { Message, RoomMember } from '@/types';
import UserAvatar from '@/components/user-avatar';
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import { useRouter } from 'next/navigation';

dayjs.extend(calendar);

const RoomChat: React.FC<{ session: Session; roomId: number; roomCreatorId: string; game: string }> = ({
  session,
  roomId,
  roomCreatorId,
  game,
}) => {
  const router = useRouter();
  const lastMessageRef = useRef<null | HTMLDivElement>(null);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState('');
  const user: RoomMember = React.useMemo(
    () => ({
      id: session.user.id,
      image: session.user.image,
      name: session.user.name,
    }),
    [session]
  );
  const [roomMembers, setRoomMembers] = React.useState<RoomMember[]>([]);

  const handleAddMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  React.useEffect(() => {
    lastMessageRef?.current?.scrollIntoView(false);
  }, [messages]);

  React.useEffect(() => {
    fetch('/api/rooms/join-room', {
      body: JSON.stringify({ roomId }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(async (resp) => {
      const data = await resp.json();

      if (data.error == 'room_full') {
        // todo: notification why the user was redirected
        router.push(`/games/${game}`);
      }
    });

    const receiveMessage = (message: Message) => handleAddMessage(message);
    const updateRoomMembers = (members: RoomMember[]) => setRoomMembers(members);

    socket.on(`${roomId}:members-changed`, (members: RoomMember[]) => updateRoomMembers(members));

    socket.on(`${roomId}:receive-message`, receiveMessage);

    return () => {
      console.log('cleanup');

      fetch('/api/rooms/leave-room', {
        body: JSON.stringify({ roomId }),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then();

      socket.off(`${roomId}:members-changed`, updateRoomMembers);
      socket.off(`${roomId}:receive-message`, receiveMessage);
    };
  }, [roomId]);

  const handleSendMessage = async (message: Omit<Message, 'createdAt'>) => {
    setInput('');
    fetch('/api/rooms/send-message', {
      body: JSON.stringify({ roomId, message }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then();
  };

  return (
    <div className="flex flex-[1_1_0] flex-col rounded-lg border border-border md:flex-row md:overflow-hidden">
      <div className="flex flex-[0.7_1_0] flex-col justify-between gap-2 overflow-hidden border-r border-border p-4 md:flex-[0.7]">
        <div className="flex items-center justify-between text-muted-foreground">
          <p className="text-xl">Chat</p>
          <div>
            <FontAwesomeIcon icon={faComment} fixedWidth size="lg" />
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-2 overflow-y-auto">
          {messages.map((message, index) => (
            <div
              ref={index === messages.length - 1 ? lastMessageRef : null}
              key={`${message.name}-${message.createdAt}`}
              className="flex w-fit items-center gap-4 rounded-lg p-2"
            >
              <UserAvatar name={message.name} image={message.image} />
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <p>{message.name}</p>
                  <p className="text-xs text-muted-foreground">{dayjs().calendar(message.createdAt)}</p>
                </div>
                <p className="text-sm text-message">{message.contents}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <form
            className="flex-1"
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage({ ...user, contents: input });
            }}
          >
            <Input placeholder="Message..." value={input} onChange={({ target }) => setInput(target.value)} />
          </form>
          <Button size="icon" onClick={() => handleSendMessage({ ...user, contents: input })}>
            <FontAwesomeIcon icon={faPaperPlane} fixedWidth />
          </Button>
        </div>
      </div>
      <div className="flex flex-[0.3] flex-col gap-4 overflow-y-auto p-4">
        <div className="flex items-center justify-between text-muted-foreground">
          <p className="text-xl">Members</p>
          <div>
            <FontAwesomeIcon icon={faUsers} fixedWidth size="lg" />
          </div>
        </div>
        <div className="flex h-full flex-col gap-4 overflow-y-auto">
          {roomMembers.map((member) => (
            <UserItem user={member} key={member.id} roomCreatorId={roomCreatorId} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomChat;

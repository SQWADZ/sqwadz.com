'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import UserItem from '@/app/games/[game]/[roomId]/_components/user-item';
import { Session } from 'next-auth';
import { socket } from '@/client/socket';
import { Message } from '@/types';
import UserAvatar from '@/components/user-avatar';

const RoomChat: React.FC<{ session: Session; roomId: number }> = ({ session, roomId }) => {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState('');
  const user = React.useMemo(
    () => ({
      id: session.user.id,
      image: session.user.image,
      name: session.user.name,
    }),
    [session]
  );

  const handleAddMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  React.useEffect(() => {
    console.log('CONNECT', roomId);
    socket.emit('join_room', roomId);

    const receiveMessage = (message: Message) => handleAddMessage(message);

    socket.on('receive_message', receiveMessage);

    return () => {
      console.log('cleanup');
      socket.emit('leave_room', roomId);
      socket.off('receive_message', receiveMessage);
    };
  }, [roomId]);

  const handleSendMessage = (message: Message) => {
    setInput('');
    console.log(`send message - ${message.contents} - ${roomId}`);
    socket.emit('send_message', roomId, message);
  };

  return (
    <div className="flex flex-1 rounded-lg border border-border">
      <div className="flex flex-[0.7] flex-col justify-between gap-2 border-r border-border p-4">
        <div className="flex items-center justify-between text-muted-foreground">
          <p className="text-xl">Chat</p>
          <div>
            <FontAwesomeIcon icon={faComment} fixedWidth size="lg" />
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-2 overflow-hidden">
          {messages.map((message, index) => (
            <div key={`${message.contents}-${message.name}`} className="flex w-fit items-center gap-4 rounded-lg p-2">
              <UserAvatar name={user.name} image={user.image} />
              <div className="flex flex-col">
                <p className="text-muted-foreground">{message.name}</p>
                <p className="text-sm text-secondary-foreground">{message.contents}</p>
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
          <UserItem session={session} />
          <UserItem session={session} />
          <UserItem session={session} />
          <UserItem session={session} />
        </div>
      </div>
    </div>
  );
};

export default RoomChat;

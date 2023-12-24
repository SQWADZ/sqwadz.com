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

const RoomChat: React.FC<{ session: Session; roomId: number }> = ({ session, roomId }) => {
  const [messages, setMessages] = React.useState<string[]>(['hello', 'pog']);
  const [input, setInput] = React.useState('');

  const handleAddMessage = React.useCallback(
    (message: string) => {
      setMessages((prev) => [...prev, message]);
    },
    [setMessages]
  );

  React.useEffect(() => {
    socket.connect();
    socket.emit('join_room', roomId);

    const receiveMessage = (message: string) => handleAddMessage(message);

    socket.on('receive_message', receiveMessage);

    return () => {
      socket.emit('leave_room', roomId);
      socket.off('receive_message', receiveMessage);
      socket.disconnect();
    };
  }, [roomId, handleAddMessage]);

  const handleSendMessage = React.useCallback(
    (message: string) => {
      setInput('');
      console.log('send', roomId, message);
      socket.emit('send_message', roomId, message);
    },
    [setInput, roomId]
  );

  return (
    <div className="flex flex-1 rounded-lg border border-border">
      <div className="flex flex-[0.7] flex-col justify-between gap-2 border-r border-border p-4">
        <div className="flex items-center justify-between text-muted-foreground">
          <p className="text-xl">Chat</p>
          <div>
            <FontAwesomeIcon icon={faComment} fixedWidth size="lg" />
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-2">
          {messages.map((message, index) => (
            <div key={`${message}-${index}`} className="w-fit rounded-lg border border-border p-2">
              {message}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <form
            className="flex-1"
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(input);
            }}
          >
            <Input placeholder="Message..." value={input} onChange={({ target }) => setInput(target.value)} />
          </form>
          <Button size="icon" onClick={() => handleSendMessage(input)}>
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

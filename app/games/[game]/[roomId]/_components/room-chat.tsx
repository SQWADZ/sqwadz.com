'use client';

import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faComment, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import UserItem from '@/app/games/[game]/[roomId]/_components/user-item';
import { Session } from 'next-auth';
import { Message, RoomMember } from '@/types';
import UserAvatar from '@/components/user-avatar';
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import { useRouter } from 'next/navigation';
import { useSocket } from '@/components/providers/socket-provider';
import { useChatScroll } from '@/client/hooks/useChatScroll';
import { useModal } from '@/components/modals-provider';
import ChatSettingsModal from '@/app/games/[game]/[roomId]/_components/chat-settings-modal';
import { toast } from 'sonner';

dayjs.extend(calendar);

const RoomChat: React.FC<{ session: Session; roomId: number; roomCreatorId: string; game: string }> = ({
  session,
  roomId,
  roomCreatorId,
  game,
}) => {
  const router = useRouter();
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState('');
  const modal = useModal();
  const user: RoomMember = React.useMemo(
    () => ({
      id: session.user.id,
      image: session.user.image,
      name: session.user.name,
    }),
    [session]
  );
  const [roomMembers, setRoomMembers] = React.useState<RoomMember[]>([]);
  const { socket, isConnected } = useSocket();
  const chatRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef(null);
  useChatScroll({
    chatRef,
    bottomRef,
    shouldLoadMore: false,
    loadMore: () => {},
    count: messages.length,
  });

  const handleAddMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  React.useEffect(() => {
    if (!socket || !isConnected) return;

    const receiveMessage = (message: Message) => handleAddMessage(message);
    const updateRoomMembers = (data: { members: RoomMember[]; message: string; isJoin?: boolean }) => {
      setRoomMembers(data.members);

      if (!(localStorage.getItem('sqwadz.enable-notifications') === 'false')) {
        toast(`Member ${data.isJoin ? 'joined' : 'left'} the room`, { description: data.message });
      }
    };

    const handleRoomDelete = () => {
      router.push(`/games/${game}`);

      toast('Room deleted', { description: 'The room you were in has been deleted' });
    };

    fetch('/api/rooms/join-room', {
      body: JSON.stringify({ roomId }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(async (resp) => {
      const data: { error?: string; messages?: Message[] } = await resp.json();

      if (data.error == 'room_full') {
        router.push(`/games/${game}`);
        toast('Room full', { description: 'The room you are trying to join is currently full' });
      }

      if (data.messages) {
        console.log(data.messages);
        setMessages(data.messages);
      }
    });

    socket.on(`${roomId}:members-changed`, updateRoomMembers);
    socket.on(`${roomId}:receive-message`, receiveMessage);
    socket.on(`${roomId}:room-delete`, handleRoomDelete);

    return () => {
      console.log('cleanup');

      socket.removeAllListeners();

      fetch('/api/rooms/leave-room', {
        body: JSON.stringify({ roomId }),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then();
    };
  }, [roomId, socket, isConnected]);

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
        <div className="flex flex-1 flex-col gap-2 overflow-y-auto" ref={chatRef}>
          <>
            {messages.map((message, index) => (
              <div
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
            <div ref={bottomRef} />
          </>
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
          <Button
            size="icon"
            variant="secondary"
            onClick={() => modal.open({ title: 'Settings', children: <ChatSettingsModal />, size: 'lg' })}
          >
            <FontAwesomeIcon icon={faCog} fixedWidth />
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

'use client';

import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faComment, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import UserItem from '@/app/games/[game]/[roomId]/_components/user-item';
import { Session } from 'next-auth';
import { Message, RoomMember, MessageData } from '@/types';
import UserAvatar from '@/components/user-avatar';
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import { useRouter } from 'next/navigation';
import { useSocket } from '@/components/providers/socket-provider';
import { useChatScroll } from '@/client/hooks/useChatScroll';
import { useModal } from '@/components/modals-provider';
import ChatSettingsModal from '@/app/games/[game]/[roomId]/_components/chat-settings-modal';
import { notify } from '@/client/utils';
import RoomPasswordModal from '../../_components/room-password-modal';
import InfiniteScroll from 'react-infinite-scroll-component';

dayjs.extend(calendar);

const RoomChat: React.FC<{ session: Session; roomId: number; roomCreatorId: string; game: string }> = ({
  session,
  roomId,
  roomCreatorId,
  game,
}) => {
  const router = useRouter();
  const [messagesData, setMessagesData] = React.useState<MessageData[]>([]);
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
  const pageRef = useRef(0);
  const { socket, isConnected } = useSocket();
  const chatRef = useRef<HTMLDivElement | null>(null);
  const firstMessageRef = useRef<HTMLDivElement | null>(null);

  async function handleLoadMore() {
    pageRef.current++;

    const resp = await fetch('/api/fetch-messages', {
      body: JSON.stringify({
        page: pageRef.current,
        roomId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'post',
    });

    if (resp.status !== 200) {
      pageRef.current--;
      return;
    }

    const data: MessageData = await resp.json();

    setMessagesData((prevMessagesData) => [...prevMessagesData, data]);
  }

  useChatScroll({
    chatRef,
    shouldLoadMore: messagesData[messagesData.length - 1]?.hasMore,
    loadMore: async () => {},
    count: messagesData[0]?.messages.length || 0,
  });

  const messages = React.useMemo(() => messagesData.flatMap((messageData) => messageData.messages), [messagesData]);

  const handleAddMessage = (newMessage: Message) => {
    setMessagesData((prevMessagesData) => {
      const newMessagesData = [...prevMessagesData];

      newMessagesData[0] = {
        ...newMessagesData[0],
        messages: [newMessage, ...(newMessagesData[0]?.messages || [])],
      };

      return newMessagesData;
    });
  };

  React.useEffect(() => {
    if (!socket || !isConnected) return;

    const receiveMessage = (message: Message) => handleAddMessage(message);

    const updateRoomMembers = (data: { members: RoomMember[]; message: string; isJoin?: boolean }) => {
      setRoomMembers(data.members);

      if (!(localStorage.getItem('sqwadz.enable-notifications') === 'false')) {
        notify({
          message: `Member ${data.isJoin ? 'joined' : 'left'} the room`,
          data: { description: data.message },
          playSound: localStorage.getItem('sqwadz.enable-sound') === 'true',
        });
      }
    };

    const handleRoomDelete = () => {
      router.push(`/games/${game}`);

      notify({ message: 'Room deleted', data: { description: 'The room you were in has been deleted' } });
    };

    const handleBanMember = (data: { targetId: string; reason: string }) => {
      if (data.targetId !== session.user.id) {
        return;
      }

      router.push(`/games/${game}`);
      notify({
        message: `You have been removed from the room`,
        data: { description: data.reason ? `Reason: ${data.reason}` : undefined, duration: 5000 },
      });
    };

    fetch('/api/rooms/join-room', {
      body: JSON.stringify({ roomId }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(async (resp) => {
      const data: { error?: string; messagesData?: MessageData[] } = await resp.json();

      if (data.error === 'room_full') {
        router.push(`/games/${game}`);
        notify({ message: 'Room full', data: { description: 'The room you are trying to join is currently full' } });
      }

      if (data.error === 'banned') {
        router.push(`/games/${game}`);
        notify({
          message: 'Unable to join',
          data: { description: 'You were manually removed from this room and cannot rejoin' },
        });
      }

      if (data.error === 'incorrect_password') {
        router.push(`/games/${game}`);
        modal.open({
          title: 'Enter password',
          description: "The room you're trying to join requires a password",
          children: <RoomPasswordModal roomId={roomId} />,
        });
      }

      if (data.messagesData) {
        setMessagesData(data.messagesData);
      }
    });

    socket.on(`${roomId}:remove-member`, handleBanMember);
    socket.on(`${roomId}:members-changed`, updateRoomMembers);
    socket.on(`${roomId}:receive-message`, receiveMessage);
    socket.on(`${roomId}:room-delete`, handleRoomDelete);

    return () => {
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

  const sortedMembers = React.useMemo(() => {
    const creator = roomMembers.find((member) => member.id === roomCreatorId);
    const otherMembers = roomMembers.filter((member) => member.id !== roomCreatorId);
    return creator ? [creator, ...otherMembers] : otherMembers;
  }, [roomMembers, roomCreatorId]);

  return (
    <div className="flex flex-[0.9_0_0] flex-col rounded-lg border border-border md:flex-row md:overflow-hidden">
      <div className="flex flex-[0.7_0_0] flex-col justify-between gap-2 overflow-hidden border-r border-border p-4 md:flex-[0.7]">
        <div className="flex items-center justify-between text-muted-foreground">
          <p className="text-xl">Chat</p>
          <div>
            <FontAwesomeIcon icon={faComment} fixedWidth size="lg" />
          </div>
        </div>
        <div className="flex h-full flex-col-reverse gap-2 overflow-y-auto" ref={chatRef} id="scrollableDiv">
          <InfiniteScroll
            scrollableTarget="scrollableDiv"
            hasMore={messagesData[messagesData.length - 1]?.hasMore || false}
            inverse={true}
            loader="Loading..."
            dataLength={messages.length}
            next={handleLoadMore}
            style={{ display: 'flex', flexDirection: 'column-reverse' }} // To put endMessage and loader to the top.
          >
            {messages.map((message, index) => (
              <div
                ref={index === 0 ? firstMessageRef : null}
                key={`${message.name}-${message.createdAt}`}
                className="flex w-fit items-center gap-4 rounded-lg p-2"
              >
                <UserAvatar name={message.name} image={message.image} />
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <p>{message.name}</p>
                    <p className="text-xs text-muted-foreground">{dayjs(message.createdAt).calendar()}</p>
                  </div>
                  <p className="text-sm text-message">{message.contents}</p>
                </div>
              </div>
            ))}
          </InfiniteScroll>
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
          {sortedMembers.map((member) => (
            <UserItem user={member} key={member.id} roomCreatorId={roomCreatorId} roomId={roomId} clientId={user.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomChat;

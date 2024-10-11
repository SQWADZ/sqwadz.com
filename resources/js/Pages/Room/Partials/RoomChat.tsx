import React from 'react';
import { MessageCircle, Send, Settings, Users } from 'lucide-react';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { useModal } from '@/Components/ModalsProvider';

const RoomChat: React.FC = () => {
  const [input, setInput] = React.useState('');
  const modal = useModal();

  function handleSendMessage() {}

  return (
    <div className="flex flex-[0.9_0_0] flex-col rounded-lg border border-border md:flex-row md:overflow-hidden">
      <div className="flex flex-[0.7_0_0] flex-col justify-between gap-2 overflow-hidden border-r border-border p-4 md:flex-[0.7]">
        <div className="flex items-center justify-between text-muted-foreground">
          <p className="text-xl">Chat</p>
          <div>
            <MessageCircle />
          </div>
        </div>
        <div className="flex h-full flex-col-reverse gap-2 overflow-y-auto" ref={null} id="scrollableDiv">
          {/*<InfiniteScroll*/}
          {/*    scrollableTarget="scrollableDiv"*/}
          {/*    hasMore={messagesData[messagesData.length - 1]?.hasMore || false}*/}
          {/*    inverse={true}*/}
          {/*    loader="Loading..."*/}
          {/*    dataLength={messages.length}*/}
          {/*    next={handleLoadMore}*/}
          {/*    style={{*/}
          {/*        display: 'flex',*/}
          {/*        flexDirection: 'column-reverse'*/}
          {/*    }} // To put endMessage and loader to the top.*/}
          {/*>*/}
          {/*    {messages.map((message, index) => (*/}
          {/*        <div*/}
          {/*            ref={index === 0 ? firstMessageRef : null}*/}
          {/*            key={`${message.name}-${message.createdAt}`}*/}
          {/*            className="flex w-fit items-center gap-4 rounded-lg p-2"*/}
          {/*        >*/}
          {/*            <UserAvatar name={message.name} image={message.image} />*/}
          {/*            <div className="flex flex-col">*/}
          {/*                <div className="flex items-center gap-2">*/}
          {/*                    <p>{message.name}</p>*/}
          {/*                    <p className="text-xs text-muted-foreground">{dayjs(message.createdAt).calendar()}</p>*/}
          {/*                </div>*/}
          {/*                <p className="text-sm text-message">{message.contents}</p>*/}
          {/*            </div>*/}
          {/*        </div>*/}
          {/*    ))}*/}
          {/*</InfiniteScroll>*/}
        </div>
        <div className="flex items-center gap-2">
          <form
            className="flex-1"
            onSubmit={(e) => {
              e.preventDefault();
              // handleSendMessage({ ...user, contents: input });
            }}
          >
            <Input placeholder="Message..." value={input} onChange={({ target }) => setInput(target.value)} />
          </form>
          <Button size="icon" onClick={() => handleSendMessage()}>
            <Send size={18} />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            onClick={() =>
              modal.open({
                title: 'Settings',
                // children: <ChatSettingsModal />,
                children: '',
                size: 'lg',
              })
            }
          >
            <Settings size={18} />
          </Button>
        </div>
      </div>
      <div className="flex flex-[0.3] flex-col gap-4 overflow-y-auto p-4">
        <div className="flex items-center justify-between text-muted-foreground">
          <p className="text-xl">Members</p>
          <div>
            <Users />
          </div>
        </div>
        <div className="flex h-full flex-col gap-4 overflow-y-auto">
          {/*{sortedMembers.map((member) => (*/}
          {/*    <UserItem user={member} key={member.id} roomCreatorId={roomCreatorId} roomId={roomId}*/}
          {/*              clientId={user.id} />*/}
          {/*))}*/}
        </div>
      </div>
      {/*<audio ref={joinSoundRef} src="/audio/join.mp3" />*/}
      {/*<audio ref={leaveSoundRef} src="/audio/leave.mp3" />*/}
    </div>
  );
};

export default RoomChat;

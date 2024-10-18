import { useModal } from '@/Components/ModalsProvider';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { Button } from '@/Components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/Components/ui/tooltip';
import VerifiedCreatorBadge from '@/Components/VerifiedCreatorBadge';
import { User } from '@/types';
import { Check, CircleMinus, Clipboard } from 'lucide-react';
import React from 'react';

const UserItem: React.FC<{ user: User }> = ({ user }) => {
  const [copied, setCopied] = React.useState(false);
  const [showControls, setShowControls] = React.useState(false);
  const modal = useModal();

  function handleCopyToClipboard(username: string) {}

  return (
    <div
      className="flex items-center justify-between gap-2 rounded-lg py-2"
      // onMouseEnter={() => canShowControls && setShowControls(true)}
      // onMouseLeave={() => canShowControls && setShowControls(false)}
    >
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={user.avatar || undefined} />
          <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <p
        //   className={`${user.id === roomCreatorId ? 'text-primary' : ''}`}
        >
          {user.username}
        </p>
        {user.is_verified_creator ? <VerifiedCreatorBadge /> : null}
      </div>
      <div className="flex items-center gap-2">
        {showControls && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="text-destructive hover:text-destructive"
                onClick={() =>
                  modal.open({
                    title: 'Remove member',
                    description: `Are you sure you want to remove ${user.username}?`,
                    // children: <BanMemberModal targetId={user.id} roomId={roomId} />,
                    children: <></>,
                  })
                }
              >
                <CircleMinus size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Remove</p>
            </TooltipContent>
          </Tooltip>
        )}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="icon" variant="ghost" onClick={() => handleCopyToClipboard(user.username)}>
              {copied ? <Check size={18} /> : <Clipboard size={18} />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>Copy username</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

export default UserItem;

'use client';

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGavel, faPaste, faCheck, faCircleMinus } from '@fortawesome/free-solid-svg-icons';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { RoomMember } from '@/types';
import { useModal } from '@/components/modals-provider';
import BanMemberModal from './ban-member-modal';
import { toast } from 'sonner';

const UserItem: React.FC<{ user: RoomMember; roomCreatorId: string; clientId: string; roomId: number }> = ({
  user,
  roomCreatorId,
  clientId,
  roomId,
}) => {
  const [showControls, setShowControls] = React.useState(false);
  const [clipboardState, setClipboardState] = React.useState<'default' | 'checked'>('default');
  const modal = useModal();

  const canShowControls = React.useMemo(
    () => clientId === roomCreatorId && user.id !== roomCreatorId,
    [clientId, roomCreatorId, user.id]
  );

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success('Copied to clipboard');
      setClipboardState('checked');
      setTimeout(() => setClipboardState('default'), 2000); // Change back after 2 seconds
    });
  };

  return (
    <div
      className="flex items-center justify-between gap-2 rounded-lg py-2"
      onMouseEnter={() => canShowControls && setShowControls(true)}
      onMouseLeave={() => canShowControls && setShowControls(false)}
    >
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={user?.image || undefined} />
          <AvatarFallback>{user.name?.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <p className={`${user.id === roomCreatorId ? 'text-primary' : ''}`}>{user.name}</p>
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
                    description: `Are you sure you want to remove ${user.name}?`,
                    children: <BanMemberModal targetId={user.id} roomId={roomId} />,
                  })
                }
              >
                <FontAwesomeIcon icon={faCircleMinus} fixedWidth size="lg" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Remove</p>
            </TooltipContent>
          </Tooltip>
        )}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="icon" variant="ghost" onClick={() => user.name && handleCopyToClipboard(user.name)}>
              <FontAwesomeIcon icon={clipboardState === 'default' ? faPaste : faCheck} fixedWidth />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Copy username</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

export default UserItem;

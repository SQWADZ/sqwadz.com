'use client';

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown, faGavel, faUserMinus } from '@fortawesome/free-solid-svg-icons';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { RoomMember } from '@/types';
import { useModal } from '@/components/modals-provider';
import BanKickMemberModal from './ban-kick-member-modal';
import { toast } from 'sonner';

const UserItem: React.FC<{ user: RoomMember; roomCreatorId: string; clientId: string; roomId: number }> = ({
  user,
  roomCreatorId,
  clientId,
  roomId,
}) => {
  const [showControls, setShowControls] = React.useState(false);
  const modal = useModal();

  const canShowControls = React.useMemo(
    () => clientId === roomCreatorId && user.id !== roomCreatorId,
    [clientId, roomCreatorId, user.id]
  );

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success('Copied to clipboard');
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
        <p onClick={() => user.name && handleCopyToClipboard(user.name)} className="cursor-pointer">
          {user.name}
        </p>
        {user.id === roomCreatorId && <FontAwesomeIcon icon={faCrown} fixedWidth className="text-primary" />}
      </div>
      {showControls && (
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="text-destructive hover:text-destructive"
                onClick={() =>
                  modal.open({
                    title: 'Kick member',
                    children: <BanKickMemberModal targetId={user.id} roomId={roomId} type="kick" />,
                    description: `Are you sure you want to kick ${user.name}?`,
                  })
                }
              >
                <FontAwesomeIcon icon={faUserMinus} fixedWidth size="lg" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Kick</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="text-destructive hover:text-destructive"
                onClick={() =>
                  modal.open({
                    title: 'Ban member',
                    description: `Are you sure you want to ban ${user.name}?`,
                    children: <BanKickMemberModal targetId={user.id} roomId={roomId} type="ban" />,
                  })
                }
              >
                <FontAwesomeIcon icon={faGavel} fixedWidth size="lg" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Ban</p>
            </TooltipContent>
          </Tooltip>
        </div>
      )}
    </div>
  );
};

export default UserItem;

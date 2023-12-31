'use client';

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGavel, faUserMinus } from '@fortawesome/free-solid-svg-icons';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { RoomMember } from '@/types';

const UserItem: React.FC<{ user: RoomMember }> = ({ user }) => {
  const [showControls, setShowControls] = React.useState(false);

  return (
    <div
      className="flex items-center justify-between gap-2 rounded-lg py-2"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={user?.image || undefined} />
          <AvatarFallback>{user.name?.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <p>{user.name}</p>
      </div>
      {showControls && (
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" variant="ghost" className="text-destructive hover:text-destructive">
                <FontAwesomeIcon icon={faUserMinus} fixedWidth size="lg" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Kick</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" variant="ghost" className="text-destructive hover:text-destructive">
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

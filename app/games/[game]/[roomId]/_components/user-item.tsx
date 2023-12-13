'use client';

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGavel, faUserMinus } from '@fortawesome/free-solid-svg-icons';
import { Session } from 'next-auth';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const UserItem: React.FC<{ session: Session }> = ({ session }) => {
  const [showControls, setShowControls] = React.useState(false);

  return (
    <div
      className="flex items-center justify-between gap-2 rounded-lg p-4 hover:bg-muted"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={session.user?.image || undefined} />
          <AvatarFallback>{session.user.name?.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <p>{session.user.name}</p>
      </div>
      {showControls && (
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" variant="secondary" className="text-destructive">
                <FontAwesomeIcon icon={faUserMinus} fixedWidth size="lg" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Kick</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" variant="secondary" className="text-destructive">
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

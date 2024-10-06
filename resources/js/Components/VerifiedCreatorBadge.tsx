import React from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { CircleCheck } from 'lucide-react';

const VerifiedCreatorBadge: React.FC = () => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <CircleCheck size={18} />
      </TooltipTrigger>
      <TooltipContent>Verified creator</TooltipContent>
    </Tooltip>
  );
};

export default VerifiedCreatorBadge;

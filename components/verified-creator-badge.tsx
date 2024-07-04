import React from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';

const VerifiedCreatorBadge: React.FC = () => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <FontAwesomeIcon icon={faCircleCheck} fixedWidth />
      </TooltipTrigger>
      <TooltipContent>Verified creator</TooltipContent>
    </Tooltip>
  );
};

export default VerifiedCreatorBadge;

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';

const UserAvatar: React.FC<{ name?: string | null; image?: string | null }> = ({ name, image }) => {
  return (
    <Avatar>
      <AvatarImage src={image || undefined} />
      <AvatarFallback>{name?.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;

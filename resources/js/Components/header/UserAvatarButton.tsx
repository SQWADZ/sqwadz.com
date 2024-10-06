import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Link, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import { LogOut, Settings } from 'lucide-react';

const UserAvatarButton: React.FC = () => {
  const page = usePage();
  const { auth } = page.props as PageProps;

  if (!auth) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="h-9 w-9">
          <AvatarImage src={auth.user.avatar} />
          <AvatarFallback>{auth.user.username.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="text-muted-foreground">{auth.user.username}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-2" asChild>
          <a href="/settings">
            <Settings size={18} />
            Settings
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2" asChild>
          <Link href={route('logout')}>
            <LogOut size={18} />
            Sign out
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatarButton;

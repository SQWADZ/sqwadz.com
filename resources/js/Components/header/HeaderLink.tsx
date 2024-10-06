import React from 'react';
import { Link } from '@inertiajs/react';
import { cn } from '@/lib/utils';

interface Props {
  isActive: boolean;
  label: string;
  path: string;
}

const HeaderLink: React.FC<Props> = ({ isActive, label, path }) => {
  return (
    <Link
      href={route(path)}
      className={cn(
        'flex items-center gap-2 text-muted-foreground',
        isActive ? 'text-primary' : 'hover:text-foreground'
      )}
    >
      {label}
    </Link>
  );
};

export default React.memo(HeaderLink);

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const HeaderLink: React.FC<{ path: string; label: string }> = ({ path, label }) => {
  const pathname = usePathname();

  console.log(pathname);

  return (
    <div
      className={cn(
        'flex gap-2 text-muted-foreground hover:text-secondary-foreground',
        pathname.includes(path) && 'text-secondary-foreground'
      )}
    >
      <Link href={path}>{label}</Link>
    </div>
  );
};

export default HeaderLink;

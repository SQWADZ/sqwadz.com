import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMugHot } from '@fortawesome/free-solid-svg-icons';
import { cn } from '@/lib/utils';

const KofiLink: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <Link href="https://ko-fi.com/sqwadz" target="_blank" className={cn(className)}>
      <div className="flex items-center gap-2 rounded-lg bg-destructive p-2 px-4 text-sm text-destructive-foreground">
        <FontAwesomeIcon icon={faMugHot} fixedWidth />
        Buy us a coffee
      </div>
    </Link>
  );
};

export default KofiLink;

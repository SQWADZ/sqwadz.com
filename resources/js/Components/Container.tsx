import React from 'react';
import { cn } from '@/lib/utils';

const Container: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  return <div className={cn('mx-auto min-h-screen w-full max-w-7xl flex-1 p-4', className)}>{children}</div>;
};

export default Container;

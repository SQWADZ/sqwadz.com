import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const SkeletonGameCard: React.FC = () => {
  const arr = Array.from(Array(9).keys());

  return (
    <>
      {arr.map((_, index) => (
        <div key={index} className="flex w-full flex-col gap-2">
          <Skeleton className="h-[150px]" />
          <Skeleton className="h-[24px] w-[175px]" />
          <Skeleton className="h-[20px] w-[50px]" />
        </div>
      ))}
    </>
  );
};

export default SkeletonGameCard;

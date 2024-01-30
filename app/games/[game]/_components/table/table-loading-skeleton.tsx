import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const TableLoadingSkeleton: React.FC = () => {
  return (
    <table className="w-full table-fixed border-separate border-spacing-0 rounded-lg border">
      <thead className="border-separate border-b border-border">
        <tr>
          <th className="border-b border-border p-2 text-sm text-muted-foreground">Activity</th>
          <th className="border-b border-border p-2 text-sm text-muted-foreground">Created</th>
          <th className="border-b border-border p-2 text-sm text-muted-foreground">Slots</th>
          <th className="border-b border-border p-2 text-sm text-muted-foreground"></th>
          <th className="border-b border-border p-2 text-sm text-muted-foreground"></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colSpan={5}>
            <Skeleton className="h-[72px] w-full rounded-none" />
            <Skeleton className="h-[72px] w-full rounded-none" />
            <Skeleton className="h-[72px] w-full rounded-none" />
            <Skeleton className="h-[72px] w-full rounded-none" />
            <Skeleton className="h-[72px] w-full rounded-none" />
            <Skeleton className="h-[72px] w-full rounded-none" />
            <Skeleton className="h-[72px] w-full rounded-none" />
            <Skeleton className="h-[72px] w-full rounded-none" />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default TableLoadingSkeleton;

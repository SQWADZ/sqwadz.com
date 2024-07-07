'use client';

import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const GamesSort: React.FC = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [sort, setSort] = React.useState(searchParams?.get('sort') || 'alphabet');

  function handleSort(value: string) {
    const params = new URLSearchParams(searchParams || '');

    setSort(value);
    params.set('sort', value);

    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex items-center gap-2 self-end">
      <Label>Sort by</Label>
      <Select value={sort} onValueChange={(value) => handleSort(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="alphabet">Alphabet (Desc)</SelectItem>
          <SelectItem value="rooms">Rooms (Desc)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default GamesSort;

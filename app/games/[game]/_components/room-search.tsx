'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

const RoomSearch: React.FC = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    term ? params.set('query', term) : params.delete('query');

    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <Input
      placeholder="Search..."
      onChange={(e) => handleSearch(e.target.value)}
      defaultValue={searchParams.get('query')?.toString()}
    />
  );
};

export default RoomSearch;

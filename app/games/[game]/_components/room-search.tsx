'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { faLock, faSearch } from '@fortawesome/free-solid-svg-icons';

const RoomSearch: React.FC = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams || undefined);
    term ? params.set('query', term) : params.delete('query');
    params.delete('page');

    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <Input
      placeholder="Search..."
      startIcon={faSearch}
      onChange={(e) => handleSearch(e.target.value)}
      defaultValue={searchParams?.get('query')?.toString()}
      className="w-full self-start md:w-[300px]"
    />
  );
};

export default RoomSearch;

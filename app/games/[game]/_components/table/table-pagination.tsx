'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Room } from './rooms-table';

const PAGE_SIZE = 8;

interface Props {
  totalPages: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  rooms: Room[];
}

const TablePagination: React.FC<Props> = ({ page, setPage, rooms, totalPages }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleChangePage = (page: number) => {
    const params = new URLSearchParams(searchParams || undefined);
    params.set('page', page.toString());

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-end gap-2">
      <Button
        size="icon"
        disabled={page === 0}
        variant="secondary"
        onClick={() => {
          setPage((prev) => {
            const page = --prev;

            if (page < 0) return 0;

            handleChangePage(page);

            return page;
          });
        }}
      >
        <FontAwesomeIcon icon={faChevronLeft} fixedWidth />
      </Button>
      <p>
        Page {page + 1} of {totalPages}
      </p>
      <Button
        size="icon"
        variant="secondary"
        disabled={page === totalPages - 1}
        onClick={() => {
          setPage((prev) => {
            const page = ++prev;
            handleChangePage(page);

            return page;
          });
        }}
      >
        <FontAwesomeIcon icon={faChevronRight} fixedWidth />
      </Button>
    </div>
  );
};

export default TablePagination;

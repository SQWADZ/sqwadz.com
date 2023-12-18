'use client';

import React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import dayjs from 'dayjs';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Session } from 'next-auth';
import relativeTime from 'dayjs/plugin/relativeTime';
import JoinRoomButton from '@/app/games/[game]/_components/join-room-button';

dayjs.extend(relativeTime);

type Room = {
  id: number;
  activity: string;
  slots: number;
  createdAt: Date;
};

interface Props {
  rooms: Room[];
  game: string;
  session: Session | null;
}

const PAGE_SIZE = 8;

const columnHelper = createColumnHelper<Room>();

const RoomsTable: React.FC<Props> = (props) => {
  const columns = React.useMemo(
    () => [
      columnHelper.accessor('id', {}),
      columnHelper.accessor('activity', {
        cell: (info) => info.getValue(),
        header: 'Activity',
      }),
      columnHelper.accessor('createdAt', {
        header: 'Created',
        cell: (info) => dayjs(info.getValue() as Date).fromNow(),
      }),
      columnHelper.accessor('slots', {
        cell: (info) => `0/${info.getValue()}`,
        header: 'Slots',
      }),
      columnHelper.display({
        id: 'join-room',
        cell: (tableProps) => (
          <JoinRoomButton roomId={tableProps.row.getValue('id')} game={props.game} session={props.session} />
        ),
      }),
    ],
    [props]
  );

  const [page, setPage] = React.useState(0);

  const table = useReactTable<Room>({
    data: props.rooms,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination: {
        pageSize: PAGE_SIZE,
        pageIndex: page,
      },
    },
    initialState: {
      columnVisibility: {
        id: false,
      },
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <table className="w-full table-fixed border-separate border-spacing-0 rounded-lg border">
        <thead className="border-separate border-b border-border">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="border-b border-border p-2 text-sm text-muted-foreground">
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td className="truncate p-4 text-center" key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {page * PAGE_SIZE + 1}-{props.rooms.slice(0, page * PAGE_SIZE + PAGE_SIZE).length}/
          {props.rooms.length} results.
        </p>
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="secondary"
            onClick={() => table.getCanPreviousPage() && setPage((prev) => --prev)}
            disabled={!table.getCanPreviousPage()}
          >
            <FontAwesomeIcon icon={faChevronLeft} fixedWidth />
          </Button>
          <p>
            Page {page + 1} of {table.getPageCount()}
          </p>
          <Button
            size="icon"
            variant="secondary"
            onClick={() => table.getCanNextPage() && setPage((prev) => ++prev)}
            disabled={!table.getCanNextPage()}
          >
            <FontAwesomeIcon icon={faChevronRight} fixedWidth />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoomsTable;

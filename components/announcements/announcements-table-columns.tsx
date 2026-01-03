'use client'

import { Button } from '@/components/ui/button'
import type { AnnouncementList } from '@/types/vetool'
import type { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'

export const announcementsTableColumns: ColumnDef<AnnouncementList>[] = [
  {
    accessorKey: 'announcement_title',
    header: '제목',
    cell: ({ row }) => {
      const title = row.original.announcement_title

      return (
        <div className="flex justify-center">
          <Button
            asChild
            variant="ghost"
            size="default"
            className="max-w-[200px] justify-start font-medium transition-colors hover:bg-transparent hover:text-primary hover:underline sm:max-w-none"
          >
            <Link
              href={`/announcements/${row.original.announcement_id}`}
              className="truncate"
            >
              {title}
            </Link>
          </Button>
        </div>
      )
    },
  },
  {
    accessorKey: 'created_at',
    header: '작성일',
    cell: ({ row }) => {
      const createdAt = row.original.created_at
      return (
        <div className="flex justify-center">
          <span className="w-16 shrink-0 text-xs sm:w-20 sm:text-sm">
            {createdAt.slice(2, 10)}
          </span>
        </div>
      )
    },
  },
]

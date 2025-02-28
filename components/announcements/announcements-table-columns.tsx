import { Button } from '@/components/ui/button'
import { SIDEBAR_ITEMS } from '@/constants/hospital/sidebar-items'
import { type AnnouncementListProps } from '@/types/vetool'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { useRouter } from 'next/navigation'

export const announcementsTableColumns: ColumnDef<AnnouncementListProps>[] = [
  {
    accessorKey: 'announcement_category',
    header: '카테고리',

    cell: ({ row }) => {
      const category = row.getValue('announcement_category') as string
      const foundCategory = SIDEBAR_ITEMS.find((item) => item.path === category)
      return (
        <span className="text-xs text-muted-foreground">
          {foundCategory?.name ?? '전체'}
        </span>
      )
    },
  },
  {
    accessorKey: 'announcement_title',
    header: '제목',
    cell: ({ row }) => {
      const title = row.getValue('announcement_title') as string
      const { push } = useRouter()

      return (
        <Button
          variant="ghost"
          className="w-full font-medium transition-colors hover:bg-transparent hover:text-primary hover:underline"
          onClick={() => push(`/announcements/${row.original.announcement_id}`)}
        >
          {title}
        </Button>
      )
    },
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          작성일
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const createdAt = row.getValue('created_at') as string
      return (
        <span className="text-[10px] text-muted-foreground md:text-sm">
          <span className="hidden text-sm md:inline">
            {createdAt.slice(0, 10)}
          </span>
          <span className="inline text-[10px] md:hidden">
            {createdAt.slice(2, 10)}
          </span>
        </span>
      )
    },
  },
]

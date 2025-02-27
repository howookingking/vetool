import { TableCell, TableRow } from '@/components/ui/table'
import { SIDEBAR_ITEMS } from '@/constants/hospital/sidebar-items'
import useIsMobile from '@/hooks/use-is-mobile'
import { cn } from '@/lib/utils/utils'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type Props = {
  id: string
  category: string
  title: string
  createdAt: string
  isDraft: boolean
}

export default function AnnouncementItem({
  id,
  category,
  title,
  createdAt,
  isDraft,
}: Props) {
  const { push } = useRouter()

  const isMobile = useIsMobile()

  const foundCategory = SIDEBAR_ITEMS.find((item) => item.path === category)

  return (
    <TableRow
      className={cn(
        'group cursor-pointer border-b border-gray-100 text-center transition-colors',
        isDraft && 'hidden',
      )}
      onClick={() => push(`/announcements/${id}`)}
    >
      {/* 카테고리 */}
      <TableCell className="py-4">
        <span className="text-xs text-muted-foreground">
          {foundCategory?.name ?? '전체'}
        </span>
      </TableCell>

      {/* 제목 */}
      <TableCell>
        <span className="font-medium text-gray-900 transition-colors hover:underline group-hover:text-primary">
          {title}
        </span>
      </TableCell>

      {/* 작성일 */}
      <TableCell className="text-[10px] text-muted-foreground md:text-sm">
        {isMobile ? createdAt.slice(2, 10) : createdAt.slice(0, 10)}
      </TableCell>
    </TableRow>
  )
}

import { TableCell, TableRow } from '@/components/ui/table'
import { SIDEBAR_ITEMS } from '@/constants/hospital/sidebar-items'
import useIsMobile from '@/hooks/use-is-mobile'
import Link from 'next/link'

export default function PatchItem({
  id,
  category,
  title,
  createdAt,
}: {
  id: string
  category: string
  title: string
  createdAt: string
}) {
  const foundCategory = SIDEBAR_ITEMS.find((item) => item.path === category)
  const isMobile = useIsMobile()

  return (
    <TableRow className="hover:bg-muted/50">
      {/* 카테고리 */}
      <TableCell className="flex flex-col items-center gap-2 pl-2 md:flex-row md:pl-8">
        {foundCategory?.icon}
        {
          <span className="text-xs text-muted-foreground">
            {foundCategory?.name ?? '전체'}
          </span>
        }
      </TableCell>

      {/* 제목 */}
      <TableCell className="max-w-[200px] overflow-hidden truncate text-center hover:underline">
        <Link href={`patches/${id}`}>{title}</Link>
      </TableCell>

      {/* 작성일 */}
      <TableCell className="pr-2 text-right text-[10px] text-muted-foreground md:pr-8 md:text-sm">
        {isMobile ? createdAt.slice(2, 10) : createdAt.slice(0, 10)}
      </TableCell>
    </TableRow>
  )
}

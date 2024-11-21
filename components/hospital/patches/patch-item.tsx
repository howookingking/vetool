import { TableCell, TableRow } from '@/components/ui/table'
import { SIDEBAR_ITEMS } from '@/constants/hospital/sidebar-items'
import {
  Home,
  Syringe,
  Slice,
  HeartPulse,
  ListChecks,
  BarChart4,
  PawPrint,
  Building,
  Monitor,
} from 'lucide-react'
import Link from 'next/link'

const ICON_MAPPER = {
  Home: <Home size={18} />,
  Syringe: <Syringe size={18} />,
  Slice: <Slice size={18} />,
  HeartPulse: <HeartPulse size={18} />,
  ListChecks: <ListChecks size={18} />,
  BarChart4: <BarChart4 size={18} />,
  PawPrint: <PawPrint size={18} />,
  Building: <Building size={18} />,
  Monitor: <Monitor size={18} />,
}

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

  return (
    <TableRow className="hover:bg-muted/50">
      {/* 카테고리 */}
      <TableCell className="flex flex-col items-start gap-2 pl-2 sm:flex-row sm:items-center sm:pl-8">
        {
          ICON_MAPPER[
            (foundCategory?.iconName as keyof typeof ICON_MAPPER) ?? 'Monitor'
          ]
        }
        {
          <span className="text-xs text-muted-foreground">
            {foundCategory?.name ?? '전체'}
          </span>
        }
      </TableCell>

      {/* 제목 */}
      <TableCell className="max-w-[240px] overflow-hidden truncate text-center hover:underline">
        <Link href={`patches/${id}`}>{title}</Link>
      </TableCell>

      {/* 작성일 */}
      <TableCell className="pr-2 text-right text-[10px] text-muted-foreground sm:pr-8 sm:text-sm">
        {createdAt.slice(0, 10)}
      </TableCell>
    </TableRow>
  )
}

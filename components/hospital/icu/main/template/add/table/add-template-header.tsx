import { Button } from '@/components/ui/button'
import { TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils/utils'
import { ArrowUpDown } from 'lucide-react'
import { ReactNode } from 'react'

export default function AddTemplateHeader({
  isSorting,
  onClick,
  children,
}: {
  isSorting: boolean
  onClick: () => Promise<void>
  children: ReactNode
}) {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="relative flex items-center justify-center gap-2 text-center">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              'absolute left-1',
              isSorting && 'animate-pulse text-primary',
            )}
            onClick={onClick}
          >
            {/* TODO: 순서 변경 논의 필요 */}
            <ArrowUpDown size={18} />
          </Button>
          <span>오더 목록</span>
          {children}
        </TableHead>
      </TableRow>
    </TableHeader>
  )
}

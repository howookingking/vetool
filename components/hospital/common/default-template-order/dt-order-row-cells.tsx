import { Input } from '@/components/ui/input'
import { TableCell } from '@/components/ui/table'
import { TIMES } from '@/constants/hospital/icu/chart/time'
import { cn } from '@/lib/utils/utils'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'

export default function DtOrderRowCells() {
  const {
    basicHosData: { timeGuidelineData },
  } = useBasicHosDataContext()

  return (
    <>
      {TIMES.map((time) => {
        const isGuidelineTime = timeGuidelineData.includes(time)
        return (
          <TableCell className="handle group p-0" key={time}>
            <Input
              disabled
              className={cn(
                isGuidelineTime && 'bg-amber-300/10',
                'h-11 rounded-none border-none',
              )}
              aria-label="처치 결과 입력"
            />
          </TableCell>
        )
      })}
    </>
  )
}

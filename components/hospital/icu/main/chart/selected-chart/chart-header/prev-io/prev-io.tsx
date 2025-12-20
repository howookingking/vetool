'use client'

import PulsingDot from '@/components/hospital/common/pulsing-dot'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Spinner } from '@/components/ui/spinner'
import {
  getIoHistories,
  type IoHistory,
} from '@/lib/services/icu/chart/get-icu-chart'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type Props = {
  patientId: string
  hosId: string
  targetDate: string
}

export default function PrevIo({ patientId, hosId, targetDate }: Props) {
  const { push } = useRouter()

  const [ioHistories, setIoHistories] = useState<IoHistory[]>([])
  const [isFetching, setIsFetching] = useState(false)

  const handleOpenChange = async (open: boolean) => {
    if (open) {
      setIsFetching(true)

      const res = await getIoHistories(patientId)
      setIoHistories(res)

      setIsFetching(false)
    }
  }

  const handleMove = (inDate: string) => {
    requestAnimationFrame(() =>
      push(`/hospital/${hosId}/icu/${inDate}/chart/${patientId}`),
    )
  }

  const currentHistoryValue = ioHistories.find(
    (history) =>
      targetDate >= history.in_date &&
      (!history.out_date || targetDate <= history.out_date),
  )?.in_date

  return (
    <Select
      onValueChange={handleMove}
      onOpenChange={handleOpenChange}
      value={currentHistoryValue}
    >
      <SelectTrigger className="absolute left-2 top-1.5 hidden w-[200px] font-mono text-xs 2xl:flex">
        <SelectValue placeholder="입원 기록" />
      </SelectTrigger>

      <SelectContent>
        {isFetching ? (
          <div className="flex items-center justify-center p-4">
            <Spinner />
          </div>
        ) : (
          <SelectGroup>
            {ioHistories.map((history) => (
              <SelectItem
                key={history.in_date}
                value={history.in_date}
                className="cursor-pointer font-mono text-xs"
              >
                <div className="flex items-center gap-2">
                  <div>{format(history.in_date, 'yy.MM.dd')}</div>
                  <div>-</div>
                  {history.out_date ? (
                    <div>{format(history.out_date, 'yy.MM.dd')}</div>
                  ) : (
                    <div className="relative flex items-center">
                      입원 중
                      <PulsingDot className="-right-4 top-1" />
                    </div>
                  )}
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        )}
      </SelectContent>
    </Select>
  )
}

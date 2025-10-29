'use client'

import SummaryTableRow from '@/components/hospital/icu/main/summary/table/summary-table-row'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { TIMES } from '@/constants/hospital/icu/chart/time'
import { useCurrentTime } from '@/hooks/use-current-time'
import type { SummaryData } from '@/types/icu/summary'
import { isToday } from 'date-fns'
import { CurrentTimeIndicator } from '../../chart/selected-chart/chart-body/table/chart-table-header/current-time-indicator'

type Props = {
  summaryData: SummaryData[]
  targetDate: string
  hosId: string
}

export default function SummaryTable({
  summaryData,
  targetDate,
  hosId,
}: Props) {
  // 필터 적용 일단 비활성화
  // const [patientFilter, setPatientFilter] = useState(DEFAULT_FILTER_STATE)

  // useEffect(() => {
  //   const storagePatientFilter = localStorage.getItem('patientFilter')
  //   if (storagePatientFilter) {
  //     setPatientFilter(JSON.parse(storagePatientFilter))
  //   }

  //   const handleStorageChange = () => {
  //     const newValue = localStorage.getItem('patientFilter')
  //     if (newValue) {
  //       setPatientFilter(JSON.parse(newValue))
  //     }
  //   }

  //   window.addEventListener('localStorageChange', handleStorageChange)

  //   return () => {
  //     window.removeEventListener('localStorageChange', handleStorageChange)
  //   }
  // }, [])

  // const { filteredSummaryData, hasData } = filterSummaryData({
  //   summaryData,
  //   patientFilter,
  //   vetsListData,
  // })

  const { hours, minutes } = useCurrentTime()
  const isTargetDateToday = isToday(targetDate)

  return (
    <Table className="border bg-white shadow">
      <TableHeader className="sticky -top-[2px] z-30 overflow-hidden bg-white shadow-sm">
        <TableRow>
          <TableHead className="w-[160px] text-center">환자 \ 시간</TableHead>
          {TIMES.map((time) => {
            const shouldShowIndicator = time === hours && isTargetDateToday
            return (
              <TableHead
                className="relative border border-t-0 text-center"
                key={time}
              >
                {time.toString().padStart(2, '0')}
                {shouldShowIndicator && (
                  <CurrentTimeIndicator minutes={minutes} />
                )}
              </TableHead>
            )
          })}
        </TableRow>
      </TableHeader>

      <TableBody>
        {summaryData.map((summary) => (
          <SummaryTableRow
            key={summary.icu_chart_id}
            summary={summary}
            targetDate={targetDate}
            hosId={hosId}
          />
        ))}
      </TableBody>
    </Table>
  )
}

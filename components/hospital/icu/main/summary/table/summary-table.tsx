'use client'

import NoResultSquirrel from '@/components/common/no-result-squirrel'
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
import { formatDate } from '@/lib/utils/utils'
import type { SummaryData } from '@/types/icu/summary'
import { useParams } from 'next/navigation'
import { CurrentTimeIndicator } from '../../chart/selected-chart/chart-body/table/chart-table-header/current-time-indicator'

export default function SummaryTable({
  summaryData,
}: {
  summaryData: SummaryData[]
}) {
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
  const { target_date } = useParams()
  const isToday = formatDate(new Date()) === target_date

  if (summaryData.length === 0) {
    return (
      <NoResultSquirrel
        text="입원 환자가 존재하지 않습니다"
        className="h-screen"
        size="lg"
      />
    )
  }

  return (
    <Table className="border border-l-0">
      <TableHeader className="sticky top-0 z-30 bg-white shadow-sm">
        <TableRow>
          <TableHead className="w-[160px] text-center">환자목록</TableHead>

          {TIMES.map((time) => {
            const shouldShowIndicator = time === hours && isToday
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
          <SummaryTableRow key={summary.icu_chart_id} summary={summary} />
        ))}
      </TableBody>
    </Table>
  )
}

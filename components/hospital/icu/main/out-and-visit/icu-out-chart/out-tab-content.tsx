'use client'

import DataTable from '@/components/ui/data-table'
import { OutDuePatientsData } from '@/lib/services/icu/out-and-visit/icu-out-chart'
import { outDueColumns } from '../icu-out-chart/out-due-columns'

export default function OutTabContent({
  outDuePatients,
}: {
  outDuePatients: OutDuePatientsData[]
}) {
  const sortedOutDuePatients = outDuePatients.sort((a, b) => {
    const aDate = new Date(a.out_chart?.created_at!)
    const bDate = new Date(b.out_chart?.created_at!)
    return bDate.getTime() - aDate.getTime()
  })

  return (
    <DataTable
      columns={outDueColumns}
      data={sortedOutDuePatients}
      noResultText="퇴원예정 환자가 없습니다"
    />
  )
}

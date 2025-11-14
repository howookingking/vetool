'use client'

import DataTable from '@/components/ui/data-table'
import { OutDuePatientsData } from '@/lib/services/icu/out-and-visit/icu-out-chart'
import { outDueColumns } from '../icu-out-chart/out-due-columns'

export default function OutTabContent({
  outDuePatients,
}: {
  outDuePatients: OutDuePatientsData[]
}) {
  return (
    <DataTable
      columns={outDueColumns}
      data={outDuePatients}
      noResultText="퇴원예정 환자가 없습니다"
    />
  )
}

'use client'

import { selectHosColumns } from '@/components/on-boarding/select-hospital/select-hos-columns'
import DataTable from '@/components/ui/data-table'
import { SelectHosDataTable } from '@/lib/services/on-boarding/on-boarding'

export default function HospitalsTable({
  hospitalsData,
}: {
  hospitalsData: SelectHosDataTable[]
}) {
  return (
    <DataTable
      columns={selectHosColumns}
      data={hospitalsData}
      searchPlaceHolder="병원을 검색해주세요"
      rowLength={8}
    />
  )
}

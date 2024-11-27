'use client'

import DataTable from '@/components/ui/data-table'
import type { AdminDietData } from '@/types/adimin'
import { dietColumns } from './diet-columns'

export default function DietDataTable({
  dietData,
  hosId,
}: {
  dietData: AdminDietData[]
  hosId: string
}) {
  return (
    <DataTable
      data={dietData}
      columns={dietColumns(hosId)}
      searchPlaceHolder="사료명, 제조사, 설명으로 검색"
    />
  )
}

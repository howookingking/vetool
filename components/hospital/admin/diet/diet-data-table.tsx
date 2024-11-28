'use client'

import DataTable from '@/components/ui/data-table'
import type { AdminDietData } from '@/types/adimin'
import AddDietDialog from './add-diet-dialog'
import { dietColumns } from './diet-columns'

export default function DietDataTable({
  dietData,
  hosId,
  pinnedDietsIds,
}: {
  dietData: AdminDietData[]
  pinnedDietsIds: string[]
  hosId: string
}) {
  const vetoolDiets = dietData.filter(
    (diet) => diet.hos_id.hos_id === '00fd3b03-9f70-40f2-bfb5-f2e34eb44ae5',
  )
  const myHosDiets = dietData
    .filter(
      (diet) =>
        diet.hos_id.hos_id === hosId || pinnedDietsIds.includes(diet.diet_id),
    )
    .sort((a, b) => {
      if (a.hos_id.hos_id === hosId && b.hos_id.hos_id !== hosId) return -1
      if (a.hos_id.hos_id !== hosId && b.hos_id.hos_id === hosId) return 1
      return 0
    })

  return (
    <>
      <div className="">
        <h4 className="mb-1 text-lg font-bold">벳툴 등록 사료</h4>

        <DataTable
          data={vetoolDiets}
          columns={dietColumns({ hosId, pinnedDietsIds })}
          searchPlaceHolder="사료명, 제조사, 설명으로 검색"
          rowLength={6}
        />
      </div>

      <div>
        <div className="mb-1 flex items-center gap-2">
          <h4 className="text-lg font-bold">병원 사료</h4>
          <AddDietDialog />
        </div>

        <DataTable
          data={myHosDiets}
          columns={dietColumns({ hosId, pinnedDietsIds, isMine: true })}
          searchPlaceHolder="사료명, 제조사, 설명으로 검색"
          rowLength={6}
        />
      </div>
    </>
  )
}

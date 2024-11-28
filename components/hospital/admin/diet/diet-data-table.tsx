'use client'

import DataTable from '@/components/ui/data-table'
import type { AdminDietData } from '@/types/adimin'
import AddDietDialog from './add-diet-dialog'
import { dietColumns } from './diet-columns'
import { Separator } from '@/components/ui/separator'

export default function DietDataTable({
  dietsData,
  hosId,
  pinnedDiets,
  hosName,
}: {
  dietsData: AdminDietData[]
  pinnedDiets: { created_at: string; diet_id: string; hos_id: string }[]
  hosId: string
  hosName: string
}) {
  const vetoolDiets = dietsData.filter(
    (diet) => diet.hos_id.hos_id === '00fd3b03-9f70-40f2-bfb5-f2e34eb44ae5',
  )

  const pinnedDietsIds = pinnedDiets.map((diet) => diet.diet_id)

  const sortedDietData = [...vetoolDiets].sort((a, b) => {
    const aIsPinned = pinnedDietsIds.includes(a.diet_id)
    const bIsPinned = pinnedDietsIds.includes(b.diet_id)

    if (aIsPinned && !bIsPinned) return -1
    if (!aIsPinned && bIsPinned) return 1
    return 0
  })

  const myHosDiets = dietsData
    .filter(
      (diet) =>
        diet.hos_id.hos_id === hosId || pinnedDietsIds.includes(diet.diet_id),
    )
    .map((diet) => {
      const foundPinnedDiet = pinnedDiets.find(
        (pinnedDiet) => pinnedDiet.diet_id === diet.diet_id,
      )

      if (foundPinnedDiet) {
        return {
          ...diet,
          created_at: foundPinnedDiet.created_at,
        }
      }

      return diet
    })
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )

  return (
    <>
      <div className="">
        <h4 className="mb-1 text-lg font-bold">벳툴 등록 사료</h4>

        <DataTable
          data={sortedDietData}
          columns={dietColumns({ hosId, pinnedDietsIds })}
          searchPlaceHolder="사료명, 제조사, 설명으로 검색"
          rowLength={6}
        />
      </div>

      <Separator className="my-4" />

      <div>
        <div className="mb-1 flex items-center gap-2">
          <h4 className="text-lg font-bold">{hosName} 사료</h4>
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

'use client'

import DataTable from '@/components/ui/data-table'
import { HosDrugWithRawDrug } from '@/types/icu/drugs'
import { drugColumns } from './drug-columns'

export default function DrugsDataTable({
  hosName,
  hosDrugs,
}: {
  hosName: string
  hosDrugs: HosDrugWithRawDrug[]
}) {
  const formattedHosDrugs = hosDrugs.map((hosDrug) => ({
    raw_drug_name: hosDrug.raw_drug_id.raw_drug_name,
    ...hosDrug,
  }))
  return (
    <>
      <div className="mb-1 flex items-center gap-2">
        <span className="text-lg font-bold">{hosName} 약물</span>
        {/* <AddAndPinDropDown hosId={hosId} /> */}
      </div>

      <DataTable
        data={formattedHosDrugs}
        columns={drugColumns}
        searchPlaceHolder="원료명, 태그명으로 검색"
      />
    </>
  )
}

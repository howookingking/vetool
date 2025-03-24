'use client'

import DataTable from '@/components/ui/data-table'
import { HosDrugWithRawDrug } from '@/types/icu/drugs'
import { AddDrugDialog } from '../upsert-drug-form/add-drug-dialog'
import { RawDrug } from '@/types'

export default function DrugsDataTable({
  hosName,
  hosDrugsData,
  rawDrugData,
}: {
  hosName: string
  hosDrugsData: HosDrugWithRawDrug[]
  rawDrugData: RawDrug[]
}) {
  const formattedHosDrugs = hosDrugsData.map((hosDrug) => ({
    raw_drug_name: hosDrug.raw_drug_id.raw_drug_name,
    ...hosDrug,
  }))
  return (
    <>
      <div className="mb-1 flex items-center gap-2">
        <span className="text-lg font-bold">{hosName} 약물</span>
        <AddDrugDialog rawDrugData={rawDrugData} />
      </div>

      {/* <DataTable
        data={formattedHosDrugs}
        columns={drugColumns}
        searchPlaceHolder="원료명, 태그명으로 검색"
        rowLength={20}
      /> */}
    </>
  )
}

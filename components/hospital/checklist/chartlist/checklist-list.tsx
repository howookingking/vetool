import PatientButton from '@/components/hospital/icu/sidebar/patient-list/patient-button'
import { Separator } from '@/components/ui/separator'
import type { IcuSidebarIoData, Vet } from '@/types/icu/chart'
import {
  ChecklistSidebarData,
  Filterdcheck,
  FilteredTxChart,
} from '@/types/checklist/checklistchart'
import ChecklistButton from './checklist-button'
import { useEffect, useState } from 'react'

type ChecklistSidebarContentProps = {
  hosGroupList: string[]
  handleCloseMobileDrawer?: () => void
  vetsListData: Vet[]
  filteredTxData: FilteredTxChart | null
}

export default function ChecklistList({
  hosGroupList,
  handleCloseMobileDrawer,
  vetsListData,
  filteredTxData,
}: ChecklistSidebarContentProps) {
  const [filteredtxchart, setFilteredTxChart] =
    useState<FilteredTxChart | null>(null)
  useEffect(() => {
    filteredTxData && setFilteredTxChart(filteredTxData)
  })
  return (
    <div className="flex h-full flex-col gap-3 p-2">
      <div className="flex items-center justify-between text-xs font-bold text-muted-foreground">
        <span className="font-bold">
          진행중인 치료(처치)({filteredTxData?.ing.length})
        </span>
      </div>
      {filteredTxData &&
        filteredTxData.ing.map((list) => (
          <div
            key={list.checklist_id}
            className="w-full last:mb-2"
            onClick={handleCloseMobileDrawer}
          >
            <ChecklistButton
              hosGroupList={hosGroupList}
              checklistchart={list}
              vetsListData={vetsListData}
            />
          </div>
        ))}
      <Separator />
      <div className="flex items-center justify-between text-xs font-bold text-muted-foreground">
        <span className="font-bold">
          당일치료(처치)대기({filteredTxData?.today.length})
        </span>
      </div>
      {filteredTxData &&
        filteredTxData.today.map((list) => (
          <div
            key={list.checklist_id}
            className="w-full last:mb-2"
            onClick={handleCloseMobileDrawer}
          >
            <ChecklistButton
              hosGroupList={hosGroupList}
              checklistchart={list}
              vetsListData={vetsListData}
            />
          </div>
        ))}

      <div className="flex items-center justify-between text-xs font-bold text-muted-foreground">
        <span className="font-bold">
          당일완료된치료(처치)({filteredTxData?.todaydone.length})
        </span>
      </div>
      {filteredTxData &&
        filteredTxData.todaydone.map((list) => (
          <div
            key={list.checklist_id}
            className="w-full last:mb-2"
            onClick={handleCloseMobileDrawer}
          >
            <ChecklistButton
              hosGroupList={hosGroupList}
              checklistchart={list}
              vetsListData={vetsListData}
            />
          </div>
        ))}
      <Separator />

      {/* <Filters
                      hosGroupList={hosGroupList}
                      vetsListData={vetsListData}
                      filters={filters}
                      setFilters={setFilters}
                    /> */}

      {/* <PatientList
                      filteredData={filteredData}
                      vetsListData={vetsListData}
                      handleCloseMobileDrawer={handleCloseMobileDrawer}
                    /> */}
    </div>
  )
}

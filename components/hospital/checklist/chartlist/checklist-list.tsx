import PatientButton from '@/components/hospital/icu/sidebar/patient-list/patient-button'
import { Separator } from '@/components/ui/separator'
import type { IcuSidebarIoData, Vet } from '@/types/icu/chart'
import {
  ChecklistSidebarData,
  Filterdcheck,
} from '@/types/checklist/checklistchart'
import ChecklistButton from './checklist-button'

type ChecklistSidebarContentProps = {
  hosGroupList: string[]
  filteredData: Filterdcheck
  handleCloseMobileDrawer?: () => void
  vetsListData: Vet[]
}

export default function ChecklistList({
  hosGroupList,
  filteredData,
  handleCloseMobileDrawer,
  vetsListData,
}: ChecklistSidebarContentProps) {
  return (
    <div className="flex h-full flex-col gap-3 p-2">
      <div className="flex items-center justify-between text-xs font-bold text-muted-foreground">
        <span className="font-bold">
          당일치료대기({filteredData.todaycheck.length})
        </span>
      </div>
      {filteredData &&
        filteredData.todaycheck.map((list) => (
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
          당일완료된치료({filteredData.donecheck.length})
        </span>
      </div>
      {filteredData &&
        filteredData.donecheck.map((list) => (
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
          미진행된 치료({filteredData.othercheck.length})
        </span>
      </div>
      {filteredData &&
        filteredData.othercheck.map((list) => (
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

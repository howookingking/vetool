import { Separator } from '@/components/ui/separator'
import type { FilteredChecklist } from '@/types/checklist/checklist-type'
import { useState, useEffect } from 'react'
import ChecklistButton from '@/components/hospital/checklist/checklists/checklist-button'

type Props = {
  filteredData?: FilteredChecklist
  handleCloseMobileDrawer?: () => void
}
export default function ChecklistList({
  filteredData,
  handleCloseMobileDrawer,
}: Props) {
  return (
    <div className="flex h-full flex-col gap-3 p-2">
      <div className="flex items-center justify-between text-xs font-bold text-muted-foreground">
        <span className="font-bold">
          진행중인 치료(처치)({filteredData?.ing.length})
        </span>
      </div>
      {filteredData &&
        filteredData.ing.map((list) => (
          <div
            key={list.checklist_id}
            className="w-full last:mb-2"
            onClick={handleCloseMobileDrawer}
          >
            <ChecklistButton checklistchart={list} />
          </div>
        ))}
      <Separator />
      <div className="flex items-center justify-between text-xs font-bold text-muted-foreground">
        <span className="font-bold">
          당일치료(처치)대기({filteredData?.today.length})
        </span>
      </div>
      {filteredData &&
        filteredData.today.map((list) => (
          <div
            key={list.checklist_id}
            className="w-full last:mb-2"
            onClick={handleCloseMobileDrawer}
          >
            <ChecklistButton checklistchart={list} />
          </div>
        ))}

      <div className="flex items-center justify-between text-xs font-bold text-muted-foreground">
        <span className="font-bold">
          당일완료된치료(처치)({filteredData?.todaydone.length})
        </span>
      </div>
      {filteredData &&
        filteredData.todaydone.map((list) => (
          <div
            key={list.checklist_id}
            className="w-full last:mb-2"
            onClick={handleCloseMobileDrawer}
          >
            <ChecklistButton checklistchart={list} />
          </div>
        ))}
      <Separator />
    </div>
  )
}

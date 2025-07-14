import type { FilteredChecklist } from './../../types/checklist/checklist-type'
import type { ChecklistData } from '@/types/checklist/checklist-type'
import { Filter, Vet } from '@/types/icu/chart'

export const filterChecklistData = (
  data: ChecklistData[],
  targetdate: string,
) => {
  const filteredChecklistData: FilteredChecklist = {
    today: [],
    todaydone: [],
    ing: [],
  }
  //   checklistSidebarData as ChecklistSidebarData[]
  if (data) {
    data.map((tx: ChecklistData) => {
      if (tx?.istxing) {
        filteredChecklistData.ing.push(tx)
      } else if (tx.enddate === targetdate) {
        filteredChecklistData.todaydone.push(tx)
      } else if (tx.due_date === targetdate && !tx.enddate) {
        filteredChecklistData.today.push(tx)
      }
    })
    return filteredChecklistData
  }
}

import type { ChecklistWithPatientWithWeight } from '@/lib/services/checklist/checklist-data'
import ChecklistBodyContainer from './checklist-body-container'
import ClTimeIndicator from './cl-time-indicator'
import ClInfos from './cl-infos/cl-infos'

export default function ChecklistBody({
  checklistData,
}: {
  checklistData: ChecklistWithPatientWithWeight
}) {
  return (
    <div className="p-2">
      <ClInfos checklistData={checklistData} />

      <ClTimeIndicator checklistData={checklistData} />

      {/* <ChecklistBodyContainer checklistData={checklistData} /> */}
    </div>
  )
}

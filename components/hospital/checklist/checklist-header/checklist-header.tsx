import type { ChecklistWithPatientWithWeight } from '@/lib/services/checklist/checklist-data'
import ClHeaderActions from './cl-header-actions'
import ClPatientUpdateDialog from './cl-patient-update-dialog'
import ClTimeIndicator from './cl-time-indicator/cl-time-indicator'

type Props = {
  hosId: string
  targetDate: string
  checklistData: ChecklistWithPatientWithWeight
}

export default function ChecklistHeader({
  hosId,
  targetDate,
  checklistData,
}: Props) {
  const { end_time, start_time } = checklistData

  return (
    <header className="flex h-12 items-center justify-center border-b">
      <ClTimeIndicator
        startTime={start_time}
        endTime={end_time}
        checklistId={checklistData.checklist_id}
      />

      <ClPatientUpdateDialog
        hosId={hosId}
        targetDate={targetDate}
        patient={checklistData.patient}
      />

      <ClHeaderActions checklistData={checklistData} />
    </header>
  )
}

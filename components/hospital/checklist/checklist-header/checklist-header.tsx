'use client'

import type { ChecklistWithPatientWithWeight } from '@/lib/services/checklist/checklist-data'
import ClHeaderActions from './cl-header-actions'
import ClPatientUpdateDialog from './cl-patient-update-dialog'

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
  return (
    <header className="flex h-12 items-center justify-center border-b">
      <ClPatientUpdateDialog
        hosId={hosId}
        targetDate={targetDate}
        checklistData={checklistData}
      />

      <ClHeaderActions checklistData={checklistData} />
    </header>
  )
}

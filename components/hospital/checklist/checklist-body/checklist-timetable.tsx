'use client'

import { ChecklistData } from '@/types/checklist/checklist-type'

import ChecklistTimetableRecord from './checklist-timetable-record'
import ChecklistTimetableProtocol from './checklist-timetable-protocol'
type Props = {
  checklistData: ChecklistData
  timeMin: number
}

export default function ChecklistTimetable({ checklistData, timeMin }: Props) {
  return (
    <div>
      {checklistData.checklist_protocol &&
        checklistData.checklist_protocol.length > 0 && (
          <ChecklistTimetableProtocol checklistData={checklistData} />
        )}
      <ChecklistTimetableRecord checklistData={checklistData} />
    </div>
  )
}

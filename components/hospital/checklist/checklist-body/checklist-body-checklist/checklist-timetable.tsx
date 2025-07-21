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
      <ChecklistTimetableRecord checklistData={checklistData} />
    </div>
  )
}

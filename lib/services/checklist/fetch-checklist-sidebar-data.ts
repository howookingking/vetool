'use server'

import { createClient } from '@/lib/supabase/server'
import { Checklist, Patient } from '@/types'
import { ChecklistVet } from '@/types/checklist/checklist-type'

export type ChecklistSidebarData = Omit<
  Checklist,
  | 'created_at'
  | 'patient_id'
  | 'checklist_tag'
  | 'checklist_protocol'
  | 'checklist_set'
  | 'checklist_timetable'
  | 'preinfo'
  | 'end_date'
  | 'age_in_days'
  | 'comment'
  | 'checklist_vet'
> & {
  patient: Pick<
    Patient,
    'name' | 'breed' | 'species' | 'patient_id' | 'birth' | 'hos_patient_id'
  >
} & {
  checklist_vet: ChecklistVet
}

export const fetchChecklistSidebarData = async (
  hosId: string,
  targetDate: string,
) => {
  const supabase = await createClient()

  const { data, error } = await supabase.rpc('fetch_checklist_sidebar_data', {
    hos_id_input: hosId,
    due_date_input: targetDate,
  })

  if (error) {
    console.error(error)
    throw new Error(error.message)
  }

  return (data ?? []) as ChecklistSidebarData[]
}

'use server'

import type { Checklist } from '@/types'
import type { ChecklistWithPatientWithWeight } from './checklist-data'
import { createClient } from '@/lib/supabase/server'
import { ChecklistVet } from '@/types/checklist/checklist-type'

export const updateEachChecklist = async (
  predata: ChecklistWithPatientWithWeight,
) => {
  const newChecklist: Checklist = {
    age_in_days: predata.age_in_days,
    checklist_group: predata.checklist_group,
    checklist_id: predata.checklist_id,
    checklist_protocol: predata.checklist_protocol,
    checklist_set: predata.checklist_set,
    checklist_tag: predata.checklist_tag,
    checklist_timetable: predata.checklist_timetable,
    checklist_title: predata.checklist_title,
    checklist_type: predata.checklist_type,
    checklist_vet: predata.checklist_vet,
    comment: predata.comment,
    created_at: predata.created_at,
    due_date: predata.due_date,
    end_date: predata.end_date,
    end_time: predata.end_time,
    hos_id: predata.hos_id,
    is_txing: predata.is_txing,
    tx_memo_a: predata.tx_memo_a,
    tx_memo_b: predata.tx_memo_b,
    patient_id: predata.patient.patient_id,
    start_time: predata.start_time,
  }

  const supabase = await createClient()

  const { data, error } = await supabase
    .from('checklist')
    .update(newChecklist)
    .match({ checklist_id: predata.checklist_id })

  if (error) {
    console.error('Update failed:', error.message)
    return
  }

  return data
}

export const updateClTitle = async (
  checklistId: string,
  titleInput: string,
) => {
  const supabase = await createClient()

  const { error } = await supabase
    .from('checklist')
    .update({
      checklist_title: titleInput,
    })
    .match({ checklist_id: checklistId })

  if (error) {
    console.error('Update failed:', error.message)
    return
  }
}

export const updateClType = async (checklistId: string, typeInput: string) => {
  const supabase = await createClient()

  const { error } = await supabase
    .from('checklist')
    .update({
      checklist_type: typeInput,
    })
    .match({ checklist_id: checklistId })

  if (error) {
    console.error('Update failed:', error.message)
    return
  }
}

export const updateClVet = async (
  checklistId: string,
  vetInput: ChecklistVet,
) => {
  const supabase = await createClient()

  const { error } = await supabase
    .from('checklist')
    .update({
      checklist_vet: vetInput,
    })
    .match({ checklist_id: checklistId })

  if (error) {
    console.error('Update failed:', error.message)
    return
  }
}

export const updateClGroup = async (
  checklistId: string,
  groupList: string[],
) => {
  const supabase = await createClient()

  const { error } = await supabase
    .from('checklist')
    .update({
      checklist_group: groupList,
    })
    .match({ checklist_id: checklistId })

  if (error) {
    console.error('Update failed:', error.message)
    return
  }
}

export const updateClTag = async (
  checklistId: string,
  checklistTagInput: string,
) => {
  const supabase = await createClient()

  const { error } = await supabase
    .from('checklist')
    .update({
      checklist_tag: checklistTagInput,
    })
    .match({ checklist_id: checklistId })

  if (error) {
    console.error('Update failed:', error.message)
    return
  }
}

export const updateTxMemos = async (
  query: { [key: string]: TxMemo[] },
  checklistId: string,
) => {
  const supabase = await createClient()

  const { error } = await supabase
    .from('checklist')
    .update(query)
    .match({ checklist_id: checklistId })

  if (error) {
    console.error('Update failed:', error.message)
    return
  }
}

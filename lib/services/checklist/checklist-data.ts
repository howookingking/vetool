'use server'

import { createClient } from '@/lib/supabase/server'
import type { Checklist, Patient } from '@/types'
import type {
  ChecklistProtocol,
  Checklistset,
  ChecklistVet,
  PreInfo,
  TimeTable,
} from '@/types/checklist/checklist-type'
import { redirect } from 'next/navigation'

export const getPatientById = async (patientId: string) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('patients')
    .select(
      `
      patient_id,
      name,
      species,
      gender,
      birth,
      breed,
      hos_patient_id
    `,
    )
    .eq('patient_id', patientId)
    .single()

  if (error) {
    console.error('getPatientByHosId error:', error)
    return null
  }

  return data
}

// export const getChecklistDataById = async (checklistId: string) => {
//   const supabase = await createClient()

//   const { data, error } = await supabase
//     .from('checklist')
//     .select(
//       `
//         *,
//         patient_id(*)
//       `,
//     )
//     .match({ checklist_id: checklistId })
//     .maybeSingle()
//     .overrideTypes<ChecklistWithPatient>()

//   if (error) {
//     console.error(error)
//     redirect(`/error?message=${error.message}`)
//   }

//   return data as ChecklistWithPatient
// }

// rpc로 필요한 데이터(환자 및 환자의 체중)을 한번에 가져옴

export type ChecklistPatient = Omit<
  Patient,
  'hos_id' | 'created_at' | 'owner_id'
> & {
  body_weight: string | null
  weight_measured_date: string | null
}

export type ChecklistWithPatientWithWeight = Omit<
  Checklist,
  | 'patient_id'
  | 'checklist_set'
  | 'pre_info'
  | 'checklist_timetable'
  | 'checklist_protocol'
  | 'checklist_vet'
> & {
  patient: ChecklistPatient
} & {
  checklist_set: Checklistset
} & {
  pre_info: PreInfo
} & {
  checklist_timetable: TimeTable | null
} & {
  checklist_protocol: ChecklistProtocol | null
} & {
  checklist_vet: ChecklistVet | null
}

export const fetchChecklistWithPatientWithWeight = async (
  checklistId: string,
) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .rpc('fetch_checklist_with_patient_with_weight', {
      checklist_id_input: checklistId,
    })
    .overrideTypes<ChecklistWithPatientWithWeight>()

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }

  return data as ChecklistWithPatientWithWeight
}

// export const getChecklistDataByIdChannel = async (
//   checklistId: string,
//   onDataChange: (payload: Checklist) => void,
// ) => {
//   const channel = supabase
//     .channel(`realtime:gechecklistbyId:${checklistId}`)
//     .on(
//       'postgres_changes',
//       {
//         event: '*', // 'INSERT' | 'UPDATE' | 'DELETE'
//         schema: 'public',
//         table: 'checklist',
//         filter: `checklist_id=eq.${checklistId}`,
//       },
//       (payload) => {
//         payload.new
//           ? onDataChange(payload.new as Checklist)
//           : onDataChange(payload.old as Checklist)
//       },
//     )
//     .subscribe()

//   return channel
// }

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
    patient_id: predata.patient.patient_id,
    pre_info: predata.pre_info,
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

export const deleteChecklist = async (checklistId: string) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('checklist')
    .delete()
    .eq('checklist_id', checklistId)

  if (error) {
    console.error('삭제 실패:', error.message)
  } else {
    console.log('삭제 완료:', data)
  }
}

export const searchChecklistCharts = async (
  searchTerms: string[],
  hosId: string,
) => {
  const supabase = await createClient()

  let queryBuilder = supabase.from('checklist').select('*').match({
    hos_id: hosId,
  })

  searchTerms.forEach((term) => {
    queryBuilder = queryBuilder.or(`checklist_tag.ilike.%${term}%`)
  })
  const { data, error } = await queryBuilder.order('created_at', {
    ascending: false,
  })

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }
  return data
}

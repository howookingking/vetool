'use server'

import { createClient } from '@/lib/supabase/server'
import { Checklist, Patient } from '@/types'
import type { ChecklistPatient } from '@/types/checklist/checklist-type'
import { redirect } from 'next/navigation'

const supabase = createClient()

export const getPatientById = async (
  patientId: string,
): Promise<ChecklistPatient | null> => {
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
export type ChecklistWithPatientWithWeight = Omit<Checklist, 'patient_id'> & {
  patient: Omit<
    Patient,
    'hos_id' | 'created_at' | 'owner_id' | 'hos_owner_id'
  > & {
    body_weight: string | null
    weight_measured_date: string | null
  }
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

export const updateEachChecklist = async (checklistdata: any) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('checklist')
    .update(checklistdata) // ← 여기에 업데이트할 데이터 객체가 필요
    .eq('checklist_id', checklistdata.checklist_id)

  if (error) {
    console.error('Update failed:', error.message)
    return
  }

  return data
}

// export const deleteChecklist = async (checklistId: string) => {
//   const { data, error } = await supabase
//     .from('checklist')
//     .delete()
//     .eq('checklist_id', checklistId)

//   if (error) {
//     console.error('삭제 실패:', error.message)
//   } else {
//     console.log('삭제 완료:', data)
//   }
// }

// export const getChecklistSidebarData = async (
//   hosId: string,
//   targetDate: string,
// ) => {
//   const { data, error } = await supabase.rpc('checklist_sidebar_data', {
//     _hos_id: hosId,
//     _due_date: targetDate,
//   })

//   if (error) {
//     console.error(error)
//   } else {
//     return data as any
//   }
// }

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

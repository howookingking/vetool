import { createClient } from '@/lib/supabase/client' // 클라이언트 컴포넌트용
import type {
  ChecklistData,
  ChecklistPatinet,
} from '@/types/checklist/checklist-type'
import { redirect } from 'next/navigation'

const supabase = createClient()

export const getPatientById = async (
  patientId: string,
): Promise<ChecklistPatinet | null> => {
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

export const getChecklistDataById = async (checklistId: string) => {
  // const supabase = await createClient()
  const { data, error } = await supabase
    .from('checklist')
    .select('*')
    .match({ checklist_id: checklistId })
    .single()
  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }
  return data
}

export const getChecklistDataByIdChannel = async (
  checklistId: string,
  onDataChange: (payload: any) => void,
) => {
  const channel = supabase
    .channel(`realtime:gechecklistbyId:${checklistId}`)
    .on(
      'postgres_changes',
      {
        event: '*', // 'INSERT' | 'UPDATE' | 'DELETE'
        schema: 'public',
        table: 'checklist',
        filter: `checklist_id=eq.${checklistId}`,
      },
      (payload) => {
        console.log('Realtime change: all re-upload')
        payload.new ? onDataChange(payload.new) : onDataChange(payload.old)
      },
    )
    .subscribe()

  return channel
}

export const updateEachChecklist = async (checklistdata: ChecklistData) => {
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
export const deleteChecklist = async (checklistId: string) => {
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

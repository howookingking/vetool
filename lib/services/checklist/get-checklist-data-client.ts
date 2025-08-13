import { createClient } from '@/lib/supabase/client' // 클라이언트 컴포넌트용
import type {
  ChecklistData,
  ChecklistPatient,
  ChecklistProtocol,
  Checklistset,
  PreInfo,
  TemplateChecklist,
} from '@/types/checklist/checklist-type'
import { redirect } from 'next/navigation'

const supabase = createClient()

export const getPatientById = async (
  patientId: string,
): Promise<ChecklistPatient | null> => {
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

export const updateEachChecklist = async (checklistdata: any) => {
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

export const saveTemplate = async (template: TemplateChecklist) => {
  type TemplateChecklistPre = {
    checklist_template_id?: string
    hos_id?: string
    checklist_type?: string //'checklist' | 'surgery'
    checklist_title?: string //tamplate이름
    checklist_tag?: null | string //검색어
    checklist_protocol?: null | ChecklistProtocol
    checklist_set?: null | Checklistset
    preinfo?: null | PreInfo //처치 정보
  }
  const templatepre: TemplateChecklistPre = {
    ...template,
  }
  delete templatepre.checklist_template_id

  const { data, error } = await supabase
    .from('checklist_template')
    .insert(templatepre)
  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }
}

export const updateTemplate = async (template: TemplateChecklist) => {
  const { data, error } = await supabase
    .from('checklist_template')
    .update(template)
    .eq('checklist_template_id', template.checklist_template_id)
  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }
}

export const getChecklistSidebarData = async (
  hosId: string,
  targetDate: string,
) => {
  const supabase = await createClient()

  const { data, error } = await supabase.rpc('checklist_sidebar_data', {
    _hos_id: hosId,
    _due_date: targetDate,
  })

  if (error) {
    console.error(error)
  } else {
    return data as any
  }
}

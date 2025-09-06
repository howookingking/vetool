import { createClient } from '@/lib/supabase/client' // 클라이언트 컴포넌트용
import { Checklist, ChecklistTemplate } from '@/types'
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

export const getChecklistTemplateCharts = async (hosId: string) => {
  const { data, error } = await supabase
    .from('checklist_template')
    .select('*')
    .match({
      hos_id: hosId,
    })

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}`)
  }

  return data as ChecklistTemplate[]
}

export const getChecklistEachTemplateChart = async (
  checklistTemplateId: string,
) => {
  const { data, error } = await supabase
    .from('checklist_template')
    .select('*')
    .match({
      checklist_template_id: checklistTemplateId,
    })

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}`)
  }

  return data as ChecklistTemplate[]
}

export const deleteChecklistTemplate = async (checklistTemplateId: string) => {
  const { data, error } = await supabase
    .from('checklist_template')
    .delete()
    .eq('checklist_template_id', checklistTemplateId)

  if (error) {
    console.error('삭제 실패:', error.message)
  } else {
    console.log('삭제 완료:', data)
  }
}

type Prechecklist = {
  hos_id: string
  checklist_type: string
  checklist_protocol: ChecklistProtocol
  checklist_set: Checklistset
  preinfo: PreInfo
  due_date: string
}
export const templateToChecklist = async (
  template: TemplateChecklist,
  targetDate: string,
) => {
  const prechecklist = {
    hos_id: template.hos_id,
    checklist_type: '사용자',
    checklist_protocol: template.checklist_protocol,
    checklist_set: template.checklist_set,
    preinfo: template.preinfo,
    due_date: targetDate,
  } as Prechecklist

  const { data, error } = await supabase.from('checklist').insert(prechecklist)
  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }
}

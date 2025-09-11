import { toast } from '@/components/ui/use-toast'
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

// export const getChecklistTemplateCharts = async (hosId: string) => {
//   const { data, error } = await supabase
//     .from('checklist_template')
//     .select('*')
//     .match({
//       hos_id: hosId,
//     })

//   if (error) {
//     console.error(error)
//     redirect(`/error/?message=${error.message}`)
//   }

//   return (data ?? []) as ChecklistTemplate[]
// }
export const getChecklistTemplateCharts = async (_hosId: string) => {
  const hosIds = [_hosId, '00fd3b03-9f70-40f2-bfb5-f2e34eb44ae5']
  // const ids = [...new Set(hosIds)].filter(Boolean)
  if (hosIds.length === 0) return []

  const { data, error } = await supabase
    .from('checklist_template')
    .select('*')
    .in('hos_id', hosIds) // hos_id ∈ ids

  if (error) {
    console.error(error)
    redirect(`/error/?message=${encodeURIComponent(error.message)}`)
  }

  return (data ?? []) as ChecklistTemplate[]
}
// 00fd3b03-9f70-40f2-bfb5-f2e34eb44ae5
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
  hosId: string,
) => {
  const prechecklist = {
    hos_id: hosId,
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

export const checklistToTemplate = async (checklist: ChecklistData) => {
  const prepreset = checklist?.checklist_set
    ? ({ ...checklist.checklist_set } as Checklistset)
    : {}
  prepreset.result && delete prepreset.result

  const postprotocol: ChecklistProtocol = []
  checklist.checklist_protocol &&
    checklist.checklist_protocol.forEach((protocol) => {
      const protocol2 = { ...protocol }
      protocol2.txEnd = null
      postprotocol.push(protocol2)
    })
  const pretemplate = {
    hos_id: checklist.hos_id,
    checklist_type: checklist.checklist_type,
    checklist_title: checklist.checklist_title,
    checklist_tag: null,
    checklist_protocol: postprotocol,
    checklist_set: prepreset,
    preinfo: checklist.preinfo,
  } as TemplateChecklist

  const { data, error } = await supabase
    .from('checklist_template')
    .insert(pretemplate)
  if (data) {
    toast({
      title: '템플릿에 저장되었습니다.',
    })
  }
  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }
}

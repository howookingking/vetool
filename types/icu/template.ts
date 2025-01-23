import { type IcuTemplate, type Patients } from '@/types'

export type TemplateChart = Pick<
  IcuTemplate,
  'template_id' | 'template_name' | 'template_comment'
> & {
  icu_chart_id: string
  created_at: string
}

import { IcuOrders, IcuTemplate, Patients } from '@/types'

export type TemplateChart = Pick<
  IcuTemplate,
  'template_id' | 'template_name' | 'template_comment'
> & {
  icu_chart_id: string
  target_date: string
  patient: Pick<Patients, 'name' | 'patient_id'>
}

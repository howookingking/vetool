export type OutChart = {
  out_time: string
  basic_care: string
  belongings: string
  prescription: string
  etc: string
  created_at: string
}

export type VisitChart = {
  visit_time: string
  visit_area: string
  preparation: string
  consultation_status: string
  etc: string
  is_done: boolean
  created_at: string
}

export const DEFAULT_OUT_CHART: OutChart = {
  out_time: '',
  basic_care: '',
  belongings: '',
  prescription: '',
  etc: '',
  created_at: '',
}

export const DEFAULT_VISIT_CHART: VisitChart = {
  visit_time: '',
  visit_area: '',
  preparation: '',
  consultation_status: '',
  etc: '',
  is_done: false,
  created_at: '',
}

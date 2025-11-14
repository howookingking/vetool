export type OutChart = {
  out_time: string
  basic_care: string
  belongings: string
  prescription: string
  etc: string
}

export const DEFAULT_OUT_CHART: OutChart = {
  out_time: '',
  basic_care: '',
  belongings: '',
  prescription: '',
  etc: '',
}

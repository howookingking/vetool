import { IcuChart, type IcuIo } from '@/types'

export type SummaryData = Pick<
  IcuChart,
  | 'patient_id'
  | 'target_date'
  | 'icu_chart_id'
  | 'main_vet'
  | 'sub_vet'
  | 'urgency'
  | 'weight'
  | 'weight_measured_date'
> & {
  icu_io: Pick<
    IcuIo,
    'in_date' | 'out_date' | 'created_at' | 'cage' | 'group_list'
  >
  orders: SummaryOrder[]
  patient: {
    name: string
    breed: string
    species: string
  }
}

export type SummaryOrder = {
  order_times: string[]
  treatments: {
    time: number
    is_crucial: boolean
    icu_chart_tx_result: string | null
  }[]
}

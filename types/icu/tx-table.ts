import type { OrderType } from '@/constants/hospital/icu/chart/order'
import type { IcuChart, IcuIo, IcuOrders, Patient } from '@/types'
import type { SelectedTreatment } from '@/types/icu/chart'

export type IcuTxTableData = {
  icu_charts: Pick<
    IcuChart,
    'icu_chart_id' | 'weight' | 'main_vet' | 'sub_vet' | 'urgency'
  >
  patient_id: string
  target_date: Date
  icu_io: Pick<IcuIo, 'out_date' | 'created_at' | 'cage' | 'group_list'>
  patient: Pick<Patient, 'name' | 'breed' | 'species'>
  orders: (Pick<
    IcuOrders,
    | 'icu_chart_order_id'
    | 'icu_chart_order_time'
    | 'icu_chart_order_name'
    | 'icu_chart_order_comment'
  > & {
    icu_chart_order_type: OrderType
    treatments: SelectedTreatment[]
  })[]
}

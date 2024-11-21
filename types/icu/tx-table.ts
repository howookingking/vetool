import { IcuCharts, IcuIo, IcuOrders, IcuTxs, Patients } from '..'

export type IcuTxTableData = {
  icu_charts: Pick<IcuCharts, 'icu_chart_id' | 'weight'>
  patient_id: string
  target_date: Date
  icu_io: Pick<IcuIo, 'out_date' | 'created_at'>
  patient: Pick<Patients, 'name' | 'breed' | 'species'>
  orders: (Pick<
    IcuOrders,
    | 'icu_chart_order_id'
    | 'icu_chart_order_time'
    | 'icu_chart_order_name'
    | 'icu_chart_order_comment'
    | 'icu_chart_order_type'
  > & {
    treatments: Pick<IcuTxs, 'time'>[]
  })[]
}

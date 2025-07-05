import { IcuCharts, IcuIo, Patient } from '..'

export type SearchedIcuCharts = Pick<
  IcuCharts,
  'target_date' | 'icu_chart_id' | 'patient_id'
>

export type SearchedIcuIos = Pick<
  IcuIo,
  | 'icu_io_id'
  | 'out_date'
  | 'in_date'
  | 'age_in_days'
  | 'icu_io_tags'
  | 'icu_io_dx'
  | 'icu_io_cc'
> & {
  patient_id: Pick<Patient, 'name' | 'owner_name' | 'species' | 'breed'>
}

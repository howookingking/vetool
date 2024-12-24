import type {
  Diet,
  DrugDoses,
  DrugProductsRows,
  IcuCharts,
  IcuIo,
  IcuNotification,
  IcuOrders,
  IcuTemplate,
  Patients,
  User,
} from '@/types'

export type MainAndSubVet = Pick<User, 'name' | 'avatar_url' | 'user_id'>

export type Vet = Pick<
  User,
  'avatar_url' | 'name' | 'position' | 'user_id' | 'rank'
>

export type TxLog = {
  result: string | null
  name: string
  createdAt: string
}

export type IcuNotificationJoined = IcuNotification & {
  patient_id: Pick<Patients, 'name' | 'breed' | 'gender' | 'patient_id'>
}

export type SelectedChartIcuIo = Pick<
  IcuIo,
  | 'in_date'
  | 'out_date'
  | 'icu_io_cc'
  | 'icu_io_dx'
  | 'icu_io_id'
  | 'created_at'
  | 'age_in_days'
  | 'out_due_date'
  | 'cpcr'
  | 'group_list'
  | 'cage'
  | 'memo_a'
  | 'memo_b'
  | 'memo_c'
>
export type SelectedChartPatient = Omit<Patients, 'owner_id'>

export type SelectedChart = Pick<
  IcuCharts,
  | 'weight'
  | 'weight_measured_date'
  | 'target_date'
  | 'icu_chart_id'
  | 'in_charge'
  | 'der_calc_factor'
  | 'main_vet'
> & {
  icu_io: SelectedChartIcuIo
} & {
  orders: SelectedIcuOrder[]
} & {
  patient: SelectedChartPatient
} & {
  main_vet: Pick<Vet, 'avatar_url' | 'name' | 'user_id'>
} & {
  sub_vet: Pick<Vet, 'avatar_url' | 'name' | 'user_id'>
} & {
  template: Pick<
    IcuTemplate,
    'template_id' | 'template_name' | 'template_comment'
  >
}

export type Patient = Pick<
  Patients,
  | 'name'
  | 'breed'
  | 'gender'
  | 'patient_id'
  | 'species'
  | 'owner_name'
  | 'hos_id'
>

export type SelectedIcuOrder = {
  order_id: string
  order_name: string
  order_type: string
  order_times: string[]
  treatments: Treatment[]
  order_comment: string | null
  id: number
  is_bordered: boolean
}

export type Treatment = {
  time: number
  tx_id: string
  tx_log: TxLog | null
  tx_result: string | null
  tx_comment: string | null
  is_crucial: boolean
}

export type IcuSidebarIoData = {
  vets: {
    sub_vet: string
    main_vet: string
  }
  in_date: string
  patient: {
    name: string
    breed: string
    species: string
    patient_id: string
    owner_name: string
  }
  out_date: string | null
  icu_io_id: string
  group_list: string[]
  created_at: string
}

export type DrugProductsJoined = Pick<
  DrugProductsRows,
  'drug_id' | 'drug_name'
> & {
  drug_doses: DrugDoses[]
  drug_products: DrugProductsRows[]
}
export type IcuReadOnlyOrderData = Pick<
  IcuOrders,
  | 'icu_chart_order_id'
  | 'icu_chart_order_time'
  | 'icu_chart_order_name'
  | 'icu_chart_order_comment'
  | 'icu_chart_order_type'
  | 'is_bordered'
>

export type PinnedDiet = Pick<
  Diet,
  'diet_id' | 'name' | 'unit' | 'species' | 'mass_vol' | 'company'
>

export type PrevIoChartData = {
  icu_chart_id: string
  target_date: string | null
}

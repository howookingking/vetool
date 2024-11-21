import type {
  DrugDoses,
  DrugProductsRows,
  DrugRows,
  IcuBookmark,
  IcuCharts,
  IcuIo,
  IcuNotification,
  Patients,
  User,
} from '@/types'

export type MainAndSubVet = Pick<User, 'name' | 'avatar_url' | 'user_id'>

export type Vet = Pick<User, 'avatar_url' | 'name' | 'position' | 'user_id'>

export type TxLog = {
  result: string | null
  name: string
  createdAt: string
}

export type IcuNotificationJoined = IcuNotification & {
  patient_id: Pick<Patients, 'name' | 'breed' | 'gender' | 'patient_id'>
}

export type SelectedChart = Pick<
  IcuCharts,
  | 'memo_a'
  | 'memo_b'
  | 'memo_c'
  | 'weight'
  | 'weight_measured_date'
  | 'target_date'
  | 'icu_chart_id'
> & {
  icu_io: Pick<
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
  >
} & {
  orders: SelectedIcuOrder[]
} & {
  patient: Pick<
    Patients,
    'name' | 'breed' | 'gender' | 'patient_id' | 'species' | 'owner_name'
  >
} & {
  main_vet: Pick<Vet, 'avatar_url' | 'name' | 'user_id'>
} & {
  sub_vet: Pick<Vet, 'avatar_url' | 'name' | 'user_id'>
} & {
  bookmark: Pick<
    IcuBookmark,
    'bookmark_id' | 'bookmark_name' | 'bookmark_comment'
  >
}

export type SelectedIcuOrder = {
  order_id: string
  order_name: string
  order_type: string
  order_times: string[]
  treatments: {
    time: number
    tx_id: string
    tx_log: TxLog | null
    tx_result: string | null
    tx_comment: string | null
  }[]
  order_comment: string | null
}

export type Treatment = {
  time: number
  tx_id: string
  tx_log: TxLog | null
  tx_result: string | null
  tx_comment: string | null
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
    patient_id: string
  }
  out_date: string | null
  icu_io_id: string
  group_list: string[]
  created_at: string
}

export type DrugProductsJoined = Pick<DrugRows, 'drug_id' | 'drug_name'> & {
  drug_doses: DrugDoses[]
  drug_products: DrugProductsRows[]
}

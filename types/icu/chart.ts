import { MEMO_COLORS } from '@/constants/hospital/icu/chart/colors'
import type { OrderType } from '@/constants/hospital/icu/chart/order'
import type {
  Diet,
  DrugDoses,
  DrugProductsRows,
  IcuChart,
  IcuIo,
  IcuNotification,
  IcuOrders,
  IcuTxs,
  Patient,
  User,
  Vet,
} from '@/types'

export type MainAndSubVet = Pick<User, 'name' | 'avatar_url' | 'user_id'>

export type TxLog = {
  result: string | null
  name: string
  createdAt: string
}

export type IcuNotificationJoined = IcuNotification & {
  patient_id: Pick<Patient, 'name' | 'breed' | 'gender' | 'patient_id'>
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
export type SelectedChartPatient = Omit<Patient, 'owner_id'>

export type SelectedChart = Pick<
  IcuChart,
  | 'weight'
  | 'weight_measured_date'
  | 'target_date'
  | 'icu_chart_id'
  | 'in_charge'
  | 'urgency'
  | 'hos_id'
> & {
  icu_io: SelectedChartIcuIo
} & {
  orders: SelectedIcuOrder[]
} & {
  patient: Patient
} & {
  main_vet: Pick<Vet, 'avatar_url' | 'name' | 'user_id'>
} & {
  sub_vet: Pick<Vet, 'avatar_url' | 'name' | 'user_id'>
}

export type SelectedIcuOrder = {
  order_id: string
  order_name: string
  order_type: OrderType
  order_times: string[]
  treatments: Treatment[]
  order_comment: string | null
  id: number // DB상에서는 priority로 돼있음, sortable에서 id를 사용하기 때문에 key값 id로 변경해서 사용
  // rpc에서 'id', icu_orders.icu_chart_order_priority,
  is_bordered: boolean
}

export type Treatment = {
  time: number
  tx_id: string
  tx_log: TxLog | null
  tx_result: string | null
  tx_comment: string | null
  is_crucial: boolean
  has_images: boolean
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
  urgency: number | null
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
> & {
  treatments?: Treatment[]
}

export type PinnedDiet = Pick<
  Diet,
  'diet_id' | 'name' | 'unit' | 'species' | 'mass_vol' | 'company'
>

export type PrevIoChartData = {
  icu_chart_id: string
  target_date: string | null
}

export type VitalChartBarData = {
  vitalId: number
  value: number
}

export type VitalChartData = {
  date: string
  value: number
  vitalId: string | undefined
  vitalName: string
}

export type VitalTxData = Pick<
  IcuTxs,
  'icu_chart_tx_id' | 'icu_chart_tx_result' | 'created_at'
> &
  Pick<IcuOrders, 'icu_chart_order_name'>

export type VitalData = {
  icu_chart_tx_id: string
  icu_chart_tx_result: string
  target_date: string
  time: number
  created_at: string
}

export type MemoColor = (typeof MEMO_COLORS)[number]

export type Memo = {
  id: string
  memo: string
  create_timestamp: string
  edit_timestamp: string | null
  color: MemoColor
  chosen?: boolean
}

export type MemoGroup = {
  a: Memo[]
  b: Memo[]
  c: Memo[]
}

export type IcuShareData = Omit<SelectedChart, 'orders'> & {
  orders: IcuReadOnlyOrderData[]
}

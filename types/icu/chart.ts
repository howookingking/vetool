import { MEMO_COLORS } from '@/constants/hospital/icu/chart/colors'
import type { OrderType } from '@/constants/hospital/icu/chart/order'
import type {
  IcuChart,
  IcuIo,
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

type SelectedChartIcuIo = Pick<
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

export type SelectedIcuChart = Pick<
  IcuChart,
  | 'hos_id'
  | 'icu_chart_id'
  | 'in_charge'
  | 'target_date'
  | 'urgency'
  | 'weight'
  | 'weight_measured_date'
> & {
  icu_io: SelectedChartIcuIo
  orders: SelectedIcuOrder[]
  patient: Patient
  main_vet: Pick<Vet, 'avatar_url' | 'name' | 'user_id'> | null
  sub_vet: Pick<Vet, 'avatar_url' | 'name' | 'user_id'> | null
}

export type SelectedIcuOrder = Pick<
  IcuOrders,
  | 'icu_chart_order_id'
  | 'icu_chart_order_name'
  | 'icu_chart_order_time'
  | 'icu_chart_order_comment'
  | 'is_bordered'
> & {
  icu_chart_order_type: OrderType
  treatments: SelectedTreatment[]
  id: number
  // DB상에서는 priority로 돼있음, sortable에서 id를 사용하기 때문에 key값 id로 변경해서 사용
  // rpc에서 'id', icu_orders.icu_chart_order_priority,
}

export type SelectedTreatment = Pick<
  IcuTxs,
  | 'icu_chart_tx_id'
  | 'icu_chart_tx_result'
  | 'icu_chart_tx_comment'
  | 'time'
  | 'is_crucial'
  | 'has_images'
> & {
  tx_log: TxLog[] | null
}

// export type Treatment = {
//   time: number
//   tx_id: string
//   tx_log: TxLog | null
//   tx_result: string | null
//   tx_comment: string | null
//   is_crucial: boolean
//   has_images: boolean
// }

export type PrevIoChartData = {
  icu_chart_id: string
  target_date: string | null
}

export type VitalChartData = {
  date: string
  value: number
  vitalId: string | undefined
  vitalName: string
}

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

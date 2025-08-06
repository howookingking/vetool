export type HosData = {
  baseline_time: number
  business_number: string
  city: string
  created_at: string
  district: string
  group_list: string[]
  hos_id: string
  icu_memo_names: string[]
  is_in_charge_system: boolean
  is_personal: boolean
  master_user_id: string
  name: string
  order_color: string | null
  order_color_display: string
  order_font_size: number
  plan: string
  show_orderer: boolean
  show_tx_user: boolean
  time_guidelines: number[]
  vital_ref_range: string
}

export type IcuIo = {
  age_in_days: number
  cage: string | null
  cpcr: string
  created_at: string
  group_list: string[]
  hos_id: string | null
  icu_io_cc: string
  icu_io_dx: string
  icu_io_id: string
  icu_io_tags: string | null
  in_date: string
  memo_a: string | null
  memo_b: string | null
  memo_c: string | null
  out_date: string | null
  out_due_date: string | null
  patient_id: string
}

export type Keywords = {
  keyword: string | null
  keyword_id: number
  main_keyword: string | null
  search_keyword: string | null
  tags: string | null
}

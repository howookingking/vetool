import { Database } from '@/lib/supabase/database.types'

export type Patients = Database['public']['Tables']['patients']['Row']
export type Owner = Database['public']['Tables']['owners']['Row']
export type Users = Database['public']['Tables']['users']['Row']
export type IcuChart = Database['public']['Tables']['icu_chart']['Row']
export type IcuIo = Database['public']['Tables']['icu_io']['Row']
export type IcuChartTx = Database['public']['Tables']['icu_chart_tx']['Row']
export type IcuChartOrder =
  Database['public']['Tables']['icu_chart_order']['Row']

// supabase.auth.getUser() 시 return되는 유져타입
export type User = {
  id: string
  app_metadata: {
    provider?: string
    [key: string]: any
  }
  user_metadata: {
    [key: string]: any
  }
  aud: string
  confirmation_sent_at?: string
  recovery_sent_at?: string
  email_change_sent_at?: string
  new_email?: string
  new_phone?: string
  invited_at?: string
  action_link?: string
  email?: string
  phone?: string
  created_at: string
  confirmed_at?: string
  email_confirmed_at?: string
  phone_confirmed_at?: string
  last_sign_in_at?: string
  role?: string
  updated_at?: string
  identities?: {
    id: string
    user_id: string
    identity_data?: {
      [key: string]: any
    }
    identity_id: string
    provider: string
    created_at?: string
    last_sign_in_at?: string
    updated_at?: string
  }[]
  is_anonymous?: boolean
  factors?: {
    id: string
    friendly_name?: string
    factor_type: 'totp' | string
    status: 'verified' | 'unverified'
    created_at: string
    updated_at: string
  }[]
}

export type IcuChartJoined = IcuChart & {
  patient_id: Patients
  icu_io_id: IcuIo
  main_vet: Users
  sub_vet: Users
  hos_id: {
    group_list: string[] | null
    hos_id: string
  }
}

export type IcuChartOrderJoined = IcuChartOrder & {
  icu_io_id: IcuIo
  icu_chart_order_tx_1: IcuChartOrder | null
  icu_chart_order_tx_2: IcuChartOrder | null
  icu_chart_order_tx_3: IcuChartOrder | null
  icu_chart_order_tx_4: IcuChartOrder | null
  icu_chart_order_tx_5: IcuChartOrder | null
  icu_chart_order_tx_6: IcuChartOrder | null
  icu_chart_order_tx_7: IcuChartOrder | null
  icu_chart_order_tx_8: IcuChartOrder | null
  icu_chart_order_tx_9: IcuChartOrder | null
  icu_chart_order_tx_10: IcuChartOrder | null
  icu_chart_order_tx_11: IcuChartOrder | null
  icu_chart_order_tx_12: IcuChartOrder | null
  icu_chart_order_tx_13: IcuChartOrder | null
  icu_chart_order_tx_14: IcuChartOrder | null
  icu_chart_order_tx_15: IcuChartOrder | null
  icu_chart_order_tx_16: IcuChartOrder | null
  icu_chart_order_tx_17: IcuChartOrder | null
  icu_chart_order_tx_18: IcuChartOrder | null
  icu_chart_order_tx_19: IcuChartOrder | null
  icu_chart_order_tx_20: IcuChartOrder | null
  icu_chart_order_tx_21: IcuChartOrder | null
  icu_chart_order_tx_22: IcuChartOrder | null
  icu_chart_order_tx_23: IcuChartOrder | null
  icu_chart_order_tx_24: IcuChartOrder | null
}

export type IcuIoPatientsJoined = IcuIo & {
  patient_id: {
    name: string
    breed: string
    patient_id: string
  }
}

export type Vets = {
  user_id: string
  name: string | null
  position: string | null
}
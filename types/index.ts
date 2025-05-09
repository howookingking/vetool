import { Database } from '@/lib/supabase/database.types'

export type Patients = Database['public']['Tables']['patients']['Row']
export type Owner = Database['public']['Tables']['owners']['Row']
export type User = Database['public']['Tables']['users']['Row']
export type IcuIo = Database['public']['Tables']['icu_io']['Row']
export type Hospital = Database['public']['Tables']['hospitals']['Row']
export type UserApproval = Database['public']['Tables']['user_approvals']['Row']
export type Notice = Database['public']['Tables']['notices']['Row']
export type IcuNotification =
  Database['public']['Tables']['icu_notification']['Row']
export type Todo = Database['public']['Tables']['todos']['Row']
export type IcuDefaultChart =
  Database['public']['Tables']['icu_default_chart']['Row']
export type IcuCharts = Database['public']['Tables']['icu_charts']['Row']
export type IcuOrders = Database['public']['Tables']['icu_orders']['Row']
export type IcuTxs = Database['public']['Tables']['icu_txs']['Row']
export type IcuTemplate = Database['public']['Tables']['icu_templates']['Row']
export type IcuOut = Database['public']['Tables']['icu_out']['Row']
export type IcuVisit = Database['public']['Tables']['icu_visit']['Row']
export type VetoolErrors = Database['public']['Tables']['vetool_errors']['Row']
export type VetoolFeedbacks =
  Database['public']['Tables']['vetool_feedbacks']['Row']
export type Announcements = Database['public']['Tables']['announcements']['Row']
export type Params = { slug: string }
export type DrugProductsRows =
  Database['public']['Tables']['drug_products']['Row']
export type DrugDoses = Database['public']['Tables']['drug_doses']['Row']
export type RawDrug = Database['public']['Tables']['raw_drugs']['Row']
export type HosDrug = Database['public']['Tables']['hos_drugs']['Row']
export type Diet = Database['public']['Tables']['diets']['Row']
export type Vitals = Database['public']['Tables']['vitals']['Row']

// supabase.auth.getUser() 시 return되는 유져타입
export type AuthUser = {
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

export type VetoolUser = Pick<
  User,
  | 'email'
  | 'name'
  | 'avatar_url'
  | 'position'
  | 'is_admin'
  | 'user_id'
  | 'is_super'
  | 'hos_id'
>

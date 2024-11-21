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
export type IcuBookmark = Database['public']['Tables']['icu_bookmarks']['Row']
export type DrugProductsRows =
  Database['public']['Tables']['drug_products_rows']['Row']
export type DrugRows = Database['public']['Tables']['drugs_rows']['Row']
export type DrugDoses = Database['public']['Tables']['drug_doses']['Row']
export type DrugDescription =
  Database['public']['Tables']['drugs_description']['Row']

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

export type UserProfile = Pick<
  User,
  'email' | 'name' | 'avatar_url' | 'position' | 'is_admin' | 'user_id'
>

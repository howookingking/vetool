import { Database } from '@/lib/supabase/database.types'

export type Patient = Database['public']['Tables']['patients']['Row']
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
export type IcuChart = Database['public']['Tables']['icu_charts']['Row']
export type IcuOrders = Database['public']['Tables']['icu_orders']['Row']
export type IcuTxs = Database['public']['Tables']['icu_txs']['Row']
export type IcuTemplate = Database['public']['Tables']['icu_templates']['Row']
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
export type Message = Database['public']['Tables']['messages']['Row']

// is_vet 이 true인 경우에만 사용하는 user
export type Vet = Pick<
  User,
  'name' | 'position' | 'user_id' | 'avatar_url' | 'rank'
>

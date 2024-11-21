import { Hospital, User } from '@/types'

export type HosListData = Pick<
  Hospital,
  'hos_id' | 'name' | 'city' | 'district' | 'plan' | 'business_number'
>

export type ParsedError = {
  name?: string
  message: string
  stack?: string
  digest?: string
  errorUrl?: string
}

import { Hospital, User } from '@/types'

export type ParsedError = {
  name?: string
  message: string
  stack?: string
  digest?: string
  errorUrl?: string
}

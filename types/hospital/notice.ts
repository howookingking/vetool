import { NOTICE_COLORS } from '@/constants/hospital/icu/chart/colors'
import { Notice, User } from '@/types'

export type NoticeWithUser = Omit<
  Notice,
  'user_id' | 'updated_at' | 'hos_id'
> & {
  user_id: Pick<User, 'user_id' | 'name' | 'avatar_url'>
}

export type SortableNotice = NoticeWithUser & {
  id: number
}

export type NoticeColorType = (typeof NOTICE_COLORS)[number]

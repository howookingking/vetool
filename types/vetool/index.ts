import type { Announcements, VetoolFeedbacks } from '@/types'

export type AnnouncementFormProps = Omit<
  Announcements,
  'announcement_id' | 'created_at' | 'is_draft'
>

export type Announcement = Pick<
  Announcements,
  | 'announcement_id'
  | 'created_at'
  | 'announcement_title'
  | 'announcement_category'
  | 'announcement_content'
> & {
  feedback_id: Pick<VetoolFeedbacks, 'feedback_description'>
}

export type AnnouncementTitles = {
  announcement_id: string
  announcement_title: string
}

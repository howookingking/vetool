'use server'

import type {
  AnnouncementDetailData,
  AnnouncementFormProps,
  AnnouncementListProps,
} from '@/types/vetool'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export const createAnnouncement = async (
  announcementData: AnnouncementFormProps,
  isDraft?: boolean,
) => {
  const supabase = await createClient()

  const {
    feedback_id,
    announcement_title,
    announcement_content,
    announcement_category,
  } = announcementData

  const { error } = await supabase.from('announcements').upsert({
    feedback_id,
    announcement_title,
    announcement_content,
    announcement_category,
    is_draft: isDraft,
  })

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }
}

export const getAnnouncementList = async () => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('announcements')
    .select(
      'announcement_id, announcement_title, announcement_category, created_at, is_draft',
    )
    .order('created_at', { ascending: false })
    .returns<AnnouncementListProps[]>()
  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }

  return data
}

export const getAnnouncementDetailData = async (announcementId: string) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('announcements')
    .select(
      `
        announcement_title,
        announcement_content,
        created_at,
        announcement_category,
        feedback_id(feedback_description)
      `,
    )
    .order('created_at')
    .match({ announcement_id: announcementId })
    .returns<AnnouncementDetailData>()
    .maybeSingle()

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }

  return data
}

export const getAnnouncementTitlesData = async () => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('announcements')
    .select('announcement_id, announcement_title')
    .match({ is_draft: false })
    .order('created_at', { ascending: false })
    .limit(1)

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }

  return data
}

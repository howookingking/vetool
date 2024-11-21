'use server'

import { createClient } from '@/lib/supabase/server'
import { NoticeWithUser } from '@/types/hospital/notice'
import { redirect } from 'next/navigation'

export const getNotices = async (hosId: string) => {
  const supabase = await createClient()
  const { data, error: error } = await supabase
    .from('notices')
    .select(
      `
        id, 
        notice_color, 
        notice_text, 
        notice_order, 
        created_at,
        user_id(
          user_id,
          name,
          avatar_url
        )
      `,
    )
    .match({ hos_id: hosId })
    .order('notice_order', { ascending: true })
    .order('created_at', { ascending: true })
    .returns<NoticeWithUser[]>()

  if (error) {
    throw new Error(error.message)
  }
  return data
}

export const createNotice = async (
  noticeInput: string,
  colorInput: string,
  hosId: string,
) => {
  const supabase = await createClient()
  const { error } = await supabase.from('notices').insert({
    hos_id: hosId,
    notice_color: colorInput,
    notice_text: noticeInput,
    notice_order: 999,
  })

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }
}

export const updateNotice = async (
  noticeId: string,
  noticeInput: string,
  colorInput: string,
) => {
  const supabase = await createClient()
  const { error } = await supabase
    .from('notices')
    .update({
      notice_color: colorInput,
      notice_text: noticeInput,
    })
    .match({ id: noticeId })

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }
}

export const deleteNotice = async (noticeId: string) => {
  const supabase = await createClient()
  const { error: deleteNoticeError } = await supabase
    .from('notices')
    .delete()
    .match({ id: noticeId })

  if (deleteNoticeError) {
    console.error(deleteNoticeError)
    redirect(`/error?message=${deleteNoticeError.message}`)
  }
}

export const reorderNotices = async (noticeIds: string[]) => {
  const supabase = await createClient()

  noticeIds.forEach(async (noticeId, index) => {
    const { error } = await supabase
      .from('notices')
      .update({ notice_order: index })
      .match({ id: noticeId })

    if (error) {
      console.error(error)
      redirect(`/error?message=${error.message}`)
    }
  })
}

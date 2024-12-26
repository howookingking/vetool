'use server'

import { createClient } from '@/lib/supabase/server'
import type { UserFeedbackType } from '@/types/vetool'
import { redirect } from 'next/navigation'

export const sendFeedback = async (
  feedbackCategory: string,
  feedbackDescription: string,
) => {
  const supabase = await createClient()

  const { error } = await supabase.from('vetool_feedbacks').insert({
    feedback_category: feedbackCategory,
    feedback_description: feedbackDescription,
  })

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }
}

export const getFeedback = async () => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('vetool_feedbacks')
    .select(
      `
        *,
        user_id(hos_id(name, city))
      `,
    )
    .order('created_at', { ascending: false })
    .returns<UserFeedbackType[]>()

  if (error) {
    throw new Error(error.message)
  }
  return data ?? []
}

// export const getUnReadFeedbacks = async () => {
//   const supabase = await createClient()

//   const { data: unReadFeedbacksData, error: unReadFeedbacksDataError } =
//     await supabase
//       .from('vetool_feedbacks')
//       .select('count', { count: 'exact' })
//       .match({ is_read: false })

//   if (unReadFeedbacksDataError) {
//     console.error(unReadFeedbacksDataError)
//     redirect(`/error?message=${unReadFeedbacksDataError.message}`)
//   }

//   return unReadFeedbacksData[0].count
// }

export const updateReadFeedback = async (feedbackId: string) => {
  const supabase = await createClient()

  const { error } = await supabase
    .from('vetool_feedbacks')
    .update({ is_read: true })
    .match({ feedback_id: feedbackId })

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }
}

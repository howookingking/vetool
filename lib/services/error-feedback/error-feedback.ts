'use server'

import type { Json } from '@/lib/supabase/database.types'
import { createClient } from '@/lib/supabase/server'
import { getDateMonthsAgo } from '@/lib/utils/utils'
import type { ErrorFeedbackType } from '@/types/vetool'
import { redirect } from 'next/navigation'

export const sendErrorFeedback = async (
  userId: string,
  description: string,
  isServer: boolean,
  errorJson: Json,
) => {
  const supabase = await createClient()

  const { error } = await supabase.from('vetool_errors').insert({
    user_id: userId,
    description,
    is_server: isServer,
    error_json: errorJson,
  })

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }
}

export const getErrorFeedback = async (dateRange: string) => {
  const supabase = await createClient()

  let query = supabase.from('vetool_errors').select(
    `
      *,
      user_id(hos_id(name, city))
    `,
  )

  if (dateRange !== 'all') {
    const monthsAgo = getDateMonthsAgo(dateRange)

    query = query.gte('created_at', monthsAgo)
  }
  const { data, error } = await query
    .order('created_at', { ascending: false })
    .returns<ErrorFeedbackType[]>()

  if (error) {
    throw new Error(error.message)
  }

  return data ?? []
}

'use server'

const SPECIAL_CHAR_REGEX = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]+/g

import { createClient } from '@/lib/supabase/server'
import { getDateMonthsAgo } from '@/lib/utils/utils'
import type { SearchedIcuIos } from '@/types/icu/search'
import { redirect } from 'next/navigation'

export const searchIos = async (
  searchInput: string,
  hosId: string,
  timeRange: string,
  order: string,
) => {
  const supabase = await createClient()

  const safeWords = searchInput
    .trim()
    .replace(SPECIAL_CHAR_REGEX, ' ')
    .split(' ')
    .filter((word) => word)

  let queryBuilder = supabase.from('icu_io').select(
    `
      age_in_days,
      icu_io_id,
      in_date,
      out_date,
      icu_io_tags,
      icu_io_dx,
      icu_io_cc,
      patient_id(
        name,
        owner_name,
        species,
        breed
      )
    `,
  )

  // 각 단어에 대해 개별적인 ilike 조건 추가 (AND 방식)
  safeWords.forEach((word) => {
    queryBuilder = queryBuilder.ilike('icu_io_tags', `%${word}%`)
  })

  if (timeRange !== 'all') {
    const monthsAgo = getDateMonthsAgo(timeRange)

    queryBuilder = queryBuilder.gte('out_date', monthsAgo)
  }

  const { data, error } = await queryBuilder
    .match({ hos_id: hosId })
    .not('out_date', 'is', null)
    .order('out_date', { ascending: order === 'asc' })
    .returns<SearchedIcuIos[]>()

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }

  return data
}

export const getSelectedCharts = async (icuIoId: string) => {
  const supabase = await createClient()

  const { data, error: error } = await supabase
    .from('icu_charts')
    .select('icu_chart_id, target_date, patient_id')
    .order('target_date', { ascending: true })
    .match({ icu_io_id: icuIoId })

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }

  return data
}

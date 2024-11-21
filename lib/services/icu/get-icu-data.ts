'use server'

import { createClient } from '@/lib/supabase/server'
import type { IcuSidebarIoData, Vet } from '@/types/icu/chart'
import { redirect } from 'next/navigation'

export const getIcuData = async (hosId: string, targetDate: string) => {
  console.log('Initial Icu Data Fetching')
  const supabase = await createClient()

  const promiseArray = Promise.all([
    supabase
      .rpc('get_icu_sidebar_data', {
        hos_id_input: hosId,
        target_date_input: targetDate,
      })
      .returns<IcuSidebarIoData[]>(),

    supabase
      .from('users')
      .select('name, position, user_id, avatar_url, rank')
      .match({ hos_id: hosId, is_vet: true })
      .order('rank', { ascending: true })
      .returns<Vet[]>(),

    supabase
      .from('hospitals')
      .select(
        `
          order_color,
          group_list,
          icu_memo_names,
          maintenance_rate_calc_method,
          show_orderer,
          rer_calc_method,
          vital_ref_range
        `,
      )
      .match({ hos_id: hosId })
      .single(),
  ])

  const [
    { data: icuSidebarData, error: icuSidebarDataError },
    { data: vetsListData, error: vetsListDataError },
    { data: basicHosData, error: basicHosDataError },
  ] = await promiseArray

  if (icuSidebarDataError || vetsListDataError || basicHosDataError) {
    console.error({
      icuSidebarDataError,
      vetsListDataError,
      basicHosDataError,
    })
    redirect(
      `/error?message=${
        icuSidebarDataError?.message ||
        vetsListDataError?.message ||
        basicHosDataError?.message
      }`,
    )
  }
  return {
    icuSidebarData,
    vetsListData,
    basicHosData,
  }
}

'use server'

import { createClient } from '@/lib/supabase/server'
import type { ChecklistData } from '@/types/checklist/checklist-type'
import type { IcuSidebarIoData, Vet } from '@/types/icu/chart'
import { redirect } from 'next/navigation'

export const getChecklistData = async (hosId: string, targetDate: string) => {
  const supabase = await createClient()

  const promiseArray = Promise.all([
    supabase
      .from('checklist')
      .select('*')
      .match({ hos_id: hosId })
      .order('created_at', { ascending: true }),

    supabase
      .from('users')
      .select('name, position, user_id, avatar_url, rank')
      .match({ hos_id: hosId, is_vet: true })
      .order('rank', { ascending: true }),

    supabase
      .from('hospitals')
      .select(
        `
          order_color,
          group_list,
          icu_memo_names,
          show_orderer,
          vital_ref_range,
          order_font_size,
          time_guidelines,
          order_color_display,
          show_tx_user,
          plan,
          is_in_charge_system,
          baseline_time
        `,
      )
      .match({ hos_id: hosId })
      .single(),
  ])

  const [
    { data: checklistSidebarData, error: checklistSidebarDataError },
    { data: vetsListData, error: vetsListDataError },
    { data: basicHosData, error: basicHosDataError },
  ] = await promiseArray

  if (checklistSidebarDataError || vetsListDataError || basicHosDataError) {
    console.error({
      checklistSidebarDataError,
      vetsListDataError,
      basicHosDataError,
    })
    redirect(
      `/error?message=${
        checklistSidebarDataError?.message ||
        vetsListDataError?.message ||
        basicHosDataError?.message
      }`,
    )
  }
  return {
    checklistSidebarData: (checklistSidebarData as any) ?? [],
    vetsListData: vetsListData as Vet[],
    basicHosData,
  }
}

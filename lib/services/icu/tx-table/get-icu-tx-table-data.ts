'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { IcuTxTableData } from '@/types/icu/tx-table'

export const getIcuTxTableData = async (hosId: string, targetDate: string) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .rpc('get_icu_tx_table_data', {
      hos_id_input: hosId,
      target_date_input: targetDate,
    })
    .returns<IcuTxTableData[]>()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

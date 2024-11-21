'use server'

import { TxLocalState } from '@/lib/store/icu/tx-mutation'
import { createClient } from '@/lib/supabase/server'
import type { TxLog } from '@/types/icu/chart'
import { redirect } from 'next/navigation'

export const upsertIcuTx = async (
  hosId: string,
  txLocalState: TxLocalState,
  updatedLogs?: TxLog[],
) => {
  const supabase = await createClient()

  const { error } = await supabase.from('icu_txs').upsert({
    hos_id: hosId,
    icu_chart_tx_id: txLocalState?.txId,
    icu_chart_order_id: txLocalState?.icuChartOrderId,
    icu_chart_tx_comment: txLocalState?.txComment,
    icu_chart_tx_result: txLocalState?.txResult,
    icu_chart_tx_log: updatedLogs,
    time: txLocalState?.time!,
  })

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }
}

export const deleteIcuChartTx = async (icuChartTxId: string) => {
  const supabase = await createClient()

  const { error } = await supabase
    .from('icu_txs')
    .delete()
    .match({ icu_chart_tx_id: icuChartTxId })

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }
}

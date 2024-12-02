'use server'

import { TxLocalState } from '@/lib/store/icu/tx-mutation'
import { createClient } from '@/lib/supabase/server'
import { isValidWeightOrderTx } from '@/lib/utils/utils'
import type { TxLog } from '@/types/icu/chart'
import { redirect } from 'next/navigation'

export const upsertIcuTx = async (
  hosId: string,
  txLocalState: TxLocalState,
  weightMeasuredDate: string,
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

  if (
    isValidWeightOrderTx(
      txLocalState?.icuChartOrderType!,
      txLocalState?.icuChartOrderName!,
      txLocalState?.txResult!,
    )
  ) {
    const { error: weightError } = await supabase.rpc(
      'update_weight_and_insert_vitals_by_order',
      {
        icu_chart_order_id_input: txLocalState?.icuChartOrderId!,
        weight_input: txLocalState?.txResult!,
        weight_measured_date_input: weightMeasuredDate,
      },
    )

    if (weightError) {
      console.error(weightError)
      redirect(`/error?message=${weightError.message}`)
    }
  }

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

export const updateTxWeight = async (
  chartId: string,
  patientId: string,
  weight: string,
  weightMeasuredDate: string,
) => {
  const supabase = await createClient()

  const { error: chartError } = await supabase
    .from('icu_charts')
    .update({
      weight,
      weight_measured_date: weightMeasuredDate,
    })
    .match({ icu_chart_id: chartId })

  if (chartError) {
    console.error(chartError)
    redirect(`/error?message=${chartError.message}`)
  }

  const { error: vitalsError } = await supabase.from('vitals').insert({
    patient_id: patientId,
    body_weight: weight,
  })

  if (vitalsError) {
    console.error(vitalsError)
    redirect(`/error?message=${vitalsError.message}`)
  }
}

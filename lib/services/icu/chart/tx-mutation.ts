'use server'

import { TxLocalState } from '@/lib/store/icu/icu-tx'
import { createClient } from '@/lib/supabase/server'
import { purifyVitalValue } from '@/lib/utils/vital-chart'
import type { TxLog } from '@/types/icu/chart'
import { redirect } from 'next/navigation'

export const upsertIcuTx = async (
  hosId: string,
  txLocalState: TxLocalState,
  weightMeasuredDate: string,
  imagesLength: number,
  updatedLogs?: TxLog[],
) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('icu_txs')
    .upsert({
      hos_id: hosId,
      icu_chart_tx_id: txLocalState?.txId,
      icu_chart_order_id: txLocalState?.icuChartOrderId,
      icu_chart_tx_comment: txLocalState?.txComment,
      icu_chart_tx_result: txLocalState?.txResult,
      icu_chart_tx_log: updatedLogs,
      time: txLocalState?.time!,
      is_crucial: txLocalState?.isCrucialChecked,
      has_images: Boolean(
        imagesLength + (txLocalState?.bucketImagesLength || 0),
      ),
    })
    .select('icu_chart_tx_id')

  // 체중인 경우
  // 1. 체중이 입력해도 되는 값인지 확인
  // 2. 값이 괜찮다면 purified된 값을 icu_charts 테이블 업데이트(weight, weight_measured_date) 및 vitals 테이블 추가(body_weight)

  // 체중 관련 예시
  // "5kg" =>	5
  // "5 kg"	=> 5
  // "5kg(넥칼라ㅇ)" =>	5
  // "5(kg)" =>	5
  // "5(넥칼라x)"	=> 5
  // "약 5.3kg(넥칼라 있음)" =>	5.3
  // "체중 6.7kg"	=> 6.7
  // " 7.2 kg "	=> 7.2
  // "몸무게 약 8.1kg(리드줄 있음)" => 8.1
  // "N/A" or "없음" =>	NaN

  if (txLocalState?.icuChartOrderName === '체중') {
    const purifiedWeight = purifyVitalValue(
      '체중',
      txLocalState?.txResult ?? '',
    )
    if (purifiedWeight) {
      const { error: weightError } = await supabase.rpc(
        'update_icu_chart_table_weight_and_insert_vitals_table',
        {
          icu_chart_order_id_input: txLocalState?.icuChartOrderId!,
          weight_input: String(purifiedWeight),
          weight_measured_date_input: weightMeasuredDate,
        },
      )

      if (weightError) {
        console.error(weightError)
        redirect(`/error?message=${weightError.message}`)
      }
    }
  }

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }

  return {
    success: true,
    txId: data[0].icu_chart_tx_id,
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

export const uploadTxImages = async (
  txImages: File[],
  txId: string,
  startIndex: string,
) => {
  try {
    if (txImages.length === 0) return
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL + '/api/image'

    // 1. FormData 선언
    const formData = new FormData()
    txImages.forEach((file) => formData.append('files', file))
    formData.append('route', 'icu')
    formData.append('id', txId)
    formData.append('startIndex', startIndex)

    const response = await fetch(baseUrl, {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('이미지 업로드에 실패했습니다')
    }
  } catch (error) {
    console.error('이미지 업로드 중 오류:', error)
    redirect(`/error?message=이미지 업로드 중 오류가 발생했습니다`)
  }
}

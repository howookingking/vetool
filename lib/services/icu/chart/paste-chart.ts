'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

const pasteOrders = async (
  prev_chart_id: string,
  new_chart_id: string,
  orderer: string,
) => {
  const supabase = await createClient()

  const { error } = await supabase.rpc('copy_selected_orders', {
    selected_chart_id_input: prev_chart_id,
    new_chart_id_input: new_chart_id,
    orderer_name_input: orderer,
  })

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }
}

export const pasteChart = async (
  patientId: string,
  copiedChartId: string,
  targetDate: string,
  orderer: string,
) => {
  const supabase = await createClient()

  const { data: returningChartData, error: returningChartDataError } =
    await supabase
      .from('icu_charts')
      .select('*')
      .match({ patient_id: patientId })
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

  if (returningChartDataError) {
    console.error(returningChartDataError)
    redirect(`/error?message=${returningChartDataError.message}`)
  }

  const {
    icu_chart_id,
    icu_io_id,
    hos_id,
    patient_id,
    main_vet,
    sub_vet,
    target_date,
    memo_a,
    memo_b,
    memo_c,
    weight_measured_date,
    weight,
  } = returningChartData

  // 첫 차트인 경우(가장최근의 생성된 차트가 targetDate와 일치) : chart 복사할 필요가 없고 order만 복사
  if (target_date === targetDate) {
    await pasteOrders(copiedChartId, icu_chart_id, orderer)
  }

  // 첫차트가 아닌 경우 : 첫차트의 chart data와 order 모두 복사
  if (target_date !== targetDate) {
    const { data: createdIcuChartId, error: insertingNewChartError } =
      await supabase
        .from('icu_charts')
        .insert({
          hos_id,
          patient_id,
          main_vet,
          sub_vet,
          target_date: targetDate,
          memo_a,
          memo_b,
          memo_c,
          weight_measured_date,
          weight,
          icu_io_id,
        })
        .select('icu_chart_id')
        .single()

    if (insertingNewChartError) {
      console.error(insertingNewChartError)
      redirect(`/error?message=${insertingNewChartError.message}`)
    }

    await pasteOrders(copiedChartId, createdIcuChartId.icu_chart_id, orderer)
  }
}

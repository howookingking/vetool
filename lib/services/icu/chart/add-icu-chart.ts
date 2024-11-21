'use server'

import { createClient } from '@/lib/supabase/server'
import { IcuChartsInCharge } from '@/types/adimin'
import { format } from 'date-fns'
import { redirect } from 'next/navigation'

export const copyPrevChart = async (targetDate: string, patientId: string) => {
  const supabase = await createClient()

  const newDate = new Date(targetDate)
  const prevDate = format(newDate.setDate(newDate.getDate() - 1), 'yyyy-MM-dd')

  const { data: prevChartData, error: prevChartDataError } = await supabase
    .from('icu_charts')
    .select(
      `
        icu_io_id,
        icu_chart_id,
        hos_id, 
        main_vet,
        sub_vet,
        memo_a,
        memo_b,
        memo_c,
        weight_measured_date,
        weight,
        in_charge,
        der_calc_factor
      `,
    )
    .match({ patient_id: patientId, target_date: prevDate })
    .maybeSingle()

  if (prevChartDataError) {
    console.error(prevChartDataError)
    redirect(`/error?message=${prevChartDataError.message}`)
  }
  //  전일 차트 데이터가 없으면 클라이언트에서 토스트 띄우기 위해
  if (prevChartData === null) {
    return { error: 'prev chart not found' }
  }

  const { data: prevChartOrdersData, error: prevChartOrdersDataError } =
    await supabase.from('icu_orders').select('*').match({
      icu_chart_id: prevChartData.icu_chart_id,
    })

  if (prevChartOrdersDataError) {
    console.error(prevChartOrdersDataError)
    redirect(`/error?message=${prevChartOrdersDataError.message}`)
  }

  // 첫째날 차트는 오더가 없고 차트는 있기 때문에 확인해야함
  if (prevChartOrdersData.length === 0) {
    return { error: 'prev orders not found' }
  }

  // 차트 복사 시 익일 담당자를 금일 담당자로
  let newInCharge: IcuChartsInCharge | null =
    prevChartData.in_charge as IcuChartsInCharge | null

  if (newInCharge === null) {
    newInCharge = null
  } else {
    newInCharge.today = { ...newInCharge.tomorrow }
    newInCharge.tomorrow = {
      all: '미선택',
      am: '미선택',
      pm: '미선택',
    }
  }

  newInCharge = prevChartData.in_charge as IcuChartsInCharge

  // 전날의 차트와 오더가 있다는 것을 모두 확인 후에 target날의 차트 생성
  const { data: newIcuChartId, error: creatingNewIcuChartError } =
    await supabase
      .from('icu_charts')
      .insert({
        icu_io_id: prevChartData.icu_io_id,
        hos_id: prevChartData.hos_id,
        main_vet: prevChartData.main_vet,
        sub_vet: prevChartData.sub_vet,
        target_date: targetDate,
        memo_a: prevChartData.memo_a,
        memo_b: prevChartData.memo_b,
        memo_c: prevChartData.memo_c,
        weight_measured_date: prevChartData.weight_measured_date,
        weight: prevChartData.weight,
        patient_id: patientId,
        in_charge: newInCharge,
        der_calc_factor: prevChartData.der_calc_factor,
      })
      .select('icu_chart_id')
      .single()

  if (creatingNewIcuChartError) {
    console.error(creatingNewIcuChartError)
    redirect(`/error?message=${creatingNewIcuChartError.message}`)
  }

  await supabase.rpc('copy_prev_orders', {
    prev_chart_id_input: prevChartData.icu_chart_id,
    new_chart_id_input: newIcuChartId.icu_chart_id,
  })

  return { error: null }
}

export const registerDefaultChart = async (hosId: string, chartId: string) => {
  const supabase = await createClient()

  const { error } = await supabase.rpc('insert_default_orders', {
    hos_id_input: hosId,
    icu_chart_id_input: chartId,
  })

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}`)
  }
}

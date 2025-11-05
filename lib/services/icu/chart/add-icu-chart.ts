'use server'

import { createClient } from '@/lib/supabase/server'
import type { IcuChartsInCharge } from '@/types/adimin'
import { format } from 'date-fns'
import { redirect } from 'next/navigation'
import { reorderOrders } from './order-mutation'

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
        weight_measured_date,
        weight,
        in_charge,
        urgency
      `,
    )
    .match({ patient_id: patientId, target_date: prevDate })
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (prevChartDataError) {
    console.error(prevChartDataError)
    redirect(`/error?message=${prevChartDataError.message}`)
  }

  //  전일 차트 데이터가 없으면 클라이언트에서 토스트 띄우기 위해
  if (prevChartData === null) {
    return { error: 'prev chart not found' }
  }

  // 전날차트의 오더들을 모두 찾음
  const { data: prevOrders, error: prevOrdersError } = await supabase
    .from('icu_orders')
    .select('*')
    .match({
      icu_chart_id: prevChartData.icu_chart_id,
    })
    .order('icu_chart_order_priority', { ascending: true })
    .order('created_at', { ascending: true })

  if (prevOrdersError) {
    console.error(prevOrdersError)
    redirect(`/error?message=${prevOrdersError.message}`)
  }

  // 입원일에 차트를 생성하지 않고 그 다음날 차트를 복사하려는 경우
  // 첫째날 차트는 오더가 없고 차트는 있기 때문에 확인해야함
  if (prevOrders.length === 0) {
    return { error: 'prev orders not found' }
  }

  // 복사 전에 priority 정렬
  const prevOrderIds = prevOrders.map((order) => order.icu_chart_order_id)
  await reorderOrders(prevOrderIds)
  // db에서 priority 업데이트가 이뤄지기전에 아래 rpc(copy_prev_orders)가 실행되어 의도치않는 중복 순서가 발생하는 것 예방
  await new Promise((resolve) => setTimeout(resolve, 500))

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
        weight_measured_date: prevChartData.weight_measured_date,
        weight: prevChartData.weight,
        patient_id: patientId,
        in_charge: newInCharge,
        urgency: prevChartData.urgency,
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

export const pasteDefaultIcuChart = async (hosId: string, chartId: string) => {
  const supabase = await createClient()

  const { error } = await supabase.rpc('paste_default_icu_chart', {
    hos_id_input: hosId,
    icu_chart_id_input: chartId,
  })

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}`)
  }
}

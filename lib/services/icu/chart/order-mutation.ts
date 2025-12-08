'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export const deleteOrder = async (chartOrderId: string) => {
  const supabase = await createClient()

  const { error } = await supabase
    .from('icu_orders')
    .delete()
    .match({ icu_chart_order_id: chartOrderId })

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }
}

export const upsertOrder = async (
  hosId: string,
  icuChartId: string,
  icuChartOrderId: string | undefined,
  orderTime: string[],
  order: {
    icu_chart_order_name: string
    icu_chart_order_comment: string | null
    icu_chart_order_type: string
    icu_chart_order_priority?: number
    is_bordered?: boolean
  },
) => {
  const supabase = await createClient()

  const { error } = await supabase.from('icu_orders').upsert({
    hos_id: hosId,
    icu_chart_order_id: icuChartOrderId,
    icu_chart_id: icuChartId,
    icu_chart_order_time: orderTime,
    ...order,
  })

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }
}

export const pasteTemplateOrders = async (
  templateChartId: string,
  icuChartId: string,
) => {
  const supabase = await createClient()

  const { error } = await supabase.rpc('copy_template_orders', {
    prev_chart_id_input: templateChartId,
    new_chart_id_input: icuChartId,
  })

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }
}

export const reorderOrders = async (orderIds: string[]) => {
  const supabase = await createClient()

  orderIds.forEach(async (orderId, index) => {
    const { error } = await supabase
      .from('icu_orders')
      .update({ icu_chart_order_priority: index })
      .match({ icu_chart_order_id: orderId })

    if (error) {
      console.error(error)
      redirect(`/error?message=${error.message}`)
    }
  })
}

export const updateIsBordered = async (
  icuChartOrderId: string,
  isBordered: boolean,
) => {
  const supabase = await createClient()

  const { error } = await supabase
    .from('icu_orders')
    .update({ is_bordered: !isBordered })
    .match({ icu_chart_order_id: icuChartOrderId })

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }
}

export const insertCalcResultOrder = async (
  hosId: string,
  patientId: string,
  targetDate: string,
  orderType: string,
  orderName: string,
  orderComment: string,
) => {
  const supabase = await createClient()

  const { error } = await supabase.rpc('insert_calc_result_order', {
    hos_id_input: hosId,
    target_date_input: targetDate,
    order_type_input: orderType,
    order_name_input: orderName,
    order_comment_input: orderComment,
    patient_id_input: patientId,
  })

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }
}

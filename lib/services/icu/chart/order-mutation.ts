'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export const deleteOrder = async (chartOrderId: string) => {
  const supabase = createClient()

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
  },
) => {
  const supabase = createClient()

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

export const updateOrderTime = async (
  icuChartOrderId: string,
  orderTime: string[],
) => {
  const supabase = createClient()

  const { error } = await supabase
    .from('icu_orders')
    .update({ icu_chart_order_time: orderTime })
    .match({ icu_chart_order_id: icuChartOrderId })

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }
}
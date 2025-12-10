'use server'

import { createClient } from '@/lib/supabase/server'
import type { SelectedIcuOrder } from '@/types/icu/chart'
import { redirect } from 'next/navigation'

export type HosDefaultChartOrder = Omit<SelectedIcuOrder, 'treatments'>

export const getDefaultChartOrders = async (hosId: string) => {
  const supabase = await createClient()

  const { data, error } = await supabase.rpc('get_hos_default_chart_orders', {
    hos_id_input: hosId,
  })

  if (error) {
    throw new Error(error.message)
  }

  return data as HosDefaultChartOrder[]
}

export const deleteDefaultChartOrder = async (defaultChartId: string) => {
  const supabase = await createClient()

  const { error } = await supabase
    .from('icu_default_chart')
    .delete()
    .match({ default_chart_id: defaultChartId })

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }
}

export const upsertDefaultChartOrder = async (
  hosId: string,
  defaultChartId: string | undefined,
  orderTime: string[] | undefined,
  orderData: {
    icu_chart_order_name: string
    icu_chart_order_comment: string
    icu_chart_order_type: string
    is_bordered?: boolean
  },
) => {
  console.log(orderTime)

  const supabase = await createClient()
  const {
    icu_chart_order_name,
    icu_chart_order_comment,
    icu_chart_order_type,
    is_bordered,
  } = orderData

  const { error } = await supabase.from('icu_default_chart').upsert({
    hos_id: hosId,
    default_chart_id: defaultChartId,
    default_chart_order_name: icu_chart_order_name,
    default_chart_order_comment: icu_chart_order_comment,
    default_chart_order_type: icu_chart_order_type,
    is_bordered,
    default_order_time: orderTime,
  })

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }
}

export const reorderDefaultOrders = async (orderIds: string[]) => {
  const supabase = await createClient()

  orderIds.forEach(async (orderId, index) => {
    const { error } = await supabase
      .from('icu_default_chart')
      .update({ default_chart_order_priority: index })
      .match({ default_chart_id: orderId })

    if (error) {
      console.error(error)
      redirect(`/error?message=${error.message}`)
    }
  })
}

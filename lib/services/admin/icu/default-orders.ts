'use server'

import { createClient } from '@/lib/supabase/server'
import type { SelectedIcuOrder } from '@/types/icu/chart'
import { redirect } from 'next/navigation'

export const getDefaultChartOrders = async (hosId: string) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .rpc('get_default_chart_data', {
      hos_id_input: hosId,
    })
    .returns<SelectedIcuOrder[]>()

  if (error) {
    throw new Error(error.message)
  }

  return data
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
  orderData: {
    default_chart_order_name: string
    default_chart_order_comment: string
    default_chart_order_type: string
  },
) => {
  const supabase = await createClient()
  const {
    default_chart_order_name,
    default_chart_order_comment,
    default_chart_order_type,
  } = orderData

  const { error } = await supabase.from('icu_default_chart').upsert({
    hos_id: hosId,
    default_chart_id: defaultChartId,
    default_chart_order_name,
    default_chart_order_comment,
    default_chart_order_type,
  })

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }
}

export const reorderDefaultOrders = async (orderIds: string[]) => {
  const supabase = await createClient()

  orderIds.forEach(async (orderId, index) => {
    const { error: reorderOrdersError } = await supabase
      .from('icu_default_chart')
      .update({ default_chart_order_priority: index })
      .match({ default_chart_id: orderId })

    if (reorderOrdersError) {
      console.error(reorderOrdersError)
      redirect(`/error?message=${reorderOrdersError.message}`)
    }
  })
}

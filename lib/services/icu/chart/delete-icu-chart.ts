'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export const deleteOrders = async (icuChartId: string) => {
  const supabase = await createClient()

  const { error } = await supabase.from('icu_orders').delete().match({
    icu_chart_id: icuChartId,
  })

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}`)
  }
}

export const deleteChart = async (icuChartId: string) => {
  const supabase = await createClient()

  const { error } = await supabase.from('icu_charts').delete().match({
    icu_chart_id: icuChartId,
  })

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}`)
  }
}

export const deleteAllCharts = async (icuIoId: string) => {
  const supabase = await createClient()

  const { error } = await supabase
    .from('icu_io')
    .delete()
    .match({ icu_io_id: icuIoId })

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}`)
  }
}

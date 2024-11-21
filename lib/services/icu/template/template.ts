'use server'

import { createClient } from '@/lib/supabase/server'
import { SelectedIcuOrder } from '@/types/icu/chart'
import type { TemplateChart } from '@/types/icu/template'
import { redirect } from 'next/navigation'

export const upsertTemplateChart = async (
  name: string,
  comment: string,
  icuChartId: string,
  hosId: string,
) => {
  const supabase = await createClient()

  const { error } = await supabase.from('icu_templates').upsert(
    {
      hos_id: hosId,
      template_name: name,
      template_comment: comment,
      icu_chart_id: icuChartId,
    },
    {
      onConflict: 'icu_chart_id',
      ignoreDuplicates: false,
    },
  )

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}`)
  }
}

export const insertCustomTemplateChart = async (
  hosId: string,
  targetDate: string,
  templateOrders: Partial<SelectedIcuOrder>[],
  templateName: string,
  templateComment?: string | null,
) => {
  const supabase = await createClient()

  const { error } = await supabase.rpc('insert_template_orders', {
    hos_id_input: hosId,
    target_date_input: targetDate,
    template_orders_input: templateOrders,
    template_name_input: templateName,
    template_comment_input: templateComment ?? '',
  })

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}`)
  }
}

export const updateTemplate = async (
  hosId: string,
  templateId: string,
  template_name: string,
  template_comment: string | null,
) => {
  const supabase = await createClient()

  const { error } = await supabase
    .from('icu_templates')
    .update({ template_name, template_comment })
    .match({ template_id: templateId, hos_id: hosId })

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}`)
  }
}

export const deleteTemplateChart = async (
  templateId: string,
  chartId?: string,
) => {
  const supabase = await createClient()

  const { error } = await supabase
    .from('icu_templates')
    .delete()
    .match({ template_id: templateId })

  if (chartId) {
    await supabase.from('icu_charts').delete().match({ icu_chart_id: chartId })
  }

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}`)
  }
}

export const getIcuCustomOrders = async (hosId: string) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .rpc('get_icu_custom_order_data', {
      hos_id_input: hosId,
    })
    .returns<TemplateChart[]>()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export const getTemplateCharts = async (hosId: string) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .rpc('get_icu_template_data', {
      hos_id_input: hosId,
    })
    .returns<TemplateChart[]>()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export const getReadOnlyChartOrders = async (chartId: string) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('icu_orders')
    .select(
      'icu_chart_order_id, icu_chart_order_name, icu_chart_order_comment, icu_chart_order_type, icu_chart_order_time',
    )
    .order('icu_chart_order_priority')
    .match({ icu_chart_id: chartId })

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}`)
  }

  return data
}

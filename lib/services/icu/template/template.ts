'use server'

import { createClient } from '@/lib/supabase/server'
import { SelectedChart, SelectedIcuOrder } from '@/types/icu/chart'
import { redirect } from 'next/navigation'

export const createTemplateChart = async (
  hosId: string,
  templateOrders: Partial<SelectedIcuOrder>[],
  templateName: string,
  isTimeIncluded: boolean,
  templateComment?: string | null,
) => {
  const supabase = await createClient()

  const { error } = await supabase.rpc('create_template_orders', {
    hos_id_input: hosId,
    template_orders_input: templateOrders,
    template_name_input: templateName,
    is_time_included_input: isTimeIncluded,
    template_comment_input: templateComment ?? '',
  })

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}`)
  }
}

export const updateTemplateChart = async (
  hosId: string,
  icu_chart_id: string,
  templateOrders: Partial<SelectedIcuOrder>[],
  templateId: string,
  templateName: string,
  templateComment: string | null,
) => {
  const supabase = await createClient()

  const { error } = await supabase.rpc('update_template_chart', {
    hos_id_input: hosId,
    icu_chart_id_input: icu_chart_id,
    template_orders_input: templateOrders,
    template_id_input: templateId,
    template_name_input: templateName,
    template_comment_input: templateComment ?? '',
  })

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}`)
  }
}

export const deleteTemplateChart = async (chartId: string) => {
  const supabase = await createClient()

  const { error } = await supabase
    .from('icu_charts')
    .delete()
    .match({ icu_chart_id: chartId })

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}`)
  }
}

export const fetchIcuTemplates = async (hosId: string) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('icu_templates')
    .select('*')
    .match({ hos_id: hosId })
    .order('created_at', { ascending: false })

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}`)
  }

  return data
}

// 단일 템플릿 차트를 가져옴 : template페이지에서 preview 또는 수정시
export const getTemplateChart = async (chartId: string) => {
  const supabase = await createClient()

  const { data, error } = await supabase.rpc('get_template_chart_data', {
    icu_chart_id_input: chartId,
  })

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}`)
  }

  return data as SelectedChart
}

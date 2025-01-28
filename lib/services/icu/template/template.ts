'use server'

import { createClient } from '@/lib/supabase/server'
import { SelectedChart, SelectedIcuOrder } from '@/types/icu/chart'
import { type TemplateChart } from '@/types/icu/template'
import { redirect } from 'next/navigation'

export const insertTemplateChart = async (
  hosId: string,
  templateOrders: Partial<SelectedIcuOrder>[],
  templateName: string,
  templateComment?: string | null,
) => {
  const supabase = await createClient()

  const { error } = await supabase.rpc('insert_template_orders', {
    hos_id_input: hosId,
    template_orders_input: templateOrders,
    template_name_input: templateName,
    template_comment_input: templateComment ?? '',
  })

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}`)
  }
}

export const updateTemplateChart = async (
  icu_chart_id: string,
  templateOrders: Partial<SelectedIcuOrder>[],
  templateId: string,
  templateName: string,
  templateComment: string | null,
  hosId: string,
) => {
  const supabase = await createClient()

  const { error } = await supabase.rpc('update_template_chart', {
    icu_chart_id_input: icu_chart_id,
    template_id_input: templateId,
    template_orders_input: templateOrders,
    template_name_input: templateName,
    template_comment_input: templateComment ?? '',
    hos_id_input: hosId,
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

// template 페이지에서 모든 템플릿들을 테이블에서 보여줌
export const getTemplateCharts = async (hosId: string) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .rpc('get_icu_template_charts_data', {
      hos_id_input: hosId,
    })
    .returns<TemplateChart[]>()

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}`)
  }

  return data
}

// 단일 템플릿 차트를 가져옴 : template페이지에서 preview 또는 수정시
export const getTemplateChart = async (chartId: string) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .rpc('get_template_chart_data', {
      icu_chart_id_input: chartId,
    })
    .returns<SelectedChart>()

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}`)
  }

  return data
}

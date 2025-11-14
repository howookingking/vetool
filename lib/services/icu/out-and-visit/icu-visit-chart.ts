'use server'

import {
  DEFAULT_VISIT_CHART,
  type VisitChart,
} from '@/constants/hospital/icu/chart/out-and-visit'
import { createClient } from '@/lib/supabase/server'
import type { Patient } from '@/types'
import { redirect } from 'next/navigation'

export const addPatientToVisitChart = async (icuChartId: string) => {
  const supabase = await createClient()

  const { error } = await supabase
    .from('icu_charts')
    .update({
      visit_chart: {
        ...DEFAULT_VISIT_CHART,
        created_at: new Date().toISOString(),
      },
    })
    .match({ icu_chart_id: icuChartId })

  if (error) {
    console.error(error)
    redirect(`/error?message=${error?.message}`)
  }
}

export type VisitDuePatents = {
  icu_chart_id: string
  patients: Pick<
    Patient,
    'name' | 'breed' | 'owner_name' | 'species' | 'patient_id'
  >
  visit_chart: VisitChart | null
}
export const getVisitDuePatients = async (
  hosId: string,
  targetDate: string,
) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('icu_charts')
    .select(
      `
        icu_chart_id,
        visit_chart,
        patients (
          patient_id,
          name,
          breed,
          owner_name,
          species
        )
      `,
    )
    .match({ hos_id: hosId, target_date: targetDate })
    .neq('visit_chart', null)

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}`)
  }
  console.log(data)

  return data as unknown as VisitDuePatents[]
}

export const getVisitCandidates = async (hosId: string, targetDate: string) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('icu_charts')
    .select(
      `
        icu_chart_id,
        icu_io(
          created_at,
          out_date
        ),
        patients (
          name,
          breed,
          owner_name,
          species
        )
      `,
    )
    .match({ hos_id: hosId, target_date: targetDate })
    .is('visit_chart', null)

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}`)
  }

  return data
}

export const updateVisitChart = async (
  icuChartId: string,
  input: VisitChart | null, // 면회 취소할 경우 null 처리
) => {
  const supabase = await createClient()

  const { error } = await supabase
    .from('icu_charts')
    .update({ visit_chart: input })
    .match({ icu_chart_id: icuChartId })

  if (error) {
    console.error(error)
    redirect(`/error?message=${error?.message}`)
  }
}

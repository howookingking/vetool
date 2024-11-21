'use server'

import { createClient } from '@/lib/supabase/server'
import type { OutDuePatientsData } from '@/types/icu/movement'
import { redirect } from 'next/navigation'

const ICU_OUT_CHECK_TYPE = [
  'basic_care',
  'belongings',
  'prescription',
  'out_time',
  'etc',
]

export const updatePatientMovement = async (
  icuIoId: string,
  value: string,
  checkType: string,
  visitId?: string,
) => {
  const supabase = await createClient()

  const updateData: Partial<OutDuePatientsData> = {
    [checkType]: value,
  }

  if (ICU_OUT_CHECK_TYPE.includes(checkType)) {
    const { error } = await supabase
      .from('icu_out')
      .update(updateData)
      .match({ icu_io_id: icuIoId })

    if (error) {
      console.error(error)
      redirect(`/error?message=${error?.message}`)
    }
  } else {
    const { error } = await supabase
      .from('icu_visit')
      .update(updateData)
      .match({ icu_visit_id: visitId, icu_io_id: icuIoId })

    if (error) {
      console.error(error)
      redirect(`/error?message=${error?.message}`)
    }
  }
}

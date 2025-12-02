'use server'

import type { OrderFontSize } from '@/constants/admin/order-font-size'
import type { Plan } from '@/constants/plans'
import { createClient } from '@/lib/supabase/server'
import type { Hospital, IcuChart, IcuIo, Patient, Vet } from '@/types'
import type { IcuOrderColors, VitalRefRange } from '@/types/adimin'
import { redirect } from 'next/navigation'

export type IcuSidebarPatient = Pick<
  IcuIo,
  | 'icu_io_id'
  | 'in_date'
  | 'out_date'
  | 'out_due_date'
  | 'group_list'
  | 'created_at'
> & {
  patient: Pick<
    Patient,
    'name' | 'breed' | 'species' | 'patient_id' | 'owner_name'
  >
} & {
  vets: Pick<IcuChart, 'main_vet' | 'sub_vet'>
} & {
  urgency: IcuChart['urgency']
}

export type IcuLayoutData = {
  icuSidebarPatients: IcuSidebarPatient[]
  vetList: Vet[]
  basicHosSettings: Pick<
    Hospital,
    | 'group_list'
    | 'icu_memo_names'
    | 'show_orderer'
    | 'show_tx_user'
    | 'time_guidelines'
    | 'is_in_charge_system'
  > & {
    order_color: IcuOrderColors
    vital_ref_range: VitalRefRange[]
    order_font_size: OrderFontSize
    plan: Plan
  }
}

export const fetchIcuLayoutData = async (hosId: string, targetDate: string) => {
  const supabase = await createClient()

  const { data, error } = await supabase.rpc('get_icu_layout_data', {
    hos_id_input: hosId,
    target_date_input: targetDate,
  })

  if (error) {
    console.error('error from icu layout', error.message)
    redirect(`/error?message=${error.message}`)
  }

  return data as IcuLayoutData
}

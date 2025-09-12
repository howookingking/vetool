'use server'

import { createClient } from '@/lib/supabase/server'
import { ChecklistSidebarData } from '@/types/checklist/checklist-type'

export const fetchChecklistSidebarData = async (
  hosId: string,
  targetDate: string,
) => {
  const supabase = await createClient()

  const { data, error } = await supabase.rpc('fetch_checklist_sidebar_data', {
    hos_id_input: hosId,
    due_date_input: targetDate,
  })

  if (error) {
    console.error(error)
    throw new Error(error.message)
  }
  return (data ?? []) as ChecklistSidebarData[]
}

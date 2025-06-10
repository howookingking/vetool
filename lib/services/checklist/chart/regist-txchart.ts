import { createClient } from '@/lib/supabase/server'
import { ChecklistSidebarData } from '@/types/checklist/checklistchart'
import { redirect } from 'next/navigation'

export const registerTxChart = async (txchart: ChecklistSidebarData) => {
  const supabase = await createClient()

  const { error } = await supabase
    .from('checklist')
    .update(txchart)
    .eq('checklist_id', txchart.checklist_id)

  //   const { error } = await supabase.rpc('register_icu', {
  //     hos_id_input: hosId,
  //     icu_io_dx_input: '',
  //     icu_io_cc_input: '',
  //     in_date_input: in_date,
  //     out_due_date_input: out_due_date,
  //     group_list_input: JSON.stringify(group_list),
  //     age_in_days_input: getDaysSince(birth),
  //     patient_id_input: patientId,
  //     main_vet_input: main_vet,
  //     sub_vet_input: '',
  //   })

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }
}

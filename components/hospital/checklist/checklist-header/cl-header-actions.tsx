import { Button } from '@/components/ui/button'
import type { ChecklistWithPatientWithWeight } from '@/lib/services/checklist/checklist-data'
import { ScrollTextIcon } from 'lucide-react'
import ChecklistEditDialogButton from './checklist-edit-dialogbutton'

export default function ClHeaderActions({
  checklistData,
}: {
  checklistData: ChecklistWithPatientWithWeight
}) {
  return (
    <div className="absolute right-2 flex items-center gap-1">
      <Button size="icon" variant="ghost" name="report">
        <ScrollTextIcon />
      </Button>

      <ChecklistEditDialogButton isEdit checklistData={checklistData} />
    </div>
  )
}

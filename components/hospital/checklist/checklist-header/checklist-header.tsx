'use client'

import ChecklistEditDialogButton from '@/components/hospital/checklist/checklist-header/checklist-edit-dialogbutton'
import { Button } from '@/components/ui/button'
import CustomTooltip from '@/components/ui/custom-tooltip'
import type { ChecklistWithPatientWithWeight } from '@/lib/services/checklist/get-checklist-data-client'
import { cn } from '@/lib/utils/utils'
import { ScrollTextIcon } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import ChecklistPatientInfo from '../common/checklist-patient-info'

export default function ChecklistHeader({
  checklistData,
}: {
  checklistData: ChecklistWithPatientWithWeight
}) {
  const pathname = usePathname()
  const { push } = useRouter()

  const searchParams = useSearchParams()
  const edit = searchParams.get('edit')
  const isActive = pathname.split('/')[7]
  const pathnamearray: string[] = pathname.split('/')

  return (
    <header className="flex justify-between border-b">
      <ChecklistPatientInfo checklistData={checklistData} />

      <div className="flex">
        <CustomTooltip
          contents="리포트"
          side="bottom"
          sideOffset={4}
          delayDuration={300}
        >
          <Button
            type="button"
            size="icon"
            variant="outline"
            name="report"
            className={cn(
              'm-2',
              isActive === 'report' && 'bg-primary text-white',
            )}
            onClick={() => {
              push(
                `/hospital/${pathnamearray[2]}/checklist/${pathnamearray[4]}/chart/${pathnamearray[6]}/report`,
              )
            }}
          >
            <ScrollTextIcon />
          </Button>
        </CustomTooltip>

        <ChecklistEditDialogButton
          isEdit={edit === 'true'}
          checklistId={checklistData.patient.patient_id}
        />
      </div>
    </header>
  )
}

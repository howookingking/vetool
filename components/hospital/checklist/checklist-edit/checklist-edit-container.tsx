'use client'
import {
  type Dispatch,
  type SetStateAction,
  use,
  useEffect,
  useState,
} from 'react'
import { ChecklistData } from '@/types/checklist/checklist-type'
import ChecklistPatientInfo from '../common/checklist-patient-info'
import ChecklistRegisterDialog from '../sidebar/checklist-register-dialog/checklist-register-dialog'
import { ChecklistTypes } from '@/constants/checklist/checklist'
import CustomTooltip from '@/components/ui/custom-tooltip'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils/utils'
import dynamic from 'next/dynamic'
type Props = {
  checklistId: string
  setChecklistEditDialogOpen: (isopen: boolean) => void
  checklistData: ChecklistData | null | undefined
}
export default function ChecklistEditContainer({
  checklistId,
  setChecklistEditDialogOpen,
  checklistData,
}: Props) {
  const [isActive, setIsActive] = useState<string | null>(null)
  useEffect(() => {
    checklistData &&
      setIsActive(
        checklistData.checklist_type ? checklistData.checklist_type : null,
      )
  }, [checklistData])
  return (
    // <div className="flex-col">
    //   {checklistData && checklistData.patient_id ? (
    //     <ChecklistPatientInfo patientId={checklistData.patient_id} />
    //   ) : (
    //     <ChecklistRegisterDialog
    //       hosId={checklistData ? checklistData.hos_id : ''}
    //       checklistData={checklistData ? checklistData : null}
    //     />
    //   )}
    // </div>
    <div className="flex-col">
      <ChecklistPatientInfo
        patientId={checklistData ? checklistData.patient_id : null}
      />
      <div className="flex flex-wrap">
        {!checklistData?.checklist_type &&
          ChecklistTypes &&
          ChecklistTypes.map((_type) => (
            <CustomTooltip
              key={_type}
              contents={_type}
              side="bottom"
              sideOffset={4}
              delayDuration={300}
            >
              <Button
                type="button"
                variant="outline"
                className={cn(
                  'm-1 2xl:m-2 2xl:ml-2',
                  isActive === _type && 'bg-primary text-white',
                )}
                onClick={(e) => {
                  setIsActive(_type)
                }}
              >
                <p>{_type}</p>
              </Button>
            </CustomTooltip>
          ))}
      </div>
    </div>
  )
}

'use client'
import {
  type Dispatch,
  type SetStateAction,
  use,
  useEffect,
  useState,
} from 'react'
import ChecklistPatientInfo from '../common/checklist-patient-info'
import ClRegisterDialog from '../sidebar/checklist-register-dialog/cl-register-dialog'
import { ChecklistTypes } from '@/constants/checklist/checklist'
import CustomTooltip from '@/components/ui/custom-tooltip'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils/utils'
import dynamic from 'next/dynamic'
import LargeLoaderCircle from '@/components/common/large-loader-circle'
import type { Checklist } from '@/types'
import ChecklistEditBasic from '@/components/hospital/checklist/checklist-edit/checklist-edit-basic'
import { ChecklistData } from '@/types/checklist/checklist-type'

const LazyChecklistEditBasic = dynamic(
  () =>
    import(
      '@/components/hospital/checklist/checklist-edit/checklist-edit-basic'
    ),
  {
    ssr: false,
    loading: () => <LargeLoaderCircle className="h-[574px]" />,
  },
)

type Props = {
  checklistId: string
  setChecklistEditDialogOpen: (isopen: boolean) => void
  checklistData: ChecklistData
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
        checklistData.checklist_type ? checklistData.checklist_type : '일반',
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
      <div className="m-3 flex flex-wrap 2xl:m-2">
        {ChecklistTypes &&
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
      {isActive && (
        <div>
          <ChecklistEditBasic
            checklistData={checklistData}
            setChecklistEditDialogOpen={setChecklistEditDialogOpen}
            checklistType={isActive}
          />
        </div>
      )}
    </div>
  )
}

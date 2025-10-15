'use client'

import SpeciesToIcon from '@/components/common/species-to-icon'
import { Button } from '@/components/ui/button'
import { ChecklistSidebarData } from '@/lib/services/checklist/fetch-checklist-sidebar-data'
import { cn, convertPascalCased } from '@/lib/utils/utils'
import { useClContextData } from '@/providers/cl-context-provider'
import type { Species } from '@/types/hospital/calculator'
import { ClockIcon, StethoscopeIcon } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

type Props = {
  checklistchart: ChecklistSidebarData
  hosId: string
  targetDate: string
}

export default function ClPatientButton({
  checklistchart,
  hosId,
  targetDate,
}: Props) {
  const { start_time, end_time, checklist_title, checklist_type } =
    checklistchart

  const process = !start_time ? 'pending' : !end_time ? 'processing' : 'ended'

  const { push } = useRouter()
  const pathname = usePathname()
  const path = pathname.split('/')
  const isPatientSelected = path.indexOf(checklistchart.checklist_id) !== -1

  const formattedStartedTime = start_time
    ? new Date(start_time).toLocaleTimeString('ko-KR', { hour12: false })
    : ''

  const {
    clContextData: { vetsListData },
  } = useClContextData()

  const foundVet = vetsListData.find(
    (vet) => vet.user_id === checklistchart.checklist_vet.main_vet,
  )

  const handlePatientButtonClick = () =>
    push(
      `/hospital/${hosId}/checklist/${targetDate}/chart/${checklistchart.checklist_id}/checklist`,
    )

  return (
    <Button
      variant="outline"
      className={cn(
        'h-auto w-full px-2 py-1 text-xs',
        isPatientSelected && 'border border-black bg-muted shadow-md',
      )}
      onClick={handlePatientButtonClick}
    >
      <div className={cn('flex w-full flex-col justify-between')}>
        <div className="mb-1 flex justify-between">
          <div className="font-bold">
            {checklist_title.length > 0 ? checklist_title : '체크리스트명'}
          </div>

          <div>{checklist_type}</div>
        </div>

        <div className="flex justify-between gap-2">
          <div className="flex items-center gap-1 text-sm">
            <SpeciesToIcon
              species={checklistchart.patient.species as Species}
              size={16}
            />
            {checklistchart.patient.name}
          </div>
          <div className="max-w-[96px] truncate">
            {convertPascalCased(checklistchart.patient.breed)}
          </div>
        </div>

        <div className="flex justify-between gap-2">
          <div className="ml-0.5 flex items-center gap-0.5">
            <StethoscopeIcon style={{ width: 12, height: 12 }} />
            {foundVet?.name ?? '미지정'}
          </div>

          <div className="flex items-center gap-0.5">
            <ClockIcon style={{ width: 12, height: 12 }} />
            {process === 'pending' && '대기중'}
            {process === 'ended' && '종료'}
            {process === 'processing' && `${formattedStartedTime}`}
          </div>
        </div>
      </div>
    </Button>
  )
}

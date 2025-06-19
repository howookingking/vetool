import { Button } from '@/components/ui/button'
import { cn, convertPascalCased } from '@/lib/utils/utils'
import { type IcuSidebarIoData, type Vet } from '@/types/icu/chart'
import { Cat, Dog, Stethoscope, User, Star } from 'lucide-react'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { ChecklistSidebarData } from '@/types/checklist/checklistchart'
import path from 'path'
import { useEffect, useState } from 'react'

type ChecklistButtonProps = {
  hosGroupList: string[]
  vetsListData: Vet[]
  checklistchart: ChecklistSidebarData
}

export default function ChecklistButton({
  hosGroupList,
  vetsListData,
  checklistchart,
}: ChecklistButtonProps) {
  const [timeLabel, setTimeLabel] = useState('')
  useEffect(() => {
    if (!checklistchart.starttime) return

    const start = new Date(checklistchart.starttime).toLocaleTimeString(
      'ko-KR',
      { hour12: false },
    )
    const end = checklistchart.endtime
      ? new Date(checklistchart.endtime).toLocaleTimeString('ko-KR', {
          hour12: false,
        })
      : null

    if (start && end) {
      setTimeLabel(`(시작 : ${start} 종료 : ${end})`)
    } else if (start) {
      setTimeLabel(`(시작 : ${start})`)
    }
  }, [checklistchart.starttime, checklistchart.endtime])

  const { push } = useRouter()
  const { hos_id, target_date } = useParams()
  const pathname = usePathname()
  const SpeciesIcon = checklistchart.patients.species === 'canine' ? Dog : Cat
  //   const vetName = vetsListData.find(
  //     (vet) => vet.user_id === vets?.main_vet,
  //   )?.name

  const handlePatientButtonClick = () => {
    const isEdit = checklistchart.checklist_type ? true : false
    isEdit
      ? push(
          `/hospital/${hos_id}/checklist/${target_date}/chart/${checklistchart.checklist_id}/txchart?edit=${false}`,
        )
      : push(
          `/hospital/${hos_id}/checklist/${target_date}/chart/${checklistchart.checklist_id}/txchart?edit=${true}`,
        )
  }

  const selectedPatient = checklistchart.patients ?? {
    hos_patient_id: '',
    breed: 'canine',
  }
  const path = pathname.split('/')

  return (
    <Button
      variant="outline"
      size="sm"
      className={cn(
        'relative w-full py-11',
        checklistchart &&
          path.indexOf(checklistchart.checklist_id) !== -1 &&
          'border border-black bg-muted shadow-md',
      )}
      onClick={handlePatientButtonClick}
    >
      <div
        className={cn(
          'flex w-full flex-col justify-between',
          checklistchart.endtime && 'text-muted-foreground line-through',
        )}
      >
        <div className="mb-1 flex justify-between gap-2">
          <span className="flex items-center gap-1 text-sm">
            <SpeciesIcon />
            {selectedPatient.name}
          </span>

          <span className="max-w-[96px] truncate text-xs leading-5">
            {convertPascalCased(selectedPatient.breed ?? '')}
          </span>
          <span className="flex items-center gap-1 text-sm">
            {'환자ID(' + selectedPatient.hos_patient_id + ')'}
          </span>
        </div>
        {/* // */}
        <div className="mb-1 flex justify-between gap-2">
          <span className="max-w-[96px] truncate text-xs leading-5">
            {checklistchart.checklist_title}
          </span>
        </div>
        <div className="mb-1 flex justify-between gap-2">
          <span className="truncate text-xs leading-5">
            <span className="truncate text-xs leading-5">
              {checklistchart.due_date}
              {checklistchart.starttime && checklistchart.endtime
                ? '  완료'
                : checklistchart.starttime && !checklistchart.endtime
                  ? '  진행중'
                  : '  대기중'}
              {timeLabel}
            </span>
          </span>
        </div>
        {/* // */}
      </div>
    </Button>
  )
}

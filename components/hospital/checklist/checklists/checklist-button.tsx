import { Button } from '@/components/ui/button'
import { cn, convertPascalCased } from '@/lib/utils/utils'
import { Cat, Dog } from 'lucide-react'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ChecklistSidebarData } from '@/types/checklist/checklist-type'

type ChecklistButtonProps = {
  checklistchart: ChecklistSidebarData
}

export default function ChecklistButton({
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
  const SpeciesIcon =
    checklistchart.patient && checklistchart.patient.species === 'canine'
      ? Dog
      : Cat
  //   const vetName = vetsListData.find(
  //     (vet) => vet.user_id === vets?.main_vet,
  //   )?.name

  const handlePatientButtonClick = () => {
    const isEdit =
      checklistchart.checklist_type === '응급' || checklistchart.checklist_title
        ? true
        : false
    isEdit
      ? push(
          `/hospital/${hos_id}/checklist/${target_date}/chart/${checklistchart.checklist_id}/checklist?edit=${false}`,
        ) // 체크리스트 등록 후 기본정보 기록 안된경구(제목, 주치의 등)로 클릭시 edit창 바로 실행됨
      : push(
          `/hospital/${hos_id}/checklist/${target_date}/chart/${checklistchart.checklist_id}/checklist?edit=${true}`,
        ) // 체크리스트 등록 후 기본정보 기록완료 된 경우
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
        {checklistchart.patient ? (
          <div className="mb-1 flex justify-between gap-2">
            <span className="flex items-center gap-1 text-sm">
              <SpeciesIcon />
              {checklistchart.patient?.name}({checklistchart.weight}kg)
            </span>

            <span className="max-w-[96px] truncate text-xs leading-5">
              {convertPascalCased(checklistchart.patient?.breed ?? '')}
            </span>
            <span className="flex items-center gap-1 text-sm">
              {'환자ID(' + checklistchart.patient?.hos_patient_id + ')'}
            </span>
          </div>
        ) : (
          <div className="mb-1 flex justify-between gap-2">환자 미등록</div>
        )}
        {/* // */}

        <div className="mb-1 flex justify-between gap-2">
          <span className="truncate text-xs leading-5">
            ({checklistchart.checklist_type}) {checklistchart.checklist_title}
            {' ( '}
            {checklistchart.checklist_vet?.attending
              ? '담당의 :' + checklistchart.checklist_vet?.attending
              : ''}{' '}
            {' ) '}
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

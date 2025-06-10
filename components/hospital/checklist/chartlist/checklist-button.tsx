import { Button } from '@/components/ui/button'
import { cn, convertPascalCased } from '@/lib/utils/utils'
import { type IcuSidebarIoData, type Vet } from '@/types/icu/chart'
import { Cat, Dog, Stethoscope, User, Star } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { ChecklistSidebarData } from '@/types/checklist/checklistchart'

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
  const { push } = useRouter()
  const { hos_id, target_date } = useParams()

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

  return (
    <Button
      variant="outline"
      size="sm"
      className={cn(
        'relative w-full py-9',
        selectedPatient.hos_patient_id &&
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
            {'환자ID(' + selectedPatient.hos_patient_id + ')'}
          </span>
        </div>
        <div className="mb-1 flex justify-between gap-2">
          <span className="truncate text-xs leading-5">
            {checklistchart.due_date}
            {checklistchart.starttime && checklistchart.endtime
              ? '  완료'
              : checklistchart.starttime && !checklistchart.endtime
                ? '  진행중'
                : '  대기중'}
          </span>
        </div>
        <div className="mb-1 flex justify-between gap-2">
          <span className="flex items-center gap-1 text-sm">
            <SpeciesIcon />
            {selectedPatient.name}
          </span>

          <span className="max-w-[96px] truncate text-xs leading-5">
            {convertPascalCased(selectedPatient.breed ?? '')}
          </span>
        </div>

        {/* <div className="flex justify-between gap-2">
          <span className="text- ml-[2px] flex items-center gap-1 text-xs">
            <Stethoscope style={{ width: 12, height: 12 }} />
            {vetName ?? '미지정'}
          </span>

          <span className="flex items-center gap-1 truncate text-xs">
            <User style={{ width: 12, height: 12 }} />
            <span className="truncate">{patient.owner_name || '미지정'}</span>
          </span>
        </div> */}
      </div>
    </Button>
  )
}

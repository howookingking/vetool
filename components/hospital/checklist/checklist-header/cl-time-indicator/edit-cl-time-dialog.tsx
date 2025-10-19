import SubmitButton from '@/components/common/submit-button'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  resetChecklistTime,
  updateChecklistTime,
} from '@/lib/services/checklist/update-checklist'
import { set } from 'date-fns'
import { EditIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

type Props = {
  startTime: string // 2025-10-17T07:42:48.866+00:00
  endTime: string
  checklistId: string
}

export default function EditClTimeDialog({
  startTime,
  endTime,
  checklistId,
}: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  const [startTimeInput, setStartTimeInput] = useState(
    formatTimeToHHMM(startTime),
  )
  const [endTimeInput, setEndTimeInput] = useState(formatTimeToHHMM(endTime))

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault()

    setIsUpdating(true)

    updateChecklistTime(
      checklistId,
      localTimeToUTCISO(startTimeInput),
      localTimeToUTCISO(endTimeInput),
    )

    toast.success('시간을 변경하였습니다')

    setIsUpdating(false)

    setIsDialogOpen(false)
  }

  const handleReset = () => resetChecklistTime(checklistId)

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <EditIcon />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>시간 수정</DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <form onSubmit={handleUpdate}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Label className="shrink-0" htmlFor="startTime">
                시작 :
              </Label>
              <Input
                id="startTime"
                name="startTime"
                type="time"
                value={startTimeInput}
                onChange={(e) => setStartTimeInput(e.target.value)}
              />
            </div>

            <span>/</span>

            <div className="flex items-center gap-2">
              <Label className="shrink-0" htmlFor="startTime">
                종료 :
              </Label>
              <Input
                id="startTime"
                name="startTime"
                type="time"
                value={endTimeInput}
                onChange={(e) => setEndTimeInput(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline" size="sm">
                닫기
              </Button>
            </DialogClose>

            <DialogClose asChild>
              <Button variant="secondary" size="sm" onClick={handleReset}>
                초기화
              </Button>
            </DialogClose>

            <SubmitButton
              buttonText="변경"
              isPending={isUpdating}
              type="submit"
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function formatTimeToHHMM(dateString: string) {
  return new Date(dateString).toTimeString().substring(0, 5)
}

function localTimeToUTCISO(timeStr: string) {
  const now = new Date()
  const [hours, minutes] = timeStr.split(':').map(Number)

  // 오늘 날짜 + 입력 시간으로 새 Date 객체 생성 (로컬 기준)
  const localDate = set(now, {
    hours,
    minutes,
    seconds: 0,
    milliseconds: 0,
  })

  return localDate.toISOString()
}

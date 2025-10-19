'use client'

import { Button } from '@/components/ui/button'
import {
  startChecklistTime,
  stopChecklistTime,
} from '@/lib/services/checklist/update-checklist'
import { StopIcon } from '@radix-ui/react-icons'
import { PlayIcon } from 'lucide-react'
import EditClTimeDialog from './edit-cl-time-dialog'

type Props = {
  startTime: string | null
  endTime: string | null
  checklistId: string
}

export default function ClTimeIndicator({
  endTime,
  startTime,
  checklistId,
}: Props) {
  const hasStarted = startTime !== null
  const hasEnded = endTime !== null

  const hasStartedAndNotEnded = hasStarted && !hasEnded
  const hasStartedAndEnded = hasStarted && hasEnded
  const hasNotStarted = !hasStarted

  return (
    <div className="absolute left-2 flex items-center">
      {hasNotStarted && (
        <Button
          size="icon"
          variant="outline"
          onClick={() => startChecklistTime(checklistId)}
        >
          <PlayIcon />
        </Button>
      )}

      {hasStartedAndNotEnded && (
        <div className="flex items-center gap-2 text-sm">
          <Button
            variant="outline"
            size="icon"
            onClick={() => stopChecklistTime(checklistId)}
          >
            <StopIcon />
          </Button>
          <p className="text-muted-foreground">
            시작 : {new Date(startTime).toTimeString().slice(0, 8)}
          </p>
        </div>
      )}

      {hasStartedAndEnded && (
        <div className="flex items-center gap-2 text-sm">
          <EditClTimeDialog
            startTime={startTime}
            endTime={endTime}
            checklistId={checklistId}
          />
          <p className="text-muted-foreground">
            시작 : {new Date(startTime).toTimeString().slice(0, 8)} / 종료 :{' '}
            {new Date(endTime).toTimeString().slice(0, 8)}
          </p>
        </div>
      )}
    </div>
  )
}

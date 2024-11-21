import { Checkbox } from '@/components/ui/checkbox'
import { toast } from '@/components/ui/use-toast'
import { updateIsVisitDone } from '@/lib/services/icu/out-and-visit/visit-chart'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function CompleteVisitButton({
  visitId,
  isDone,
}: {
  visitId: string
  isDone: boolean
}) {
  const [isDoneState, setIsDoneState] = useState(isDone)
  const [isUpdating, setIsUpdating] = useState(false)
  const { refresh } = useRouter()

  const handleCompleteVisitButton = async () => {
    setIsUpdating(true)

    await updateIsVisitDone(visitId, !isDone)

    toast({
      title: `${isDone ? '면회완료를 취소하였습니다' : '면회를 완료하였습니다'}`,
    })

    setIsUpdating(false)
    setIsDoneState((prev) => !prev)
    refresh()
  }

  useEffect(() => {
    setIsDoneState(isDone)
  }, [isDone])

  return (
    <Checkbox
      checked={isDoneState}
      onClick={handleCompleteVisitButton}
      disabled={isUpdating}
      className="mr-2"
    />
  )
}

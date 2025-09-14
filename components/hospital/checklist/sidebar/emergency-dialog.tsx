'use client'

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { registerEmergencyChecklist } from '@/lib/services/checklist/register-checklist-patient'
import { LoaderCircleIcon, SirenIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type Props = {
  hosId: string
  targetDate: string
}

export function EmergencyDialog({ hosId, targetDate }: Props) {
  const { push } = useRouter()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleConfirm = async () => {
    setIsSubmitting(true)

    const returningChecklistId = await registerEmergencyChecklist(
      hosId,
      targetDate,
    )

    toast({
      title: '응급환자 등록 완료',
    })

    setIsSubmitting(false)
    setIsDialogOpen(false)

    push(
      `/hospital/${hosId}/checklist/${targetDate}/chart/${returningChecklistId}/checklist`,
    )
  }

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="secondary" className="w-1/2" size="sm">
          <SirenIcon />
          EMERGENCY
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>응급환자를 등록합니다</AlertDialogTitle>
          <AlertDialogDescription>
            환자는 정보는 추후에 등록하실 수 있습니다
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>닫기</AlertDialogCancel>
          <Button
            className="w-14"
            onClick={handleConfirm}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <LoaderCircleIcon className="animate-spin" />
            ) : (
              '확인'
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

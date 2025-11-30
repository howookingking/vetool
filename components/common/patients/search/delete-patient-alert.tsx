import WarningMessage from '@/components/common/warning-message'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { deletePatient } from '@/lib/services/patient/patient'
import { cn } from '@/lib/utils/utils'
import { LoaderCircleIcon, Trash2Icon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import type { DebouncedState } from 'use-debounce'

type Props = {
  patientName: string
  patientId: string
  debouncedSearch: DebouncedState<() => Promise<void>>
}

export default function DeletePatientAlert({
  patientName,
  patientId,
  debouncedSearch,
}: Props) {
  const [isLoading, setIsLoading] = useState(false)

  const handleDeletePatient = async (patientId: string) => {
    setIsLoading(true)

    await deletePatient(patientId)

    toast(`${patientName}이(가) 삭제되었습니다.`)

    setIsLoading(false)
    debouncedSearch()
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="icon" variant="ghost">
          <Trash2Icon size={16} />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{patientName} 삭제</AlertDialogTitle>
          <AlertDialogDescription>
            등록된 환자를 삭제합니다
            <WarningMessage
              text="이 동작은 되돌릴 수
            없습니다"
            />
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>닫기</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDeletePatient(patientId)}
            className="bg-destructive hover:bg-destructive/90"
          >
            삭제
            <LoaderCircleIcon
              className={cn(isLoading ? 'ml-2 animate-spin' : 'hidden')}
            />
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

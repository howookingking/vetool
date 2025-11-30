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
import { deleteStaff } from '@/lib/services/admin/staff'
import { cn } from '@/lib/utils/utils'
import { LoaderCircle, UserRoundMinus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

type Props = {
  name: string
  userId: string
  masterUserId: string
}

export function DeleteUserColumn({ name, userId, masterUserId }: Props) {
  const { refresh } = useRouter()

  const [isUpdating, setIsUpdating] = useState(false)

  const handleDeleteStaff = async () => {
    setIsUpdating(true)

    await deleteStaff(userId)

    toast.success(`${name}님을 스태프목록에서 삭제하였습니다`)

    setIsUpdating(false)
    refresh()
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          disabled={userId === masterUserId || isUpdating}
        >
          <UserRoundMinus size={14} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>스태프 삭제</AlertDialogTitle>
          <AlertDialogDescription>
            {name}님을 스태프목록에서 삭제하시겠습니까?
            <WarningMessage text="해당 작업은 되돌릴 수 없습니다" />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>닫기</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive hover:bg-destructive/80"
            disabled={isUpdating}
            onClick={handleDeleteStaff}
          >
            삭제
            <LoaderCircle
              className={cn(isUpdating ? 'ml-2 animate-spin' : 'hidden')}
            />
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

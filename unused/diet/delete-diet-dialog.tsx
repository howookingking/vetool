'use client'

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
import { deleteDietData } from '@/lib/services/admin/diet'
import { LoaderCircle, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function DeleteDietDialog({
  dietProductId,
  name,
}: {
  dietProductId: string
  name: string
}) {
  const [isDeleting, setIsDeleting] = useState(false)
  const { refresh } = useRouter()

  const handleDeleteDietClick = async () => {
    setIsDeleting(true)

    await deleteDietData(dietProductId)

    // toast({
    //   title: `${name} 사료를 삭제하였습니다`,
    // })

    setIsDeleting(false)
    refresh()
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Trash2 size={16} />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{name}을(를) 삭제하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>
            <WarningMessage text="해당 작업은 되돌릴 수 없습니다" />
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteDietClick}
            className="bg-destructive hover:bg-destructive/90"
          >
            삭제
            {isDeleting && <LoaderCircle className="ml-2 h-4 w-4" />}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

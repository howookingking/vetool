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
import { toast } from '@/components/ui/use-toast'
import { LoaderCircle, Trash2 } from 'lucide-react'
import { useState } from 'react'

export default function DeleteDrugDialog({
  id,
  drugName,
}: {
  id: string
  drugName: string
}) {
  const [isDeleting, setIsDeleting] = useState(false)

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 rounded-full p-0">
          <Trash2 size={16} />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {drugName} 약물을 삭제하시겠습니까?
          </AlertDialogTitle>
          <AlertDialogDescription>
            <WarningMessage text="해당 작업은 되돌릴 수 없습니다" />
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {}}
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

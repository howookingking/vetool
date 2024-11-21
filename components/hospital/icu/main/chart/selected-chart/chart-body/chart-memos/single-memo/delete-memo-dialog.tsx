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
import { Trash2 } from 'lucide-react'
import React from 'react'

export default function DeleteMemoDialog({
  onDelete,
}: {
  onDelete: () => void
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Trash2 size={14} className="hover:opacity-70" />
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>해당 메모를 삭제하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>
            <WarningMessage text="해당 작업은 되돌릴 수 없습니다" />
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction
            onClick={onDelete}
            className="bg-destructive hover:bg-destructive/90"
          >
            삭제
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

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
import { deleteTemplateChart } from '@/lib/services/icu/template/template'
import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function DeleteBookmarkDialog({
  bookmarkId,
  bookmarkName,
}: {
  bookmarkId: string
  bookmarkName: string
}) {
  const { refresh } = useRouter()

  const handleDelete = async () => {
    await deleteTemplateChart(bookmarkId)

    toast({
      title: `${bookmarkName} 북마크가 삭제되었습니다`,
    })

    refresh()
  }

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
            {bookmarkName} 북마크를 삭제하시겠습니까?
          </AlertDialogTitle>
          <AlertDialogDescription>
            <WarningMessage text="해당 작업은 되돌릴 수 없습니다" />
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-destructive hover:bg-destructive/90"
          >
            삭제
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

import { Button } from '@/components/ui/button'
import { deleteNotice } from '@/lib/services/hospital-home/notice'
import { LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { type Dispatch, type SetStateAction, useState } from 'react'

export default function DeleteNoticeButton({
  noticeId,
  setIsDialogOpen,
}: {
  noticeId: string
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
}) {
  const [isDeleting, setIsDeleting] = useState(false)
  const { refresh } = useRouter()
  const handleDeleteNotice = async () => {
    setIsDeleting(true)
    await deleteNotice(noticeId)
    setIsDialogOpen(false)
    setIsDeleting(false)
    refresh()
  }

  return (
    <Button
      type="button"
      variant="destructive"
      onClick={handleDeleteNotice}
      disabled={isDeleting}
    >
      삭제
      {isDeleting && <LoaderCircle className="ml-2 h-4 w-4 animate-spin" />}
    </Button>
  )
}

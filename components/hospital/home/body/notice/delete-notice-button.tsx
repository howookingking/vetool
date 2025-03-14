import { Button } from '@/components/ui/button'
import { deleteNotice } from '@/lib/services/hospital-home/notice'
import { useRouter } from 'next/navigation'
import { type Dispatch, type SetStateAction } from 'react'

type DeleteNoticeButtonProps = {
  noticeId: string
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
}
export default function DeleteNoticeButton({
  noticeId,
  setIsDialogOpen,
}: DeleteNoticeButtonProps) {
  const { refresh } = useRouter()

  const handleDeleteNotice = async () => {
    setIsDialogOpen(false)

    await deleteNotice(noticeId)

    refresh()
  }

  return (
    <Button type="button" variant="destructive" onClick={handleDeleteNotice}>
      삭제
    </Button>
  )
}

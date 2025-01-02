import { Button } from '@/components/ui/button'
import { deleteNotice } from '@/lib/services/hospital-home/notice'
import { useRouter } from 'next/navigation'
import { type Dispatch, type SetStateAction } from 'react'

export default function DeleteNoticeButton({
  noticeId,
  setIsDialogOpen,
}: {
  noticeId: string
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
}) {
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

import CommonDialogFooter from '@/components/common/common-dialog-footer'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { approveStaff } from '@/lib/services/admin/approval'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

type Props = {
  userId: string
  name: string
  isApproved: boolean
}

export function ApprovalColumn({ userId, name, isApproved }: Props) {
  const { hos_id } = useParams()
  const { refresh } = useRouter()

  const [isUpdating, setIsUpdating] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleApproval = async () => {
    setIsUpdating(true)

    await approveStaff(hos_id as string, userId)

    toast.success(`${name}님을 스태프목록에 추가하였습니다`, {
      description: '스태프관리에서 스테프설정을 변경할 수 있습니다',
    })

    setIsUpdating(false)
    setIsDialogOpen(false)
    refresh()
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          disabled={isApproved}
          variant={isApproved ? 'secondary' : 'default'}
        >
          {isApproved ? '승인완료' : '승인'}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>스태프 추가</DialogTitle>
          <DialogDescription>
            {name}님을 스태프 목록에 추가하시겠습니까?
          </DialogDescription>
        </DialogHeader>

        <CommonDialogFooter
          handleClick={handleApproval}
          isPending={isUpdating}
          buttonName="추가"
        />
      </DialogContent>
    </Dialog>
  )
}

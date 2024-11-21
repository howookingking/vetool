import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { toast } from '@/components/ui/use-toast'
import { approveStaff } from '@/lib/services/admin/approval/approval'
import { cn } from '@/lib/utils/utils'
import { LoaderCircle } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'

export function ApprovalColumn({
  userId,
  name,
  isApproved,
}: {
  userId: string
  name: string
  isApproved: boolean
}) {
  const [isUpdating, setIsUpdating] = useState(false)
  const [isDialogOpen, setIsOpen] = useState(false)
  const { hos_id } = useParams()
  const { refresh } = useRouter()

  const handleApproval = async () => {
    setIsUpdating(true)
    await approveStaff(hos_id as string, userId)
    toast({
      title: `${name}님을 스태프목록에 추가하였습니다`,
      description: '스태프관리에서 스테프설정을 변경할 수 있습니다',
    })
    setIsUpdating(false)
    setIsOpen(false)
    refresh()
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsOpen}>
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

        <DialogFooter className="ml-auto">
          <DialogClose asChild>
            <Button type="button" tabIndex={-1} variant="secondary">
              닫기
            </Button>
          </DialogClose>

          <Button type="button" onClick={handleApproval} disabled={isUpdating}>
            추가
            <LoaderCircle
              className={cn(isUpdating ? 'ml-2 animate-spin' : 'hidden')}
            />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

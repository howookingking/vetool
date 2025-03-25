import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { updateHosGroupList } from '@/lib/services/admin/staff'
import { cn } from '@/lib/utils/utils'
import { Edit, LoaderCircle, X } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'

export function GroupListDialog({ groupList }: { groupList: string[] }) {
  const { refresh } = useRouter()
  const { hos_id } = useParams()

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [tempGroupList, setTempGroupList] = useState(groupList)
  const [groupInput, setGroupInput] = useState('')

  const handleSubmit = async () => {
    if (JSON.stringify(tempGroupList) === JSON.stringify(groupList)) {
      setIsDialogOpen(false)
      return
    }

    setIsSubmitting(true)

    await updateHosGroupList(hos_id as string, tempGroupList)

    toast({
      title: '병원 그룹목록을 변경하였습니다',
    })
    setIsDialogOpen(false)
    setIsSubmitting(false)
    refresh()
  }

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing || event.key !== 'Enter') return
    setTempGroupList([...tempGroupList, groupInput])
    setGroupInput('')
  }

  const handleOpenchange = (open: boolean) => {
    if (open) {
      setGroupInput('')
      setTempGroupList(groupList)
    }
    setIsDialogOpen(open)
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleOpenchange}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-6 w-6">
          <Edit size={12} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>그룹 설정</DialogTitle>
          <DialogDescription>
            Enter를 눌러 목록에 추가 후 수정을 눌러주세요
          </DialogDescription>
        </DialogHeader>
        <ul className="flex flex-wrap items-center gap-1">
          {tempGroupList.map((item, index) => (
            <li key={`${item}-${index}`}>
              <Badge
                className="flex cursor-pointer gap-1"
                onClick={() =>
                  setTempGroupList(
                    tempGroupList.filter((group) => group !== item),
                  )
                }
              >
                {item}
                <X size={14} />
              </Badge>
            </li>
          ))}
        </ul>

        <Input
          type="text"
          placeholder="Enter를 누르면 추가됩니다"
          onChange={(e) => setGroupInput(e.target.value)}
          onKeyDown={handleEnter}
          value={groupInput}
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="ml-auto"
          onClick={handleSubmit}
        >
          수정
          <LoaderCircle
            className={cn(isSubmitting ? 'ml-2 animate-spin' : 'hidden')}
          />
        </Button>
      </DialogContent>
    </Dialog>
  )
}

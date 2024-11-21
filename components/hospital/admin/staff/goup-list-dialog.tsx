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
import { updateHosGroupList } from '@/lib/services/admin/staff/staff'
import { cn } from '@/lib/utils/utils'
import { Edit, LoaderCircle, X } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export function GroupListDialog({ groupList }: { groupList: string[] }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [tempGroupList, setTempGroupList] = useState(groupList)
  const [groupInput, setGroupInput] = useState('')
  const { hos_id } = useParams()
  const { refresh } = useRouter()

  useEffect(() => {
    if (!isOpen) {
      setTempGroupList(groupList)
    }
  }, [groupList, isOpen])

  const handleSubmit = async () => {
    setIsSubmitting(true)

    await updateHosGroupList(hos_id as string, tempGroupList)

    toast({
      title: '병원 그룹목록을 변경하였습니다',
    })
    setIsOpen(false)
    setIsSubmitting(false)
    refresh()
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
          {tempGroupList.map((item) => (
            <li key={item}>
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
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const target = e.currentTarget
              setTimeout(() => {
                setTempGroupList([...tempGroupList, groupInput])
                setGroupInput('')
              }, 0)
            }
          }}
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

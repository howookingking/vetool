import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { updateStaffIsAdmin } from '@/lib/services/admin/staff'
import { Crown, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

type Props = {
  isAdmin: boolean
  userId: string
  masterUserId: string
}

export default function IsAdminColumn({
  isAdmin,
  userId,
  masterUserId,
}: Props) {
  const { refresh } = useRouter()

  const [isAdminInput, setIsAdminInput] = useState(
    isAdmin ? '관리자' : '사용자',
  )
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    setTimeout(() => setIsAdminInput(isAdmin ? '관리자' : '사용자'), 0)
  }, [isAdmin])

  const handleUpdateIsAdmin = async (value: string) => {
    const parsedIsAdmin = value === '관리자'

    setIsUpdating(true)

    await updateStaffIsAdmin(userId, parsedIsAdmin)

    toast.success('관리자여부를 변경하였습니다')

    setIsUpdating(false)
    refresh()
  }

  return (
    <Select
      defaultValue={isAdmin ? '관리자' : '사용자'}
      value={isAdminInput}
      onValueChange={(value) => {
        setIsAdminInput(value)
        handleUpdateIsAdmin(value)
      }}
      disabled={userId === masterUserId}
    >
      <SelectTrigger className="mx-auto w-[128px]" disabled={isUpdating}>
        <SelectValue placeholder="관리자" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="관리자">
            <div className="flex items-center gap-2">
              <Crown size={14} />
              <span>관리자</span>
            </div>
          </SelectItem>
          <SelectItem value="사용자">
            <div className="flex items-center gap-2">
              <User size={14} />
              <span>사용자</span>
            </div>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

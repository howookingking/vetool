import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from '@/components/ui/use-toast'
import { updateStaffIsAdmin } from '@/lib/services/admin/staff'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

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
    setIsAdminInput(isAdmin ? '관리자' : '사용자')
  }, [isAdmin])

  const handleUpdateIsAdmin = async (value: string) => {
    const parsedIsAdmin = value === '관리자'

    setIsUpdating(true)

    await updateStaffIsAdmin(userId, parsedIsAdmin)

    toast({
      title: '관리자여부를 변경하였습니다',
    })

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
          <SelectItem value="관리자">관리자</SelectItem>
          <SelectItem value="사용자">사용자</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from '@/components/ui/use-toast'
import { updateStaffIsVet } from '@/lib/services/admin/staff'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type Props = {
  isVet: boolean
  userId: string
}

export default function IsVetColumn({ isVet, userId }: Props) {
  const { refresh } = useRouter()

  const [isVetIput, setIsVetIput] = useState(isVet ? '수의사' : '일반직원')
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    setIsVetIput(isVet ? '수의사' : '일반직원')
  }, [isVet])

  const handleUpdateIsVet = async (value: string) => {
    const parsedIsVet = value === '수의사'

    setIsUpdating(true)

    await updateStaffIsVet(userId, parsedIsVet)

    toast({
      title:
        value === '수의사'
          ? '수의사로 설정되었습니다'
          : '일반직원으로 설정되었습니다',
    })
    setIsUpdating(false)
    refresh()
  }

  return (
    <Select
      defaultValue={isVet ? '수의사' : '일반직원'}
      disabled={isUpdating}
      value={isVetIput}
      onValueChange={(value) => {
        setIsVetIput(value)
        handleUpdateIsVet(value)
      }}
    >
      <SelectTrigger disabled={isUpdating} className="mx-auto w-[128px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="수의사">수의사</SelectItem>
          <SelectItem value="일반직원">일반직원</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

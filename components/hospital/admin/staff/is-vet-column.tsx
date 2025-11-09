import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { updateStaffIsVet } from '@/lib/services/admin/staff'
import { Stethoscope, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

type Props = {
  isVet: boolean
  userId: string
}

export default function IsVetColumn({ isVet, userId }: Props) {
  const { refresh } = useRouter()

  const [isVetIput, setIsVetIput] = useState(isVet ? '수의사' : '일반직원')
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    setTimeout(() => setIsVetIput(isVet ? '수의사' : '일반직원'), 0)
  }, [isVet])

  const handleUpdateIsVet = async (value: string) => {
    const parsedIsVet = value === '수의사'

    setIsUpdating(true)

    await updateStaffIsVet(userId, parsedIsVet)

    toast.success(
      value === '수의사'
        ? '수의사로 설정되었습니다'
        : '일반직원으로 설정되었습니다',
    )

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
          <SelectItem value="수의사">
            <div className="flex items-center gap-2">
              <Stethoscope size={14} />
              <span>수의사</span>
            </div>
          </SelectItem>
          <SelectItem value="일반직원">
            <div className="flex items-center gap-2">
              <User size={14} />
              <span>일반직원</span>
            </div>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from '@/components/ui/use-toast'
import { updateStaffIsVet } from '@/lib/services/admin/staff/staff'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function IsVetColumn({
  isVet,
  userId,
}: {
  isVet: boolean
  userId: string
}) {
  const [isVetIput, setIsVetIput] = useState(isVet ? 'true' : 'false')
  const [isUpdating, setIsUpdating] = useState(false)
  const { refresh } = useRouter()

  useEffect(() => {
    setIsVetIput(isVet ? 'true' : 'false')
  }, [isVet])

  const handleUpdateIsVet = async (value: string) => {
    const parsedIsVet = value === 'true'

    setIsUpdating(true)
    await updateStaffIsVet(userId, parsedIsVet)

    toast({
      title: '수의사여부를 변경하였습니다',
    })

    setIsUpdating(false)
    refresh()
  }

  return (
    <Select
      defaultValue={isVet ? 'true' : 'false'}
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
          <SelectItem value="true">O</SelectItem>
          <SelectItem value="false">X</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from '@/components/ui/use-toast'
import { updateDrugType } from '@/lib/services/settings/drug-settings'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function TypeColumn({
  drugProductId,
  hosId,
  type,
}: {
  drugProductId: string
  hosId: string
  type: string
}) {
  const [isUpdating, setIsUpdating] = useState(false)
  const { refresh } = useRouter()

  const handleDrugTypeChange = async (value: string) => {
    setIsUpdating(true)
    await updateDrugType(drugProductId, hosId, value)

    toast({
      title: `약물 유형을 변경하였습니다`,
    })

    setIsUpdating(false)
    refresh()
  }

  return (
    <Select
      defaultValue={type}
      onValueChange={handleDrugTypeChange}
      disabled={isUpdating}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="ample">ample</SelectItem>
          <SelectItem value="capsule">capsule</SelectItem>
          <SelectItem value="vial">vial</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

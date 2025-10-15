import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { updateUnit } from '@/lib/services/admin/icu/hos-drugs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

type Props = {
  unit: string
  hosDrugId: string
}

export default function UnitColumn({ unit, hosDrugId }: Props) {
  const { refresh } = useRouter()

  const [selectedUnit, setSelectedUnit] = useState(unit)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    setSelectedUnit(unit)
  }, [unit])

  const handleUpdateUnit = async (value: string) => {
    setIsUpdating(true)
    await updateUnit(value, hosDrugId)

    toast.success('단위를 변경하였습니다')

    setIsUpdating(false)
    refresh()
  }

  return (
    <Select
      defaultValue={selectedUnit}
      disabled={isUpdating}
      value={selectedUnit}
      onValueChange={(value) => {
        setSelectedUnit(value)
        handleUpdateUnit(value)
      }}
    >
      <SelectTrigger disabled={isUpdating} className="w-[132px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="mg">mg</SelectItem>
          <SelectItem value="g">g</SelectItem>
          <SelectItem value="μg">μg</SelectItem>
          <SelectItem value="U">U</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

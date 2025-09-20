import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { updateRoute } from '@/lib/services/admin/icu/hos-drugs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

type Props = {
  route: string
  hosDrugId: string
}

export default function RouteColumn({ route, hosDrugId }: Props) {
  const { refresh } = useRouter()

  const [selectedRoute, setSelectedRoute] = useState(route)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    setSelectedRoute(route)
  }, [route])

  const handleUpdateRoute = async (value: string) => {
    setIsUpdating(true)
    await updateRoute(value, hosDrugId)

    toast.success('주사투여경로를 변경하였습니다')

    setIsUpdating(false)
    refresh()
  }

  return (
    <Select
      defaultValue={selectedRoute}
      disabled={isUpdating}
      value={selectedRoute}
      onValueChange={(value) => {
        setSelectedRoute(value)
        handleUpdateRoute(value)
      }}
    >
      <SelectTrigger disabled={isUpdating} className="w-[132px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="IV">IV</SelectItem>
          <SelectItem value="SC">SC</SelectItem>
          <SelectItem value="IM">IM</SelectItem>
          <SelectItem value="ETC">기타</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

import { Button } from '@/components/ui/button'
import { toggleHospitalDietPin } from '@/lib/services/admin/diet/diet'
import { cn } from '@/lib/utils/utils'
import { Pin } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

export default function PinButton({
  isPinned,
  dietProductid,
  isMine,
}: {
  isPinned: boolean
  dietProductid: string
  isMine?: boolean
}) {
  const { hos_id } = useParams()
  const { refresh } = useRouter()
  const hadleTogglePin = async () => {
    await toggleHospitalDietPin(isPinned, dietProductid, hos_id as string)

    refresh()
  }

  if (isMine) return null

  return (
    <Button size="icon" variant="ghost" onClick={hadleTogglePin}>
      <Pin className={cn(isPinned && 'fill-primary', 'text-primary')} />
    </Button>
  )
}

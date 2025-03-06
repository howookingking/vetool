import { Button } from '@/components/ui/button'
import { toggleHospitalDietPin } from '@/lib/services/admin/diet/diet'
import { cn } from '@/lib/utils/utils'
import { LoaderCircle, Pin } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'

export default function PinButton({
  isPinned,
  dietProductId,
  isMine,
}: {
  isPinned: boolean
  dietProductId: string
  isMine?: boolean
}) {
  const [isLoading, setIsLoading] = useState(false)

  const { hos_id } = useParams()
  const { refresh } = useRouter()

  const hadleTogglePin = async () => {
    setIsLoading(true)

    await toggleHospitalDietPin(isPinned, dietProductId, hos_id as string)
      .then(refresh)
      .then(() =>
        setTimeout(() => {
          setIsLoading(false)
        }, 100),
      )
  }

  if (isMine) return null

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={hadleTogglePin}
      disabled={isLoading}
    >
      {isLoading ? (
        <LoaderCircle className="animate-spin" />
      ) : (
        <Pin className={cn(isPinned && 'fill-primary', 'text-primary')} />
      )}
    </Button>
  )
}

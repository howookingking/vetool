import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { updateStaffPosition } from '@/lib/services/admin/staff'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type Props = {
  position: string
  userId: string
}

export default function PositionColumn({ position, userId }: Props) {
  const { refresh } = useRouter()

  const [positionInput, setPositionInput] = useState(position)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    setPositionInput(position)
  }, [position])

  const handleUpdatePosition = async () => {
    if (position === positionInput) {
      return
    }

    if (positionInput && positionInput.length > 10) {
      toast({
        variant: 'destructive',
        title: '10자 내로 입력해주세요',
      })
      setPositionInput(position)
      return
    }

    setIsUpdating(true)

    await updateStaffPosition(userId, positionInput)

    toast({
      title: '직책을을 변경하였습니다',
    })
    setIsUpdating(false)
    refresh()
  }

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing || event.key !== 'Enter') return
    event.currentTarget.blur()
  }

  return (
    <Input
      className="mx-auto w-40"
      value={positionInput ?? ''}
      onChange={(e) => setPositionInput(e.target.value)}
      onBlur={handleUpdatePosition}
      disabled={isUpdating}
      onKeyDown={handleEnter}
    />
  )
}

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { updateStaffName } from '@/lib/services/admin/staff'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type Props = {
  userId: string
  avatarUrl: string | null
  name: string
}

export default function NameColumn({ userId, avatarUrl, name }: Props) {
  const { refresh } = useRouter()

  const [nameInput, setNameInput] = useState(name)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    setNameInput(name)
  }, [name])

  const handleUpdatePosition = async () => {
    if (name === nameInput) {
      return
    }

    if (nameInput && nameInput.length > 10) {
      toast({
        variant: 'destructive',
        title: '10자 내로 입력해주세요',
      })

      setNameInput(name)
      return
    }

    setIsUpdating(true)

    await updateStaffName(userId, nameInput)

    toast({
      title: '스태프 이름을 변경하였습니다',
    })
    setIsUpdating(false)
    refresh()
  }

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing || event.key !== 'Enter') return
    event.currentTarget.blur()
  }

  return (
    <div className="flex items-center justify-center gap-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src={avatarUrl ?? ''} alt={name ?? 'user avatar image'} />
        <AvatarFallback>{name.slice(0, 2)}</AvatarFallback>
      </Avatar>

      <Input
        className="w-20"
        value={nameInput}
        onChange={(e) => setNameInput(e.target.value)}
        onBlur={handleUpdatePosition}
        disabled={isUpdating}
        onKeyDown={handleEnter}
      />
    </div>
  )
}

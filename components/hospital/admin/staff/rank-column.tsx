import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { updateStaffRank } from '@/lib/services/admin/staff'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type Props = {
  rank: number
  userId: string
  masterUserId: string
}

export default function RankColumn({ rank, userId, masterUserId }: Props) {
  const { refresh } = useRouter()

  const [rankInput, setRankInput] = useState(rank.toString())
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    setRankInput(rank.toString())
  }, [rank])

  const handleUpdateRank = async () => {
    const parsedRank = Number(rankInput)

    if (parsedRank === rank) {
      return
    }

    if (isNaN(parsedRank) || parsedRank <= 0 || parsedRank > 500) {
      toast({
        variant: 'destructive',
        title: '500이하의 자연수를 입력해주세요',
      })
      setRankInput(rank.toString())
      return
    }

    setIsUpdating(true)

    await updateStaffRank(userId, rankInput)

    toast({
      title: '순번을 변경하였습니다',
    })
    setIsUpdating(false)
    refresh()
  }

  return (
    <Input
      className="mx-auto w-14"
      disabled={userId === masterUserId || isUpdating}
      value={rankInput}
      onChange={(e) => setRankInput(e.target.value)}
      onBlur={handleUpdateRank}
      onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
    />
  )
}

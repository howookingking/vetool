import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
// import { updateDrugProduct } from '@/lib/services/settings/drug-settings'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function DescriptionColumn({
  hosId,
  drugProductId,
  description,
}: {
  hosId: string
  drugProductId: string
  description: string
}) {
  const [descInput, setDescInput] = useState(description)
  const [isUpdating, setIsUpdating] = useState(false)
  const { refresh } = useRouter()

  useEffect(() => {
    setDescInput(description)
  }, [description])

  const handleUpdateDrugDesc = async () => {
    if (description === descInput) return

    setIsUpdating(true)

    // await updateDrugProduct(hosId, drugProductId, 'description', descInput)

    toast({
      title: '약물 설명을 변경하였습니다',
    })

    setIsUpdating(false)
    refresh()
  }

  return (
    <HoverCard>
      <HoverCardTrigger>
        <Input
          className="min-w-32 truncate"
          value={descInput}
          onChange={(e) => setDescInput(e.target.value)}
          onBlur={handleUpdateDrugDesc}
          disabled={isUpdating}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const target = e.currentTarget
              setTimeout(() => {
                if (target) {
                  target.blur()
                }
              }, 0)
            }
          }}
        />
      </HoverCardTrigger>
      <HoverCardContent>{descInput}</HoverCardContent>
    </HoverCard>
  )
}

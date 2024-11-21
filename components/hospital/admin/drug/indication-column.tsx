import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { updateDrugIndication } from '@/lib/services/settings/drug-settings'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function IndicationColumn({
  hosId,
  drugDescriptionId,
  indication,
}: {
  hosId: string
  drugDescriptionId: string
  indication: string
}) {
  const [indicationInput, setIndicationInput] = useState(indication)
  const [isUpdating, setIsUpdating] = useState(false)
  const { refresh } = useRouter()

  useEffect(() => {
    setIndicationInput(indication)
  }, [indication])

  const handleUpdateIndication = async () => {
    if (indication === indicationInput) return

    setIsUpdating(true)

    await updateDrugIndication(hosId, drugDescriptionId, indicationInput)

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
          value={indicationInput}
          onChange={(e) => setIndicationInput(e.target.value)}
          onBlur={handleUpdateIndication}
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
      <HoverCardContent>{indicationInput}</HoverCardContent>
    </HoverCard>
  )
}

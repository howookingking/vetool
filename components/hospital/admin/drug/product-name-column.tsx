import { Input } from '@/components/ui/input'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { toast } from '@/components/ui/use-toast'
import { updateDrugIndication } from '@/lib/services/settings/drug-settings'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function ProductNameColumn({
  hosId,
  id,
  productName,
}: {
  hosId: string
  id: string
  productName: string
}) {
  const [productNameInput, setProductNameInpur] = useState(productName)
  const [isUpdating, setIsUpdating] = useState(false)
  const { refresh } = useRouter()

  useEffect(() => {
    setProductNameInpur(productName)
  }, [productName])

  const handleUpdateIndication = async () => {
    if (productName === productNameInput) return

    setIsUpdating(true)

    await updateDrugIndication(hosId, id, productNameInput)

    toast({
      title: '약물명을 변경하였습니다',
    })

    setIsUpdating(false)
    refresh()
  }

  return (
    <HoverCard>
      <HoverCardTrigger>
        <Input
          className="min-w-32 truncate"
          value={productNameInput}
          onChange={(e) => setProductNameInpur(e.target.value)}
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
      <HoverCardContent>{productNameInput}</HoverCardContent>
    </HoverCard>
  )
}

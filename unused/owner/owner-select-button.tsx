import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function OwnerSelectButton({ ownerId }: { ownerId: string }) {
  const { push } = useRouter()

  return (
    <Button
      size="sm"
      variant="outline"
      onClick={() => {
        push(`?owner_id=${ownerId}`)
      }}
    >
      선택
    </Button>
  )
}

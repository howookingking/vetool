import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useCallback } from 'react'

export default function GoToButton({ patientId }: { patientId: string }) {
  const { hos_id, target_date } = useParams()
  const { push } = useRouter()

  const handleGoto = useCallback(() => {
    push(`/hospital/${hos_id}/icu/${target_date}/chart/${patientId}`)
  }, [hos_id, target_date, patientId, push])

  return (
    <Button onClick={handleGoto} size="icon" variant="ghost">
      <ArrowRight size={18} />
    </Button>
  )
}

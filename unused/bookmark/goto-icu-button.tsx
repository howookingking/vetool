import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

export default function GotoIcuButton({
  patientId,
  targetDate,
}: {
  patientId: string
  targetDate: string
}) {
  const { push } = useRouter()
  const { hos_id } = useParams()

  const handleGoto = () => {
    push(`/hospital/${hos_id}/icu/${targetDate}/chart/${patientId}`)
  }
  return (
    <Button onClick={handleGoto} size="icon" variant="ghost">
      <ArrowRight size={18} />
    </Button>
  )
}

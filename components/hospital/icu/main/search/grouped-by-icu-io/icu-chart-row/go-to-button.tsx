import { Button } from '@/components/ui/button'
import type { SearchedIcuCharts } from '@/types/icu/search'
import { ArrowRight } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

export default function GotoButton({ chart }: { chart: SearchedIcuCharts }) {
  const { push } = useRouter()
  const { hos_id } = useParams()

  const handleGoto = () => {
    push(
      `/hospital/${hos_id}/icu/${chart.target_date}/chart/${chart.patient_id}`,
    )
  }

  return (
    <Button onClick={handleGoto} size="icon" variant="ghost">
      <ArrowRight size={18} />
    </Button>
  )
}

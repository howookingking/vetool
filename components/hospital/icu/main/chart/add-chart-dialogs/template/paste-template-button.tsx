import { Button } from '@/components/ui/button'
import { useCopiedChartStore } from '@/lib/store/icu/copied-chart'
import { Check } from 'lucide-react'

export default function PasteTemplateButton({ chartId }: { chartId: string }) {
  const { setIsConfirmCopyDialogOpen, setCopiedChartId } = useCopiedChartStore()

  const handleSelect = async () => {
    setCopiedChartId(chartId)
    setIsConfirmCopyDialogOpen(true)
  }

  return (
    <Button size="icon" onClick={handleSelect} variant="ghost">
      <Check size={16} />
    </Button>
  )
}

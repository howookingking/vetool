import { Button } from '@/components/ui/button'
import { useTemplateStore } from '@/lib/store/icu/template'
import { Check } from 'lucide-react'

export default function PasteTemplateOrderButton({
  icuChartId,
}: {
  icuChartId: string
}) {
  const { setIsTemplateDialogOpen, setTemplate } = useTemplateStore()

  const handleSelect = () => {
    setIsTemplateDialogOpen(true)
    setTemplate({ icu_chart_id: icuChartId })
  }

  return (
    <Button size="icon" onClick={handleSelect} variant="ghost">
      <Check size={16} />
    </Button>
  )
}

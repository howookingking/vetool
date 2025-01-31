import { Button } from '@/components/ui/button'
import { getTemplateChart } from '@/lib/services/icu/template/template'
import { type SelectedIcuOrder } from '@/types/icu/chart'
import { type TemplateChart } from '@/types/icu/template'
import { Edit, LoaderCircle } from 'lucide-react'
import { type Dispatch, type SetStateAction, useState } from 'react'

type EditTemplateButtonProps = {
  chartId: string
  template: TemplateChart
  setUseUpsertTemplateDialogOpen: Dispatch<SetStateAction<boolean>>
  setSortedOrders: Dispatch<SetStateAction<SelectedIcuOrder[]>>
  setIsEdtit: Dispatch<SetStateAction<boolean>>
  setSelectedTemplateChart: Dispatch<SetStateAction<TemplateChart | null>>
}

export default function EditTemplateButton({
  chartId,
  template,
  setUseUpsertTemplateDialogOpen,
  setSortedOrders,
  setIsEdtit,
  setSelectedTemplateChart,
}: EditTemplateButtonProps) {
  const [isFetching, setIsFetching] = useState(false)

  const handleOpenEditDialog = async () => {
    setSelectedTemplateChart(template)
    setIsEdtit(true)
    setIsFetching(true)

    const templatechart = await getTemplateChart(chartId)
    setSortedOrders(templatechart.orders)

    setIsFetching(false)
    setUseUpsertTemplateDialogOpen(true)
  }
  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={handleOpenEditDialog}
      className="mx-auto flex items-center justify-center"
    >
      {isFetching ? (
        <LoaderCircle size={18} className="animate-spin" />
      ) : (
        <Edit size={18} />
      )}
    </Button>
  )
}

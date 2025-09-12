import { Button } from '@/components/ui/button'
import { getTemplateChart } from '@/lib/services/icu/template/template'
import { useDtOrderStore } from '@/lib/store/icu/dt-order'
import type { IcuTemplate } from '@/types'
import type { SelectedIcuOrder } from '@/types/icu/chart'
import { Edit, LoaderCircle } from 'lucide-react'
import { type Dispatch, type SetStateAction, useState } from 'react'

type EditTemplateButtonProps = {
  chartId: string
  template: IcuTemplate
  setUseUpsertTemplateDialogOpen: Dispatch<SetStateAction<boolean>>
  setSortedOrders: Dispatch<SetStateAction<SelectedIcuOrder[]>>
  setIsEdtit: Dispatch<SetStateAction<boolean>>
  setSelectedTemplateChart: Dispatch<SetStateAction<IcuTemplate | null>>
}

export default function EditTemplateButton({
  chartId,
  template,
  setUseUpsertTemplateDialogOpen,
  setSortedOrders,
  setIsEdtit,
  setSelectedTemplateChart,
}: EditTemplateButtonProps) {
  const { reset } = useDtOrderStore()

  const [isFetching, setIsFetching] = useState(false)

  const handleOpenEditDialog = async () => {
    reset()
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

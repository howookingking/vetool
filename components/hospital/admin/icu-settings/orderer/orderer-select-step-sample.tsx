import OrdererSelectStep from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order/orderer-select-step'
import { Dialog, DialogTitle } from '@/components/ui/dialog'
import { cn } from '@/lib/utils/utils'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'

export default function OrdererSelecteStepSample({
  showOrdererInput,
}: {
  showOrdererInput: boolean
}) {
  const {
    basicHosData: { vetList },
  } = useBasicHosDataContext()

  return (
    <div
      className={cn(
        'rounded-md border p-4 shadow-md transition-opacity duration-700',
        !showOrdererInput && 'opacity-30',
      )}
    >
      <Dialog>
        <DialogTitle className="mb-2">오더자 선택</DialogTitle>
        <OrdererSelectStep
          icuChartId=""
          orders={[]}
          mainVetName={vetList[0].name}
          isSetting
        />
      </Dialog>
    </div>
  )
}

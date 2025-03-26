import TxSelectUserStep from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/tx/tx-select-user-step'
import { Dialog } from '@/components/ui/dialog'
import { cn } from '@/lib/utils/utils'

export default function TxSelectUserStepSample({
  showTxUserInput,
}: {
  showTxUserInput: boolean
}) {
  return (
    <div
      className={cn(
        'space-y-2 rounded-md border p-4 shadow-md transition-opacity duration-700',
        !showTxUserInput && 'opacity-30',
      )}
    >
      <Dialog>
        <TxSelectUserStep handleClose={() => {}} isSetting />
      </Dialog>
    </div>
  )
}

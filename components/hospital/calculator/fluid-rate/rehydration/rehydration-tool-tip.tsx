import HelperTooltip from '@/components/common/helper-tooltip'

export default function RehydrationToolTip() {
  return (
    <HelperTooltip className="mt-[1px]" side="right">
      <div className="space-y-2">
        <div className="text-sm font-semibold">Rehydration Fluid Rate</div>

        <div className="flex gap-10">
          <div>
            <div>
              Total Fluid deficit (L) = Body weight (kg) * Dehydration (as a
              decimal)
            </div>
            <div>Over 12-24 hr</div>
          </div>
        </div>
        <div>*2024 AAHA Fluid Therapy Guidelines for Dogs and Cats</div>
      </div>
    </HelperTooltip>
  )
}

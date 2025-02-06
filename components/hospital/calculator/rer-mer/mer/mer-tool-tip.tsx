import HelperTooltip from '@/components/common/helper-tooltip'

export default function MerToolTip() {
  return (
    <HelperTooltip className="mt-[1px]" side="right">
      <div className="space-y-2">
        <div className="text-sm font-semibold">MER Calculation</div>

        <div className="flex gap-10">
          <div>
            <div>RER * Life Stage Factor</div>
          </div>
        </div>
        <div>*2024 AAHA Fluid Therapy Guidelines for Dogs and Cats</div>
      </div>
    </HelperTooltip>
  )
}

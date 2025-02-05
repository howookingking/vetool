import HelperTooltip from '@/components/common/helper-tooltip'

export default function MerToolTip() {
  return (
    <HelperTooltip className="mt-[1px]" side="right">
      <div className="space-y-2">
        <div className="text-sm font-semibold">MER Calculation</div>

        <div className="flex gap-10">
          <div>
            <div>RER * Life Stage Factor</div>
            <div className="mt-2">Example for a 10 lb neutered dog:</div>
            <div>MER: 216 * 1.4 = 302kcal/day</div>
          </div>
        </div>
        <div>*2024 AAHA Fluid Therapy Guidelines for Dogs and Cats</div>
      </div>
    </HelperTooltip>
  )
}
